import { logAndConsoleError, ApiErrorHandler } from "../../utils/errorHandler";

// Base Product Fetching Strategy - LSP'ye uygun common interface
class BaseProductFetchingStrategy {
  constructor() {
    if (new.target === BaseProductFetchingStrategy) {
      throw new Error(
        "BaseProductFetchingStrategy cannot be instantiated directly",
      );
    }
  }

  // Template method - tüm subclass'lar aynı akışı takip eder
  async execute(dispatch, getState, params = {}, { productApiService } = {}) {
    try {
      // Pre-fetch validation (subclass'lar override edebilir)
      if (!this.validateFetch(getState, params)) {
        return;
      }

      // Start action dispatch
      dispatch(this.getStartAction());

      // Fetch data using domain service
      const data = await productApiService.getProducts(params);

      // Process and dispatch success
      const processedData = this.processResponse(data);
      dispatch(this.getSuccessAction(processedData));

      // Post-fetch operations (hasMore check, etc.)
      this.postFetchOperations(dispatch, data, params);
    } catch (error) {
      //  Ortak error handler kullan
      logAndConsoleError(this.getErrorMessage(), error, "PRODUCT_FETCHING");

      const errorMessage = ApiErrorHandler.extractMessage(
        error,
        this.getDefaultErrorMessage(),
      );

      dispatch(this.getErrorAction(errorMessage));
    }
  }

  // Abstract methods - subclass'lar implement etmeli
  validateFetch(getState, params) {
    throw new Error("validateFetch must be implemented by subclass");
  }

  getStartAction() {
    throw new Error("getStartAction must be implemented by subclass");
  }

  getSuccessAction(data) {
    throw new Error("getSuccessAction must be implemented by subclass");
  }

  getErrorAction(error) {
    throw new Error("getErrorAction must be implemented by subclass");
  }

  processResponse(data) {
    throw new Error("processResponse must be implemented by subclass");
  }

  postFetchOperations(dispatch, data, params) {
    throw new Error("postFetchOperations must be implemented by subclass");
  }

  getErrorMessage() {
    throw new Error("getErrorMessage must be implemented by subclass");
  }

  getDefaultErrorMessage() {
    throw new Error("getDefaultErrorMessage must be implemented by subclass");
  }
}

export default BaseProductFetchingStrategy;
