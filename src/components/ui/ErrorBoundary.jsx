/**
 * React Error Boundary Component
 * JavaScript hataları yakalayıp kullanıcı dostu hata sayfası gösterir
 */

import React from "react";
import { RefreshCw, AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { ErrorBoundaryHelper } from "../../utils/errorHandler";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    const formattedError = ErrorBoundaryHelper.formatBoundaryError(
      error,
      errorInfo,
    );

    this.setState({
      error: formattedError,
      errorInfo,
    });

    // Report to error monitoring service if available
    if (this.props.onError) {
      this.props.onError(error, errorInfo, formattedError);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.handleGoHome();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI passed as prop
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.handleRetry,
          this.state.errorId,
        );
      }

      // Default error UI
      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
          onGoBack={this.handleGoBack}
          showTechnicalDetails={this.props.showTechnicalDetails}
          variant={this.props.variant}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Default Error Boundary Fallback UI
 */
const ErrorBoundaryFallback = ({
  error,
  errorId,
  onRetry,
  onReload,
  onGoHome,
  onGoBack,
  showTechnicalDetails = false,
  variant = "full",
}) => {
  const recoverySuggestions = ErrorBoundaryHelper.getRecoverySuggestions();

  if (variant === "minimal") {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold text-red-800">
            {error?.title || "Bir hata oluştu"}
          </h3>
          <p className="mb-4 text-sm text-red-600">
            {error?.message || "Bu bölüm şu anda çalışmıyor"}
          </p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Icon */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {error?.title || "Oops! Bir şeyler ters gitti"}
          </h1>
          <p className="mb-6 text-gray-600">
            {error?.message ||
              "Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin."}
          </p>
        </div>

        {/* Technical Details (Development Only) */}
        {showTechnicalDetails && error?.technical && (
          <div className="mb-6 rounded-lg bg-gray-100 p-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-700">
              Teknik Detaylar:
            </h4>
            <code className="text-xs text-gray-600">{error.technical}</code>
            {errorId && (
              <p className="mt-2 text-xs text-gray-500">Error ID: {errorId}</p>
            )}
          </div>
        )}

        {/* Recovery Suggestions */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Çözüm önerileri:
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {recoverySuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="hover:bg-primary-dark flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white"
          >
            <RefreshCw size={16} />
            Tekrar Dene
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onReload}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw size={14} />
              Sayfayı Yenile
            </button>
            <button
              onClick={onGoBack}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft size={14} />
              Geri Dön
            </button>
          </div>

          <button
            onClick={onGoHome}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Home size={16} />
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Higher-Order Component (HOC) for Error Boundary
 * Component'leri otomatik olarak error boundary ile sarar
 */
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

/**
 * Hook for Error Boundary
 * Component'lerde programmatik olarak error fırlatmak için
 */
export const useErrorHandler = () => {
  return (error, errorInfo) => {
    throw error;
  };
};

export default ErrorBoundary;
