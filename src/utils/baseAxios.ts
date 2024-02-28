import axios from "axios";
import { config } from "@/config";

export const baseAxios = axios.create({
  baseURL: config.urlApi,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWithAuthToken = (token: string) =>
  baseAxios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
