import React from "react";
import { LayoutGrid, List, Search, X } from "lucide-react";

const ProductFilters = ({
  // Filter props (API filter)
  filter,
  onFilterChange,

  // Sort props
  sortValue,
  onSortChange,

  // View mode props
  viewMode,
  onViewModeChange,

  // Config props
  showFilter = true,
  showSort = true,
  showViewMode = true,
  filterPlaceholder = "Ürün ara...", // API filter placeholder
  className = "",
}) => {
  const sortOptions = [
    { value: "", label: "Sırala" },
    { value: "price:asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price:desc", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "rating:asc", label: "Puan: Düşükten Yükseğe" }, //  API requirement
    { value: "rating:desc", label: "Puan: Yüksekten Düşüğe" }, //  API requirement
  ];

  const handleSortChange = (e) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  const handleFilterChange = (e) => {
    if (onFilterChange) {
      onFilterChange(e.target.value);
    }
  };

  const handleClearFilter = () => {
    if (onFilterChange) {
      onFilterChange("");
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
      {/* API Filter Input - Sol tarafta */}
      {showFilter && (
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder={filterPlaceholder}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
          />

          {/* Temizleme butonu */}
          {filter && (
            <button
              onClick={handleClearFilter}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
              title="Aramayı temizle"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Sağ taraf - Sort ve View Mode */}
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
