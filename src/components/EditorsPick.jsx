import React from "react";
import men from "../assets/editorspick/men.png";
import women from "../assets/editorspick/women.png";
import accessories from "../assets/editorspick/accessories.png";
import kid from "../assets/editorspick/kid.png";

const EditorsPick = () => {
  const categories = [
    {
      title: "MEN",
      image: men,
      className: "col-span-2 row-span-2",
    },
    {
      title: "WOMEN",
      image: women,
      className: "col-span-1 row-span-2",
    },
    {
      title: "ACCESSORIES",
      image: accessories,
      className: "col-span-1 row-span-1",
    },
    {
      title: "KIDS",
      image: kid,
      className: "col-span-1 row-span-1",
    },
  ];

  return (
    <section className="bg-lightGray py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            EDITOR'S PICK
          </h1>
          <p className="mx-auto max-w-md text-fgray">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Categories Grid - Mobile: Stack vertically, Desktop: Grid layout */}
        <div className="mx-auto max-w-6xl">
          {/* Mobile Layout */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative h-80 overflow-hidden rounded-xl"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30" />
                <div className="absolute bottom-6 left-6">
                  <button className="bg-white px-8 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg">
                    {category.title}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden h-[500px] grid-cols-4 grid-rows-2 gap-4 md:grid">
            {/* MEN - Large card */}
            <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-xl">
              <img
                src={categories[0].image}
                alt={categories[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30" />
              <div className="absolute bottom-6 left-6">
                <button className="bg-white px-10 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg">
                  {categories[0].title}
                </button>
              </div>
            </div>

            {/* WOMEN - Tall card */}
            <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-xl">
              <img
                src={categories[1].image}
                alt={categories[1].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30" />
              <div className="absolute bottom-6 left-6">
                <button className="bg-white px-8 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg">
                  {categories[1].title}
                </button>
              </div>
            </div>

            {/* ACCESSORIES - Small card top */}
            <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-xl">
              <img
                src={categories[2].image}
                alt={categories[2].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30" />
              <div className="absolute bottom-4 left-4">
                <button className="bg-white px-6 py-2 text-xs font-bold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg">
                  {categories[2].title}
                </button>
              </div>
            </div>

            {/* KIDS - Small card bottom */}
            <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-xl">
              <img
                src={categories[3].image}
                alt={categories[3].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-30" />
              <div className="absolute bottom-4 left-4">
                <button className="bg-white px-6 py-2 text-xs font-bold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg">
                  {categories[3].title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
