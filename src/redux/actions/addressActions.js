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

export const getAddresses =
  () =>
  async (dispatch, getState, { addressApiService }) => {
    dispatch({ type: GET_ADDRESSES_START });
    try {
      const response = await addressApiService.getAddresses();
      dispatch({ type: GET_ADDRESSES_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: GET_ADDRESSES_FAIL, payload: error.message });
    }
  };

export const addAddress =
  (addressData) =>
  async (dispatch, getState, { addressApiService }) => {
    dispatch({ type: ADD_ADDRESS_START });
    try {
      const response = await addressApiService.addAddress(addressData);
      dispatch({ type: ADD_ADDRESS_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: ADD_ADDRESS_FAIL, payload: error.message });
    }
  };

export const updateAddress =
  (addressData) =>
  async (dispatch, getState, { addressApiService }) => {
    dispatch({ type: UPDATE_ADDRESS_START });
    try {
      const response = await addressApiService.updateAddress(addressData);
      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: UPDATE_ADDRESS_FAIL, payload: error.message });
    }
  };

export const deleteAddress =
  (addressId) =>
  async (dispatch, getState, { addressApiService }) => {
    dispatch({ type: DELETE_ADDRESS_START });
    try {
      await addressApiService.deleteAddress(addressId);
      dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
    } catch (error) {
      dispatch({ type: DELETE_ADDRESS_FAIL, payload: error.message });
    }
  };
