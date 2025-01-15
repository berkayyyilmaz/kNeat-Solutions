import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/bestsellerproducts";
const ProductList = () => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Görünüm Değiştirici */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>
        <div className="flex gap-2">
          <button
            className={`rounded border p-2 ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={`rounded border p-2 ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setViewMode("list")}
          >
            Liste
          </button>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 gap-4"
        }`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`${
              viewMode === "list"
                ? "flex items-center gap-4 rounded border p-4"
                : ""
            }`}
          >
            {/* Grid modunda olduğu gibi `ProductCard`'ı liste görünümüne uyarlıyoruz */}
            <ProductCard
              image={product.image}
              title={product.title}
              department={product.department}
              oldPrice={product.oldPrice}
              newPrice={product.newPrice}
              colors={product.colors}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
