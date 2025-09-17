import React, { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import StarRating from "../ui/StarRating";

const ProductInfo = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = "",
}) => {
  const [selectedSize, setSelectedSize] = useState(null);

  // API'de size bilgisi yok, sabit array
  const sizes = ["S", "M", "L", "XL"];

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedSize);
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
        {product.rating > 0 && (
          <div className="mt-2 flex items-center space-x-2">
            <StarRating rating={product.rating} size={16} showValue={true} />
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {product.sell_count} satış
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
          <p className="text-gray-600">{product.description}</p>
        </div>
      )}

      {/* Beden Seçimi */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Beden Seçimi</h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
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
        {selectedSize && (
          <span className="mt-2 block text-sm text-gray-600">
            Seçilen beden: {selectedSize}
          </span>
        )}
      </div>

      {/* Aksiyon Butonları */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          onClick={handleAddToCart}
          className="w-full rounded-md bg-primary py-4 font-medium text-white transition-colors hover:bg-primary/90 sm:w-[200px]"
        >
          Sepete Ekle
        </button>
        <div className="flex justify-between gap-2 sm:justify-start">
          <button
            onClick={handleAddToWishlist}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary"
            title="Favorilere Ekle"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary"
            title="Sepete Ekle"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
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
