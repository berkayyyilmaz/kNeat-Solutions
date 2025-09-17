import axios from "axios";
import {
  AxiosApiImplementation,
  ApiFactory,
  ProductApiService,
  UserApiService,
} from "./ApiAbstraction";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

// Başlangıçta token varsa header'a ekle
const initialToken = localStorage.getItem("userToken");
if (initialToken) {
  api.defaults.headers.Authorization = initialToken;
}

// DIP-compliant API setup
const axiosImplementation = new AxiosApiImplementation(api);
ApiFactory.setApiImplementation(axiosImplementation);

// Domain-specific services
export const productApiService = new ProductApiService();
export const userApiService = new UserApiService();

export default api;
