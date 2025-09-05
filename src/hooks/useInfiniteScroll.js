import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (callback, options = {}) => {
  const {
    threshold = 100, // Sayfanın alt kısmından kaç pixel önce callback'i çağır
    mobileThreshold, // Mobil için özel threshold
    enabled = true, // Hook'u aktif/pasif yapma kontrolü
  } = options;

  const [isFetching, setIsFetching] = useState(false);

  // Mobil cihaz algılama
  const isMobile = useCallback(() => {
    return window.innerWidth <= 768;
  }, []);

  // Aktif threshold değerini belirle
  const getActiveThreshold = useCallback(() => {
    if (mobileThreshold !== undefined && isMobile()) {
      return mobileThreshold;
    }
    return threshold;
  }, [threshold, mobileThreshold, isMobile]);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      // Sayfa yükseliği ile scroll pozisyonunu kontrol et
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      // Aktif threshold değerini al
      const activeThreshold = getActiveThreshold();

      // Sayfa altına ne kadar yakın olduğumuzu hesapla
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Debug için (sadece geliştirme sırasında)
      // console.log('Distance from bottom:', distanceFromBottom, 'Threshold:', activeThreshold, 'isMobile:', isMobile());

      // Eğer sayfa altına yakın bir konumdaysak ve henüz fetch işlemi yapılmıyorsa
      if (distanceFromBottom <= activeThreshold && !isFetching) {
        setIsFetching(true);
      }
    };

    // Scroll event listener'ı ekle
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, enabled, isFetching, getActiveThreshold]);

  useEffect(() => {
    if (!isFetching) return;

    // Callback'i çağır ve işlem bitince isFetching'i false yap
    const fetchData = async () => {
      try {
        await callback();
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [isFetching, callback]);

  const reset = useCallback(() => {
    setIsFetching(false);
  }, []);

  return { isFetching, reset };
};

export default useInfiniteScroll;
