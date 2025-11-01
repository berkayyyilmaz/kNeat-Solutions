import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import {
  productApiService,
  userApiService,
  addressApiService,
} from "../services/api";

// Import reducers
import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import roleReducer from "./reducers/roleReducer";
import addressReducer from "./reducers/addressReducer";

// Combine reducers
const rootReducer = combineReducers({
  client: clientReducer,
  products: productReducer,
  shoppingCart: shoppingCartReducer,
  role: roleReducer,
  address: addressReducer,
});

// Middleware
// redux-logger'i env'e göre koşullu ekle
const logger = createLogger({
  predicate: () => {
    try {
      const raw =
        typeof import.meta !== "undefined" && import.meta.env
          ? import.meta.env.VITE_REDUX_LOGGER
          : undefined;
      const normalized = String(raw ?? "false").toLowerCase();
      const enabled = !["false", "0", "off", "no", ""].includes(normalized);
      return enabled;
    } catch (_) {
      return false;
    }
  },
});

// Store
// Custom thunk middleware: function action'ları (thunk) destekler ve extra argüman enjekte eder
const injectedThunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, {
        productApiService,
        userApiService,
        addressApiService,
      });
    }
    return next(action);
  };

const middlewares = [injectedThunk];
if (logger) {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
