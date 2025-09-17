import React from "react";
import { Loader2, Search } from "lucide-react";
import ProductCard from "../ProductCard";

const ProductGrid = ({
  products = [],
  viewMode = "grid",
  loading = false,
  error = null,

  // Search states
  searchTerm = "",
  onClearSearch,

  // Load more states
  loadingMore = false,
  loadMoreError = null,
  hasMore = false,
  isMobile = false,
  onLoadMore,

  // Product props to pass down
  gender,
  categoryName,
  categoryId,

  // Config
  showAnimations = true,
  className = "",
}) => {
  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Ürünler yükleniyor...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Ürünler yüklenirken bir hata oluştu
          </h3>
          <p className="mt-1 text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0 && !loading) {
    return (
      <div className="flex animate-fadeInUp flex-col items-center justify-center py-12">
        <div className="mb-4 rounded-full bg-gray-100 p-4">
          <Search size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          {searchTerm.trim() ? "Aradığınız ürün bulunamadı" : "Ürün bulunamadı"}
        </h3>
        <p className="mt-1 max-w-md text-center text-sm text-gray-600">
          {searchTerm.trim()
            ? `"${searchTerm}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
            : "Arama kriterlerinize uygun ürün bulunamadı."}
        </p>
        {searchTerm.trim() && onClearSearch && (
          <button
            onClick={onClearSearch}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary/90"
          >
            Aramayı Temizle
          </button>
        )}
      </div>
    );
  }

  // Products grid/list
  const renderProducts = () => {
    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 gap-6 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={showAnimations ? "animate-fadeInUp opacity-0" : ""}
              style={
                showAnimations
                  ? {
                      animationDelay: `${index * 30}ms`,
                      animationFillMode: "forwards",
                    }
                  : {}
              }
            >
              <ProductCard
                id={product.id}
                image={product.images?.[0]?.url}
                title={product.name}
                department={product.category?.title || "Genel"}
                price={product.price}
                rating={product.rating}
                colors={[]}
                viewType={viewMode}
                gender={gender}
                categoryName={categoryName}
                categoryId={categoryId}
                product={product}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4 transition-all duration-300">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={showAnimations ? "animate-fadeInUp opacity-0" : ""}
            style={
              showAnimations
                ? {
                    animationDelay: `${index * 30}ms`,
                    animationFillMode: "forwards",
                  }
                : {}
            }
          >
            <ProductCard
              id={product.id}
              image={product.images?.[0]?.url}
              title={product.name}
              department={product.category?.title || "Genel"}
              price={product.price}
              rating={product.rating}
              colors={[]}
              viewType={viewMode}
              gender={gender}
              categoryName={categoryName}
              categoryId={categoryId}
              product={product}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      {renderProducts()}

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-gray-600">
            Daha fazla ürün yükleniyor...
          </span>
        </div>
      )}

      {/* Load More Error */}
      {loadMoreError && (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="mb-2 text-sm text-red-600">{loadMoreError}</p>
          {onLoadMore && (
            <button
              onClick={onLoadMore}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              Tekrar Dene
            </button>
          )}
        </div>
      )}

      {/* Mobile Load More Button */}
      {isMobile && hasMore && !loadingMore && !loading && onLoadMore && (
        <div className="flex items-center justify-center py-6">
          <button
            onClick={onLoadMore}
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Daha Fazla Ürün Gör
          </button>
        </div>
      )}

      {/* No More Products Message */}
      {!hasMore && products.length > 0 && !loadingMore && (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-600">
            Tüm ürünler yüklendi ({products.length} ürün)
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
