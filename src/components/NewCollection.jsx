import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-12 w-12" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all"
    aria-label="Next slide"
  >
    <ChevronRight className="h-12 w-12" />
  </button>
);

export default function NewCollection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="mx-auto w-screen max-w-4xl bg-red-600">
      <Slider {...settings}>
        <div className="relative">
          <img
            className="h-auto w-full"
            src="https://placehold.co/600x400"
            alt="Slide 1"
          />
        </div>
        <div className="relative">
          <img
            className="h-auto w-full"
            src="https://placehold.co/600x400"
            alt="Slide 2"
          />
        </div>
        <div className="relative">
          <img
            className="h-auto w-full"
            src="https://via.placeholder.com/800x400?text=Slide+3"
            alt="Slide 3"
          />
        </div>
      </Slider>
    </div>
  );
}
