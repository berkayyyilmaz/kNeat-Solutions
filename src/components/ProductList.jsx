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
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Products
            </h1>
            <p className="mt-1 text-fgray">
              Showing {currentProducts.length} of {products.length} products
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="mr-2 text-sm text-fgray">View:</span>
            <div className="flex overflow-hidden rounded-lg border border-gray-200">
              <button
                className={`flex h-10 w-10 items-center justify-center transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-fgray hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`flex h-10 w-10 items-center justify-center transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-fgray hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="mb-12">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
              {currentProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    department={product.department}
                    oldPrice={product.oldPrice}
                    newPrice={product.newPrice}
                    colors={product.colors}
                    viewType={viewMode}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  department={product.department}
                  oldPrice={product.oldPrice}
                  newPrice={product.newPrice}
                  colors={product.colors}
                  viewType={viewMode}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            totalPosts={products.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductList;
