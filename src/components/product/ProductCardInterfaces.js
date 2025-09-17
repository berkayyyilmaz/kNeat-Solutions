// ISP-compliant interfaces for ProductCard

// Product Data Interface - sadece ürün verisi ile ilgili props
export const createProductData = ({
  id,
  image,
  title,
  department,
  price,
  oldPrice = null,
  rating = 0,
  colors = [],
  product = null,
}) => ({
  id,
  image,
  title,
  department,
  price,
  oldPrice,
  rating,
  colors,
  product,
});

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

// Validation helpers
export const validateProductData = (productData) => {
  if (!productData.id || !productData.title || !productData.price) {
    console.warn("ProductCard: Required product data missing", productData);
    return false;
  }
  return true;
};

export const validateDisplayOptions = (displayOptions) => {
  const validViewTypes = ["grid", "list"];
  if (!validViewTypes.includes(displayOptions.viewType)) {
    console.warn(
      `ProductCard: Invalid viewType ${displayOptions.viewType}`,
      displayOptions,
    );
    return false;
  }
  return true;
};
