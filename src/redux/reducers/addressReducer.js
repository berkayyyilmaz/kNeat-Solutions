import {
  GET_ADDRESSES_START,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,
  ADD_ADDRESS_START,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  UPDATE_ADDRESS_START,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  DELETE_ADDRESS_START,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
} from "../actionTypes/addressTypes";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES_START:
    case ADD_ADDRESS_START:
    case UPDATE_ADDRESS_START:
    case DELETE_ADDRESS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        loading: false,
        error: null,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address.id === action.payload.id ? action.payload : address,
        ),
        loading: false,
        error: null,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload,
        ),
        loading: false,
        error: null,
      };
    case GET_ADDRESSES_FAIL:
    case ADD_ADDRESS_FAIL:
    case UPDATE_ADDRESS_FAIL:
    case DELETE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
