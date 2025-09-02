import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { LayoutGrid, List, Loader2, Search } from "lucide-react";
import { fetchProducts } from "../redux/actions/productActions";

const ProductList = ({ categoryId, gender }) => {
  const dispatch = useDispatch();
  const { productList, total, productsLoading, productsError, limit, offset } =
    useSelector((state) => state.products);

  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  // API'den ürünleri çek
  useEffect(() => {
    const params = {
      limit: productsPerPage,
      offset: (currentPage - 1) * productsPerPage,
    };

    if (categoryId) {
      params.categoryId = categoryId;
    }

    if (sort) {
      params.sort = sort;
    }

    if (filter) {
      params.filter = filter;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, currentPage, productsPerPage, sort, filter]);

  // Kategoriye ve cinsiyete göre ürünleri filtrele (client-side)
  const filteredProducts = useMemo(() => {
    let filtered = [...productList];

    // Gender filtrelemesi şu an için kaldırıldı çünkü API response'unda gender field'ı yok
    // if (gender) {
    //   filtered = filtered.filter((product) => {
    //     return product.gender === gender;
    //   });
    // }

    return filtered;
  }, [productList]);

  // Sayfa değiştiğinde sayfayı sıfırla
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, sort, filter]);

  const getHeaderTitle = () => {
    if (categoryId) {
      return "Kategori Ürünleri";
    }
    if (gender) {
      return gender === "k"
        ? "Kadın Ürünleri"
        : gender === "e"
          ? "Erkek Ürünleri"
          : "Ürünler";
    }
    return "Tüm Ürünler";
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-gray-600">Ürünler yükleniyor...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="py-12 text-center">
      <p className="mb-4 text-lg text-red-500">
        Ürünler yüklenirken bir hata oluştu
      </p>
      <p className="text-gray-600">{productsError}</p>
      <button
        onClick={() =>
          dispatch(
            fetchProducts({
              categoryId,
              limit: productsPerPage,
              offset: (currentPage - 1) * productsPerPage,
              sort,
              filter,
            }),
          )
        }
        className="mt-4 rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
      >
        Tekrar Dene
      </button>
    </div>
  );

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {getHeaderTitle()}
            </h1>
            <p className="mt-1 text-fgray">
              {productsLoading
                ? "Yükleniyor..."
                : `${filteredProducts.length} ürün gösteriliyor (toplam ${total})`}
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
                disabled={productsLoading}
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
                disabled={productsLoading}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Filter Input */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ürünlerde ara..."
              value={filter}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={productsLoading}
            />
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="whitespace-nowrap text-sm text-fgray"
            >
              Sırala:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={handleSortChange}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={productsLoading}
            >
              <option value="">Varsayılan</option>
              <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating:asc">Puan: Düşükten Yükseğe</option>
              <option value="rating:desc">Puan: Yüksekten Düşüğe</option>
              <option value="sell_count:desc">En Çok Satan</option>
              <option value="sell_count:asc">En Az Satan</option>
            </select>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="mb-12">
          {productsLoading ? (
            <LoadingSpinner />
          ) : productsError ? (
            <ErrorMessage />
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                {filter
                  ? `"${filter}" için ürün bulunamadı.`
                  : "Bu kategoride henüz ürün bulunmamaktadır."}
              </p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex justify-center">
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
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.images?.[0]?.url}
                      title={product.name}
                      department={product.category?.title || "Genel"}
                      price={product.price}
                      rating={product.rating}
                      colors={[]}
                      viewType={viewMode}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination - Sadece ürün varsa ve loading değilse göster */}
        {!productsLoading && !productsError && total > 0 && (
          <div className="flex justify-center">
            <Pagination
              totalPosts={total}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
