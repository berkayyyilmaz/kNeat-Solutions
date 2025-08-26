import axios from "axios";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

// Başlangıçta token varsa header'a ekle
const initialToken = localStorage.getItem("userToken");
if (initialToken) {
  api.defaults.headers.Authorization = initialToken;
}

export default api;
