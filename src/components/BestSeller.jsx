import ProductCard from "./ProductCard.jsx";
import { products } from "../data/bestsellerproducts.js";

export default function BestSeller() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-fgray">
            Featured Products
          </h4>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            BESTSELLER PRODUCT
          </h3>
          <p className="mx-auto max-w-md text-fgray">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Products Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {products.map((product, index) => (
            <div key={index} className="flex justify-center">
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                department={product.department}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                colors={product.colors}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
