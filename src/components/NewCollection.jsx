import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero from "../assets/newcollection/hero1.png";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-6 w-6" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label="Next slide"
  >
    <ChevronRight className="h-6 w-6" />
  </button>
);

export default function NewCollection() {
  const slides = [
    {
      image: hero,
      alt: "New Collection Slide 1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Elegant Fashion Store",
    },
    {
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Shopping Mall Experience",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="relative h-[500px] w-full overflow-hidden sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]">
              <img
                className={`h-full w-full object-cover ${index === 0 ? "object-top" : "object-center"}`}
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
