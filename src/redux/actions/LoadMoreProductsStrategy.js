import BaseProductFetchingStrategy from "./productFetchingStrategies";
import {
  LOAD_MORE_PRODUCTS_START,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_ERROR,
  SET_HAS_MORE,
} from "../actionTypes/productTypes";

// Concrete strategy for loading more products (infinite scroll)
class LoadMoreProductsStrategy extends BaseProductFetchingStrategy {
  validateFetch(getState, params) {
    const { products } = getState();

    // Already loading more or no more products to load
    if (products.loadingMore || !products.hasMore) {
      return false;
    }

    return true;
  }

  getStartAction() {
    return { type: LOAD_MORE_PRODUCTS_START };
  }

  getSuccessAction(data) {
    return { type: LOAD_MORE_PRODUCTS_SUCCESS, payload: data };
  }

  getErrorAction(error) {
    return { type: LOAD_MORE_PRODUCTS_ERROR, payload: error };
  }

  processResponse(data) {
    // LoadMore için response'u direkt döner (reducer'da append edilir)
    return data;
  }

  postFetchOperations(dispatch, data, params) {
    // hasMore check - LoadMore için aynı logic
    const hasMore = data.products.length === params.limit;
    dispatch({ type: SET_HAS_MORE, payload: hasMore });
  }

  getErrorMessage() {
    return "Daha fazla ürün yüklenirken hata oluştu:";
  }

  getDefaultErrorMessage() {
    return "Daha fazla ürün yüklenirken bir hata oluştu";
  }
}

export default LoadMoreProductsStrategy;
