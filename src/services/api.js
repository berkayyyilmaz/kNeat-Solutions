import axios from "axios";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  headers: {
    Authorization: `${localStorage.getItem("userToken")}`,
  },
});

export default api;
