// Production-ready logging utility
// Development'ta console'a log yapar, production'da log sistemine gönderir

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
    this.isProduction = process.env.NODE_ENV === "production";
    // Konsol loglarını env ile aç/kapa: VITE_LOGGER_CONSOLE=false ise kapalı
    let envConsoleFlag = true;
    try {
      const raw =
        typeof import.meta !== "undefined" && import.meta.env
          ? import.meta.env.VITE_LOGGER_CONSOLE
          : undefined;
      const normalized = String(raw ?? "true").toLowerCase();
      envConsoleFlag = !["false", "0", "off", "no"].includes(normalized);
    } catch (_) {
      envConsoleFlag = true;
    }
    this.consoleEnabled = this.isDevelopment && envConsoleFlag;
  }

  // Log levels
  static LEVELS = {
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
  };

  // Format log message with timestamp and context
  formatMessage(level, message, context = {}) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
  }

  // Log to console in development
  logToConsole(level, formattedMessage) {
    if (!this.isDevelopment) return;
    if (!this.consoleEnabled) return;

    const { timestamp, message, context } = formattedMessage;
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case Logger.LEVELS.ERROR:
        console.error(prefix, message, context);
        break;
      case Logger.LEVELS.WARN:
        console.warn(prefix, message, context);
        break;
      case Logger.LEVELS.INFO:
        console.info(prefix, message, context);
        break;
      case Logger.LEVELS.DEBUG:
        console.log(prefix, message, context);
        break;
      default:
        console.log(prefix, message, context);
    }
  }

  // Aç/Kapa kontrolleri (runtime)
  enableConsole() {
    this.consoleEnabled = true;
  }

  disableConsole() {
    this.consoleEnabled = false;
  }

  setConsoleEnabled(enabled) {
    this.consoleEnabled = !!enabled;
  }

  // Send to external logging service in production
  sendToLoggingService(formattedMessage) {
    if (!this.isProduction) return;

    // Production'da gerçek logging service'e gönderilir
    // Örnek: Sentry, LogRocket, Datadog, CloudWatch vs.
    try {
      // Example: await fetch('/api/logs', { method: 'POST', body: JSON.stringify(formattedMessage) });
      // Example: Sentry.captureMessage(formattedMessage.message, formattedMessage.level);
    } catch (error) {
      // Logging service'e gönderilemezse bile uygulama çalışmaya devam etmeli
      // Silent fail - kritik değil
    }
  }

  // Generic log method
  log(level, message, context = {}) {
    const formattedMessage = this.formatMessage(level, message, context);

    this.logToConsole(level, formattedMessage);
    this.sendToLoggingService(formattedMessage);
  }

  // Convenience methods
  error(message, context = {}) {
    this.log(Logger.LEVELS.ERROR, message, context);
  }

  warn(message, context = {}) {
    this.log(Logger.LEVELS.WARN, message, context);
  }

  info(message, context = {}) {
    this.log(Logger.LEVELS.INFO, message, context);
  }

  debug(message, context = {}) {
    this.log(Logger.LEVELS.DEBUG, message, context);
  }

  // API specific logging methods
  apiRequest(method, url, data = {}) {
    this.debug(`API Request: ${method} ${url}`, { method, url, data });
  }

  apiResponse(method, url, status, data = {}) {
    const level = status >= 400 ? Logger.LEVELS.ERROR : Logger.LEVELS.DEBUG;
    this.log(level, `API Response: ${method} ${url} - ${status}`, {
      method,
      url,
      status,
      data,
    });
  }

  apiError(method, url, error) {
    this.error(`API Error: ${method} ${url}`, {
      method,
      url,
      error: error.message,
      stack: error.stack,
    });
  }

  // User action logging
  userAction(action, data = {}) {
    this.info(`User Action: ${action}`, { action, ...data });
  }

  // Performance logging
  performance(operation, duration, data = {}) {
    this.info(`Performance: ${operation} took ${duration}ms`, {
      operation,
      duration,
      ...data,
    });
  }
}

// Singleton instance
const logger = new Logger();

export default logger;
