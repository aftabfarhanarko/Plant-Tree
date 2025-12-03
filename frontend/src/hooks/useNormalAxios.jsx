import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useNormalAxios = () => {
  return axiosInstance;
};

export default useNormalAxios;
