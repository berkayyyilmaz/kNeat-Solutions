import React from "react";
import { useProductNavigation } from "./product/ProductNavigation";
import { getProductCardStrategy } from "./product/ProductCardStrategy";

// ISP-compliant: Props'lar anlamlı gruplara ayrıldı
const ProductCard = ({
  // Backward compatibility - eski interface'i destekle (önce declare edilmeli)
  id,
  image,
  title,
  department,
  price,
  oldPrice,
  rating,
  colors,
  viewType,
  gender,
  categoryName,
  categoryId,
  product,

  // Product Data Interface
  productData = {},

  // Display Options Interface
  displayOptions = {},

  // Navigation Data Interface
  navigationData = {},
}) => {
  // Backward compatibility: Eğer eski props varsa onları kullan
  const finalProductData = {
    id: id !== undefined ? id : productData.id,
    image: image !== undefined ? image : productData.image,
    title: title !== undefined ? title : productData.title,
    department: department !== undefined ? department : productData.department,
    price: price !== undefined ? price : productData.price,
    oldPrice: oldPrice !== undefined ? oldPrice : productData.oldPrice,
    rating: rating !== undefined ? rating : productData.rating || 0,
    colors: colors !== undefined ? colors : productData.colors || [],
    product: product !== undefined ? product : productData.product,
  };

  const finalDisplayOptions = {
    viewType:
      viewType !== undefined ? viewType : displayOptions.viewType || "grid",
  };

  const finalNavigationData = {
    gender: gender !== undefined ? gender : navigationData.gender,
    categoryName:
      categoryName !== undefined ? categoryName : navigationData.categoryName,
    categoryId:
      categoryId !== undefined ? categoryId : navigationData.categoryId,
  };
  const { navigateToProduct } = useProductNavigation();

  const handleProductClick = () => {
    navigateToProduct({
      id: finalProductData.id,
      title: finalProductData.title,
      department: finalProductData.department,
      gender: finalNavigationData.gender,
      categoryName: finalNavigationData.categoryName,
      categoryId: finalNavigationData.categoryId,
      product: finalProductData.product,
    });
  };

  // Sepete ekleme fonksiyonu
  const handleAddToCart = (productData) => {
    console.log("Sepete ekleniyor:", productData);
    // TODO: Redux action ile sepete ekleme işlemi
  };

  // Favorilere ekleme fonksiyonu
  const handleAddToWishlist = (productData) => {
    console.log("Favorilere ekleniyor:", productData);
    // TODO: Redux action ile favorilere ekleme işlemi
  };

  // Strategy Pattern - OCP'ye uygun: yeni view types eklemek için kodu değiştirmek gerekmez
  const ProductCardComponent = getProductCardStrategy(
    finalDisplayOptions.viewType,
  );

  const commonProps = {
    id: finalProductData.id,
    image: finalProductData.image,
    title: finalProductData.title,
    department: finalProductData.department,
    price: finalProductData.price,
    oldPrice: finalProductData.oldPrice,
    rating: finalProductData.rating,
    colors: finalProductData.colors,
    onProductClick: handleProductClick,
    onAddToCart: handleAddToCart,
    onAddToWishlist: handleAddToWishlist,
  };

  return <ProductCardComponent {...commonProps} />;
};

export default ProductCard;
