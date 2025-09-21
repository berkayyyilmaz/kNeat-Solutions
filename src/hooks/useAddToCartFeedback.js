import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sepete ekleme sonrası kullanıcıya hissiyat veren geri bildirim kancası
 * - Kısa süreli "eklendi" durumu
 * - Toast bildirimi
 */
export default function useAddToCartFeedback({ successMs = 1200 } = {}) {
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef(null);

  const showAddedFeedback = useCallback(
    (_message) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsAdded(true);
      timerRef.current = setTimeout(() => {
        setIsAdded(false);
        timerRef.current = null;
      }, successMs);
    },
    [successMs],
  );

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return { isAdded, showAddedFeedback };
}
