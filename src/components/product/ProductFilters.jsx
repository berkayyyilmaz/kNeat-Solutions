import React from "react";
import { LayoutGrid, List } from "lucide-react";
import ProductSearch from "./ProductSearch";

const ProductFilters = ({
  // Search props
  searchTerm,
  onSearchChange,
  onDebouncedSearchChange,
  onClearSearch,

  // Sort props
  sortValue,
  onSortChange,

  // View mode props
  viewMode,
  onViewModeChange,

  // Config props
  showSearch = true,
  showSort = true,
  showViewMode = true,
  searchPlaceholder = "Ürün ara...",
  className = "",
}) => {
  const sortOptions = [
    { value: "", label: "Sırala" },
    { value: "price:asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price:desc", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "rating:desc", label: "En Yüksek Puan" },
    { value: "name:asc", label: "İsim: A-Z" },
    { value: "name:desc", label: "İsim: Z-A" },
  ];

  const handleSortChange = (e) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  const handleViewModeChange = (mode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  return (
    <div
      className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      {/* Search Filter */}
      {showSearch && (
        <ProductSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onDebouncedSearchChange={onDebouncedSearchChange}
          onClearSearch={onClearSearch}
          placeholder={searchPlaceholder}
        />
      )}

      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        {showSort && (
          <select
            value={sortValue}
            onChange={handleSortChange}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* View Mode Toggle */}
        {showViewMode && (
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => handleViewModeChange("grid")}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid görünümü"
            >
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => handleViewModeChange("list")}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Liste görünümü"
            >
              <List size={16} />
              <span className="hidden sm:inline">Liste</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
