import ProductCard from "./ProductCard.jsx";
import { useState, useEffect, useMemo } from "react";
import { api } from "../services/api";

export default function BestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Component mount olduğunda en yüksek puanlı ürünleri yükle
  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Yeterli sayıda ürün getir ve satış sayısına göre sırala
        const response = await api.get("/products?limit=100");

        // En çok satan 8 ürünü seç
        const bestProducts = response.data.products
          .filter((product) => product.sell_count > 0) // Satış sayısı olan ürünleri filtrele
          .sort((a, b) => b.sell_count - a.sell_count) // Satış sayısına göre büyükten küçüğe sırala
          .slice(0, 8); // İlk 8 ürünü al

        setProducts(bestProducts);
      } catch (error) {
        console.error("Bestseller ürünler yüklenirken hata oluştu:", error);
        setError("Bestseller ürünler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellerProducts();
  }, []); // Sadece component mount'ta çalışsın

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-fgray">
            Featured Products
          </h4>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            BESTSELLER PRODUCTS
          </h3>
          <p className="mx-auto max-w-md text-fgray">
            En çok satan ürünlerimizi keşfedin
          </p>
        </div>

        {/* Products Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {loading ? (
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
          ) : error ? (
            // Error durumu
            <div className="col-span-full py-12 text-center">
              <p className="mb-4 text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
              >
                Tekrar Dene
              </button>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard
                  id={product.id}
                  image={product.images?.[0]?.url}
                  title={product.name}
                  department={product.category?.title || "Genel"}
                  price={product.price}
                  rating={product.rating}
                  colors={[]}
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
}
