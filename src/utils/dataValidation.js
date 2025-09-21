/**
 * Data Validation Utilities
 * Centralized data validation ve type checking
 */

import { ValidationRules } from "../models/dataModels";
import logger from "./logger";

/**
 * Schema Validator
 * Object structure'ı validate eder
 */
export class SchemaValidator {
  /**
   * Schema'ya göre object validate et
   * @param {Object} data - Validate edilecek data
   * @param {Object} schema - Validation schema
   * @returns {Object} - { isValid, errors, warnings }
   */
  static validate(data, schema) {
    const errors = [];
    const warnings = [];

    if (!data || typeof data !== "object") {
      return {
        isValid: false,
        errors: ["Data must be an object"],
        warnings: [],
      };
    }

    // Required fields kontrolü
    if (schema.required) {
      schema.required.forEach((field) => {
        if (data[field] === undefined || data[field] === null) {
          errors.push(`Required field '${field}' is missing`);
        }
      });
    }

    // Field validations
    if (schema.fields) {
      Object.keys(schema.fields).forEach((fieldName) => {
        const fieldSchema = schema.fields[fieldName];
        const fieldValue = data[fieldName];

        // Skip validation if field is undefined and not required
        if (fieldValue === undefined || fieldValue === null) {
          return;
        }

        // Type validation
        if (fieldSchema.type) {
          if (!this.validateType(fieldValue, fieldSchema.type)) {
            errors.push(
              `Field '${fieldName}' must be of type ${fieldSchema.type}`,
            );
          }
        }

        // Custom validation rules
        if (fieldSchema.rules) {
          fieldSchema.rules.forEach((rule) => {
            if (typeof rule === "function") {
              if (!rule(fieldValue)) {
                errors.push(`Field '${fieldName}' failed validation rule`);
              }
            } else if (typeof rule === "object" && rule.validator) {
              if (!rule.validator(fieldValue)) {
                errors.push(
                  `Field '${fieldName}': ${rule.message || "validation failed"}`,
                );
              }
            }
          });
        }

        // Min/Max validation for strings and numbers
        if (fieldSchema.minLength && typeof fieldValue === "string") {
          if (fieldValue.length < fieldSchema.minLength) {
            errors.push(
              `Field '${fieldName}' must be at least ${fieldSchema.minLength} characters`,
            );
          }
        }

        if (fieldSchema.maxLength && typeof fieldValue === "string") {
          if (fieldValue.length > fieldSchema.maxLength) {
            errors.push(
              `Field '${fieldName}' must be at most ${fieldSchema.maxLength} characters`,
            );
          }
        }

        if (fieldSchema.min && typeof fieldValue === "number") {
          if (fieldValue < fieldSchema.min) {
            errors.push(
              `Field '${fieldName}' must be at least ${fieldSchema.min}`,
            );
          }
        }

        if (fieldSchema.max && typeof fieldValue === "number") {
          if (fieldValue > fieldSchema.max) {
            errors.push(
              `Field '${fieldName}' must be at most ${fieldSchema.max}`,
            );
          }
        }

        // Enum validation
        if (fieldSchema.enum) {
          if (!fieldSchema.enum.includes(fieldValue)) {
            errors.push(
              `Field '${fieldName}' must be one of: ${fieldSchema.enum.join(", ")}`,
            );
          }
        }

        // Pattern validation
        if (fieldSchema.pattern) {
          if (!fieldSchema.pattern.test(fieldValue)) {
            errors.push(`Field '${fieldName}' does not match required pattern`);
          }
        }

        // Deprecation warnings
        if (fieldSchema.deprecated) {
          warnings.push(
            `Field '${fieldName}' is deprecated: ${fieldSchema.deprecated}`,
          );
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      warnings: warnings,
    };
  }

  /**
   * Type validation helper
   */
  static validateType(value, type) {
    switch (type) {
      case "string":
        return typeof value === "string";
      case "number":
        return typeof value === "number" && !isNaN(value);
      case "boolean":
        return typeof value === "boolean";
      case "array":
        return Array.isArray(value);
      case "object":
        return (
          typeof value === "object" && value !== null && !Array.isArray(value)
        );
      case "url":
        return ValidationRules.url(value);
      case "email":
        return ValidationRules.email(value);
      case "phone":
        return ValidationRules.phone(value);
      default:
        return true; // Unknown types pass validation
    }
  }
}

/**
 * Product Validation Schemas
 */
export const ProductSchemas = {
  // Basic product schema
  product: {
    required: ["id", "name", "price"],
    fields: {
      id: {
        type: "string",
        rules: [ValidationRules.required],
      },
      name: {
        type: "string",
        minLength: 1,
        maxLength: 255,
        rules: [ValidationRules.required],
      },
      description: {
        type: "string",
        maxLength: 5000,
      },
      price: {
        type: "number",
        min: 0,
        rules: [ValidationRules.required, ValidationRules.positive],
      },
      oldPrice: {
        type: "number",
        min: 0,
      },
      rating: {
        type: "number",
        min: 0,
        max: 5,
      },
      stock: {
        type: "number",
        min: 0,
      },
      images: {
        type: "array",
      },
      categoryId: {
        type: "string",
      },
      department: {
        type: "string",
        enum: ["men", "women", "kids", "unisex"],
      },
      gender: {
        type: "string",
        enum: ["male", "female", "unisex"],
      },
      isActive: {
        type: "boolean",
      },
    },
  },

  // Category schema
  category: {
    required: ["id", "title"],
    fields: {
      id: {
        type: "string",
        rules: [ValidationRules.required],
      },
      title: {
        type: "string",
        minLength: 1,
        maxLength: 100,
        rules: [ValidationRules.required],
      },
      code: {
        type: "string",
        maxLength: 50,
        pattern: /^[a-z0-9-]+$/,
      },
      rating: {
        type: "number",
        min: 0,
        max: 5,
      },
      gender: {
        type: "string",
        enum: ["male", "female", "unisex", ""],
      },
      img: {
        type: "string",
      },
      isActive: {
        type: "boolean",
      },
    },
  },

  // User schema
  user: {
    required: ["id", "name", "email"],
    fields: {
      id: {
        type: "string",
        rules: [ValidationRules.required],
      },
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        rules: [ValidationRules.required],
      },
      email: {
        type: "email",
        rules: [ValidationRules.required, ValidationRules.email],
      },
      phone: {
        type: "phone",
        rules: [ValidationRules.phone],
      },
      roleId: {
        type: "string",
      },
      isVerified: {
        type: "boolean",
      },
      isActive: {
        type: "boolean",
      },
    },
  },

  // Cart item schema
  cartItem: {
    required: ["productId", "quantity"],
    fields: {
      id: {
        type: "string",
      },
      productId: {
        type: "string",
        rules: [ValidationRules.required],
      },
      quantity: {
        type: "number",
        min: 1,
        max: 99,
        rules: [ValidationRules.required, ValidationRules.positive],
      },
      size: {
        type: "string",
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      color: {
        type: "string",
        maxLength: 50,
      },
    },
  },
};

/**
 * API Response Validators
 */
export class ApiResponseValidator {
  /**
   * Validate API response structure
   */
  static validateApiResponse(response, expectedSchema) {
    try {
      // Check if response exists
      if (!response) {
        return {
          isValid: false,
          errors: ["API response is null or undefined"],
          warnings: [],
        };
      }

      // Validate against schema if provided
      if (expectedSchema) {
        return SchemaValidator.validate(response, expectedSchema);
      }

      // Basic API response validation
      const errors = [];
      const warnings = [];

      // Check for common API error patterns
      if (response.error) {
        errors.push(`API Error: ${response.error}`);
      }

      if (response.errors && Array.isArray(response.errors)) {
        errors.push(...response.errors.map((err) => `API Error: ${err}`));
      }

      // Check for deprecated fields
      if (response.deprecated) {
        warnings.push("This API endpoint is deprecated");
      }

      return {
        isValid: errors.length === 0,
        errors: errors,
        warnings: warnings,
      };
    } catch (error) {
      logger.error("Error validating API response:", error);
      return {
        isValid: false,
        errors: ["Failed to validate API response"],
        warnings: [],
      };
    }
  }

  /**
   * Validate product API response
   */
  static validateProductResponse(response) {
    if (Array.isArray(response)) {
      // Product list validation
      const results = response.map((product, index) => {
        const validation = SchemaValidator.validate(
          product,
          ProductSchemas.product,
        );
        if (!validation.isValid) {
          validation.errors = validation.errors.map(
            (err) => `Product ${index}: ${err}`,
          );
        }
        return validation;
      });

      const allErrors = results.flatMap((r) => r.errors);
      const allWarnings = results.flatMap((r) => r.warnings);

      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
        warnings: allWarnings,
      };
    } else {
      // Single product validation
      return SchemaValidator.validate(response, ProductSchemas.product);
    }
  }

  /**
   * Validate category API response
   */
  static validateCategoryResponse(response) {
    if (Array.isArray(response)) {
      const results = response.map((category, index) => {
        const validation = SchemaValidator.validate(
          category,
          ProductSchemas.category,
        );
        if (!validation.isValid) {
          validation.errors = validation.errors.map(
            (err) => `Category ${index}: ${err}`,
          );
        }
        return validation;
      });

      const allErrors = results.flatMap((r) => r.errors);
      const allWarnings = results.flatMap((r) => r.warnings);

      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
        warnings: allWarnings,
      };
    } else {
      return SchemaValidator.validate(response, ProductSchemas.category);
    }
  }
}

/**
 * Development Mode Validators
 * Sadece development'ta çalışan validation'lar
 */
export class DevModeValidator {
  /**
   * Component props validation
   */
  static validateComponentProps(componentName, props, expectedProps = {}) {
    if (process.env.NODE_ENV !== "development") {
      return true;
    }

    const warnings = [];
    const errors = [];

    // Required props check
    if (expectedProps.required) {
      expectedProps.required.forEach((propName) => {
        if (props[propName] === undefined || props[propName] === null) {
          errors.push(
            `${componentName}: Required prop '${propName}' is missing`,
          );
        }
      });
    }

    // Deprecated props check
    if (expectedProps.deprecated) {
      Object.keys(expectedProps.deprecated).forEach((propName) => {
        if (props[propName] !== undefined) {
          warnings.push(
            `${componentName}: Prop '${propName}' is deprecated. ${expectedProps.deprecated[propName]}`,
          );
        }
      });
    }

    // Unknown props check
    if (expectedProps.known) {
      Object.keys(props).forEach((propName) => {
        if (!expectedProps.known.includes(propName)) {
          warnings.push(`${componentName}: Unknown prop '${propName}'`);
        }
      });
    }

    // Log results
    if (errors.length > 0) {
    }
    if (warnings.length > 0) {
    }

    return errors.length === 0;
  }

