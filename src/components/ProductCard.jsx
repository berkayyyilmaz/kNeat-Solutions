import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ProductCard = ({
  id,
  image,
  title,
  department,
  oldPrice,
  newPrice,
  colors,
  viewType = "grid",
}) => {
  const history = useHistory();

  const handleProductClick = () => {
    window.scrollTo(0, 0);
    history.push(`/product/${id}`);
  };

  if (viewType === "list") {
    return (
      <div className="group flex overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <div onClick={handleProductClick} className="cursor-pointer">
          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-l-xl sm:h-40 sm:w-40">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center p-4">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="text-sm text-fgray">{department}</p>
          <div className="mt-2 flex items-center space-x-3">
            <span className="text-base text-fgray line-through">
              ${oldPrice}
            </span>
            <span className="text-lg font-bold text-green-600">
              ${newPrice}
            </span>
          </div>
          <div className="mt-3 flex space-x-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="h-4 w-4 rounded-full border border-gray-200 transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div onClick={handleProductClick} className="cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-1 text-sm text-fgray">{department}</p>

        <div className="mt-3 flex items-center justify-center space-x-3">
          <span className="text-base text-fgray line-through">${oldPrice}</span>
          <span className="text-xl font-bold text-green-600">${newPrice}</span>
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="h-5 w-5 rounded-full border-2 border-gray-200 transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
