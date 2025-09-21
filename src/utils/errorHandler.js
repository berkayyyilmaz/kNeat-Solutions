/**
 * Error Handling Utilities
 * Tüm projede tutarlı error handling için ortak utility'ler
 */

import { toast } from "react-toastify";
import logger from "./logger";

/**
 * API Error Handler
 * API response error'larını standardize eder
 */
export class ApiErrorHandler {
  /**
   * API error'dan mesaj çıkarır
   * @param {Error} error - API'den gelen error
   * @param {string} fallbackMessage - Default error mesajı
   * @returns {string} - Formatlanmış error mesajı
   */
  static extractMessage(error, fallbackMessage = "Bir hata oluştu") {
    // Network/custom Error vs Axios response ayrımı
    if (!error?.response) {
      const rawMessage = error?.message || "";
      const lower = rawMessage.toLowerCase();
      const isNetworkIssue =
        lower.includes("network error") ||
        lower.includes("failed to fetch") ||
        lower.includes("ecconnaborted") ||
        lower.includes("timeout") ||
        lower.includes("network request failed");

      // Gerçek ağ problemlerinde bağlantı mesajı göster
      if (isNetworkIssue) {
        return "İnternet bağlantınızı kontrol edin";
      }

      // Uygulama içinde üretilmiş anlamlı hata mesajını koru
      if (rawMessage) {
        return rawMessage;
      }

      // Başka bir bilgi yoksa fallback dön
      return fallbackMessage;
    }

    // API response error message
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (typeof error.response?.data === "string") {
      return error.response.data;
    }

    // HTTP status based messages
    const statusMessages = {
      400: "Geçersiz istek",
      401: "Yetkiniz bulunmuyor, lütfen giriş yapın",
      403: "Bu işlem için yetkiniz yok",
      404: "Aradığınız kaynak bulunamadı",
      422: "Gönderilen veriler geçersiz",
      429: "Çok fazla istek gönderildi, lütfen bekleyin",
      500: "Sunucu hatası, lütfen daha sonra tekrar deneyin",
      502: "Sunucu geçici olarak kullanılamıyor",
      503: "Servis geçici olarak kullanılamıyor",
    };

    return statusMessages[error.response.status] || fallbackMessage;
  }

  /**
   * Error'ı log'lar ve kullanıcıya gösterir
   * @param {Error} error - Hata objesi
   * @param {string} context - Hata context'i (login, product-fetch, etc.)
   * @param {string} fallbackMessage - Default mesaj
   * @param {Object} options - Ek seçenekler
   */
  static handle(error, context, fallbackMessage, options = {}) {
    const {
      showToast = true,
      logError = true,
      toastType = "error",
      toastOptions = {},
    } = options;

    // Error mesajını çıkar
    const errorMessage = this.extractMessage(error, fallbackMessage);

    // Log the error
    if (logError) {
      logger.error(`Error in ${context}`, {
        message: errorMessage,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
      });
    }

    // Show toast notification
    if (showToast) {
      toast[toastType](errorMessage, {
        position: "top-right",
        autoClose: 5000,
        ...toastOptions,
      });
    }

    return errorMessage;
  }

  /**
   * Validation error'ları handle eder
   * @param {Error} error - Validation error
   * @param {Function} setErrors - Form setErrors function
   */
  static handleValidationErrors(error, setErrors) {
    if (error.response?.status === 422 && error.response?.data?.errors) {
      const validationErrors = error.response.data.errors;

      // React Hook Form format'ına çevir
      const formErrors = {};
      Object.keys(validationErrors).forEach((field) => {
        formErrors[field] = {
          type: "server",
          message: validationErrors[field][0] || "Geçersiz değer",
        };
      });

      setErrors(formErrors);
      return true;
    }
    return false;
  }
}

/**
 * Async Operations Error Handler
 * Try-catch wrapper'ları için
 */
