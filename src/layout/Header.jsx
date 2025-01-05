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
      <div className="my-2 flex items-center justify-between bg-white px-4 py-2">
        {/* Company Name */}
        <div className="ml-2 text-3xl font-bold text-gray-800">kNeat</div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
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
        className={`flex flex-col items-center py-4 text-3xl text-fgray sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
      >
        <ul className="mx-auto text-center">
          <li className="my-4">Home</li>
          <li className="my-4">Product</li>
          <li className="my-4">Pricing</li>
          <li className="my-4">Contact</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
