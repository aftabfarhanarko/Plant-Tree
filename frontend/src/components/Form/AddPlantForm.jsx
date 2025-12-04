import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const AddPlantForm = () => {
  const secureaxio = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    // isPending,
    // isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post("http://localhost:3000/plants", payload).then((res) => {
        toast.success("Flower Add Successfully");
      }),
    // mutationFn:async (payload) =>  await secureaxio.post("/plants", payload),
    // onSuccess: (data) => {
    //   console.log(data);
    //   toast.success("Plant Added successfully");
    //   mutationReset();
    // },

    // onError: (error) => {
    //   console.log(error);
    // },
    // onMutate: (payload) => {
    //   console.log("I will post this data--->", payload);
    // },

    // retry: 3,
  });

  const handelPlant = async (data) => {
    const { name, dicptions, quentey, price, category, plantImage } = data;
    const imageFile = plantImage[0];
    try {
      const imageUrl = await imageUpload(imageFile);
      // console.log("My Img Tree", imageUrl);

      const plantData = {
        image: imageUrl,
        name,
        dicptions,
        quantity: Number(quentey),
        price: Number(price),
        category,
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      await mutateAsync(plantData);
      reset();
    } catch (err) {
      console.log(err);
      toast.error(err?.code);
    }
  };

  return (
    <>
      {/* ====== Container: centered form with max width and padding ====== */}
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-50 flex flex-col justify-center items-center px-4 py-12">
        {/* ====== Header: centered, matching color with form ====== */}
        <header className="text-center mb-10 max-w-lg w-full">
          <h1
            className="inline-flex items-center justify-center gap-3 font-extrabold tracking-tight
          text-3xl  md:text-4xl
          bg-gradient-to-r from-green-700 via-emerald-500 to-lime-400
          bg-clip-text text-transparent drop-shadow-md mx-auto"
          >
            <span
              className="inline-flex items-center justify-center w-14 h-14
            rounded-xl bg-green-100/80 ring-2 ring-green-300 shadow-md text-3xl"
            >
              🌿
            </span>
            Add Plant
          </h1>

          <div className="mt-5 mx-auto h-1 w-36 rounded-full bg-gradient-to-r from-green-300 to-emerald-100/70 shadow-sm"></div>
        </header>

        {/* ====== Form Card ====== */}
        <form
          onSubmit={handleSubmit(handelPlant)}
          className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-10
        grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {/* Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 font-medium mb-2 select-none"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Plant Name"
                {...register("name", { required: true })}
                className="rounded-lg border border-lime-300 px-5 py-4
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring focus:ring-lime-400
              transition shadow-md hover:shadow-lg"
              />
              {errors.name?.type === "required" && (
                <p className="mt-1 text-red-500 text-sm font-semibold">
                  Please provide plant name
                </p>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-gray-700 font-medium mb-2 select-none"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category", { required: true })}
                name="category"
                className="rounded-lg border border-lime-300 px-5 py-4
              text-gray-700
              focus:outline-none focus:ring focus:ring-lime-400
              transition shadow-md hover:shadow-lg"
              >
                <option value="">Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
              {errors.category?.type === "required" && (
                <p className="mt-1 text-red-500 text-sm font-semibold">
                  Please provide plant category
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-gray-700 font-medium mb-2 select-none"
              >
                Description
              </label>
              <textarea
                {...register("dicptions")}
                placeholder="Write plant description here..."
                className="rounded-lg border border-lime-300 px-5 py-4
              text-gray-700 placeholder-gray-400
              resize-y min-h-[120px]
              focus:outline-none focus:ring focus:ring-lime-400
              transition shadow-md hover:shadow-lg"
              ></textarea>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            {/* Price & Quantity */}
            <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="price"
                  className="text-gray-700 font-medium mb-2 select-none"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Price per unit"
                  {...register("price", { required: true })}
                  className="rounded-lg border border-lime-300 px-5 py-4
                text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring focus:ring-lime-400
                transition shadow-md hover:shadow-lg"
                />
                {errors.price?.type === "required" && (
                  <p className="mt-1 text-red-500 text-sm font-semibold">
                    Please provide plant price
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="quantity"
                  className="text-gray-700 font-medium mb-2 select-none"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Available quantity"
                  {...register("quentey", { required: true })}
                  className="rounded-lg border border-lime-300 px-5 py-4
                text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring focus:ring-lime-400
                transition shadow-md hover:shadow-lg"
                />
                {errors.quentey?.type === "required" && (
                  <p className="mt-1 text-red-500 text-sm font-semibold">
                    Please provide plant quantity
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center px-6 py-8 rounded-xl border-2 border-dotted border-gray-300 bg-green-50 shadow-inner cursor-pointer transition hover:scale-[1.03] hover:shadow-lg">
              <label className="w-full text-center cursor-pointer select-none">
                <input
                  type="file"
                  {...register("plantImage", { required: true })}
                  accept="image/*"
                  className="hidden"
                />
                <div className="text-lime-600 font-semibold text-lg hover:underline">
                  Click to Upload Plant Photo
                </div>
              </label>
              {errors.plantImage?.type === "required" && (
                <p className="mt-3 text-red-500 text-sm font-semibold">
                  Please provide plant photo
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 mt-6 text-white bg-gradient-to-r from-emerald-500 to-lime-400
          rounded-3xl font-bold text-lg shadow-lg hover:shadow-2xl active:scale-95 transition-transform"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPlantForm;
