import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions/productActions";
import HeaderView from "./HeaderView";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { categories, categoriesLoading } = useSelector(
    (state) => state.products,
  );
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();

  // Shop dropdown için timer ref
  const shopDropdownTimer = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //  Cleanup timer on unmount - Memory leak prevention
  useEffect(() => {
    return () => {
      if (shopDropdownTimer.current) {
        clearTimeout(shopDropdownTimer.current);
        shopDropdownTimer.current = null;
      }
    };
  }, []);

  //  Memoized functions
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleShopMouseEnter = useCallback(() => {
    //  Clear existing timer before setting new one
    if (shopDropdownTimer.current) {
      clearTimeout(shopDropdownTimer.current);
      shopDropdownTimer.current = null;
    }
    setIsShopDropdownOpen(true);
  }, []);

  const handleShopMouseLeave = useCallback(() => {
    //  Clear any existing timer first
    if (shopDropdownTimer.current) {
      clearTimeout(shopDropdownTimer.current);
    }

    //  Set new timer
    shopDropdownTimer.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
      shopDropdownTimer.current = null; //  Clear reference after execution
    }, 300);
  }, []);

  // Cart dropdown toggle
  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const closeCart = useCallback(() => setIsCartOpen(false), []);

  //  Navigation links memoized
  const navLinks = useMemo(
    () => [
      { name: "Ana Sayfa", path: "/" },
      { name: "Kategoriler", path: "/shop", hasDropdown: true },
      { name: "Hakkımızda", path: "/about" },
      { name: "Ekip", path: "/team" },
      { name: "İletişim", path: "/contact" },
    ],
    [],
  );

  //  Expensive calculation memoized
  const groupedCategories = useMemo(() => {
    return categories.reduce((acc, category) => {
      const gender = category.gender === "k" ? "Kadın" : "Erkek";
      if (!acc[gender]) {
        acc[gender] = [];
      }
      acc[gender].push(category);
      return acc;
    }, {});
  }, [categories]); // Sadece categories değiştiğinde yeniden hesapla

  // Cart derived data
  const cartSummary = useMemo(() => {
    const totalItems = cartItems.reduce(
      (sum, item) => sum + (item.count || 0),
      0,
    );
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.count || 0) * (item.product?.price || 0),
      0,
    );
    return {
      items: cartItems,
      uniqueCount: cartItems.length,
      totalItems,
      totalAmount,
    };
  }, [cartItems]);

  return (
    <HeaderView
      categories={categories}
      categoriesLoading={categoriesLoading}
      groupedCategories={groupedCategories}
      navLinks={navLinks}
      isMenuOpen={isMenuOpen}
      isShopDropdownOpen={isShopDropdownOpen}
      isCartOpen={isCartOpen}
      cartSummary={cartSummary}
      toggleMenu={toggleMenu}
      closeMenu={closeMenu}
      handleShopMouseEnter={handleShopMouseEnter}
      handleShopMouseLeave={handleShopMouseLeave}
      toggleCart={toggleCart}
      closeCart={closeCart}
    />
  );
}

//  Export memoized component
export default React.memo(Header);
