import React from "react";
import { Heart, MessageCircle, Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const MobileFooter = () => {
  return (
    <footer className="bg-white shadow-lg border-t border-gray-200 py-6 px-4 ">
      {/* Main Footer Content */}
      <div className="max-w-md mx-auto">
        {/* Brand Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <BookOpen className="text-blue-600" size={28} />
            <span className="text-xl font-bold text-gray-800">BookNest</span>
          </div>
          <p className="text-gray-600 text-center text-sm max-w-xs">
            Discover your next favorite book and connect with fellow readers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Company</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                <Link
                  to="/explore"
                  className="hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* App Ratings */}
        <div className="bg-blue-50 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">Rate our app</h4>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600">0.0/5 from 0.0k reviews</p>
        </div>

        {/* Social and Action Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors">
            <MessageCircle size={18} />
          </button>
          <button className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button className="bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-pink-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </button>
        </div>

        {/* Copyright and Legal */}
        <div className="text-center border-t border-gray-200 pt-4">
          <div className="flex items-center justify-center text-xs text-gray-500 mb-1">
            <span>© 2025 BookNest. All rights reserved.</span>
            <Heart size={12} className="text-red-500 fill-red-500 mx-1" />
          </div>
          <div className="flex justify-center space-x-4 text-xs">
            <Link
              to="/privacy-policy"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
