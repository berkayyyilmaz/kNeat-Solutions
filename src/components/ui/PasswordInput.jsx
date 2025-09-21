/**
 * Reusable Password Input Component
 * Password visibility toggle functionality ile birlikte
 */

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  // HTML input props
  id = "password",
  placeholder = "Şifrenizi giriniz",
  className = "",

  // React Hook Form props
  register,
  validation = {},

  // Label props
  label = "Şifre",
  labelClassName = "",

  // Error handling
  error,
  errorClassName = "",

  // Container props
  containerClassName = "",

  // Password visibility props
  showPasswordInitial = false,
  showPasswordText = "Şifreyi göster",
  hidePasswordText = "Şifreyi gizle",

  // Additional props
  autoComplete = "current-password",
  disabled = false,
  required = false,

  // Custom styling
  variant = "default", // default, primary, secondary
  size = "md", // sm, md, lg

  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(showPasswordInitial);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Base input styles
  const baseInputStyles =
    "w-full rounded-lg border px-4 py-3 pr-12 text-sm transition-colors focus:outline-none focus:ring-2";

  // Variant styles
  const variantStyles = {
    default:
      "border-gray-300 bg-gray-50 focus:border-primary focus:bg-white focus:ring-primary/20",
    primary:
      "border-primary bg-white focus:border-primary-dark focus:ring-primary/20",
    secondary:
      "border-gray-200 bg-white focus:border-gray-400 focus:ring-gray-400/20",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-2 pr-10 text-xs",
    md: "px-4 py-3 pr-12 text-sm",
    lg: "px-5 py-4 pr-14 text-base",
  };

  // Error styles
  const errorStyles = error
    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
    : "";

  // Disabled styles
  const disabledStyles = disabled
    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
    : "";

  // Combine all styles
  const inputClasses = `
    ${baseInputStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${errorStyles}
    ${disabledStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Label styles
  const baseLabelStyles = "mb-2 block text-sm font-medium";
  const labelStyles = error ? "text-red-700" : "text-gray-700";

  const labelClasses = `
    ${baseLabelStyles}
    ${labelStyles}
    ${labelClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Error message styles
  const errorMessageClasses = `
    mt-1 text-xs text-red-600
    ${errorClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Toggle button styles
  const toggleButtonClasses = `
    absolute right-3 top-1/2 -translate-y-1/2 transform select-none
    text-gray-500 hover:text-gray-700 focus:outline-none transition-colors
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  // Icon size based on input size
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className={`${containerClassName}`}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={inputClasses}
          autoComplete={autoComplete}
          disabled={disabled}
          {...(register ? register(id, validation) : {})}
          {...otherProps}
        />

        {/* Password Toggle Button */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={toggleButtonClasses}
          disabled={disabled}
          title={showPassword ? hidePasswordText : showPasswordText}
          aria-label={showPassword ? hidePasswordText : showPasswordText}
        >
          {showPassword ? (
            <EyeOff size={iconSize[size]} />
          ) : (
            <Eye size={iconSize[size]} />
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className={errorMessageClasses}>{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
