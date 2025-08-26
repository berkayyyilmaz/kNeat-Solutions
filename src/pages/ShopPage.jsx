import { ChevronRight } from "lucide-react";
import PageContent from "../layout/PageContent";
import ClothingCard from "../components/ClothingCard";
import { shopCards } from "../data/shopCards";
import ProductList from "../components/ProductList";
import Clients from "../components/Clients";

export default function ShopPage() {
  return (
    <PageContent>
      {/* Breadcrumb Section */}
      <section className="bg-lightGray py-8">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Shop
            </h1>
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              <span className="font-medium text-gray-900">Home</span>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <span className="text-gray-400">Shop</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-lightGray py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-5">
            {shopCards.map((card, index) => (
              <div key={index} className="flex justify-center">
                <ClothingCard
                  image={card.image}
                  title={card.title}
                  subtitle={card.subtitle}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductList />

      {/* Clients Section */}
      <Clients />
    </PageContent>
  );
}
