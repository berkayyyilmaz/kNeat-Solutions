import BaseProductFetchingStrategy from "./productFetchingStrategies";
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_HAS_MORE,
} from "../actionTypes/productTypes";

// Concrete strategy for initial product fetching
class FetchProductsStrategy extends BaseProductFetchingStrategy {
  validateFetch(getState, params) {
    // İlk fetch için özel validation logic'i yoksa true döner
    return true;
  }

  getStartAction() {
    return { type: FETCH_PRODUCTS_START };
  }

  getSuccessAction(data) {
    return { type: FETCH_PRODUCTS_SUCCESS, payload: data };
  }

  getErrorAction(error) {
    return { type: FETCH_PRODUCTS_ERROR, payload: error };
  }

  processResponse(data) {
    // İlk fetch için response'u direkt döner
    return data;
  }

  postFetchOperations(dispatch, data, params) {
    // hasMore check
    const hasMore = data.products.length === params.limit;
    dispatch({ type: SET_HAS_MORE, payload: hasMore });
  }

  getErrorMessage() {
    return "Ürünler yüklenirken hata oluştu:";
  }

  getDefaultErrorMessage() {
    return "Ürünler yüklenirken bir hata oluştu";
  }
}

export default FetchProductsStrategy;
