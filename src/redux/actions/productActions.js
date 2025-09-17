import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  LOAD_MORE_PRODUCTS_START,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_ERROR,
  RESET_PRODUCTS,
  SET_HAS_MORE,
  FETCH_PRODUCT_DETAIL_START,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
  SET_CURRENT_PRODUCT,
} from "../actionTypes/productTypes";
import { productApiService } from "../../services/api";
import FetchProductsStrategy from "./FetchProductsStrategy";
import LoadMoreProductsStrategy from "./LoadMoreProductsStrategy";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setHasMore = (hasMore) => ({
  type: SET_HAS_MORE,
  payload: hasMore,
});
export const resetProducts = () => ({ type: RESET_PRODUCTS });

// Category action creators
const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START,
});

const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

const fetchCategoriesError = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  payload: error,
});

// Products action creators
const fetchProductsStart = () => ({
  type: FETCH_PRODUCTS_START,
});

const fetchProductsSuccess = (data) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data,
});

const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
});

// Load more products action creators
const loadMoreProductsStart = () => ({
  type: LOAD_MORE_PRODUCTS_START,
});

const loadMoreProductsSuccess = (data) => ({
  type: LOAD_MORE_PRODUCTS_SUCCESS,
  payload: data,
});

const loadMoreProductsError = (error) => ({
  type: LOAD_MORE_PRODUCTS_ERROR,
  payload: error,
});

// Product detail action creators
const fetchProductDetailStart = () => ({
  type: FETCH_PRODUCT_DETAIL_START,
});

const fetchProductDetailSuccess = (product) => ({
  type: FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: product,
});

const fetchProductDetailError = (error) => ({
  type: FETCH_PRODUCT_DETAIL_ERROR,
  payload: error,
});

export const setCurrentProduct = (product) => ({
  type: SET_CURRENT_PRODUCT,
  payload: product,
});

// Thunk action for fetching categories
export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().products;

  // Eğer kategoriler zaten yüklenmişse, tekrar API çağrısı yapma
  if (categories.length > 0) return;

  try {
    dispatch(fetchCategoriesStart());
    const data = await productApiService.getCategories();
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    console.error("Kategoriler yüklenirken hata oluştu:", error);
    dispatch(
      fetchCategoriesError(
        error.response?.data?.message ||
          "Kategoriler yüklenirken bir hata oluştu",
      ),
    );
  }
};

// LSP-compliant thunk action for fetching products
export const fetchProducts =
  (params = {}) =>
  async (dispatch, getState) => {
    const strategy = new FetchProductsStrategy();
    return strategy.execute(dispatch, getState, params);
  };

// LSP-compliant thunk action for loading more products (infinite scroll)
export const loadMoreProducts =
  (params = {}) =>
  async (dispatch, getState) => {
    const strategy = new LoadMoreProductsStrategy();
    return strategy.execute(dispatch, getState, params);
  };

// Thunk action for fetching product detail
export const fetchProductDetail = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductDetailStart());
    const data = await productApiService.getProductById(productId);
    dispatch(fetchProductDetailSuccess(data));
  } catch (error) {
    console.error("Ürün detayı yüklenirken hata oluştu:", error);
    dispatch(
      fetchProductDetailError(
        error.response?.data?.message ||
          "Ürün detayı yüklenirken bir hata oluştu",
      ),
    );
  }
};
