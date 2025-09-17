import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions/productActions";
import {
  Facebook,
  Instagram,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Twitter,
  Youtube,
  X,
} from "lucide-react";
import Navigation from "../components/layout/Navigation";
import UserMenu from "../components/layout/UserMenu";
import MobileMenu from "../components/layout/MobileMenu";
import CategoryDropdown from "../components/layout/CategoryDropdown";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { categories, categoriesLoading } = useSelector(
    (state) => state.products,
  );
  const dispatch = useDispatch();

  // Shop dropdown için timer ref
  const shopDropdownTimer = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (shopDropdownTimer.current) {
        clearTimeout(shopDropdownTimer.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleShopMouseEnter = () => {
    // Timer varsa iptal et
    if (shopDropdownTimer.current) {
      clearTimeout(shopDropdownTimer.current);
      shopDropdownTimer.current = null;
    }
    setIsShopDropdownOpen(true);
  };

  const handleShopMouseLeave = () => {
    // Immediate kapanmak yerine delay ile kapat
    shopDropdownTimer.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 300); // 300ms delay - best practice
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop", hasDropdown: true },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  // Kategorileri cinsiyete göre grupla
  const groupedCategories = categories.reduce((acc, category) => {
    const gender = category.gender === "k" ? "Kadın" : "Erkek";
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, {});

  return (
    <header className="relative">
      {/* Top Contact Bar - Hidden on mobile */}
      <div className="hidden bg-secondary md:block">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between py-3 text-sm text-white">
            {/* Contact Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="font-medium">(225) 555-0118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="font-medium">berkay@kneat.com</span>
              </div>
            </div>

            {/* Promo Message */}
            <div className="hidden xl:block">
              <span className="font-medium">
                Follow Us and get a chance to win 80% off
              </span>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Follow Us:</span>
              <div className="flex items-center gap-3">
                <Instagram
                  size={16}
                  className="cursor-pointer transition-colors hover:text-primary"
                />
                <Youtube
                  size={16}
                  className="cursor-pointer transition-colors hover:text-primary"
                />
                <Facebook
                  size={16}
                  className="cursor-pointer transition-colors hover:text-primary"
                />
                <Twitter
                  size={16}
                  className="cursor-pointer transition-colors hover:text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <img
                src="/kneat-logo.png"
                alt="KNEAT"
                className="h-8 w-auto md:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation
              navLinks={navLinks}
              isShopDropdownOpen={isShopDropdownOpen}
              onShopMouseEnter={handleShopMouseEnter}
              onShopMouseLeave={handleShopMouseLeave}
              CategoryDropdown={() => (
                <CategoryDropdown
                  categories={categories}
                  categoriesLoading={categoriesLoading}
                  groupedCategories={groupedCategories}
                  onCategoryClick={() => setIsShopDropdownOpen(false)}
                />
              )}
            />

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* User Profile/Login */}
              <UserMenu />

              {/* Search */}
              <button className="text-secondary transition-colors hover:text-primary">
                <Search size={20} />
              </button>

              {/* Cart */}
              <button className="text-secondary transition-colors hover:text-primary">
                <ShoppingCart size={20} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-secondary transition-colors hover:text-primary md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          navLinks={navLinks}
          categories={categories}
          categoriesLoading={categoriesLoading}
          groupedCategories={groupedCategories}
        />
      </nav>
    </header>
  );
}

export default Header;
