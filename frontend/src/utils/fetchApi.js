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

  export const loginUser = async (formData) => {
    try {
      const response = await API.post("/login", formData);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to login";
    }
  };

  export const registerUser = async (formData) => {
    try {
      const response = await API.post("/register", formData);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to register";
    }
  };

  export const getUserProfile = async (userId) => {
    try {
      const response = await API.get(`/profile/${userId}`);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch user profile";
    }
  };

  export const getUserDashboard = async (userId) => {
    try {
      const response = await API.get(`/dashboard/${userId}`);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch user dashboard";
    }
  };

  export const getUserProduct = async (userId) => {
    try {
      const response = await API.get(`/profile/sale/${userId}`);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch all user product";
    }
  };

  export const getAllProduct = async () => {
    try {
        const response = await API.get("/sale");
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Failed to get Products !";
    }
  }

  export const postProduct = async (formBody) => {
    console.log(formBody)
    try {
      const response = await API.post("/sale", formBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to post Product !";
    }
  };

  export const updateProduct = async (formBody, saleId) => {
    console.log(formBody)
    try {
      const response = await API.put(`/sale/${saleId}`, formBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to post Product !";
    }
  };

  export const deleteProduct = async (saleId) => {
    try {
        const response = await API.delete(`/sale/${saleId}`);
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete Products !";
    }
  }
  
  export const getNews = async () => {
    try {
        const response = await API.get("/news");
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Failed to get News !";
    }
  }

