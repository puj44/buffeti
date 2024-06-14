import { store } from "../store";
import api from "./api";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const get = async (url, baseURL) => {
    try {
      const res = await api(baseURL ?? BASE_URL).get(url);
      if (res.status === 200) {
   
        if (res.data?.code === 200) {
          return res;
        }
      } else {
        return res;
      }
      return res;
    } catch (err) {
      if (err?.response) {
        if (err?.response?.status === 401) {
        //   localStorage.clear();
        //   window.location.replace("/");
        }
      }
      return err;
    }
};

export const post = async (url, payload,baseURL) => {
    try {
        const res = await api(baseURL ?? BASE_URL).post(url,payload);
        
      if (res.status === 200) {
        if (res.data?.code === 200) {
          return res;
        }
      } else {
        return res;
      }
      return res;
    } catch (err) {
        console.log("here",err);
      if (err?.response) {
        if (err?.response?.status === 401) {
        //   localStorage.clear();
        //   window.location.replace("/");
        }
      }
      return err;
    }
};
export const put = async (url, payload,baseURL) => {
    try {
      const res = await api(baseURL ?? BASE_URL).put(url,payload);
  
      if (res.status === 200) {
        if (res.data?.code === 200) {
          return res;
        }
      } else {
        return res;
      }
    } catch (err) {
      if (err?.response) {
        if (err?.response?.status === 401) {
        //   localStorage.clear();
        //   window.location.replace("/");
        }
      }
      return false;
    }
};