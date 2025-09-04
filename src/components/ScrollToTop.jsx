import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll pozisyonunu kontrol et
  useEffect(() => {
    const toggleVisibility = () => {
      // Sayfa %30 aşağıya indiğinde butonu göster
      const scrollThreshold = window.innerHeight * 0.3;
      if (window.pageYOffset > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Sayfanın en üstüne scroll yap
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex h-12 w-12 transform items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-secondary hover:bg-secondary hover:text-white hover:shadow-xl"
          aria-label="Sayfanın üstüne git"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
