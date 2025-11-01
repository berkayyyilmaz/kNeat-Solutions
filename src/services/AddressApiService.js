import { ApiFactory } from "./ApiAbstraction";

export class AddressApiService {
  constructor(api = null) {
    this.api = api || ApiFactory.getApi();
  }

  async getAddresses() {
    return this.api.get("/user/address");
  }

  async addAddress(addressData) {
    return this.api.post("/user/address", addressData);
  }

  async updateAddress(addressData) {
    return this.api.put("/user/address", addressData);
  }

  async deleteAddress(addressId) {
    return this.api.delete(`/user/address/${addressId}`);
  }
}
