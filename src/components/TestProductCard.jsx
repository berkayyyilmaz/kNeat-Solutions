import React from "react";

const ProductCard = ({
  image,
  title,
  department,
  oldPrice,
  newPrice,
  colors,
  viewType = "grid", // Varsayılan olarak grid görünümü
}) => {
  const isListView = viewType === "list";

  return (
    <div
      className={`rounded-lg bg-white p-4 ${
        isListView ? "flex w-full space-x-4" : "w-64"
      }`}
    >
      {/* Product Image */}
      <div className={isListView ? "w-40 flex-shrink-0" : "relative"}>
        <img
          src={image}
          alt={title}
          className={`${
            isListView ? "h-32 w-full" : "h-96 w-full"
          } object-cover`}
        />
      </div>
      {/* Product Info */}
      <div className={`mt-4 ${isListView ? "mt-0 flex-grow" : "text-center"}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{department}</p>
        {/* Pricing */}
        <div
          className={`mt-2 flex items-center ${
            isListView ? "justify-start" : "justify-center"
          } space-x-2`}
        >
          <span className="text-gray-400 line-through">${oldPrice}</span>
          <span className="font-bold text-green-500">${newPrice}</span>
        </div>
        {/* Color Options */}
        <div
          className={`mt-2 flex ${
            isListView ? "justify-start" : "justify-center"
          } space-x-2`}
        >
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
