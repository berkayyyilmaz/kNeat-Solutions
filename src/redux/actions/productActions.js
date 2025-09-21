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
  FETCH_BESTSELLERS_START,
  FETCH_BESTSELLERS_SUCCESS,
  FETCH_BESTSELLERS_ERROR,
} from "../actionTypes/productTypes";
// API servisleri artık thunk extraArgument ile inject ediliyor
import { PAGINATION } from "../../constants";
import {
  defaultCatchHandler,
  ErrorContextMessages,
} from "../../utils/errorHandler";
import { DataTransformers } from "../../models/dataModels";
import { ProductFactory, CategoryFactory } from "../../models/dataFactories";
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
export const fetchCategories =
  () =>
  async (dispatch, getState, { productApiService }) => {
    const { categories } = getState().products;

    // Eğer kategoriler zaten yüklenmişse, tekrar API çağrısı yapma
    if (categories.length > 0) return;

    try {
      dispatch(fetchCategoriesStart());
      const data = await productApiService.getCategories();

      //  Centralized data transformation
      const normalizedData = DataTransformers.normalizeApiResponse(data);
      const categoryModels =
        CategoryFactory.fromApiResponseList(normalizedData);

      dispatch(fetchCategoriesSuccess(categoryModels));
    } catch (error) {
      //  Ortak error handler kullan
      const errorMessage = defaultCatchHandler(error, "CATEGORY_FETCH");
      dispatch(fetchCategoriesError(errorMessage));
    }
  };

// LSP-compliant thunk action for fetching products
export const fetchProducts =
  (params = {}) =>
  async (dispatch, getState, extra) => {
    const strategy = new FetchProductsStrategy();
    return strategy.execute(dispatch, getState, params, extra);
  };

// LSP-compliant thunk action for loading more products (infinite scroll)
export const loadMoreProducts =
  (params = {}) =>
  async (dispatch, getState, extra) => {
    const strategy = new LoadMoreProductsStrategy();
    return strategy.execute(dispatch, getState, params, extra);
  };

// Thunk action for fetching product detail
export const fetchProductDetail =
  (productId) =>
  async (dispatch, _getState, { productApiService }) => {
    try {
      dispatch(fetchProductDetailStart());
      const data = await productApiService.getProductById(productId);

      //  Centralized data transformation
      const normalizedData = DataTransformers.normalizeApiResponse(data);
      const productModel = ProductFactory.fromApiResponse(normalizedData);

      dispatch(fetchProductDetailSuccess(productModel));
    } catch (error) {
      //  Ortak error handler kullan
      const errorMessage = defaultCatchHandler(error, "PRODUCT_DETAIL");
      dispatch(fetchProductDetailError(errorMessage));
    }
  };

// Thunk action for fetching bestseller products
export const fetchBestSellers =
  () =>
  async (dispatch, _getState, { productApiService }) => {
    try {
      dispatch({ type: FETCH_BESTSELLERS_START });

      // API'den daha geniş limit ile ürün çek
      const data = await productApiService.getProducts({
        limit: PAGINATION.BESTSELLER_FETCH_LIMIT,
      });

      // En çok satanları seç, skorla ve üst N'i al
      const bestProducts = (data.products || [])
        .filter((p) => (p?.sell_count ?? 0) > 0)
        .sort((a, b) => (b.sell_count ?? 0) - (a.sell_count ?? 0))
        .slice(0, PAGINATION.BESTSELLER_DISPLAY_COUNT);

      // Domain model'e dönüştür
      const transformed = bestProducts.map((p) =>
        ProductFactory.fromApiResponse(p),
      );

      dispatch({ type: FETCH_BESTSELLERS_SUCCESS, payload: transformed });
    } catch (error) {
      const errorMessage = defaultCatchHandler(error, "BESTSELLERS_FETCH");
      dispatch({ type: FETCH_BESTSELLERS_ERROR, payload: errorMessage });
    }
  };
