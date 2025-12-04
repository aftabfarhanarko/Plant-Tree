import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useNormalAxios from "../../hooks/useNormalAxios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";

const Plants = () => {
  const axiosNormal = useNormalAxios();

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ["PleantData"],
    queryFn: async () => {
      const res = await axiosNormal.get("plant");
      return res?.data?.result;
    },
  });
  console.log(plants);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8">
        {plants.map((plant) => (
          <Card key={plant._id} plant={plant} />
        ))}
      </div>
    </Container>
  );
};

export default Plants;
