import axios from "axios";

// Har tab ka alag token sessionStorage mein hota hai
// Yeh instance automatically Authorization header lagata hai
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8081";
const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("chatapp_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
