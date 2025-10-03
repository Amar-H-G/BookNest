import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    // Normalize error shape
    const message =
      error?.response?.data?.message || error?.message || "Request failed";
    console.error("API Error:", message, error?.response?.data || "");
    return Promise.reject(error);
  }
);

export default API;
