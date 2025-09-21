// ISP-compliant interfaces for ProductCard
//  Updated to use centralized data models

import { ProductModel } from "../../models/dataModels";
import { ProductFactory } from "../../models/dataFactories";

// Product Data Interface - centralized data model kullanıyor
export const createProductData = (input) => {
  // Eğer ProductModel instance'ı ise direkt döndür
  if (input instanceof ProductModel) {
    return input;
  }

  // Legacy format'tan ProductModel oluştur
  if (input && typeof input === "object") {
    return ProductFactory.fromLegacyCardFormat(input);
  }

  // Fallback - boş ProductModel
  return new ProductModel();
};

// Display Options Interface - sadece görünüm ile ilgili props
export const createDisplayOptions = ({ viewType = "grid" }) => ({
  viewType,
});

// Navigation Data Interface - sadece navigation ile ilgili props
export const createNavigationData = ({ gender, categoryName, categoryId }) => ({
  gender,
  categoryName,
  categoryId,
});

// Combined interface creator - tüm interfaces'i birleştiren helper
export const createProductCardProps = ({
  productData,
  displayOptions,
  navigationData,
}) => ({
  productData,
  displayOptions,
  navigationData,
});

// Validation helpers - updated to use ProductModel
export const validateProductData = (productData) => {
  // ProductModel instance'ı ise built-in validation kullan
  if (productData instanceof ProductModel) {
    const isValid = productData.isValid();
    if (!isValid) {
    }
    return isValid;
  }

  // Legacy validation for backward compatibility
  if (
    !productData ||
    !productData.id ||
    (!productData.title && !productData.name) ||
    productData.price === undefined
  ) {
    return false;
  }
  return true;
};

export const validateDisplayOptions = (displayOptions) => {
  const validViewTypes = ["grid", "list"];
  if (!validViewTypes.includes(displayOptions.viewType)) {
    return false;
  }
  return true;
};
