import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import StarRating from "../ui/StarRating";
import { createSafeMarkup, SANITIZE_PRESETS } from "../../utils/sanitizer";
import useAddToCartFeedback from "../../hooks/useAddToCartFeedback";

const ProductInfo = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = "",
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const { isAdded, showAddedFeedback } = useAddToCartFeedback({
    successMs: 1400,
  });

  // API'de size bilgisi yok, sabit array
  const sizes = ["S", "M", "L", "XL"];

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }
    if (onAddToCart) {
      onAddToCart(product, selectedSize);
      showAddedFeedback("Ürün sepete eklendi");
      setShowSizeWarning(false);
    }
  };

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Ürün Başlığı */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        {/* Rating ve Satış Bilgisi */}
        {(product.rating > 0 ||
          (product.sellCount ?? product.sell_count ?? 0) > 0) && (
          <div className="mt-2 flex items-center space-x-2">
            <StarRating rating={product.rating} size={16} showValue={true} />
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {product.sellCount ?? product.sell_count ?? 0} satış
            </span>
          </div>
        )}
      </div>

      {/* Fiyat ve Stok Bilgisi */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900">
          ₺{product.price}
        </span>
        <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          Stokta {product.stock} adet
        </div>
      </div>

      {/* Ürün Açıklaması */}
      {product.description && (
        <div className="prose prose-gray">
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={createSafeMarkup(product.description)}
          />
        </div>
      )}

      {/* Beden Seçimi */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Beden Seçimi</h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setShowSizeWarning(false);
              }}
              className={`h-12 w-12 rounded-md border transition-all duration-200 ${
                selectedSize === size
                  ? "border-2 border-primary bg-primary text-white"
                  : "border-gray-300 hover:border-primary"
              } focus:outline-none`}
            >
              {size}
            </button>
          ))}
        </div>
        {showSizeWarning && !selectedSize ? (
          <span className="mt-2 block text-sm font-medium text-red-600">
            Lütfen beden seçiniz
          </span>
        ) : selectedSize ? (
          <span className="mt-2 block text-sm text-gray-600">
            Seçilen beden: {selectedSize}
          </span>
        ) : null}
      </div>

      {/* Aksiyon Butonları */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          onClick={handleAddToCart}
          className={`w-full rounded-md py-4 font-medium transition-all duration-200 sm:w-[200px] ${
            isAdded
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isAdded ? "Eklendi" : "Sepete Ekle"}
        </button>
        <div className="flex justify-between gap-2 sm:justify-start">
          <button
            onClick={handleAddToWishlist}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary"
            title="Favorilere Ekle"
          >
            <Heart className="h-5 w-5" />
          </button>
          {/* Sepete ekle ikon butonu kaldırıldı */}
          <button
            onClick={handleQuickView}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary"
            title="Hızlı Görünüm"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
