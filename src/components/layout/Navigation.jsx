import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navigation = ({
  navLinks = [],
  isShopDropdownOpen = false,
  onShopMouseEnter,
  onShopMouseLeave,
  CategoryDropdown,
  className = "",
}) => {
  return (
    <div className={`hidden items-center space-x-8 md:flex ${className}`}>
      {navLinks.map((link) => (
        <div key={link.name} className="relative">
          {link.hasDropdown ? (
            <div
              className="relative"
              onMouseEnter={onShopMouseEnter}
              onMouseLeave={onShopMouseLeave}
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
              {isShopDropdownOpen && CategoryDropdown && <CategoryDropdown />}
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
  );
};

export default Navigation;
