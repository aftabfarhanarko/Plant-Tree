import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useNormalAxios from "../../hooks/useNormalAxios";

const DeleteModal = ({ closeModal, isOpen, one, refetch }) => {
  const axiosNormail = useNormalAxios();
  const handelDeletNow = (id) => {
    console.log(id);
    // /maneaz-my-plant/:id
    axiosNormail.delete(`maneaz-my-plant/${id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  const { image, name, price, category, quantity, seller } = one || {};
  // console.log(seller);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Background overlay with subtle blur + transparent dark */}
      <div className="fixed inset-0 z-40 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-6">
          <DialogPanel
            transition
            className="w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl duration-300 ease-out
                   data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {/* Title */}
            <DialogTitle
              as="h3"
              className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight"
            >
              Are you sure?
            </DialogTitle>

            <p className="text-center text-sm text-gray-600 mb-8">
              You cannot undo once it&apos;s done!
            </p>

            {/* Plant Details Section */}
            <div className="flex flex-col md:flex-row gap-8 items-center border border-gray-300 rounded-xl p-6 shadow-lg bg-green-50/60">
              {/* Image */}
              <div className="flex-shrink-0 w-40 h-40 rounded-3xl overflow-hidden shadow-xl  transition-transform hover:scale-105 duration-300">
                <img
                  src={image}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="flex-grow space-y-5">
                <div>
                  <span className="font-semibold text-gray-700">Name: </span>
                  <span className="text-gray-900">{name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Category:{" "}
                  </span>
                  <span className="text-green-700 capitalize">{category}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Price: </span>
                  <span className="text-red-500">${price}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Quantity:{" "}
                  </span>
                  <span className="text-gray-900">{quantity}</span>
                </div>

                {/* Seller Info */}
                <div className="flex items-center gap-5 mt-4 p-5 bg-white rounded-2xl shadow-lg border border-lime-300">
                  {/* Seller Image */}
                  {seller?.image ? (
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-14 h-14 rounded-full object-cover shadow-md"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-lime-200 flex items-center justify-center text-lime-600 font-bold text-xl">
                      {seller?.name?.charAt(0).toUpperCase() || "S"}
                    </div>
                  )}

                  {/* Seller Details */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {seller?.name || "Unknown Seller"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {seller?.email || "No Email Provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                type="button"
                onClick={() => handelDeletNow(one._id)}
                className="inline-flex justify-center rounded-lg border border-transparent bg-green-100 px-10 py-3 text-sm font-semibold text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition"
              >
                Yes, Delete
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex justify-center rounded-lg border border-transparent bg-red-100 px-10 py-3 text-sm font-semibold text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
              >
                No, Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
