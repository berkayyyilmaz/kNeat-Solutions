import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../redux/actions/productActions";

function CategoryList() {
  const dispatch = useDispatch();
  const { categories, categoriesLoading, categoriesError } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categoriesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Kategoriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Hata: {categoriesError}</p>
        </div>
      </div>
    );
  }

  // Rating değerine göre sıralayıp en iyi 5'ini al
  const topCategories = categories
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Popüler Kategoriler
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            En çok tercih edilen kategorilerimizi keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.gender}/${category.title
                .toLowerCase()
                .replace(/\s+/g, "-")}/${category.id}`}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                {category.img ? (
                  <img
                    src={category.img}
                    alt={category.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <span className="text-2xl font-semibold text-gray-600">
                      {category.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                  {category.title}
                </h3>
                <p className="mb-2 text-sm capitalize text-gray-500">
                  {category.gender === "k"
                    ? "Kadın"
                    : category.gender === "e"
                      ? "Erkek"
                      : "Unisex"}
                </p>
                {category.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {category.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryList;
