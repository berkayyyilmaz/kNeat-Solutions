import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

// Import reducers
import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import roleReducer from "./reducers/roleReducer";

// Combine reducers
const rootReducer = combineReducers({
  client: clientReducer,
  products: productReducer,
  shoppingCart: shoppingCartReducer,
  role: roleReducer,
});

// Middleware
const logger = createLogger();

// Store
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