export class AsyncErrorHandler {
  /**
   * Async function'ı wrap eder ve error handling ekler
   * @param {Function} asyncFunction - Async function
   * @param {string} context - Context bilgisi
   * @param {Object} options - Seçenekler
   */
  static async execute(asyncFunction, context, options = {}) {
    const {
      fallbackMessage = "İşlem sırasında hata oluştu",
      onError = null,
      onSuccess = null,
      showSuccessToast = false,
      successMessage = "İşlem başarılı",
    } = options;

    try {
      const result = await asyncFunction();

      if (showSuccessToast) {
        toast.success(successMessage);
      }

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (error) {
      const errorMessage = ApiErrorHandler.handle(
        error,
        context,
        fallbackMessage,
        options,
      );

      if (onError) {
        onError(error, errorMessage);
      }

      // Re-throw the error if needed for further handling
      throw error;
    }
  }

  /**
   * State management ile async operation wrapper
   * @param {Function} asyncFunction - Async function
   * @param {Object} stateHandlers - State setter functions
   * @param {string} context - Context bilgisi
   * @param {Object} options - Seçenekler
   */
  static async executeWithState(
    asyncFunction,
    stateHandlers,
    context,
    options = {},
  ) {
    const {
      setLoading,
      setError,
      setSuccess,
      clearError = true,
    } = stateHandlers;

    const {
      fallbackMessage = "İşlem sırasında hata oluştu",
      successMessage = null,
    } = options;

    try {
      // Clear previous errors
      if (clearError && setError) {
        setError("");
      }

      // Set loading state
      if (setLoading) {
        setLoading(true);
      }

      // Execute async function
      const result = await asyncFunction();

      // Set success state
      if (setSuccess && successMessage) {
        setSuccess(successMessage);
      }

      return result;
    } catch (error) {
      // Handle error
      const errorMessage = ApiErrorHandler.extractMessage(
        error,
        fallbackMessage,
      );

      if (setError) {
        setError(errorMessage);
      }

      // Log error
      logger.error(`Error in ${context}`, {
        message: errorMessage,
        error: error.message,
        stack: error.stack,
      });

      throw error;
    } finally {
      // Clear loading state
      if (setLoading) {
        setLoading(false);
      }
    }
  }
}

/**
 * React Error Boundary Helper
 * Error boundary component'leri için utility'ler
 */
export class ErrorBoundaryHelper {
  /**
   * Error boundary'de gösterilecek mesajı format'lar
   * @param {Error} error - React error
   * @param {Object} errorInfo - Error info from React
   */
  static formatBoundaryError(error, errorInfo) {
    logger.error("React Error Boundary caught an error", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    return {
      title: "Oops! Bir şeyler ters gitti",
      message: "Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.",
      technical: process.env.NODE_ENV === "development" ? error.message : null,
    };
  }

  /**
   * Error boundary recovery suggestions
   */
  static getRecoverySuggestions() {
    return [
      "Sayfayı yenileyin (F5)",
      "Tarayıcı cache'ini temizleyin",
      "İnternet bağlantınızı kontrol edin",
      "Daha sonra tekrar deneyin",
    ];
  }
}

/**
 * Centralized Error Types
 * Proje genelinde kullanılacak error türleri
 */
export const ErrorTypes = {
  // Authentication errors
  AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_ACCESS_DENIED: "AUTH_ACCESS_DENIED",

  // API errors
  API_NETWORK_ERROR: "API_NETWORK_ERROR",
  API_SERVER_ERROR: "API_SERVER_ERROR",
  API_VALIDATION_ERROR: "API_VALIDATION_ERROR",

  // Product errors
  PRODUCT_NOT_FOUND: "PRODUCT_NOT_FOUND",
  PRODUCT_LOAD_ERROR: "PRODUCT_LOAD_ERROR",
  CATEGORY_LOAD_ERROR: "CATEGORY_LOAD_ERROR",

  // Form errors
  FORM_VALIDATION_ERROR: "FORM_VALIDATION_ERROR",
  FORM_SUBMISSION_ERROR: "FORM_SUBMISSION_ERROR",

  // Generic errors
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  PERMISSION_DENIED: "PERMISSION_DENIED",
};

/**
 * Error Context Messages
 * Context'e göre özelleştirilmiş mesajlar
 */
export const ErrorContextMessages = {
  LOGIN: "Giriş yaparken hata oluştu",
  SIGNUP: "Kayıt olurken hata oluştu",
  PRODUCT_FETCH: "Ürünler yüklenirken hata oluştu",
  PRODUCT_DETAIL: "Ürün detayı yüklenirken hata oluştu",
  CATEGORY_FETCH: "Kategoriler yüklenirken hata oluştu",
  ROLE_FETCH: "Roller yüklenirken hata oluştu",
  TOKEN_VERIFICATION: "Oturum doğrulanırken hata oluştu",
  FORM_SUBMISSION: "Form gönderilirken hata oluştu",
};

/**
 * Quick helper functions
 * Sık kullanılan işlemler için kısa yollar
 */

/**
 * Standard API error handler
 * En sık kullanılan pattern için shortcut
 */
export const handleApiError = (error, context, fallbackMessage) => {
  return ApiErrorHandler.handle(error, context, fallbackMessage);
};

/**
 * Console error wrapper
 * Console.error ile birlikte logging
 */
export const logAndConsoleError = (message, error, context = "") => {
  logger.error(message, {
    error: error.message,
    stack: error.stack,
    context,
  });
};

/**
 * Default error handler for catch blocks
 * En temel catch block pattern'ı
 */
export const defaultCatchHandler = (error, context) => {
  logger.error(`Error in ${context}`, {
    message: error.message,
    stack: error.stack,
  });

  const errorMessage = ApiErrorHandler.extractMessage(
    error,
    ErrorContextMessages[context.toUpperCase()] || "Bir hata oluştu",
  );

  toast.error(errorMessage);
  return errorMessage;
};

export default {
  ApiErrorHandler,
  AsyncErrorHandler,
  ErrorBoundaryHelper,
  ErrorTypes,
  ErrorContextMessages,
  handleApiError,
  logAndConsoleError,
  defaultCatchHandler,
};
