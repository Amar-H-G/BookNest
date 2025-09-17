import React, { forwardRef } from "react";

const Sidebar = forwardRef(({ isOpen, onClose }, ref) => {
  return (
    <aside
      ref={ref}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform -translate-x-full"
    >
      <div className="p-4 border-b">
        <button
          className="text-2xl font-bold text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            Home
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            Products
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">
            Profile
          </li>
        </ul>
      </nav>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
