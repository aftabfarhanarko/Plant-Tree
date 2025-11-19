import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const UserDataRow = () => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>abc@gmail.com</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>Customer</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>Unavailable</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          role='customer'
        />
      </td>
    </tr>
  )
}

export default UserDataRow
