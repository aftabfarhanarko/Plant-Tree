import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useNormalAxios from "../../hooks/useNormalAxios";
const UpdatePlantModal = ({ setIsEditModalOpen, isOpen, one, refetch }) => {
  const { register, handleSubmit } = useForm();
  const axiosNormal = useNormalAxios();
  const { image, name, price, category, quantity, dicptions } = one || {};
  const handelUpdeat = (e) => {
    const updeatPlant = {
      name: e.name,
      price: e.price,
      category: e.category,
      dicptions: e.description,
      quantity: e.quantity,
      image: e.image || image,
    };
    console.log(updeatPlant);

    // axiosNormal.patch(`/plant-updeat-seller/${one._id}`);
  };

  console.log("Updeat Now", one._id);
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer"
              >
                X
              </button>
            </div>
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Update Plant Info
            </DialogTitle>
            <div className="mt-2 w-full">
              <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
                <form onSubmit={handleSubmit(handelUpdeat)}>
                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-6">
                      {/* Name */}
                      <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block text-gray-600">
                          Name
                        </label>
                        <input
                          {...register("name")}
                          className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                          type="text"
                          defaultValue={name}
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1 text-sm">
                        <label
                          htmlFor="category"
                          className="block text-gray-600 "
                        >
                          Category
                        </label>
                        <input
                          {...register("category")}
                          className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                          type="text"
                          defaultValue={category}
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-1 text-sm">
                        <label
                          htmlFor="description"
                          className="block text-gray-600"
                        >
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          placeholder="Write plant description here..."
                          className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                          defaultValue={dicptions}
                        />
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col">
                      {/* Price & Quantity */}
                      <div className="flex justify-between gap-2">
                        {/* Price */}
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="price"
                            className="block text-gray-600 "
                          >
                            Price
                          </label>
                          <input
                            {...register("price")}
                            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                            defaultValue={price}
                            type="number"
                            placeholder="Price per unit"
                          />
                        </div>

                        {/* Quantity */}
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="quantity"
                            className="block text-gray-600"
                          >
                            Quantity
                          </label>
                          <input
                            {...register("quantity")}
                            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                            defaultValue={quantity}
                            type="number"
                            placeholder="Available quantity"
                          />
                        </div>
                      </div>

                      {/* Image */}
                      <div className="p-4 w-full m-auto rounded-lg grow">
                        <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                          <div className="flex flex-col w-max mx-auto text-center">
                            <label>
                              <input
                                {...register("image")}
                                className="text-sm cursor-pointer w-36 hidden"
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                hidden
                              />
                              <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600">
                                Upload Image
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
                      >
                        Update Plant
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdatePlantModal;
