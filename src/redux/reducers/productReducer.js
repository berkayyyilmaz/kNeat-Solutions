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
} from "../actionTypes/productTypes";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED",
  categoriesLoading: false,
  categoriesError: null,
  productsLoading: false,
  productsError: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case FETCH_CATEGORIES_START:
      return {
        ...state,
        categoriesLoading: true,
        categoriesError: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        categoriesLoading: false,
        categoriesError: null,
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        categoriesLoading: false,
        categoriesError: action.payload,
      };
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        productsLoading: true,
        productsError: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload.products,
        total: action.payload.total,
        productsLoading: false,
        productsError: null,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
