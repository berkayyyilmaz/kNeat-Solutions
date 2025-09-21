import { useRef, useEffect } from "react";

/**
 * Hook to track component mount status
 * Prevents setState calls on unmounted components
 */
const useIsMounted = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return () => isMountedRef.current;
};

export default useIsMounted;
