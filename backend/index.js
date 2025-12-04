require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const admin = require('firebase-admin')
// const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString(
//   'utf-8'
// )
// const serviceAccount = JSON.parse(decoded)
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

const app = express();
// middleware
app.use(cors());
app.use(express.json());

// jwt middlewares
const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).send({ message: "Unauthorized Access!" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    console.log(decoded);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Unauthorized Access!", err });
  }
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.VIT_MONGODBDATA, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const db = client.db("plants");
    const plantsCollection = db.collection("plantsTree");
    const paymentOrder = db.collection("paymentOrder");

    app.post("/plants", async (req, res) => {
      const data = req.body;
      console.log(data);

      const result = await plantsCollection.insertOne(data);

      res.status(200).json({
        message: "Plant Tree Saved DB",
        result,
      });
      console.log(data, result);
    });

    app.get("/plant", async (req, res) => {
      // const query = {};
      // const email = query.email;

      // if(email){

      // }

      const result = await plantsCollection.find().toArray();
      res.status(201).json({
        message: "Plant All Tree Now",
        result,
      });
    });

    app.get("/plant/:id", async (req, res) => {
      const { id } = req.params;
      // console.log(id);

      const query = { _id: new ObjectId(id) };
      const result = await plantsCollection.findOne(query);
      res.status(200).json({
        message: "One Plant Now",
        result,
      });
    });

    // Payment Get way
    app.post("/create-checkout-session", async (req, res) => {
      const paymentInfo = req.body;
      console.log(paymentInfo);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: paymentInfo?.name,
                images: [paymentInfo?.image],
                description: paymentInfo?.dicptions,
              },
              unit_amount: paymentInfo?.price * 100,
            },
            quantity: 1,
          },
        ],

        customer_email: paymentInfo?.customer?.email,
        mode: "payment",
        metadata: {
          plantId: paymentInfo?.plantId,
          email: paymentInfo.customer.email,
        },
        success_url: `${process.env.URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.URL}/plant/${paymentInfo?.plantId}`,
      });
      res.send({ url: session.url });
    });

    app.post("/payment-success", async (req, res) => {
      const { sessionId } = req.body;

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const plant = await plantsCollection.findOne({
        _id: new ObjectId(session.metadata.plantId),
      });

      const order = await paymentOrder.findOne({
        transactionId: session.payment_intent,
      });

      if (session.status === "complete" && !order) {
        // saved data DB
        const orderInfo = {
          plantId: session.metadata.plantId,
          transactionId: session.payment_intent,
          customer: session.metadata.email,
          status: "pending",
          image: plant.image,
          name: plant.name,
          quantity: 1,
          price: session.amount_total / 100,
          category: plant.category,
          seller: plant.seller,
        };

        const result = await paymentOrder.insertOne(orderInfo);
        await plantsCollection.updateOne(
          {
            _id: new ObjectId(session.metadata.plantId),
          },
          { $inc: { quantity: -1 } }
        );
        return res.send({
          transactionId: session.payment_intent,
          orderId: result.insertedId,
        });
      }

      res.send({
        transactionId: session.payment_intent,
        orderId: order._id,
      });
    });

    // customer order api
    app.get("/customer-order", async (req, res) => {
      const email = req.query.email;

      const result = await paymentOrder.find({ customer: email }).toArray();
      res.send(result);
    });

   
    // maneaze order
    app.get("/manez-order", async (req, res) => {
      const email = req.query.email;

      const result = await plantsCollection
        .find({ "seller.email": email })
        .toArray();
      res.send(result);
    });

    app.delete("/maneaz-my-plant/:id", async (req,res) => {
      const {id} = req.params;
      const query = {_id: new ObjectId(id)};
      const result = await plantsCollection.deleteOne(query);
      res.send(result);
    })

    app.patch("/plant-updeat-seller/:id", async (req,res) => {
      const {id}  =  req.params;
      const {} = req.body;
    })



    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Server..");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
