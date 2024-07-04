import { store } from "../store";
import api from "./api";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const get = async (url, location) => {
    try {
      const res = await api( BASE_URL, location).get(url);
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
        
        }
      }
      return err;
    }
};

export const post = async (url, payload, location) => {
    try {
        const res = await api(BASE_URL, location).post(url,payload);
        
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
        
        }
      }
      return err;
    }
};
export const put = async (url, payload,location) => {
    try {
      const res = await api(BASE_URL,location).put(url,payload);
  
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
        
        }
      }
      return false;
    }
};
export const remove = async (url,location) => {
  try {
    const res = await api(BASE_URL,location).delete(url);

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
      }
    }
    return false;
  }
};