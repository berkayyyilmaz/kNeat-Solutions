import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Pagination({
  totalPosts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) {
  const totalPages = Math.ceil(totalPosts / productsPerPage);

  // Helper function to generate visible page numbers
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Near the beginning: 1 2 3 4 5 ... last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end: 1 ... (last-4) (last-3) (last-2) (last-1) last
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: 1 ... (current-1) current (current+1) ... last
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Page info */}
      <div className="text-sm text-gray-700">
        Sayfa <span className="font-medium">{currentPage}</span> /{" "}
        <span className="font-medium">{totalPages}</span> (Toplam {totalPosts}{" "}
        ürün)
      </div>

      <nav
        className="flex items-center justify-center space-x-1"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-sm font-medium text-fgray transition-all hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Önceki sayfa"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-1">
          {visiblePages.map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="flex h-10 w-10 items-center justify-center text-gray-400"
              >
                <MoreHorizontal size={16} />
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-primary text-white shadow-md"
                    : "border border-gray-300 bg-white text-fgray hover:bg-gray-50 hover:text-gray-700"
                }`}
                aria-label={`Sayfa ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-sm font-medium text-fgray transition-all hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Sonraki sayfa"
        >
          <ChevronRight size={16} />
        </button>
      </nav>

      {/* Quick page navigation for large datasets */}
      {totalPages > 10 && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Sayfaya git:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            className="w-16 rounded border border-gray-300 px-2 py-1 text-center focus:border-primary focus:outline-none"
          />
          <span className="text-gray-600">/ {totalPages}</span>
        </div>
      )}
    </div>
  );
}
