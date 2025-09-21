import { useState, useEffect, useCallback, useRef } from "react";
import { UI } from "../constants";

const useInfiniteScroll = (callback, options = {}) => {
  const {
    threshold = UI.INFINITE_SCROLL_THRESHOLD,
    mobileThreshold,
    enabled = true,
  } = options;

  const [isFetching, setIsFetching] = useState(false);

  //  Stable callback reference
  const stableCallback = useRef(callback);
  useEffect(() => {
    stableCallback.current = callback;
  }, [callback]);

  //  Memoized scroll handler - stable reference for cleanup
  const handleScroll = useCallback(() => {
    if (!enabled) return;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    // Aktif threshold değerini belirle
    const activeThreshold =
      mobileThreshold !== undefined && window.innerWidth <= UI.MOBILE_BREAKPOINT
        ? mobileThreshold
        : threshold;

    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceFromBottom <= activeThreshold && !isFetching) {
      setIsFetching(true);
    }
  }, [threshold, mobileThreshold, enabled, isFetching]);

  //  Event listener with proper cleanup
  useEffect(() => {
    if (!enabled) return;

    //  Add listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    //  Cleanup function - exact same reference guaranteed
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, enabled]); //  Minimal dependencies

  //  Async callback handling
  useEffect(() => {
    if (!isFetching) return;

    let isCanceled = false; //  Cancellation flag

    const fetchData = async () => {
      try {
        await stableCallback.current();
      } finally {
        //  Only update state if component is still mounted
        if (!isCanceled) {
          setIsFetching(false);
        }
      }
    };

    fetchData();

    //  Cleanup - cancel ongoing operations
    return () => {
      isCanceled = true;
    };
  }, [isFetching]);

  const reset = useCallback(() => {
    setIsFetching(false);
  }, []);

  return { isFetching, reset };
};

export default useInfiniteScroll;
