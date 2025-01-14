import { ChevronRight } from "lucide-react";
import PageContent from "../layout/PageContent";
import image1 from "../assets/clothingcard/media_bg-cover.png";
import ClothingCard from "../components/ClothingCard";
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
      <div className="grid grid-cols-1 items-center justify-items-center gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        <ClothingCard image={image1} title="CLOTHS" />
      </div>
    </PageContent>
  );
}
