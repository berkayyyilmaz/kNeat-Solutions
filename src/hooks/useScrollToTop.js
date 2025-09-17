import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sayfa değişikliklerinde otomatik olarak en üste scroll yapar
 */
const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Sayfa değiştiğinde en üste scroll yap
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);
};

export default useScrollToTop;
