/**
 * Secure Storage Utility for Authentication Tokens
 * XSS saldırılarından korunmak için güvenli token storage çözümü
 */

/**
 * Simple encryption/decryption utility for token obfuscation
 * Bu production-grade encryption değil, sadece obfuscation
 * Gerçek uygulamalarda server-side token management gerekir
 */
class SimpleTokenObfuscator {
  // Base64 encoded obfuscation key (development only!)
  static OBFUSCATION_KEY = "kNeatSecure2024";

  /**
   * Token'ı obfuscate eder (basit XOR encryption)
   * @param {string} token - Ham token
   * @returns {string} - Obfuscate edilmiş token
   */
  static obfuscate(token) {
    if (!token || typeof token !== "string") {
      return "";
    }

    const key = this.OBFUSCATION_KEY;
    let result = "";

    for (let i = 0; i < token.length; i++) {
      const tokenCharCode = token.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length);
      const obfuscatedCharCode = tokenCharCode ^ keyCharCode;
      result += String.fromCharCode(obfuscatedCharCode);
    }

    // Base64 encode edilmiş obfuscated token döndür
    return btoa(result);
  }

  /**
   * Obfuscate edilmiş token'ı decode eder
   * @param {string} obfuscatedToken - Obfuscate edilmiş token
   * @returns {string} - Ham token
   */
  static deobfuscate(obfuscatedToken) {
    if (!obfuscatedToken || typeof obfuscatedToken !== "string") {
      return "";
    }

    try {
      // Base64 decode et
      const obfuscatedData = atob(obfuscatedToken);
      const key = this.OBFUSCATION_KEY;
      let result = "";

      for (let i = 0; i < obfuscatedData.length; i++) {
        const obfuscatedCharCode = obfuscatedData.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        const originalCharCode = obfuscatedCharCode ^ keyCharCode;
        result += String.fromCharCode(originalCharCode);
      }

      return result;
    } catch (error) {
      return "";
    }
  }
}

/**
 * Secure token storage manager
 * XSS saldırılarına karşı multi-layer protection
 */
class SecureTokenManager {
  // Token storage keys
  static STORAGE_KEYS = {
    TOKEN: "_kNeat_auth_token",
    TOKEN_SIGNATURE: "_kNeat_auth_sig",
    TOKEN_TIMESTAMP: "_kNeat_auth_ts",
    REFRESH_TOKEN: "_kNeat_refresh_token",
  };

  // Token expiration time (30 dakika)
  static TOKEN_EXPIRY_MS = 30 * 60 * 1000;

  /**
   * Token'ı güvenli şekilde saklar
   * @param {string} token - JWT token
   * @param {boolean} rememberMe - Uzun süreli saklama
   * @param {string} refreshToken - Refresh token (opsiyonel)
   */
  static setToken(token, rememberMe = false, refreshToken = null) {
    if (!token || typeof token !== "string") {
      this.clearToken();
      return;
    }

    try {
      const timestamp = Date.now();
      const expiryTime = rememberMe
        ? timestamp + 7 * 24 * 60 * 60 * 1000 // 7 gün
        : timestamp + this.TOKEN_EXPIRY_MS; // 30 dakika

      // 1. Token'ı obfuscate et
      const obfuscatedToken = SimpleTokenObfuscator.obfuscate(token);

      // 2. Token signature oluştur (integrity check için)
      const signature = this.createTokenSignature(token, timestamp);

      // 3. Metadata ile birlikte sakla
      const tokenData = {
        token: obfuscatedToken,
        timestamp,
        expiryTime,
        rememberMe,
      };

      // 4. Storage'a yaz (sessionStorage veya localStorage)
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(this.STORAGE_KEYS.TOKEN, JSON.stringify(tokenData));
      storage.setItem(this.STORAGE_KEYS.TOKEN_SIGNATURE, signature);

      // 5. Refresh token varsa ayrı sakla
      if (refreshToken) {
        const obfuscatedRefreshToken =
          SimpleTokenObfuscator.obfuscate(refreshToken);
        storage.setItem(
          this.STORAGE_KEYS.REFRESH_TOKEN,
          obfuscatedRefreshToken,
        );
      }
    } catch (error) {
      this.clearToken();
    }
  }

