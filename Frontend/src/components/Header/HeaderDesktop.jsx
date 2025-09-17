import React, { useState, useEffect, useRef } from "react";
import {
  LogIn,
  UserPlus,
  Heart,
  User,
  LogOut,
  Settings,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

// Menu items array
const menu = [
  { name: "Home", link: "/" },
  { name: "Categories", link: "/categories" },
  { name: "Explore Us", link: "/about" },
  { name: "Contact Us", link: "/contact" },
];

const HeaderDesktop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to true to test logged in state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    // Add your logout logic here
  };

  return (
    <div className="pt-5">
      <div className="w-full mx-auto flex items-center justify-between px-6">
        {/* Logo/Brand Name */}
        <Link to="/" className="flex items-center mb-6">
          <div className="h-12 w-12 mr-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            <BookOpen size={20} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-900">
            BookNest
          </span>
        </Link>

        {/* Menu */}
        <div className="flex gap-8 items-center">
          <div className="flex bg-white rounded-full px-6 py-2 shadow gap-8">
            {menu.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="text-gray-700 font-medium hover:text-pink-500 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Auth buttons or User icons */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="font-medium flex items-center gap-1 hover:text-pink-500 transition"
            >
              <LogIn size={20} />
              Log in
            </Link>
            <Link
              to="/register"
              className="ml-2 px-5 py-2 rounded-md bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-lg flex items-center gap-1 transition hover:scale-105"
            >
              <UserPlus size={20} />
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-pink-50 transition-colors relative group"
            >
              <Heart
                size={22}
                className="text-gray-700 group-hover:text-pink-500"
              />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Profile Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 rounded-full hover:bg-pink-50 transition-colors"
              >
                <div className="h-9 w-9 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white">
                  <User size={18} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDesktop;
