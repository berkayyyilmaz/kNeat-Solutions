import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import {
  fetchProducts,
  loadMoreProducts,
  resetProducts,
} from "../redux/actions/productActions";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import ProductFilters from "./product/ProductFilters";
import ProductGrid from "./product/ProductGrid";

const ProductList = ({ categoryId, gender, categoryName }) => {
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [productsPerPage] = useState(12);

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

  // Mobil cihaz kontrolü
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite scroll hook'unu kullan - sadece web için
  const { isFetching } = useInfiniteScroll(loadMore, {
    threshold: 500, // Web için threshold
    enabled: hasMore && !productsLoading && !loadingMore && !isMobile, // Mobilde infinite scroll kapalı
  });

  // Search term handler - ProductFilters componentinden gelecek
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleDebouncedSearchChange = (debouncedTerm) => {
    setDebouncedSearchTerm(debouncedTerm);
  };

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
    setDebouncedSearchTerm("");
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
        </div>

        {/* Filters */}
        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onDebouncedSearchChange={handleDebouncedSearchChange}
          onClearSearch={clearSearch}
          sortValue={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Products Grid/List */}
        <ProductGrid
          products={filteredProducts}
          viewMode={viewMode}
          loading={productsLoading}
          error={productsError}
          searchTerm={debouncedSearchTerm}
          onClearSearch={clearSearch}
          loadingMore={loadingMore || isFetching}
          loadMoreError={loadMoreError}
          hasMore={hasMore}
          isMobile={isMobile}
          onLoadMore={loadMore}
          gender={gender}
          categoryName={categoryName}
          categoryId={categoryId}
          className="mb-8"
        />
      </div>
    </section>
  );
};

export default ProductList;
