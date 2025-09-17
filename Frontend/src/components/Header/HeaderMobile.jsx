import { BookOpen } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { CgProfile, CgLogIn, CgUserAdd } from "react-icons/cg";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const HeaderMobile = ({
  onMenuClick,
  isAuthenticated = true,
  onLogin,
  onSignup,
  onLogout,
  onProfile,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    onLogin && onLogin();
    navigate("/login");
  };

  const handleSignup = () => {
    setIsDropdownOpen(false);
    onSignup && onSignup();
    navigate("/register");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout && onLogout();
    navigate("/login");
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    onProfile && onProfile();
    navigate("/profile");
  };

  return (
    <header className="mobile-header flex items-center justify-between p-2 bg-white shadow-md relative sm:px-10">
      {/* Sidebar toggle button */}
      <button
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
        className="text-2xl font-bold"
      >
        ☰
      </button>

      {/* Logo/Brand Name */}
      <Link to="/" className="flex items-center">
        <div className="h-10 w-10 mr-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
          <BookOpen />
        </div>
        <span className="font-bold text-2xl tracking-tight">BookNest</span>
      </Link>

      {/* Profile icon with dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          aria-label="Profile menu"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <CgProfile className="text-2xl" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            {isAuthenticated ? (
              // Authenticated user menu
              <>
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-800">Welcome!</p>
                </div>
                <button
                  onClick={handleProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiUser className="mr-2" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              // Unauthenticated user menu
              <>
                <button
                  onClick={handleLogin}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <CgLogIn className="mr-2" />
                  Sign In
                </button>
                <button
                  onClick={handleSignup}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <CgUserAdd className="mr-2" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderMobile;
