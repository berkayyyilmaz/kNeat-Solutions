import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header>
      {/* Navbar */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md">
        {/* Company Name */}
        <div className="text-lg font-bold text-gray-800">kNeat</div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Profile */}
          <button className="text-gray-600 hover:text-gray-800">
            <ProfileIcon />
          </button>

          {/* Search */}
          <button className="text-gray-600 hover:text-gray-800">
            <SearchIcon />
          </button>

          {/* Cart */}
          <button className="text-gray-600 hover:text-gray-800">
            <CartIcon />
          </button>

          {/* Menu */}
          <button
            className="text-gray-600 hover:text-gray-800 sm:hidden"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col items-center gap-4 py-4 text-lg sm:gap-4 sm:text-xl ${isMenuOpen ? "block" : "hidden"}`}
      >
        <ul className="mx-auto">
          <li>Home</li>
          <li>Product</li>
          <li>Pricing</li>
          <li>Contact</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
