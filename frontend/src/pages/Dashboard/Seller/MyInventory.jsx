import { useQuery } from '@tanstack/react-query';
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow'
import useAuth from '../../../hooks/useAuth';
import useNormalAxios from '../../../hooks/useNormalAxios';

const MyInventory = () => {
  const axiosNormal = useNormalAxios();
  const { user } = useAuth();
  const { data: inventory = [], isLoading , refetch} = useQuery({
    queryKey: ["orderdata"],
    queryFn: async () => {
      const res = await axiosNormal.get(`manez-order?email=${user.email}`);
      
      return res?.data;
    },
  });
  console.log(inventory);

  // if (isLoading) {
  //   return <LodingSpi
  // }
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    inventory.map(one => <PlantDataRow refetch={refetch} key={one._id} one={one} /> )
                  }
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyInventory
