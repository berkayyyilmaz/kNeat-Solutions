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
import { PAGINATION, UI } from "../constants";
import { DataTransformers } from "../models/dataModels";
import { ProductFactory } from "../models/dataFactories";

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
  const [filter, setFilter] = useState(""); //  Filter state eklendi
  const [productsPerPage] = useState(PAGINATION.PRODUCTS_PER_PAGE);

  //  API parametreleri: category, filter, sort değiştiğinde yeni GET request
  useEffect(() => {
    dispatch(resetProducts());

    const params = {
      limit: productsPerPage,
      offset: 0,
    };

    //  Doğru API parameter: category (categoryId değil!)
    if (categoryId) {
      params.category = categoryId;
    }

    //  Filter parametresi
    if (filter.trim()) {
      params.filter = filter.trim();
    }

    //  Sort parametresi
    if (sort) {
      params.sort = sort;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, filter, sort, productsPerPage]); //  filter dependency eklendi

  //  LoadMore ile aynı parametreleri koru (category + filter + sort)
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || productsLoading) {
      return;
    }

    const params = {
      limit: productsPerPage,
      offset: productList.length,
    };

    //  Aynı parametreleri koru - category
    if (categoryId) {
      params.category = categoryId;
    }

    //  Aynı parametreleri koru - filter
    if (filter.trim()) {
      params.filter = filter.trim();
    }

    //  Aynı parametreleri koru - sort
    if (sort) {
      params.sort = sort;
    }

    await dispatch(loadMoreProducts(params));
  }, [
    dispatch,
    categoryId,
    filter, //  filter dependency eklendi
    sort,
    productsPerPage,
    hasMore,
    loadingMore,
    productsLoading,
    productList.length,
  ]);

  // Mobil cihaz kontrolü
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= UI.MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= UI.MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite scroll hook'unu kullan - sadece web için
  const { isFetching } = useInfiniteScroll(loadMore, {
    threshold: UI.INFINITE_SCROLL_THRESHOLD,
    enabled: hasMore && !productsLoading && !loadingMore && !isMobile, // Mobilde infinite scroll kapalı
  });

  // Artık sadece API filter kullanılıyor, local search kaldırıldı

  //  Expensive calculation memoized
  const headerTitle = useMemo(() => {
    if (categoryId) {
      return "Kategori Ürünleri";
    }
    if (gender) {
      return gender === "k" ? "Kadın Ürünleri" : "Erkek Ürünleri";
    }
    return "Tüm Ürünler";
  }, [categoryId, gender]);

  //  Results text memoized
  const resultsText = useMemo(() => {
    const currentCount = productList.length;
    if (filter.trim()) {
      return `"${filter}" için ${currentCount} ürün bulundu`;
    }
    if (total > 0) {
      return `${currentCount} / ${total} ürün gösteriliyor`;
    }
    return `${currentCount} ürün gösteriliyor`;
  }, [productList.length, total, filter]);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {headerTitle}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{resultsText}</p>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          sortValue={sort}
          onSortChange={setSort}
          filter={filter}
          onFilterChange={setFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Products Grid/List */}
        <ProductGrid
          products={productList}
          viewMode={viewMode}
          loading={productsLoading}
          error={productsError}
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

//  Export memoized component
export default React.memo(ProductList);
