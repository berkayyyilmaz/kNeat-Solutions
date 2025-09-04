import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (callback, options = {}) => {
  const {
    threshold = 100, // Sayfanın alt kısmından kaç pixel önce callback'i çağır
    enabled = true, // Hook'u aktif/pasif yapma kontrolü
  } = options;

  const [isFetching, setIsFetching] = useState(false);

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

      // Eğer sayfa altına yakın bir konumdaysak ve henüz fetch işlemi yapılmıyorsa
      if (scrollTop + clientHeight >= scrollHeight - threshold && !isFetching) {
        setIsFetching(true);
      }
    };

    // Scroll event listener'ı ekle
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, enabled, isFetching]);

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
