import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import PageContent from "../layout/PageContent";

// Swiper stilleri
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import BestSeller from "../components/BestSeller";
import Clients from "../components/Clients";

export default function ProductDetailPage() {
  const { id } = useParams();
  console.log("Ürün ID:", id); // ID'yi kontrol etmek için
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  // Örnek ürün verisi (gerçek projede API'den gelecek)
  const product = {
    name: "Ürün Adı",
    price: "999.99 TL",
    description: "Ürün açıklaması buraya gelecek...",
    images: [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3",
      "https://picsum.photos/800/600?random=4",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Siyah", value: "#000000" },
      { name: "Beyaz", value: "#FFFFFF" },
      { name: "Mavi", value: "#2563EB" },
      { name: "Kırmızı", value: "#DC2626" },
    ],
  };

  // Örnek tab içerikleri
  const tabContents = {
    description: {
      title: "Description",
      content: `Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.

      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
      
      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.`,
    },
    additionalInfo: {
      title: "Additional Information",
      content: [
        {
          label: "the quick fox jumps over the lazy dog",
          value: "the quick fox jumps over the lazy dog",
        },
        {
          label: "the quick fox jumps over the lazy dog",
          value: "the quick fox jumps over the lazy dog",
        },
        {
          label: "the quick fox jumps over the lazy dog",
          value: "the quick fox jumps over the lazy dog",
        },
        {
          label: "the quick fox jumps over the lazy dog",
          value: "the quick fox jumps over the lazy dog",
        },
      ],
    },
    reviews: {
      title: "Reviews (0)",
      content: "Henüz yorum yapılmamış.",
    },
  };

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sol Taraf - Ürün Görselleri */}
          <div className="space-y-4">
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
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
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

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
                  <div className="flex h-full w-full cursor-pointer items-center justify-center bg-gray-100">
                    <img
                      src={image}
                      alt={`thumbnail-${index + 1}`}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800">
              {product.price}
            </p>
            <p className="text-gray-600">{product.description}</p>

            {/* Beden Seçimi */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Beden</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-12 rounded-md border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-2 border-black"
                        : "border-gray-300 hover:border-black"
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

            {/* Renk Seçimi */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Renk</h3>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? "ring-2 ring-black ring-offset-2"
                        : ""
                    } ${
                      color.name === "Beyaz"
                        ? "border-gray-200"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor === color.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        {color.name === "Beyaz" ? (
                          <svg
                            className="h-4 w-4 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                  </button>
                ))}
                {selectedColor && (
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedColor}
                  </span>
                )}
              </div>
            </div>

            {/* Buton Grubu */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="w-full rounded-md bg-black py-4 text-white transition-colors hover:bg-gray-800 sm:w-[200px]">
                Select Options
              </button>
              <div className="flex justify-between gap-2 sm:justify-start">
                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-black">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-black">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-md border border-gray-300 transition-all hover:border-black">
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
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
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
                <p className="whitespace-pre-line">
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
                    <span className="font-medium text-gray-600">
                      {item.label}
                    </span>
                    <span className="text-gray-500">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="prose max-w-none">
                <p>{tabContents.reviews.content}</p>
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
