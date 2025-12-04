import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useNormalAxios from "../../../hooks/useNormalAxios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const axiosNormal = useNormalAxios();
  const {user} = useAuth()
  const { data: plants = [], isLoading } = useQuery({
    queryKey: ["orderdata", user.email],
    queryFn: async () => {
      const res = await axiosNormal.get(`customer-order?email=${user.email}`);
      return res?.data;
    },
  });
  console.log(plants);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 font-semibold py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold "
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    plants.map(item =>  <CustomerOrderDataRow key={item._id} item={item} />)
                  }
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
