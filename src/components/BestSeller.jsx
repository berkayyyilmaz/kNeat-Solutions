import ProductCard from "./ProductCard.jsx";
import { products } from "../data/bestsellerproducts.js";

export default function BestSeller() {
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
            id={product.id}
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
