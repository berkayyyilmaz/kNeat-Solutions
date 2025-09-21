import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";

// Swiper stilleri
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const ProductImages = ({
  images = [],
  productName = "Ürün",
  className = "",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //  Normalize images - hem string hem object formatını destekle
  const normalizeImages = (imageArray) => {
    if (!Array.isArray(imageArray) || imageArray.length === 0) {
      return [{ url: "/api/placeholder/600/600" }];
    }

    return imageArray.map((img, index) => {
      // String format (ProductModel'den geliyorsa)
      if (typeof img === "string") {
        return { url: img };
      }
      // Object format (legacy, direct API response)
      if (typeof img === "object" && img.url) {
        return img;
      }
      // Fallback
      return { url: "/api/placeholder/600/600" };
    });
  };

  const displayImages = normalizeImages(images);

  //  Debug: Image data kontrol
  if (process.env.NODE_ENV === "development") {
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Ana Görsel Carousel */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#FF7B47",
          "--swiper-pagination-color": "#FF7B47",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[600px] rounded-lg"
      >
        {displayImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
              <img
                src={image.url}
                alt={`${productName} - ${index + 1}`}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.src = "/api/placeholder/600/600";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Carousel - Sadece birden fazla görsel varsa göster */}
      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper h-24"
        >
          {displayImages.map((image, index) => (
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
  );
};

export default ProductImages;
