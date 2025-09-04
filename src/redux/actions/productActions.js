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
} from "../actionTypes/productTypes";
import { api } from "../../services/api";

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

// Thunk action for fetching categories
export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().products;

  // Eğer kategoriler zaten yüklenmişse, tekrar API çağrısı yapma
  if (categories.length > 0) return;

  try {
    dispatch(fetchCategoriesStart());
    const response = await api.get("/categories");
    dispatch(fetchCategoriesSuccess(response.data));
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

// Thunk action for fetching products
export const fetchProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(fetchProductsStart());

      // Query parametrelerini hazırla
      const queryParams = new URLSearchParams();

      if (params.categoryId) {
        queryParams.append("category", params.categoryId);
      }
      if (params.limit) {
        queryParams.append("limit", params.limit);
      }
      if (params.offset) {
        queryParams.append("offset", params.offset);
      }
      if (params.filter) {
        queryParams.append("filter", params.filter);
      }
      if (params.sort) {
        queryParams.append("sort", params.sort);
      }

      const url = `/products${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

      const response = await api.get(url);

      dispatch(fetchProductsSuccess(response.data));

      // Check if there are more products to load
      const hasMore = response.data.products.length === params.limit;
      dispatch(setHasMore(hasMore));
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
      dispatch(
        fetchProductsError(
          error.response?.data?.message ||
            "Ürünler yüklenirken bir hata oluştu",
        ),
      );
    }
  };

// Thunk action for loading more products (infinite scroll)
export const loadMoreProducts =
  (params = {}) =>
  async (dispatch, getState) => {
    try {
      const { products } = getState();

      // If already loading more or no more products to load, return
      if (products.loadingMore || !products.hasMore) {
        return;
      }

      dispatch(loadMoreProductsStart());

      // Query parametrelerini hazırla
      const queryParams = new URLSearchParams();

      if (params.categoryId) {
        queryParams.append("category", params.categoryId);
      }
      if (params.limit) {
        queryParams.append("limit", params.limit);
      }
      if (params.offset) {
        queryParams.append("offset", params.offset);
      }
      if (params.filter) {
        queryParams.append("filter", params.filter);
      }
      if (params.sort) {
        queryParams.append("sort", params.sort);
      }

      const url = `/products${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

      const response = await api.get(url);

      dispatch(loadMoreProductsSuccess(response.data));

      // Check if there are more products to load
      const hasMore = response.data.products.length === params.limit;
      dispatch(setHasMore(hasMore));
    } catch (error) {
      console.error("Daha fazla ürün yüklenirken hata oluştu:", error);
      dispatch(
        loadMoreProductsError(
          error.response?.data?.message ||
            "Daha fazla ürün yüklenirken bir hata oluştu",
        ),
      );
    }
  };
