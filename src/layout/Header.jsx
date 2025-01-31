import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
} from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state.client.user);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <header>
      {/* Mobile Navbar */}
      <div className="my-2 flex items-center justify-between bg-white px-4 py-2 md:hidden">
        {/* Company Name */}
        <div className="text-3xl font-bold text-gray-800">kNeat</div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to={user ? "/profile" : "/login"}>
            <button className="text-gray-600 hover:text-gray-800">
              <User />
            </button>
          </Link>
          <button className="text-gray-600 hover:text-gray-800">
            <Search />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <ShoppingCart />
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleMenu}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-center py-4 text-3xl text-fgray sm:hidden`}
      >
        <ul className="mx-auto text-center">
          <li className="my-4">Home</li>
          <li className="my-4">Product</li>
          <li className="my-4">Pricing</li>
          <li className="my-4">Contact</li>
        </ul>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Contact Header */}
        <div className="bg-secondary">
          <div className="container mx-auto flex justify-between px-4 py-4 text-white lg:px-10">
            {/* Contact Info */}
            <div className="hidden gap-6 font-bold md:flex">
              <div className="flex gap-2">
                <Phone color="lightGray" />
                <h6>(225) 555-0118</h6>
              </div>
              <div className="flex gap-2">
                <Mail color="#FAFAFA" />
                <h6>berkay@kneat.com</h6>
              </div>
            </div>
            {/* Message */}
            <h6 className="hidden xl:block">
              Follow Us and get a chance to win 80% off
            </h6>
            {/* Social Media */}
            <div className="hidden items-center gap-4 md:flex">
              <h6>Follow Us:</h6>
              <Instagram color="#FAFAFA" />
              <Youtube color="#FAFAFA" />
              <Facebook color="#FAFAFA" />
              <Twitter color="#FAFAFA" />
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="container mx-auto">
          <div className="flex items-center justify-between bg-white px-4 py-6 lg:px-10">
            {/* Logo */}
            <Link to="/" className="text-3xl font-bold text-gray-800">
              kNeat
            </Link>

            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex gap-6 text-h6 font-bold text-fgray">
                <li>Home</li>
                <Link to="/shop">Shop</Link>
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Pages</li>
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="hidden items-center space-x-6 text-secondary md:flex">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-2 hover:text-gray-800"
                  >
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                      <Gravatar
                        email={user.email}
                        size={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="hidden font-medium lg:inline">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-100 bg-white py-1 shadow-lg">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <UserCircle className="h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <LogOut className="h-4 w-4" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="flex items-center gap-2 hover:text-gray-800">
                  <Link to="/login" className="flex items-center gap-2">
                    <User />
                    <span className="hidden lg:inline">Login / Register</span>
                  </Link>
                </button>
              )}
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
