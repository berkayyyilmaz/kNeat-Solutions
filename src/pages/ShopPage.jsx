import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PageContent from "../layout/PageContent";
import ClothingCard from "../components/ClothingCard";
import { shopCards } from "../data/shopCards";
import ProductList from "../components/ProductList";
import Clients from "../components/Clients";
import { fetchCategories } from "../redux/actions/productActions";

export default function ShopPage() {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  // Kategorileri yükle
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // URL parametrelerinden kategori bilgilerini al
  const currentCategory = categoryId
    ? categories.find((cat) => cat.id === parseInt(categoryId))
    : null;

  // Breadcrumb için başlık oluştur
  const getPageTitle = () => {
    if (currentCategory) {
      return currentCategory.title;
    }
    if (gender) {
      return gender === "k" ? "Kadın" : gender === "e" ? "Erkek" : gender;
    }
    return "Shop";
  };

  // Breadcrumb için yol oluştur
  const getBreadcrumbs = () => {
    const breadcrumbs = ["Home"];

    if (gender) {
      breadcrumbs.push(
        gender === "k" ? "Kadın" : gender === "e" ? "Erkek" : gender,
      );
    }

    if (currentCategory) {
      breadcrumbs.push(currentCategory.title);
    } else if (!gender) {
      breadcrumbs.push("Shop");
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <PageContent>
      {/* Breadcrumb Section */}
      <section className="bg-lightGray py-8">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {getPageTitle()}
            </h1>
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  <span
                    className={
                      index === breadcrumbs.length - 1
                        ? "text-gray-400"
                        : "font-medium text-gray-900"
                    }
                  >
                    {crumb}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight size={16} className="mx-2 text-gray-400" />
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Categories Section - Sadece ana shop sayfasında göster */}
      {!categoryId && (
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
      )}

      {/* Products Section */}
      <ProductList
        categoryId={categoryId}
        gender={gender}
        categoryName={categoryName}
      />

      {/* Clients Section */}
      <Clients />
    </PageContent>
  );
}
