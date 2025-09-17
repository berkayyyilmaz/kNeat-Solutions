// DIP-compliant API abstraction

// Abstract API Interface
class ApiInterface {
  async get(url) {
    throw new Error("get method must be implemented");
  }

  async post(url, data) {
    throw new Error("post method must be implemented");
  }

  async put(url, data) {
    throw new Error("put method must be implemented");
  }

  async delete(url) {
    throw new Error("delete method must be implemented");
  }
}

// Concrete API Implementation
class AxiosApiImplementation extends ApiInterface {
  constructor(apiInstance) {
    super();
    this.api = apiInstance;
  }

  async get(url) {
    const response = await this.api.get(url);
    return response.data;
  }

  async post(url, data) {
    const response = await this.api.post(url, data);
    return response.data;
  }

  async put(url, data) {
    const response = await this.api.put(url, data);
    return response.data;
  }

  async delete(url) {
    const response = await this.api.delete(url);
    return response.data;
  }
}

// API Factory - DIP için dependency injection
class ApiFactory {
  static instance = null;
  static apiImplementation = null;

  static setApiImplementation(implementation) {
    if (!(implementation instanceof ApiInterface)) {
      throw new Error("Implementation must extend ApiInterface");
    }
    this.apiImplementation = implementation;
  }

  static getApi() {
    if (!this.apiImplementation) {
      throw new Error(
        "API implementation not set. Call setApiImplementation first.",
      );
    }
    return this.apiImplementation;
  }
}

// Domain-specific API services - high-level modules
export class ProductApiService {
  constructor(api = null) {
    this.api = api || ApiFactory.getApi();
  }

  async getProducts(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const url = `/products${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
    return this.api.get(url);
  }

  async getProductById(id) {
    return this.api.get(`/products/${id}`);
  }

  async getCategories() {
    return this.api.get("/categories");
  }
}

export class UserApiService {
  constructor(api = null) {
    this.api = api || ApiFactory.getApi();
  }

  async login(credentials) {
    return this.api.post("/auth/login", credentials);
  }

  async register(userData) {
    return this.api.post("/auth/register", userData);
  }

  async logout() {
    return this.api.post("/auth/logout");
  }

  async getUserProfile() {
    return this.api.get("/user/profile");
  }
}

export { ApiInterface, AxiosApiImplementation, ApiFactory };
