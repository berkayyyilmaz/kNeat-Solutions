import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import StarRating from "../ui/StarRating";

const ProductCardList = ({
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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ id, title, price, image });
    }
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist({ id, title, price, image });
    }
  };

  return (
    <div
      className={`group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <div
        onClick={onProductClick}
        className="relative flex-shrink-0 cursor-pointer"
      >
        <div className="h-24 w-24 overflow-hidden rounded-l-2xl bg-gray-50 sm:h-32 sm:w-32 md:h-40 md:w-40">
          <img
            src={image || "/api/placeholder/160/160"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/api/placeholder/160/160";
            }}
          />
        </div>
        {discountPercentage > 0 && (
          <div className="absolute left-1 top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white sm:left-2 sm:top-2 sm:px-2 sm:py-1">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-2 sm:p-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3
                onClick={onProductClick}
                className="line-clamp-2 cursor-pointer text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary sm:text-lg"
              >
                {title}
              </h3>
              <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                {department}
              </p>
            </div>
            <button
              onClick={handleAddToWishlist}
              className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:p-2"
            >
              <Heart
                size={14}
                className="text-gray-400 hover:text-red-500 sm:h-[18px] sm:w-[18px]"
              />
            </button>
          </div>

          {rating > 0 && (
            <div className="mt-1 flex items-center space-x-1 sm:mt-2">
              <StarRating rating={rating} size={12} showValue={true} />
            </div>
          )}
        </div>

        <div className="mt-2 sm:mt-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              {oldPrice && price < oldPrice && (
                <span className="text-xs text-gray-400 line-through sm:text-sm">
                  ₺{oldPrice}
                </span>
              )}
              <span className="text-lg font-bold text-gray-900 sm:text-xl">
                ₺{price}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex flex-shrink-0 items-center space-x-1 rounded-lg bg-primary px-2 py-1.5 text-white transition-colors hover:bg-primary/90 sm:space-x-2 sm:px-4 sm:py-2"
            >
              <ShoppingCart size={14} className="sm:h-4 sm:w-4" />
              <span className="hidden text-xs font-medium sm:inline sm:text-sm">
                Sepete Ekle
              </span>
              <span className="text-xs font-medium sm:hidden">Ekle</span>
            </button>
          </div>

          {colors && colors.length > 0 && (
            <div className="mt-2 flex space-x-1 sm:mt-3 sm:space-x-2">
              {colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="h-3 w-3 rounded-full border border-gray-200 transition-transform hover:scale-110 sm:h-4 sm:w-4"
                  style={{ backgroundColor: color }}
                />
              ))}
              {colors.length > 3 && (
                <span className="ml-1 text-xs text-gray-400">
                  +{colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
