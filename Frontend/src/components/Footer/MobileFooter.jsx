import React from "react";
import { Heart, MessageCircle, Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Mail, ArrowUp } from "lucide-react";

const MobileFooter = () => {
  return (
    <footer className="bg-white shadow-lg border-t border-gray-200 py-4 mt-3 mb-4 px-4 rounded-t-4xl  rounded-b-1xl ">
      {/* Main Footer Content */}
      <div className="w-full flex flex-wrap gap-1 sm:gap-5 items-center justify-center">
        {/* Brand Section */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center mb-6">
            <div className="h-11 w-11 mr-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              BookNest
            </span>
          </Link>
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
          <a
            href="https://x.com/amarpatra89?t=QQAgWJ04jucV95_oK4iG4Q&s=03"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/amarpatra/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Amar-H-G"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:amarpatra932@gmail.com"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={20} />
          </a>
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
