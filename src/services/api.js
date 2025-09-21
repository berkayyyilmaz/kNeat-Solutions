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

//  Güvenli token initialization
import SecureStorage from "../utils/secureStorage";

// Başlangıçta güvenli storage'dan token al
const initializeToken = () => {
  const token = SecureStorage.getToken();
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

// XSS protection'ı etkinleştir
SecureStorage.enableXSSProtection();

// Token'ı initialize et
initializeToken();

// DIP-compliant API setup
const axiosImplementation = new AxiosApiImplementation(api);
ApiFactory.setApiImplementation(axiosImplementation);

// Domain-specific services
export const productApiService = new ProductApiService();
export const userApiService = new UserApiService();

export default api;
