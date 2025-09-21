import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/shoppingCartActions";
import { useProductNavigation } from "./product/ProductNavigation";
import ProductCardView from "./product/ProductCardView";
import logger from "../utils/logger";
import { ProductModel } from "../models/dataModels";
import { ProductFactory } from "../models/dataFactories";
import { createProductData } from "./product/ProductCardInterfaces";

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
  //  Centralized data model kullanarak backward compatibility
  let finalProductData;

  // Eğer productData ProductModel instance'ı ise direkt kullan
  if (productData instanceof ProductModel) {
    finalProductData = productData;
  }
  // Legacy props varsa onları prioritize et
  else if (id !== undefined || title !== undefined || product !== undefined) {
    const legacyData = {
      id: id,
      title: title,
      image: image,
      department: department,
      price: price,
      oldPrice: oldPrice,
      rating: rating,
      colors: colors,
      product: product,
    };
    finalProductData = ProductFactory.fromLegacyCardFormat(legacyData);
  }
  // productData object'i varsa onu kullan
  else if (productData && Object.keys(productData).length > 0) {
    finalProductData = createProductData(productData);
  }
  // Fallback - boş product
  else {
    finalProductData = new ProductModel();
    logger.warn("ProductCard: No product data provided");
  }

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
  const dispatch = useDispatch();

  const handleProductClick = () => {
    navigateToProduct({
      id: finalProductData.id,
      title: finalProductData.name,
      department: finalProductData.department,
      gender: finalNavigationData.gender,
      categoryName: finalNavigationData.categoryName,
      categoryId: finalNavigationData.categoryId,
      product: finalProductData,
    });
  };

  // Sepete ekleme fonksiyonu
  const handleAddToCart = (productData) => {
    logger.userAction("Add to Cart", {
      productId: finalProductData.id,
      productTitle: finalProductData.name,
      component: "ProductCard",
    });
    dispatch(
      addToCart({
        product: finalProductData,
        count: 1,
      }),
    );
  };

  // Favorilere ekleme fonksiyonu
  const handleAddToWishlist = (productData) => {
    logger.userAction("Add to Wishlist", {
      productId: finalProductData.id,
      productTitle: finalProductData.name,
      component: "ProductCard",
    });
    // TODO: Redux action ile favorilere ekleme işlemi
  };

  return (
    <ProductCardView
      productData={finalProductData}
      viewType={finalDisplayOptions.viewType}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  );
};

export default ProductCard;
