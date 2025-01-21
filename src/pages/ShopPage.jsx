import { ChevronRight } from "lucide-react";
import PageContent from "../layout/PageContent";
import ClothingCard from "../components/ClothingCard";
import { shopCards } from "../data/shopCards";
import ProductList from "../components/ProductList";
import Clients from "../components/Clients";

export default function ShopPage() {
  return (
    <PageContent>
      <div className="bg-lightGray">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center gap-4 px-4 py-4 text-center sm:flex-row sm:justify-between lg:px-10">
            <h3>Shop</h3>
            <p className="text-bold flex items-center justify-center">
              Home
              <ChevronRight color="#BDBDBD" className="mx-2" />{" "}
              {/* İkonun etrafına margin ekleyebilirsin */}
              <span className="text-[#BDBDBD]">Shop</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-lightGray">
        <div className="container mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center justify-items-center gap-y-4 py-4 lg:pb-24 xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {shopCards.map((card, index) => (
              <ClothingCard
                key={index}
                image={card.image}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Ürün Listesi */}
      <ProductList />
      <Clients />
    </PageContent>
  );
}
