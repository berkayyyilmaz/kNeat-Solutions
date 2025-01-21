import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import PageContent from "../layout/PageContent";

// Swiper stilleri
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

export default function ProductDetailPage() {
  const { id } = useParams();
  console.log("Ürün ID:", id); // ID'yi kontrol etmek için
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

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
                    className="h-12 w-12 rounded-md border border-gray-300 hover:border-black focus:border-black focus:outline-none"
                  >
                    {size}
                  </button>
                ))}
              </div>
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

            {/* Sepete Ekle Butonu */}
            <button className="w-full rounded-md bg-black py-4 text-white transition-colors hover:bg-gray-800">
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </PageContent>
  );
}