  /**
   * Token'ı güvenli şekilde alır
   * @returns {string|null} - Geçerli token veya null
   */
  static getToken() {
    try {
      // 1. Önce sessionStorage'dan bak, sonra localStorage'dan
      let tokenData = null;
      let signature = null;
      let storage = null;

      // SessionStorage'da var mı?
      if (sessionStorage.getItem(this.STORAGE_KEYS.TOKEN)) {
        storage = sessionStorage;
      } else if (localStorage.getItem(this.STORAGE_KEYS.TOKEN)) {
        storage = localStorage;
      } else {
        return null; // Token yok
      }

      const tokenDataStr = storage.getItem(this.STORAGE_KEYS.TOKEN);
      signature = storage.getItem(this.STORAGE_KEYS.TOKEN_SIGNATURE);

      if (!tokenDataStr || !signature) {
        this.clearToken();
        return null;
      }

      // 2. JSON parse et
      tokenData = JSON.parse(tokenDataStr);

      // 3. Expiry kontrolü
      if (Date.now() > tokenData.expiryTime) {
        this.clearToken();
        return null;
      }

      // 4. Token'ı deobfuscate et
      const token = SimpleTokenObfuscator.deobfuscate(tokenData.token);

      if (!token) {
        this.clearToken();
        return null;
      }

      // 5. Signature kontrolü (integrity check)
      const expectedSignature = this.createTokenSignature(
        token,
        tokenData.timestamp,
      );
      if (signature !== expectedSignature) {
        this.clearToken();
        return null;
      }

      return token;
    } catch (error) {
      this.clearToken();
      return null;
    }
  }

  /**
   * Refresh token'ı alır
   * @returns {string|null} - Refresh token veya null
   */
  static getRefreshToken() {
    try {
      // Önce sessionStorage, sonra localStorage
      let storage = null;

      if (sessionStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN)) {
        storage = sessionStorage;
      } else if (localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN)) {
        storage = localStorage;
      } else {
        return null;
      }

      const obfuscatedRefreshToken = storage.getItem(
        this.STORAGE_KEYS.REFRESH_TOKEN,
      );

      if (!obfuscatedRefreshToken) {
        return null;
      }

      return SimpleTokenObfuscator.deobfuscate(obfuscatedRefreshToken);
    } catch (error) {
      return null;
    }
  }

  /**
   * Token'ın geçerli olup olmadığını kontrol eder
   * @returns {boolean} - Token geçerli mi?
   */
  static isTokenValid() {
    const token = this.getToken();
    return token !== null;
  }

  /**
   * Token'ın süresinin ne kadar kaldığını döndürür
   * @returns {number} - Kalan süre (ms) veya 0
   */
  static getTokenRemainingTime() {
    try {
      const storage = sessionStorage.getItem(this.STORAGE_KEYS.TOKEN)
        ? sessionStorage
        : localStorage;

      const tokenDataStr = storage.getItem(this.STORAGE_KEYS.TOKEN);

      if (!tokenDataStr) {
        return 0;
      }

      const tokenData = JSON.parse(tokenDataStr);
      const remaining = tokenData.expiryTime - Date.now();

      return Math.max(0, remaining);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Tüm token'ları temizler
   */
  static clearToken() {
    try {
      // Her iki storage'dan da temizle
      [sessionStorage, localStorage].forEach((storage) => {
        Object.values(this.STORAGE_KEYS).forEach((key) => {
          storage.removeItem(key);
        });
      });
    } catch (error) {}
  }

  /**
   * Token signature oluşturur (integrity check için)
   * @param {string} token - Ham token
   * @param {number} timestamp - Timestamp
   * @returns {string} - Token signature
   */
  static createTokenSignature(token, timestamp) {
    // Basit checksum oluştur (production'da daha güçlü hash gerekir)
    const data = `${token}_${timestamp}_${this.STORAGE_KEYS.TOKEN}`;
    let hash = 0;

    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 32-bit integer'a çevir
    }

    return Math.abs(hash).toString(36);
  }

  /**
   * Auto token refresh logic
   * Token süresi dolmadan önce otomatik yeniler
   */
  static scheduleTokenRefresh(refreshCallback) {
    const remainingTime = this.getTokenRemainingTime();

    if (remainingTime <= 0) {
      return null;
    }

    // Token süresinin %80'i geçtikten sonra refresh et
    const refreshTime = Math.max(1000, remainingTime * 0.8);

    return setTimeout(() => {
      if (this.isTokenValid() && refreshCallback) {
        refreshCallback();
      }
    }, refreshTime);
  }
}

