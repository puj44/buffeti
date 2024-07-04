import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
// import { store } from "../store";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const api = (BASE_URL, location = null, accessToken = null) => {
  const loc = location ? location : hasCookie("location") ? getCookie("location") : "ahmedabad";
  const token = accessToken ? ("Bearer "+accessToken) : hasCookie("accessToken") ? ("Bearer "+getCookie("accessToken")) : null
  // initialize axios
  const service = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Authorization":token,
      "Content-Type": "application/json",
      location :loc
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
