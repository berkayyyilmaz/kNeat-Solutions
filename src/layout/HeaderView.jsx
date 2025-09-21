import React from "react";
import { Link } from "react-router-dom";
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
import CartDropdown from "../components/layout/CartDropdown";
import { STRINGS } from "../constants/strings";

function HeaderView({
  categories,
  categoriesLoading,
  groupedCategories,
  navLinks,
  isMenuOpen,
  isShopDropdownOpen,
  isCartOpen,
  cartSummary,
  toggleMenu,
  closeMenu,
  handleShopMouseEnter,
  handleShopMouseLeave,
  toggleCart,
  closeCart,
}) {
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
              <span className="font-medium">{STRINGS.HEADER.PROMO}</span>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="font-medium">{STRINGS.HEADER.FOLLOW_US}</span>
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
                  onCategoryClick={() => handleShopMouseLeave()}
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
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="relative text-secondary transition-colors hover:text-primary"
                >
                  <ShoppingCart size={20} />
                  {cartSummary?.totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
                      {cartSummary.totalItems}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <CartDropdown cartSummary={cartSummary} onClose={closeCart} />
                )}
              </div>

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

export default React.memo(HeaderView);
