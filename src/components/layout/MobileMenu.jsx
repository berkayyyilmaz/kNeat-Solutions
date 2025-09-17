import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const MobileMenu = ({
  isOpen = false,
  onClose,
  navLinks = [],
  categories = [],
  categoriesLoading = false,
  groupedCategories = {},
  className = "",
}) => {
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);

  const toggleMobileShop = () => {
    setIsMobileShopOpen((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        onClick={onClose}
      />
      <div
        className={`absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white md:hidden ${className}`}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.path}
                        className="block text-lg font-medium text-fgray transition-colors hover:text-primary"
                        onClick={onClose}
                      >
                        {link.name}
                      </Link>
                      <button
                        onClick={toggleMobileShop}
                        className="p-2 text-fgray transition-colors hover:text-primary"
                      >
                        <ChevronDown
                          size={20}
                          className={`transform transition-transform ${
                            isMobileShopOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {isMobileShopOpen && (
                      <div className="ml-4 mt-2 space-y-2">
                        {categoriesLoading || categories.length === 0 ? (
                          <div className="py-4 text-center">
                            <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-700">
                                Kategoriler hazırlanıyor...
                              </p>
                              <p className="text-xs text-gray-500">
                                Sunucumuz başlatılıyor
                              </p>
                            </div>
                          </div>
                        ) : (
                          Object.entries(groupedCategories).map(
                            ([gender, genderCategories]) => (
                              <div key={gender}>
                                <div className="mb-1 font-medium text-fgray">
                                  {gender}
                                </div>
                                {genderCategories.map((category) => (
                                  <Link
                                    key={category.id}
                                    to={`/shop/${category.gender}/${category.title
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${category.id}`}
                                    className="ml-2 block font-medium text-fgray transition-colors hover:text-primary"
                                    onClick={onClose}
                                  >
                                    {category.title}
                                  </Link>
                                ))}
                              </div>
                            ),
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="block text-lg font-medium text-fgray transition-colors hover:text-primary"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
