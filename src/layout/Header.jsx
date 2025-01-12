import { useState } from "react";
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
} from "lucide-react";
import { li } from "react-router-dom/cjs/react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header>
      {/* Mobile Navbar */}
      <div className="my-2 flex items-center justify-between bg-white px-4 py-2 sm:hidden">
        {/* Company Name */}
        <div className="text-3xl font-bold text-gray-800">kNeat</div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Profile */}
          <button className="text-gray-600 hover:text-gray-800">
            <User />
          </button>

          {/* Search */}
          <button className="text-gray-600 hover:text-gray-800">
            <Search />
          </button>

          {/* Cart */}
          <button className="text-gray-600 hover:text-gray-800">
            <ShoppingCart />
          </button>

          {/* Menu */}
          <button
            className="text-gray-600 hover:text-gray-800 sm:hidden"
            onClick={toggleMenu}
          >
            <Menu />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
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

      {/* Geniş Ekran Header'ı */}
      <div className="hidden sm:block">
        {/* Contact Header */}
        <div className="text-align-center hidden justify-between bg-headerBlue px-10 py-4 text-white md:flex">
          {/* Contact Info */}
          <div className="flex gap-6 font-bold">
            <div className="flex gap-2">
              <Phone color="#ffffff" />
              <h6>(225) 555-0118</h6>
            </div>
            <div className="flex gap-2">
              <Mail color="#ffffff" />
              <h6>berkay@kneat.com</h6>
            </div>
          </div>
          {/* Message */}
          <h6>Follow Us and get a chance to win 80% off</h6>
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <h6>Follow Us:</h6>
            <Instagram color="#ffffff" />
            <Youtube color="#ffffff" />
            <Facebook color="#ffffff" />
            <Twitter color="#ffffff" />
          </div>
        </div>
        {/* Navbar */}
        <div className="flex grow items-center justify-start bg-white px-10 py-6">
          {/* Sol tarafa hizalanan logo */}
          <div className="ml-2 mr-8 text-3xl font-bold text-gray-800 lg:mr-36">
            kNeat
          </div>
          {/* Orta kısımdaki nav ve sağdaki ikonlar */}
          <div className="flex flex-grow items-center">
            {/* Ortadaki nav öğeleri */}
            <nav className="flex items-center text-fgray">
              <ul className="flex gap-6 text-h6 font-bold">
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Pages</li>
              </ul>
            </nav>

            {/* Sağdaki ikonlar */}
            <div className="ml-auto hidden items-center space-x-6 text-[#23A6F0] md:flex">
              <button className="flex gap-2 hover:text-gray-800">
                <User />
                <h6 className="hidden lg:block">Login / Register</h6>
              </button>
              <button className="hover:text-gray-800">
                <Search />
              </button>
              <button className="hover:text-gray-800">
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
