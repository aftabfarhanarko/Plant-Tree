import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import useNormalAxios from "../../hooks/useNormalAxios";

const PurchaseModal = ({ closeModal, isOpen, data }) => {
  const { user } = useAuth();
  const axiosNormal = useNormalAxios();
  const { _id, name, price, category, quantity, dicptions, image } = data || {};

  // Payment
  const handelPayment = async () => {
    const paymentInfo = {
      plantId: _id,
      name,
      category,
      price,
      dicptions,
      image,
      quantity,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    const res = await axiosNormal.post("create-checkout-session", paymentInfo);

    console.log("Payment Info:", res);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Plant : {name}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Category : {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer Name : {user?.displayName}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer Email : {user?.email}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Price : <span className="text-red-500">${price}</span>
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Available Quantity : {quantity}
                <div className="space-y-1 text-sm">
                  <label htmlFor="quantity" className="block text-gray-600">
                    Quantity
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="quantity"
                    // {...register("quentey", { required: true })}
                    type="number"
                    placeholder="Available quantity"
                  />
                  {/* {errors.quentey?.type === "required" && (
                    <p className="text-red-500 mt-1.5">
                      Please Provied Plant Quantity
                    </p>
                  )} */}
                </div>
              </p>
            </div>

            <div className="flex mt-4 justify-around">
              <button
                type="button"
                onClick={handelPayment} // এইখানে onClick এ function বসালাম
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Pay
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