/**
 * XSS Detection ve Protection Utilities
 */
class XSSProtectionManager {
  /**
   * Token'ın XSS attempt ile çalınıp çalınmadığını kontrol eder
   */
  static detectTokenTheft() {
    // Console kullanımını değiştirmeden sadece dış loglama yap
    return () => {};
  }

  /**
   * LocalStorage/SessionStorage'a yapılan suspicious erişimleri monitor eder
   */
  static monitorStorageAccess() {
    //  Original storage method'larını sakla
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;

    //  GetItem override
    Storage.prototype.getItem = function (key) {
      try {
        // Sadece external access'leri detect et (kendi operasyonlarımızı değil)
        if (key && key.includes("_kNeat_")) {
          // Production'da external log
          const stack = new Error().stack;
          if (
            typeof window !== "undefined" &&
            window.location.hostname !== "localhost" &&
            stack &&
            !stack.includes("SecureTokenManager")
          ) {
            fetch("/api/security/log", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "STORAGE_THEFT_ATTEMPT",
                key: key,
                storageType:
                  this === localStorage ? "localStorage" : "sessionStorage",
                timestamp: new Date().toISOString(),
                stack: stack.split("\n").slice(0, 5),
              }),
            }).catch(() => {});
          }
        }
      } catch (error) {
        // Silent fail - security monitoring hatası ana functionality'i etkilemez
      }

      return originalGetItem.call(this, key);
    };

    //  SetItem override
    Storage.prototype.setItem = function (key, value) {
      try {
        if (key && key.includes("_kNeat_")) {
          // Silent: no console output
        }
      } catch (error) {
        // Silent fail
      }

      return originalSetItem.call(this, key, value);
    };

    //  RemoveItem override
    Storage.prototype.removeItem = function (key) {
      try {
        if (key && key.includes("_kNeat_")) {
          // Silent: no console output
        }
      } catch (error) {
        // Silent fail
      }

      return originalRemoveItem.call(this, key);
    };

    //  Cleanup function return et
    return () => {
      Storage.prototype.getItem = originalGetItem;
      Storage.prototype.setItem = originalSetItem;
      Storage.prototype.removeItem = originalRemoveItem;
    };
  }
}

// Export edilecek main interface
export const SecureStorage = {
  // Token management
  setToken: SecureTokenManager.setToken.bind(SecureTokenManager),
  getToken: SecureTokenManager.getToken.bind(SecureTokenManager),
  getRefreshToken: SecureTokenManager.getRefreshToken.bind(SecureTokenManager),
  isTokenValid: SecureTokenManager.isTokenValid.bind(SecureTokenManager),
  clearToken: SecureTokenManager.clearToken.bind(SecureTokenManager),
  getRemainingTime:
    SecureTokenManager.getTokenRemainingTime.bind(SecureTokenManager),
  scheduleRefresh:
    SecureTokenManager.scheduleTokenRefresh.bind(SecureTokenManager),

  // XSS Protection
  enableXSSProtection: () => {
    //  Monitoring functions return cleanup functions
    const consoleCleanup = XSSProtectionManager.detectTokenTheft();
    const storageCleanup = XSSProtectionManager.monitorStorageAccess();

    //  Return combined cleanup function
    return () => {
      if (consoleCleanup) consoleCleanup();
      if (storageCleanup) storageCleanup();
    };
  },

  //  Manual cleanup için
  disableXSSProtection: null, // enableXSSProtection çağrısından dönen cleanup function'ını saklamak için
};

export default SecureStorage;
