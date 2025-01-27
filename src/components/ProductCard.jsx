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
}) => {
  const history = useHistory();
  // Ürün detay sayfasına yönlendirme ve sayfayı en üste kaydırma
  const handleProductClick = () => {
    window.scrollTo(0, 0);
    history.push(`/product/${id}`);
  };

  return (
    <div className="w-64 rounded-lg bg-white p-4">
      <div onClick={handleProductClick} className="cursor-pointer">
        {/* Product Image */}
        <div className="relative">
          <img src={image} alt={title} className="h-96 w-full object-cover" />
        </div>
      </div>
      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{department}</p>
        {/* Pricing */}
        <div className="mt-2 flex items-center justify-center space-x-2">
          <span className="text-gray-400 line-through">${oldPrice}</span>
          <span className="font-bold text-green-500">${newPrice}</span>
        </div>
        {/* Color Options */}
        <div className="mt-2 flex justify-center space-x-2">
          {colors.map((color, index) => (
            <span
              key={index}
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
