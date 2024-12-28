import React from "react";
import Slider from "react-slick";

export default function NewCollection() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    prevArrow: (
      <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer text-4xl text-white">
        ‹
      </div>
    ),
    nextArrow: (
      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer text-4xl text-white">
        ›
      </div>
    ),
  };
  return (
    <div className="mx-auto w-full max-w-4xl bg-red-600">
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
