import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
} from "../actionTypes/clientTypes";
import api from "../../services/api";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

// Login Thunk Action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await api.post("/login", credentials);
    const userData = {
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.role_id,
      token: response.data.token,
    };
    dispatch(setUser(userData));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Giriş işlemi başarısız";
    throw error;
  }
};
