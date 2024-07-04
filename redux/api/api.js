import axios from "axios";
import { getCookie, getCookies, hasCookie } from "cookies-next";
// import { store } from "../store";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const api = (BASE_URL, location = null, serverCtx = null) => {
  const loc = location ? location : hasCookie("location") ? getCookie("location") : "ahmedabad";
  // initialize axios
  const service = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      location :loc,
    },
    withCredentials:true,
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
