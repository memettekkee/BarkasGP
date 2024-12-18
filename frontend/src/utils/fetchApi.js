import axios, { formToJSON } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("Base URL:", API_URL);

const API = axios.create({
    baseURL: API_URL,
  });

  API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      console.log("Token:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Tambahkan token di header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export const getNews = async () => {
    try {
        const response = await API.get("/news");
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Failed to get News !";
    }
  }

