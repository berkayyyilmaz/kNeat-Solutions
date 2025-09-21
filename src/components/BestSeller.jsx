import React from "react";
import ProductCard from "./ProductCard.jsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchBestSellers,
} from "../redux/actions/productActions";
import { STRINGS } from "../constants/strings";

const BestSeller = () => {
  const dispatch = useDispatch();
  const { bestsellers, bestsellersLoading, bestsellersError } = useSelector(
    (state) => state.products,
  );

  //  Mount status tracking
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);

  //  Set mounted status on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      //  Abort ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Kategorileri yükle
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Component mount olduğunda bestseller'ları Redux ile yükle
  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-fgray">
            {STRINGS.HOME.BESTSELLER_BADGE}
          </h4>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            {STRINGS.HOME.BESTSELLER_TITLE}
          </h3>
          <p className="mx-auto max-w-md text-fgray">
            En çok satan ürünlerimizi keşfedin
          </p>
        </div>

        {/* Products Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {bestsellersLoading ? (
            // Loading skeleton'ları
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-xs animate-pulse overflow-hidden rounded-2xl bg-gray-100">
                  <div className="h-80 w-full bg-gray-200"></div>
                  <div className="p-5">
                    <div className="mb-2 h-4 rounded bg-gray-200"></div>
                    <div className="mb-4 h-3 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-6 w-1/2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))
          ) : bestsellersError ? (
            // Error durumu
            <div className="col-span-full py-12 text-center">
              <p className="mb-4 text-red-500">{bestsellersError}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
              >
                Tekrar Dene
              </button>
            </div>
          ) : bestsellers.length > 0 ? (
            bestsellers.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard
                  productData={product}
                  displayOptions={{ viewType: "grid" }}
                  // Navigation bilgilerini direkt prop olarak geç
                  gender={product.gender || product.category?.gender}
                  categoryName={product.category?.title}
                  categoryId={product.category?.id || product.categoryId}
                />
              </div>
            ))
          ) : (
            // Ürün bulunamadığında gösterilecek mesaj
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500">Henüz bestseller ürün bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

//  Export memoized component
export default React.memo(BestSeller);
