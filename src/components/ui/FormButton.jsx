/**
 * Reusable Form Button Component
 * Submit, loading ve error state'leri ile birlikte
 */

import React from "react";
import { Loader2 } from "lucide-react";

const FormButton = ({
  // Button props
  type = "submit",
  children,
  className = "",
  disabled = false,

  // Loading state
  loading = false,
  loadingText = "İşlem yapılıyor...",

  // Custom styling
  variant = "primary", // primary, secondary, outline, danger
  size = "md", // sm, md, lg
  fullWidth = true,

  // Icon props
  icon: Icon = null,
  iconPosition = "left", // left, right

  // Click handler
  onClick,

  ...otherProps
}) => {
  // Base button styles
  const baseButtonStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-dark focus:ring-primary border-transparent shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent shadow-sm hover:shadow-md",
    outline:
      "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent shadow-sm hover:shadow-md",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-3",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Loading styles
  const loadingStyles = loading ? "cursor-wait" : "";

  // Combine all styles
  const buttonClasses = `
    ${baseButtonStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyles}
    ${loadingStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Icon size based on button size
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  // Handle click
  const handleClick = (e) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
      {...otherProps}
    >
      {/* Loading Spinner */}
      {loading && <Loader2 size={iconSize[size]} className="animate-spin" />}

      {/* Left Icon */}
      {!loading && Icon && iconPosition === "left" && (
        <Icon size={iconSize[size]} />
      )}

      {/* Button Text */}
      <span>{loading ? loadingText : children}</span>

      {/* Right Icon */}
      {!loading && Icon && iconPosition === "right" && (
        <Icon size={iconSize[size]} />
      )}
    </button>
  );
};

export default FormButton;
