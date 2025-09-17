import React from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = ({
  categories = [],
  categoriesLoading = false,
  groupedCategories = {},
  onCategoryClick,
  className = "",
}) => {
  return (
    <div
      className={`animate-slideDown absolute left-0 z-50 mt-2 w-96 bg-white py-6 shadow-xl ${className}`}
    >
      <div className="grid grid-cols-2 gap-6 px-6">
        {categoriesLoading || categories.length === 0 ? (
          // Kategoriler yüklenirken gösterilecek profesyonel mesaj
          <div className="col-span-2 py-8 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
            <div className="space-y-2">
              <p className="font-montserrat text-sm font-semibold text-gray-700">
                Kategoriler hazırlanıyor...
              </p>
              <p className="font-montserrat text-xs text-gray-500">
                Sunucumuz başlatılıyor, lütfen birkaç saniye bekleyiniz
              </p>
            </div>
          </div>
        ) : (
          Object.entries(groupedCategories).map(
            ([gender, genderCategories]) => (
              <div key={gender}>
                <h3 className="mb-4 pb-2 font-montserrat text-sm font-bold uppercase tracking-wider text-gray-900">
                  {gender}
                </h3>
                <div className="space-y-3">
                  {genderCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/shop/${category.gender}/${category.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${category.id}`}
                      className="block py-1 font-montserrat text-sm font-semibold text-fgray transition-colors hover:text-primary"
                      onClick={onCategoryClick}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
};

export default CategoryDropdown;
