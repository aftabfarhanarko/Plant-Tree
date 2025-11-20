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
    // mutationFn:async (payload) =>  await axios.post("http://localhost:3000/plants", payload),
    mutationFn:async (payload) =>  await secureaxio.post("/plants", payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Plant Added successfully");
      mutationReset();
    },

    // onError: (error) => {
    //   console.log(error);
    // },
    onMutate: (payload) => {
      console.log("I will post this data--->", payload);
    },

    retry: 3,
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
      toast.error(err?.code)
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(handelPlant)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                {...register("name", { required: true })}
                type="text"
                placeholder="Plant Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 mt-1.5">Please Provied Plant Name</p>
              )}
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500 mt-1.5">
                  Please Provied Plant Category
                </p>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                {...register("dicptions")}
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
              ></textarea>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price per unit"
                />
                {errors.price?.type === "required" && (
                  <p className="text-red-500 mt-1.5">
                    Please Provied Plant Price
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  {...register("quentey", { required: true })}
                  type="number"
                  placeholder="Available quantity"
                />
                {errors.quentey?.type === "required" && (
                  <p className="text-red-500 mt-1.5">
                    Please Provied Plant Quantity
                  </p>
                )}
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      {...register("plantImage", { required: true })}
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      Upload
                    </div>
                    {errors.plantImage?.type === "required" && (
                      <p className="text-red-500 mt-1.5">
                        Please Provied Plant Photo
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPlantForm;
