import React, { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";

const ProductSearch = ({
  searchTerm,
  onSearchChange,
  onDebouncedSearchChange,
  onClearSearch,
  placeholder = "Ürün ara...",
  debounceMs = 300,
  className = "",
}) => {
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search term - kullanıcı yazmayı bıraktıktan sonra arama yapar
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Arama durumunu kontrol et
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm && searchTerm.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, debouncedSearchTerm]);

  // Debounced değer değiştiğinde parent'a bildir
  useEffect(() => {
    if (onDebouncedSearchChange) {
      onDebouncedSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onDebouncedSearchChange]);

  const handleInputChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
    setIsSearching(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
      />

      {/* Arama temizleme butonu */}
      {searchTerm && !isSearching && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
          title="Aramayı temizle"
        >
          <X size={16} />
        </button>
      )}

      {/* Arama loading indicator */}
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 size={16} className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
