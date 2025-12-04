import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
const CustomerOrderDataRow = ({item}) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const {image,name, price,quantity, category,status} = item || {};
  console.log(item);
  


  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                src={image}
                className='mx-auto object-cover rounded h-20 md:h-30  md:w-35 w-16   '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white font-semibold'>
        <p className='text-gray-900'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold'>
        <p className='text-gray-900'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold'>
        <p className='text-red-600 font-semibold'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold'>
        <p className='text-gray-900'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold'>
        <p className='text-gray-900'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer font-semibold '>Cancel</span>
        </button>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default CustomerOrderDataRow
