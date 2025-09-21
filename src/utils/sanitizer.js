/**
 * HTML Sanitization Utility
 * XSS saldırılarını önlemek için HTML içeriğini güvenli hale getirir
 */

/**
 * Basit HTML sanitizer - tehlikeli HTML tag'leri ve script'leri temizler
 * @param {string} input - Sanitize edilecek HTML string
 * @returns {string} - Güvenli HTML string
 */
export const sanitizeHtml = (input) => {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Tehlikeli tag'leri ve attribute'leri içeren regex pattern'lar
  const dangerousPatterns = [
    // Script tag'leri (case insensitive)
    /<script[^>]*>.*?<\/script>/gims,
    /<script[^>]*>/gims,
    /<\/script>/gims,

    // Event handler attribute'leri
    /\son\w+\s*=\s*["'][^"']*["']/gims,
    /\son\w+\s*=\s*[^>\s]+/gims,

    // JavaScript: protokolü
    /javascript\s*:/gims,

    // VBScript: protokolü
    /vbscript\s*:/gims,

    // Data: URI'ları (sadece base64 olmayan riskli olanlar)
    /data\s*:\s*(?!image\/[a-zA-Z]*;base64)[^;]*;/gims,

    // Iframe tag'leri
    /<iframe[^>]*>.*?<\/iframe>/gims,
    /<iframe[^>]*>/gims,
    /<\/iframe>/gims,

    // Object ve embed tag'leri
    /<object[^>]*>.*?<\/object>/gims,
    /<object[^>]*>/gims,
    /<embed[^>]*>/gims,

    // Style tag'leri (CSS injection önlemi)
    /<style[^>]*>.*?<\/style>/gims,
    /<style[^>]*>/gims,
    /<\/style>/gims,

    // Link tag'leri (external stylesheet injection önlemi)
    /<link[^>]*rel\s*=\s*["']?stylesheet["']?[^>]*>/gims,

    // Meta tag'leri
    /<meta[^>]*>/gims,

    // Form tag'leri
    /<form[^>]*>.*?<\/form>/gims,
    /<form[^>]*>/gims,
    /<\/form>/gims,

    // Input tag'leri
    /<input[^>]*>/gims,

    // Textarea tag'leri
    /<textarea[^>]*>.*?<\/textarea>/gims,
    /<textarea[^>]*>/gims,

    // Button tag'leri
    /<button[^>]*>.*?<\/button>/gims,
    /<button[^>]*>/gims,
  ];

  let sanitized = input;

  // Tehlikeli pattern'ları temizle
  dangerousPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, "");
  });

  // Kalan HTML karakterlerini escape et
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  return sanitized;
};

/**
 * Güvenli HTML render edilebilir içerik oluşturur
 * Sadece belirli güvenli tag'lere izin verir
 * @param {string} input - HTML string
 * @returns {string} - Güvenli HTML
 */
export const sanitizeHtmlForDisplay = (input) => {
  if (!input || typeof input !== "string") {
    return "";
  }

  // İzin verilen güvenli tag'ler
  const allowedTags = [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "ul",
    "ol",
    "li",
  ];

  let sanitized = input;

  // Önce tehlikeli içerikleri temizle
  sanitized = sanitizeHtml(sanitized);

  // Güvenli tag'leri geri getir (basit whitelist approach)
  allowedTags.forEach((tag) => {
    // Opening tag
    const openRegex = new RegExp(`&lt;${tag}&gt;`, "gims");
    sanitized = sanitized.replace(openRegex, `<${tag}>`);

    // Closing tag
    const closeRegex = new RegExp(`&lt;\\/${tag}&gt;`, "gims");
    sanitized = sanitized.replace(closeRegex, `</${tag}>`);

    // Self-closing tag (br için)
    if (tag === "br") {
      const selfCloseRegex = new RegExp(`&lt;${tag}\\s*\\/?&gt;`, "gims");
      sanitized = sanitized.replace(selfCloseRegex, `<${tag} />`);
    }
  });

  return sanitized;
};

/**
 * Plain text için güvenli string (hiç HTML yok)
 * @param {string} input - String input
 * @returns {string} - HTML escape edilmiş string
 */
export const sanitizePlainText = (input) => {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * URL'lerin güvenli olup olmadığını kontrol eder
 * @param {string} url - Kontrol edilecek URL
 * @returns {boolean} - URL güvenli mi?
 */
export const isUrlSafe = (url) => {
  if (!url || typeof url !== "string") {
    return false;
  }

  // Güvenli protokoller
  const safeProtocols = ["http:", "https:", "mailto:", "tel:"];

  try {
    const parsedUrl = new URL(url);
    return safeProtocols.includes(parsedUrl.protocol);
  } catch (error) {
    // Relative URL olabilir, güvenli kabul et
    return (
      !url.includes("javascript:") &&
      !url.includes("vbscript:") &&
      !url.startsWith("data:")
    );
  }
};

/**
 * React component'lerinde güvenli HTML rendering için
 * @param {string} htmlString - HTML string
 * @returns {object} - dangerouslySetInnerHTML için object
 */
export const createSafeMarkup = (htmlString) => {
  return {
    __html: sanitizeHtmlForDisplay(htmlString),
  };
};

// Yaygın kullanım örnekleri için preset'ler
export const SANITIZE_PRESETS = {
  // Ürün açıklaması için - basit formatlamaya izin ver
  PRODUCT_DESCRIPTION: (text) => sanitizeHtmlForDisplay(text),

  // Kullanıcı yorumu için - sadece plain text
  USER_COMMENT: (text) => sanitizePlainText(text),

  // Başlık için - sadece plain text
  TITLE: (text) => sanitizePlainText(text),

  // URL için - güvenlik kontrolü
  URL: (url) => (isUrlSafe(url) ? url : "#"),
};
