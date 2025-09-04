import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { LayoutGrid, List, Loader2, Search, X } from "lucide-react";
import {
  fetchProducts,
  loadMoreProducts,
  resetProducts,
} from "../redux/actions/productActions";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useDebounce from "../hooks/useDebounce";

const ProductList = ({ categoryId, gender }) => {
  const dispatch = useDispatch();
  const {
    productList,
    total,
    productsLoading,
    productsError,
    loadingMore,
    loadMoreError,
    hasMore,
    limit,
    offset,
  } = useSelector((state) => state.products);

  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [productsPerPage] = useState(12);

  // Debounced search term - kullanıcı yazmayı bıraktıktan 300ms sonra arama yapar
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // İlk yüklemede ve sadece kategori/sıralama değiştiğinde ürünleri yükle
  useEffect(() => {
    dispatch(resetProducts());

    const params = {
      limit: productsPerPage,
      offset: 0,
    };

    if (categoryId) {
      params.categoryId = categoryId;
    }

    if (sort) {
      params.sort = sort;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, sort, productsPerPage]);

  // Infinite scroll callback fonksiyonu
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || productsLoading) {
      return;
    }

    const params = {
      limit: productsPerPage,
      offset: productList.length,
    };

    if (categoryId) {
      params.categoryId = categoryId;
    }

    if (sort) {
      params.sort = sort;
    }

    await dispatch(loadMoreProducts(params));
  }, [
    dispatch,
    categoryId,
    sort,
    productsPerPage,
    hasMore,
    loadingMore,
    productsLoading,
    productList.length,
  ]);

  // Infinite scroll hook'unu kullan
  const { isFetching } = useInfiniteScroll(loadMore, {
    threshold: 500,
    enabled: hasMore && !productsLoading && !loadingMore,
  });

  // Arama durumunu kontrol et ve yumuşak geçiş sağla
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm && searchTerm.trim()) {
      setIsSearching(true);
      setShowProducts(false);
    } else {
      setIsSearching(false);
      setTimeout(() => setShowProducts(true), 150);
    }
  }, [searchTerm, debouncedSearchTerm]);

  // Client-side arama ve filtreleme
  const filteredProducts = useMemo(() => {
    let filtered = [...productList];

    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.category?.title?.toLowerCase().includes(searchLower)
        );
      });
    }

    return filtered;
  }, [productList, debouncedSearchTerm]);

  // Arama temizleme fonksiyonu
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  const getHeaderTitle = () => {
    if (categoryId) {
      return "Kategori Ürünleri";
    }
    if (gender) {
      return gender === "k" ? "Kadın Ürünleri" : "Erkek Ürünleri";
    }
    return "Tüm Ürünler";
  };

  const getResultsText = () => {
    const currentCount = filteredProducts.length;
    if (debouncedSearchTerm.trim()) {
      return `"${debouncedSearchTerm}" için ${currentCount} ürün bulundu`;
    }
    if (total > 0) {
      return `${currentCount} / ${total} ürün gösteriliyor`;
    }
    return `${currentCount} ürün gösteriliyor`;
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {getHeaderTitle()}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{getResultsText()}</p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid size={16} />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List size={16} />
              Liste
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Filter */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-64"
            />

            {/* Arama temizleme butonu */}
            {searchTerm && !isSearching && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}

            {/* Arama loading indicator */}
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 size={16} className="animate-spin text-blue-500" />
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Sırala</option>
            <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating:desc">En Yüksek Puan</option>
            <option value="name:asc">İsim: A-Z</option>
            <option value="name:desc">İsim: Z-A</option>
          </select>
        </div>

        {/* Products Grid/List */}
        <div className="mb-8">
          {productsLoading && productList.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Ürünler yükleniyor...</span>
            </div>
          ) : productsError ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Ürünler yüklenirken bir hata oluştu
                </h3>
                <p className="mt-1 text-sm text-gray-600">{productsError}</p>
                <button
                  onClick={() => {
                    dispatch(resetProducts());
                    dispatch(
                      fetchProducts({
                        limit: productsPerPage,
                        offset: 0,
                        categoryId,
                        sort,
                      }),
                    );
                  }}
                  className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Tekrar Dene
                </button>
              </div>
            </div>
          ) : filteredProducts.length === 0 && !productsLoading ? (
            <div className="animate-fadeInUp flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {debouncedSearchTerm.trim()
                  ? "Aradığınız ürün bulunamadı"
                  : "Ürün bulunamadı"}
              </h3>
              <p className="mt-1 max-w-md text-center text-sm text-gray-600">
                {debouncedSearchTerm.trim()
                  ? `"${debouncedSearchTerm}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
                  : "Arama kriterlerinize uygun ürün bulunamadı."}
              </p>
              {debouncedSearchTerm.trim() && (
                <button
                  onClick={clearSearch}
                  className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
                >
                  Aramayı Temizle
                </button>
              )}
            </div>
          ) : (
            <div
              className={`transition-opacity duration-300 ${showProducts && !isSearching ? "opacity-100" : "opacity-0"}`}
            >
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fadeInUp opacity-0"
                      style={{
                        animationDelay: `${index * 30}ms`,
                        animationFillMode: "forwards",
                      }}
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
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 transition-all duration-300">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fadeInUp opacity-0"
                      style={{
                        animationDelay: `${index * 30}ms`,
                        animationFillMode: "forwards",
                      }}
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
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Loading More Indicator */}
              {(loadingMore || isFetching) && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">
                    Daha fazla ürün yükleniyor...
                  </span>
                </div>
              )}

              {/* Load More Error */}
              {loadMoreError && (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="mb-2 text-sm text-red-600">{loadMoreError}</p>
                  <button
                    onClick={loadMore}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Tekrar Dene
                  </button>
                </div>
              )}

              {/* No More Products Message */}
              {!hasMore && filteredProducts.length > 0 && !loadingMore && (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-gray-600">
                    Tüm ürünler yüklendi ({filteredProducts.length} ürün)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
