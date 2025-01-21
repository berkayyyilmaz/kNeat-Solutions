import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/shopPageProducts";
import Pagination from "./Pagination";
import { LayoutGrid, List } from "lucide-react";

const ProductList = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Görünüm Değiştirici */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="hidden gap-2 sm:flex">
          <button
            className={`rounded border p-2 ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid />
          </button>
          <button
            className={`rounded border p-2 ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List />
          </button>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-4 xl:px-24 2xl:px-36"
            : "grid-cols-1 gap-4"
        }`}
      >
        {currentProducts.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            image={product.image}
            title={product.title}
            department={product.department}
            oldPrice={product.oldPrice}
            newPrice={product.newPrice}
            colors={product.colors}
            viewType={viewMode} // Görünüm modunu burada belirtiyoruz
          />
        ))}
      </div>

      {/* Sayfalama */}
      <div className="mt-8 flex justify-center">
        <Pagination
          totalPosts={products.length}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;
