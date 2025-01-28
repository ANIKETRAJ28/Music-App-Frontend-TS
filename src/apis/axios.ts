import axios from "axios";

const defaultOptions = {
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true,
};

export const axiosInstance = axios.create(defaultOptions);
