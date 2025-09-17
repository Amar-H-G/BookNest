import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Sidebar = forwardRef(({ isOpen, onClose }, ref) => {
  return (
    <aside
      ref={ref}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform -translate-x-full "
    >
      <div className="flex justify-between p-4 border-b " onClick={onClose}>
        <Link to="/" className="flex items-center mb-6">
          <div className="h-11 w-11 mr-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            <BookOpen size={20} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-900">
            BookNest
          </span>
        </Link>
        <button
          className="text-2xl font-bold text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <nav className="p-4" onClick={onClose}>
        <ul className="space-y-2">
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            <Link to="/categories">Categories</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            <Link to="/explore">Explore Us</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
