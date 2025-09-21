import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
} from "../actionTypes/clientTypes";
import api from "../../services/api";
import SecureStorage from "../../utils/secureStorage";
import logger from "../../utils/logger";
import {
  ApiErrorHandler,
  ErrorContextMessages,
} from "../../utils/errorHandler";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

//  Güvenli Login Action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    logger.info("Login attempt started", { email: credentials.email });

    const response = await api.post("/login", credentials);

    if (!response.data.token) {
      throw new Error("Token alınamadı");
    }

    const { token, refreshToken, ...userInfo } = response.data;

    //  Token'ı güvenli storage'a kaydet
    SecureStorage.setToken(
      token,
      credentials.rememberMe || false,
      refreshToken,
    );

    //  API header'ını güncelle
    api.defaults.headers.Authorization = `Bearer ${token}`;

    //  User data'sını Redux'a kaydet (token olmadan!)
    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      role_id: userInfo.role_id,
      isAuthenticated: true,
    };

    dispatch(setUser(userData));

    logger.info("Login successful", {
      email: userInfo.email,
      hasRememberMe: credentials.rememberMe,
    });

    return userInfo;
  } catch (error) {
    logger.error("Login failed", {
      error: error.message,
      email: credentials.email,
    });

    //  Hata durumunda token'ları temizle
    SecureStorage.clearToken();

    //  Ortak error handler kullan
    const errorMessage = ApiErrorHandler.extractMessage(
      error,
      ErrorContextMessages.LOGIN,
    );
    throw new Error(errorMessage);
  }
};

//  Güvenli Token Verification Action
export const verifyToken = () => async (dispatch) => {
  try {
    //  Güvenli storage'dan token al
    const token = SecureStorage.getToken();

    if (!token) {
      throw new Error("Token bulunamadı");
    }

    logger.info("Token verification started");

    const response = await api.get("/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.name && response.data.email) {
      //  Yeni token varsa güvenli storage'a kaydet
      if (response.data.token) {
        const { token: newToken, refreshToken, ...userInfo } = response.data;

        SecureStorage.setToken(
          newToken,
          SecureStorage.getRemainingTime() > 24 * 60 * 60 * 1000, // >24h ise rememberMe
          refreshToken,
        );

        //  API header'ını güncelle
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
      }

      //  User data'sını Redux'a kaydet (token olmadan!)
      const userData = {
        name: response.data.name,
        email: response.data.email,
        role_id: response.data.role_id,
        isAuthenticated: true,
      };

      dispatch(setUser(userData));

      logger.info("Token verification successful", {
        email: response.data.email,
      });

      return userData;
    } else {
      throw new Error("Geçersiz token yanıtı");
    }
  } catch (error) {
    logger.warn("Token verification failed", { error: error.message });

    //  Token geçersizse güvenli storage'dan temizle
    SecureStorage.clearToken();
    api.defaults.headers.Authorization = "";
    dispatch(setUser(null));

    throw error;
  }
};

//  Güvenli Logout Action
export const logoutUser = () => (dispatch) => {
  try {
    logger.info("Logout initiated");

    //  Güvenli storage'dan token'ları temizle
    SecureStorage.clearToken();

    //  API header'ını temizle
    api.defaults.headers.Authorization = "";

    //  Redux state'i temizle
    dispatch(setUser(null));

    logger.info("Logout successful");
  } catch (error) {
    logger.error("Logout error", { error: error.message });

    // Hata olsa bile state'i temizle
    dispatch(setUser(null));
  }
};

//  Token Refresh Action (otomatik token yenileme)
export const refreshToken = () => async (dispatch) => {
  try {
    const refreshToken = SecureStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token bulunamadı");
    }

    logger.info("Token refresh started");

    const response = await api.post("/refresh", {
      refreshToken,
    });

    if (response.data.token) {
      const {
        token: newToken,
        refreshToken: newRefreshToken,
        ...userInfo
      } = response.data;

      //  Yeni token'ları güvenli storage'a kaydet
      SecureStorage.setToken(
        newToken,
        SecureStorage.getRemainingTime() > 24 * 60 * 60 * 1000,
        newRefreshToken,
      );

      //  API header'ını güncelle
      api.defaults.headers.Authorization = `Bearer ${newToken}`;

      logger.info("Token refresh successful");

      return newToken;
    } else {
      throw new Error("Token refresh başarısız");
    }
  } catch (error) {
    logger.error("Token refresh failed", { error: error.message });

    //  Refresh başarısızsa logout yap
    dispatch(logoutUser());

    throw error;
  }
};

//  Auto Token Refresh Setup (otomatik token yenileme)
let tokenRefreshTimer = null;

export const setupAutoTokenRefresh = () => (dispatch) => {
  //  Önceki timer'ı temizle
  if (tokenRefreshTimer) {
    clearTimeout(tokenRefreshTimer);
  }

  //  Yeni refresh timer'ı schedule et
  tokenRefreshTimer = SecureStorage.scheduleRefresh(() => {
    dispatch(refreshToken()).catch(() => {
      // Refresh başarısızsa logout
      dispatch(logoutUser());
    });
  });

  logger.info("Auto token refresh scheduled");
};
