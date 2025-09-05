import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({
  id,
  image,
  title,
  department,
  price,
  oldPrice,
  rating = 0,
  colors = [],
  viewType = "grid",
}) => {
  const history = useHistory();

  const handleProductClick = () => {
    window.scrollTo(0, 0);
    history.push(`/product/${id}`);
  };

  // Rating yıldızlarını render eden fonksiyon
  const renderStars = (rating, isListView = false) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starSize = isListView ? 12 : 14;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={starSize}
            className="fill-yellow-400 text-yellow-400"
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={starSize} className="text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star
                size={starSize}
                className="fill-yellow-400 text-yellow-400"
              />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={starSize} className="text-gray-300" />);
      }
    }
    return stars;
  };

  // İndirim yüzdesini hesapla
  const discountPercentage =
    oldPrice && price < oldPrice
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  if (viewType === "list") {
    return (
      <div className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
        <div
          onClick={handleProductClick}
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
                  onClick={handleProductClick}
                  className="line-clamp-2 cursor-pointer text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary sm:text-lg"
                >
                  {title}
                </h3>
                <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                  {department}
                </p>
              </div>
              <button className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:p-2">
                <Heart
                  size={14}
                  className="text-gray-400 hover:text-red-500 sm:h-[18px] sm:w-[18px]"
                />
              </button>
            </div>

            {rating > 0 && (
              <div className="mt-1 flex items-center space-x-1 sm:mt-2">
                <div className="flex space-x-0.5 sm:space-x-1">
                  {renderStars(rating, true)}
                </div>
                <span className="ml-1 text-xs text-gray-500 sm:text-sm">
                  ({rating.toFixed(1)})
                </span>
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
              <button className="flex flex-shrink-0 items-center space-x-1 rounded-lg bg-primary px-2 py-1.5 text-white transition-colors hover:bg-primary/90 sm:space-x-2 sm:px-4 sm:py-2">
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
  }

  return (
    <div className="group w-full max-w-xs overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div onClick={handleProductClick} className="relative cursor-pointer">
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
          <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100">
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </button>

          {/* Hızlı görünüm overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-white px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-100">
              <ShoppingCart size={16} />
              <span>Sepete Ekle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <h3
              onClick={handleProductClick}
              className="line-clamp-2 cursor-pointer text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary"
            >
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{department}</p>
          </div>
        </div>

        {rating > 0 && (
          <div className="mb-3 flex items-center space-x-1">
            <div className="flex space-x-1">{renderStars(rating)}</div>
            <span className="ml-1 text-sm text-gray-500">
              ({rating.toFixed(1)})
            </span>
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

export default ProductCard;
