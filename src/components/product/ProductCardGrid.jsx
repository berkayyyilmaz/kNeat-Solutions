import React from "react";
import { Heart } from "lucide-react";
import StarRating from "../ui/StarRating";

const ProductCardGrid = ({
  id,
  image,
  title,
  department,
  price,
  oldPrice,
  rating = 0,
  colors = [],
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  className = "",
}) => {
  // İndirim yüzdesini hesapla
  const discountPercentage =
    oldPrice && price < oldPrice
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist({ id, title, price, image });
    }
  };

  return (
    <div
      className={`group w-full max-w-xs overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <div onClick={onProductClick} className="relative cursor-pointer">
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={image || "/api/placeholder/300/400"}
            alt={title}
            className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/api/placeholder/300/400";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />

          {/* İndirim etiketi */}
          {discountPercentage > 0 && (
            <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{discountPercentage}%
            </div>
          )}

          {/* Favoriye ekleme butonu */}
          <button
            onClick={handleAddToWishlist}
            className="absolute right-3 top-3 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100"
          >
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </button>

          {/* Hover overlay intentionally removed to force add-to-cart on product detail page */}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <h3
              onClick={onProductClick}
              className="line-clamp-2 cursor-pointer text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary"
            >
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{department}</p>
          </div>
        </div>

        {rating > 0 && (
          <div className="mb-3 flex items-center space-x-1">
            <StarRating rating={rating} size={14} showValue={true} />
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {oldPrice && price < oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₺{oldPrice}
              </span>
            )}
            <span className="text-xl font-bold text-gray-900">₺{price}</span>
          </div>
        </div>

        {colors && colors.length > 0 && (
          <div className="mb-4 flex justify-center space-x-2">
            {colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-200 transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
            {colors.length > 5 && (
              <span className="ml-1 text-xs text-gray-400">
                +{colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardGrid;
