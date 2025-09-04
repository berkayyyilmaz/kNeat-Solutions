import { useState, useEffect } from "react";

/**
 * Debounce hook - değer değişikliklerini belirli bir süre gecikme ile döndürür
 * @param {any} value - Debounce edilecek değer
 * @param {number} delay - Gecikme süresi (ms)
 * @returns {any} Debounce edilmiş değer
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function - component unmount olduğunda veya value değiştiğinde önceki timeout'u temizle
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
