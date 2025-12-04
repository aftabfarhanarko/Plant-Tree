import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
const SellerOrderDataRow = ({ item }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  console.log(item);

  const { image, name, price, quantity, status, customer } = item || {};

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <img src={image} className=" h-15 w-15 rounded-md"></img>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900 ">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900 ">{customer}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-red-600 ">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900 ">{quantity}</p>
      </td>
      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>Dhaka</p>
      </td> */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900 ">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <div className="flex items-center gap-2">
          <select
            required
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900  bg-white"
            name="category"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