  /**
   * Data flow validation
   */
  static validateDataFlow(stepName, data, expectedFormat = null) {
    if (process.env.NODE_ENV !== "development") {
      return true;
    }

    if (expectedFormat) {
      const validation = SchemaValidator.validate(data, expectedFormat);
      if (!validation.isValid) {
      } else {
      }

      return validation.isValid;
    }

    return true;
  }
}

/**
 * Runtime Type Checker
 * Runtime'da type safety sağlar
 */
export class RuntimeTypeChecker {
  /**
   * Function parameter type checking
   */
  static checkParams(functionName, params, expectedTypes) {
    if (process.env.NODE_ENV !== "development") {
      return true;
    }

    const errors = [];

    Object.keys(expectedTypes).forEach((paramName) => {
      const value = params[paramName];
      const expectedType = expectedTypes[paramName];

      if (value !== undefined && value !== null) {
        if (!SchemaValidator.validateType(value, expectedType)) {
          errors.push(
            `${functionName}: Parameter '${paramName}' expected ${expectedType}, got ${typeof value}`,
          );
        }
      }
    });

    if (errors.length > 0) {
      return false;
    }

    return true;
  }

  /**
   * Return value type checking
   */
  static checkReturnValue(functionName, returnValue, expectedType) {
    if (process.env.NODE_ENV !== "development") {
      return true;
    }

    if (returnValue !== undefined && returnValue !== null) {
      if (!SchemaValidator.validateType(returnValue, expectedType)) {
        return false;
      }
    }

    return true;
  }
}

export default {
  SchemaValidator,
  ProductSchemas,
  ApiResponseValidator,
  DevModeValidator,
  RuntimeTypeChecker,
};
