// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach JWT before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
