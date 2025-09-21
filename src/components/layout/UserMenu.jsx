import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/clientActions";
import Gravatar from "react-gravatar";
import { User, ChevronDown, UserCircle, LogOut } from "lucide-react";

const UserMenu = ({ className = "" }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
  const dispatch = useDispatch();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
  };

  if (!user) {
    // Giriş yapmamış kullanıcı için login linki
    return (
      <Link
        to="/login"
        className={`flex items-center gap-2 text-secondary transition-colors hover:text-primary ${className}`}
      >
        <User size={20} />
        <span className="hidden text-sm font-medium lg:inline">
          Giriş / Kayıt Ol
        </span>
      </Link>
    );
  }

  // Giriş yapmış kullanıcı için profil menüsü
  return (
    <div className={`relative ${className}`}>
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
          className={`h-4 w-4 transition-transform ${
            isProfileDropdownOpen ? "rotate-180" : ""
          }`}
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
  );
};

export default UserMenu;
