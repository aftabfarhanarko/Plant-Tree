import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddPlantForm = () => {
  const {user} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imagePost = axios;
  const handelPlant = (data) => {
    console.log("Plants COunt ", data);
    const plantImg = data.plantImage[0];
    console.log(plantImg);

    //  photo post
    const fromData = new FormData();
    fromData.append("image", plantImg);
    const uriIBB = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imge_hoset
    }`;

    imagePost
      .post(uriIBB, fromData)
      .then((res) => {
        const plantPhoto =  res.data.data.url;
       

      })
      .catch((err) => {
        console.log(err);
      });

    // axioss.post("plant")
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
