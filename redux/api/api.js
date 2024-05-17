import axios from "axios";
// import { store } from "../store";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const api = (BASE_URL) => {

  // initialize axios
  const service = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      location: localStorage.getItem("location") ?? "ahmedabad",
    },
  });

  // Add a request interceptor
  service.interceptors.request.use(
    async function (config) {
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return service;
};

export default api;
