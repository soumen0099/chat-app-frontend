import axios from "axios";

// Har tab ka alag token sessionStorage mein hota hai
// Yeh instance automatically Authorization header lagata hai
const api = axios.create({ withCredentials: true });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("chatapp_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
