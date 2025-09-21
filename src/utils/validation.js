/**
 * Form Validation Utilities
 * Ortak validation rule'ları ve message'ları
 */

import { VALIDATION } from "../constants";

/**
 * Email validation rule
 * Hem LoginPage hem SignUpPage'de kullanılıyor
 */
export const emailValidation = {
  required: "E-posta alanı zorunludur",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Geçerli bir e-posta adresi giriniz",
  },
};

/**
 * Email validation rule (English)
 * SignUpPage için İngilizce mesajlar
 */
export const emailValidationEn = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Please enter a valid email address",
  },
};

/**
 * Password validation rule (Turkish)
 * LoginPage için Türkçe mesajlar
 */
export const passwordValidation = {
  required: "Şifre alanı zorunludur",
  minLength: {
    value: VALIDATION.PASSWORD_MIN_LENGTH,
    message: `Şifre en az ${VALIDATION.PASSWORD_MIN_LENGTH} karakter olmalıdır`,
  },
};

/**
 * Password validation rule (English)
 * SignUpPage için İngilizce mesajlar
 */
export const passwordValidationEn = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  },
};

/**
 * Name validation rule
 * SignUpPage için kullanılıyor
 */
export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters",
  },
  pattern: {
    value: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
    message: "Name can only contain letters and spaces",
  },
};

/**
 * Phone validation rule
 * SignUpPage için kullanılıyor
 */
export const phoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^(\+90|0)?5\d{9}$/,
    message: "Please enter a valid Turkish phone number (05xxxxxxxxx)",
  },
};

/**
 * Store name validation rule
 * SignUpPage'de store role için kullanılıyor
 */
export const storeNameValidation = {
  required: "Store name is required",
  minLength: {
    value: 3,
    message: "Store name must be at least 3 characters",
  },
};

/**
 * Tax ID validation rule
 * SignUpPage'de store role için kullanılıyor
 */
export const taxIdValidation = {
  required: "Tax ID is required",
  pattern: {
    value: /^T\d{4}V\d{6}$/,
    message: "Tax ID must be in format: TXXXXVXXXXXX",
  },
};

/**
 * IBAN validation rule
 * SignUpPage'de store role için kullanılıyor
 */
export const ibanValidation = {
  required: "IBAN is required",
  pattern: {
    value: /^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/,
    message: "Please enter a valid Turkish IBAN",
  },
};

/**
 * Common validation patterns
 * Sık kullanılan validation pattern'ları
 */
export const ValidationPatterns = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_TR: /^(\+90|0)?5\d{9}$/,
  TAX_ID: /^T\d{4}V\d{6}$/,
  IBAN_TR: /^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/,
  NAME: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
};

/**
 * Validation message factory
 * Dinamik validation mesajları oluşturmak için
 */
export const createValidationMessage = {
  required: (fieldName) => `${fieldName} alanı zorunludur`,
  minLength: (fieldName, minLength) =>
    `${fieldName} en az ${minLength} karakter olmalıdır`,
  maxLength: (fieldName, maxLength) =>
    `${fieldName} en fazla ${maxLength} karakter olmalıdır`,
  pattern: (fieldName) => `Geçerli bir ${fieldName} giriniz`,
};

/**
 * Validation helper functions
 * Manuel validation için yardımcı fonksiyonlar
 */
export const ValidationHelpers = {
  /**
   * Email format kontrolü
   */
  isValidEmail: (email) => {
    return ValidationPatterns.EMAIL.test(email);
  },

  /**
   * Password strength kontrolü
   */
  isStrongPassword: (password) => {
    return password && password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
  },

  /**
   * Phone number format kontrolü
   */
  isValidTurkishPhone: (phone) => {
    return ValidationPatterns.PHONE_TR.test(phone);
  },

  /**
   * IBAN format kontrolü
   */
  isValidTurkishIban: (iban) => {
    return ValidationPatterns.IBAN_TR.test(iban);
  },

  /**
   * Tax ID format kontrolü
   */
  isValidTaxId: (taxId) => {
    return ValidationPatterns.TAX_ID.test(taxId);
  },
};
