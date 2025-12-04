import { useQuery } from "@tanstack/react-query";
import SellerOrderDataRow from "../../../components/Dashboard/TableRows/SellerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import useNormalAxios from "../../../hooks/useNormalAxios";

const ManageOrders = () => {
  const axiosNormal = useNormalAxios();
  const { user } = useAuth();
  const { data: order = [], isLoading } = useQuery({
    queryKey: ["orderdata"],
    queryFn: async () => {
      const res = await axiosNormal.get(`manez-order?email=${user.email}`);
      return res?.data;
    },
  });
  console.log(order);

  // if (isLoading) {
  //   return <LodingSpi
  // }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
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
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                    >
                      Customer
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
                      Address
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
                  {order.map((item) => (
                    <SellerOrderDataRow key={item._id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
