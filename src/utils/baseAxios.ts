import { config } from "@/config";
import axios from "axios";

export const baseAxios = axios.create({
  baseURL: config.urlApi,
  headers: {
    "Content-Type": "application/json",
  },
});
