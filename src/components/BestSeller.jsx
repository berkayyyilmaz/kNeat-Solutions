import ProductCard from "./ProductCard.jsx";

import React from "react";

export default function BestSeller() {
  const products = [
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Graphic Design",
      department: "English Department",
      oldPrice: "16.48",
      newPrice: "6.48",
      colors: ["#E63946", "#457B9D", "#2A9D8F", "#264653"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Web Development",
      department: "Computer Science",
      oldPrice: "25.00",
      newPrice: "15.00",
      colors: ["#FF6F61", "#6B705C", "#FFB703", "#023047"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Photography Basics",
      department: "Arts & Media",
      oldPrice: "30.00",
      newPrice: "20.00",
      colors: ["#F94144", "#F3722C", "#F9C74F", "#90BE6D"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Business Strategy",
      department: "Management",
      oldPrice: "40.00",
      newPrice: "25.00",
      colors: ["#577590", "#43AA8B", "#F9A03F", "#F4D35E"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Digital Marketing",
      department: "Marketing",
      oldPrice: "50.00",
      newPrice: "35.00",
      colors: ["#9B5DE5", "#F15BB5", "#FEE440", "#00BBF9"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Illustration Masterclass",
      department: "Design",
      oldPrice: "45.00",
      newPrice: "30.00",
      colors: ["#606C38", "#283618", "#FEFAE0", "#DDA15E"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Personal Finance",
      department: "Finance",
      oldPrice: "35.00",
      newPrice: "20.00",
      colors: ["#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4"],
    },
    {
      image: "https://via.placeholder.com/348x427", // Replace with your image URL
      title: "Personal Finance",
      department: "Finance",
      oldPrice: "35.00",
      newPrice: "20.00",
      colors: ["#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4"],
    },
  ];

  return (
    <>
      <div className="px-4 py-8 text-center">
        <h4>Featured Products</h4>
        <h3 className="mb-2 text-center text-2xl font-bold">
          BESTSELLER PRODUCT
        </h3>
        <p>Problems trying to resolve the conflict between</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            department={product.department}
            oldPrice={product.oldPrice}
            newPrice={product.newPrice}
            colors={product.colors}
          />
        ))}
      </div>
    </>
  );
}
