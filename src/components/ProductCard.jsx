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
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
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
        <div onClick={handleProductClick} className="relative cursor-pointer">
          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-l-2xl bg-gray-50 sm:h-40 sm:w-40">
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
            <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{discountPercentage}%
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3
                  onClick={handleProductClick}
                  className="line-clamp-2 cursor-pointer text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary"
                >
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{department}</p>
              </div>
              <button className="ml-2 rounded-full p-2 transition-colors hover:bg-gray-100">
                <Heart size={18} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {rating > 0 && (
              <div className="mt-2 flex items-center space-x-1">
                <div className="flex space-x-1">{renderStars(rating)}</div>
                <span className="ml-1 text-sm text-gray-500">
                  ({rating.toFixed(1)})
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {oldPrice && price < oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₺{oldPrice}
                </span>
              )}
              <span className="text-xl font-bold text-gray-900">₺{price}</span>
            </div>
            <button className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90">
              <ShoppingCart size={16} />
              <span className="text-sm font-medium">Sepete Ekle</span>
            </button>
          </div>

          {colors && colors.length > 0 && (
            <div className="mt-3 flex space-x-2">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border border-gray-200 transition-transform hover:scale-110"
                  style={{ backgroundColor: color }}
                />
              ))}
              {colors.length > 4 && (
                <span className="ml-1 text-xs text-gray-400">
                  +{colors.length - 4}
                </span>
              )}
            </div>
          )}
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
