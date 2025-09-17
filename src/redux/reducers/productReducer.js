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
  loadingMore: false,
  loadMoreError: null,
  hasMore: true,
  // Product detail state
  currentProduct: null,
  productDetailLoading: false,
  productDetailError: null,
};

// Action Handler Map - OCP'ye uygun: yeni action type'lar eklemek için switch'i değiştirmek gerekmez
const actionHandlers = {
  [SET_CATEGORIES]: (state, action) => ({
    ...state,
    categories: action.payload,
  }),

  [SET_PRODUCT_LIST]: (state, action) => ({
    ...state,
    productList: action.payload,
  }),

  [SET_TOTAL]: (state, action) => ({
    ...state,
    total: action.payload,
  }),

  [SET_FETCH_STATE]: (state, action) => ({
    ...state,
    fetchState: action.payload,
  }),

  [SET_LIMIT]: (state, action) => ({
    ...state,
    limit: action.payload,
  }),

  [SET_OFFSET]: (state, action) => ({
    ...state,
    offset: action.payload,
  }),

  [SET_FILTER]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [SET_HAS_MORE]: (state, action) => ({
    ...state,
    hasMore: action.payload,
  }),

  [RESET_PRODUCTS]: (state) => ({
    ...state,
    productList: [],
    offset: 0,
    hasMore: true,
    loadMoreError: null,
  }),

  [FETCH_CATEGORIES_START]: (state) => ({
    ...state,
    categoriesLoading: true,
    categoriesError: null,
  }),

  [FETCH_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    categories: action.payload,
    categoriesLoading: false,
    categoriesError: null,
  }),

  [FETCH_CATEGORIES_ERROR]: (state, action) => ({
    ...state,
    categoriesLoading: false,
    categoriesError: action.payload,
  }),

  [FETCH_PRODUCTS_START]: (state) => ({
    ...state,
    productsLoading: true,
    productsError: null,
  }),

  [FETCH_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    productList: action.payload.products || [],
    total: action.payload.total || 0,
    productsLoading: false,
    productsError: null,
  }),

  [FETCH_PRODUCTS_ERROR]: (state, action) => ({
    ...state,
    productsLoading: false,
    productsError: action.payload,
  }),

  [LOAD_MORE_PRODUCTS_START]: (state) => ({
    ...state,
    loadingMore: true,
    loadMoreError: null,
  }),

  [LOAD_MORE_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    productList: [...state.productList, ...(action.payload.products || [])],
    total: action.payload.total || state.total,
    loadingMore: false,
    loadMoreError: null,
    offset: state.offset + (action.payload.products?.length || 0),
  }),

  [LOAD_MORE_PRODUCTS_ERROR]: (state, action) => ({
    ...state,
    loadingMore: false,
    loadMoreError: action.payload,
  }),

  [FETCH_PRODUCT_DETAIL_START]: (state) => ({
    ...state,
    productDetailLoading: true,
    productDetailError: null,
  }),

  [FETCH_PRODUCT_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    currentProduct: action.payload,
    productDetailLoading: false,
    productDetailError: null,
  }),

  [FETCH_PRODUCT_DETAIL_ERROR]: (state, action) => ({
    ...state,
    productDetailLoading: false,
    productDetailError: action.payload,
  }),

  [SET_CURRENT_PRODUCT]: (state, action) => ({
    ...state,
    currentProduct: action.payload,
  }),
};

// Register new action handler - OCP için yeni handler'lar dinamik olarak eklenebilir
export const registerActionHandler = (actionType, handler) => {
  actionHandlers[actionType] = handler;
};

const productReducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export default productReducer;
