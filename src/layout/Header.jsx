import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/clientActions";
import { fetchCategories } from "../redux/actions/productActions";
import Gravatar from "react-gravatar";
import {
  Facebook,
  Instagram,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Twitter,
  User,
  Youtube,
  LogOut,
  ChevronDown,
  UserCircle,
  X,
} from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
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
    setIsMobileShopOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
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

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
  };

  const toggleMobileShop = () => {
    setIsMobileShopOpen((prev) => !prev);
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
            <div className="hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={handleShopMouseEnter}
                      onMouseLeave={handleShopMouseLeave}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center gap-1 text-sm font-semibold text-fgray transition-colors hover:text-primary"
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isShopDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      {/* Shop Dropdown Menu */}
                      {isShopDropdownOpen && (
                        <div className="animate-slideDown absolute left-0 z-50 mt-2 w-96 bg-white py-6 shadow-xl">
                          <div className="grid grid-cols-2 gap-6 px-6">
                            {categoriesLoading || categories.length === 0 ? (
                              // Kategoriler yüklenirken gösterilecek profesyonel mesaj
                              <div className="col-span-2 py-8 text-center">
                                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
                                <div className="space-y-2">
                                  <p className="font-montserrat text-sm font-semibold text-gray-700">
                                    Kategoriler hazırlanıyor...
                                  </p>
                                  <p className="font-montserrat text-xs text-gray-500">
                                    Sunucumuz başlatılıyor, lütfen birkaç saniye
                                    bekleyiniz
                                  </p>
                                </div>
                              </div>
                            ) : (
                              Object.entries(groupedCategories).map(
                                ([gender, genderCategories]) => (
                                  <div key={gender}>
                                    <h3 className="mb-4 pb-2 font-montserrat text-sm font-bold uppercase tracking-wider text-gray-900">
                                      {gender}
                                    </h3>
                                    <div className="space-y-3">
                                      {genderCategories.map((category) => (
                                        <Link
                                          key={category.id}
                                          to={`/shop/${category.gender}/${category.title
                                            .toLowerCase()
                                            .replace(
                                              /\s+/g,
                                              "-",
                                            )}/${category.id}`}
                                          className="block py-1 font-montserrat text-sm font-semibold text-fgray transition-colors hover:text-primary"
                                          onClick={() =>
                                            setIsShopDropdownOpen(false)
                                          }
                                        >
                                          {category.title}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ),
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm font-semibold text-fgray transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* User Profile/Login */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-2 text-secondary transition-colors hover:text-primary"
                  >
                    <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-gray-200">
                      <Gravatar
                        email={user.email}
                        size={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="hidden text-sm font-medium lg:inline">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <UserCircle size={16} />
                          <span>Profil</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <LogOut size={16} />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-secondary transition-colors hover:text-primary"
                >
                  <User size={20} />
                  <span className="hidden text-sm font-medium lg:inline">
                    Login / Register
                  </span>
                </Link>
              )}

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
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={closeMenu}
            />
            <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white md:hidden">
              <div className="container mx-auto px-4 py-6">
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.hasDropdown ? (
                        <div>
                          <div className="flex items-center justify-between">
                            <Link
                              to={link.path}
                              className="block text-lg font-medium text-fgray transition-colors hover:text-primary"
                              onClick={closeMenu}
                            >
                              {link.name}
                            </Link>
                            <button
                              onClick={toggleMobileShop}
                              className="p-2 text-fgray transition-colors hover:text-primary"
                            >
                              <ChevronDown
                                size={20}
                                className={`transform transition-transform ${
                                  isMobileShopOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                          {isMobileShopOpen && (
                            <div className="ml-4 mt-2 space-y-2">
                              {categoriesLoading || categories.length === 0 ? (
                                <div className="py-4 text-center">
                                  <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-700">
                                      Kategoriler hazırlanıyor...
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Sunucumuz başlatılıyor
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                Object.entries(groupedCategories).map(
                                  ([gender, genderCategories]) => (
                                    <div key={gender}>
                                      <div className="mb-1 font-medium text-fgray">
                                        {gender}
                                      </div>
                                      {genderCategories.map((category) => (
                                        <Link
                                          key={category.id}
                                          to={`/shop/${category.gender}/${category.title
                                            .toLowerCase()
                                            .replace(
                                              /\s+/g,
                                              "-",
                                            )}/${category.id}`}
                                          className="ml-2 block font-medium text-fgray transition-colors hover:text-primary"
                                          onClick={closeMenu}
                                        >
                                          {category.title}
                                        </Link>
                                      ))}
                                    </div>
                                  ),
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className="block text-lg font-medium text-fgray transition-colors hover:text-primary"
                          onClick={closeMenu}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
