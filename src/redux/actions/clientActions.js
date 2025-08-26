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

// Login Thunk Action - AYNI KALIYOR, HİÇBİR DEĞİŞİKLİK YOK
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

// YENİ: Verify Token Action - sadece token doğrulamak için
export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("Token bulunamadı");
    }

    const response = await api.get("/verify", {
      headers: {
        Authorization: token,
      },
    });

    if (response.data.name && response.data.email && response.data.token) {
      // Yeni token'ı güncelle
      const newToken = response.data.token;
      localStorage.setItem("userToken", newToken);

      // API headers'ı güncelle
      api.defaults.headers.Authorization = newToken;

      const userData = {
        name: response.data.name,
        email: response.data.email,
        role_id: response.data.role_id,
        token: newToken,
      };

      dispatch(setUser(userData));
      return userData;
    } else {
      throw new Error("Geçersiz token yanıtı");
    }
  } catch (error) {
    // Token geçersizse localStorage'dan temizle
    localStorage.removeItem("userToken");
    api.defaults.headers.Authorization = "";
    dispatch(setUser(null));
    throw error;
  }
};

// YENİ: Logout Action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userToken");
  api.defaults.headers.Authorization = "";
  dispatch(setUser(null));
};
