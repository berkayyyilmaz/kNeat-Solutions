import React from "react";
import { getProductCardStrategy } from "./ProductCardStrategy";

const ProductCardView = ({
  productData,
  viewType = "grid",
  onProductClick,
  onAddToCart,
  onAddToWishlist,
}) => {
  const ProductCardComponent = getProductCardStrategy(viewType);

  const uiData = productData?.toUIFormat ? productData.toUIFormat() : {};

  const commonProps = {
    id: uiData.id,
    image: uiData.image,
    title: uiData.title,
    department: uiData.department,
    price: uiData.price,
    oldPrice: uiData.oldPrice,
    rating: uiData.rating,
    colors: uiData.colors,
    onProductClick,
    onAddToCart,
    onAddToWishlist,
  };

  return <ProductCardComponent {...commonProps} />;
};

export default ProductCardView;
