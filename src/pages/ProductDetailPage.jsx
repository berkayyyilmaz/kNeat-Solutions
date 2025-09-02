import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Heart, ShoppingCart, Eye, Star, Loader2 } from "lucide-react";
import PageContent from "../layout/PageContent";
import { api } from "../services/api";

// Swiper stilleri
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import BestSeller from "../components/BestSeller";
import Clients from "../components/Clients";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ürün detayını API'den getir
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ürün detayı yüklenirken hata oluştu:", error);
        setError("Ürün detayı yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Rating yıldızlarını render eden fonksiyon
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={16} className="text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    return stars;
  };

  // Tab içerikleri
  const getTabContents = () => {
    if (!product) return {};

    return {
      description: {
        title: "Açıklama",
        content:
          product.description ||
          "Bu ürün için detaylı açıklama henüz eklenmemiştir.",
      },
      additionalInfo: {
        title: "Ek Bilgiler",
        content: [
          { label: "Ürün ID", value: product.id },
          { label: "Stok Durumu", value: `${product.stock} adet mevcut` },
          { label: "Kategori ID", value: product.category_id },
          { label: "Mağaza ID", value: product.store_id },
          {
            label: "Satış Sayısı",
            value: `${product.sell_count} adet satıldı`,
          },
        ],
      },
      reviews: {
        title: "Değerlendirmeler",
        content: `Bu ürün ${product.rating?.toFixed(1) || 0} yıldız puan almıştır. Henüz detaylı yorum bulunmamaktadır.`,
      },
    };
  };

  // Loading durumu
  if (loading) {
    return (
      <PageContent>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-gray-600">Ürün detayı yükleniyor...</p>
          </div>
        </div>
      </PageContent>
    );
  }

  // Error durumu
  if (error || !product) {
    return (
      <PageContent>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Ürün Bulunamadı
            </h1>
            <p className="mb-8 text-gray-600">
              {error || "Bu ürün mevcut değil veya kaldırılmış olabilir."}
            </p>
            <button
              onClick={() => window.history.back()}
              className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
            >
              Geri Dön
            </button>
          </div>
        </div>
      </PageContent>
    );
  }

  const tabContents = getTabContents();
  const sizes = ["S", "M", "L", "XL"]; // API'de size bilgisi yok, sabit array

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sol Taraf - Ürün Görselleri */}
          <div className="space-y-4">
            <Swiper
              style={{
                "--swiper-navigation-color": "#FF7B47",
                "--swiper-pagination-color": "#FF7B47",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="h-[600px] rounded-lg"
            >
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                      <img
                        src={image.url}
                        alt={`${product.name} - ${index + 1}`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/600/600";
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                    <img
                      src="/api/placeholder/600/600"
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>

            {product.images && product.images.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs-swiper h-24"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-gray-100">
                      <img
                        src={image.url}
                        alt={`thumbnail-${index + 1}`}
                        className="h-full w-full rounded-md object-cover"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/120/120";
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.rating.toFixed(1)})
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {product.sell_count} satış
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ₺{product.price}
              </span>
              <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Stokta {product.stock} adet
              </div>
            </div>

            <div className="prose prose-gray">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Beden Seçimi */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Beden Seçimi</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-12 rounded-md border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-2 border-primary bg-primary text-white"
                        : "border-gray-300 hover:border-primary"
                    } focus:outline-none`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <span className="mt-2 block text-sm text-gray-600">
                  Seçilen beden: {selectedSize}
                </span>
              )}
            </div>

            {/* Buton Grubu */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="w-full rounded-md bg-primary py-4 font-medium text-white transition-colors hover:bg-primary/90 sm:w-[200px]">
                Sepete Ekle
              </button>
              <div className="flex justify-between gap-2 sm:justify-start">
                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-primary hover:text-primary">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Section */}
        <div className="mt-16">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex justify-center space-x-8">
              {Object.entries(tabContents).map(([key, { title }]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`pb-4 text-lg font-medium transition-all duration-200 ${
                    activeTab === key
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="leading-relaxed text-gray-700">
                  {tabContents.description.content}
                </p>
              </div>
            )}

            {activeTab === "additionalInfo" && (
              <div className="space-y-4">
                {tabContents.additionalInfo.content.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 border-b border-gray-200 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                  >
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-gray-600">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="prose max-w-none">
                <p className="text-gray-700">{tabContents.reviews.content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BestSeller />
      <Clients />
    </PageContent>
  );
}
