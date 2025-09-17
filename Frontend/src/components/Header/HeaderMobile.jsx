import React from "react";

const HeaderMobile = ({ onMenuClick }) => {
  return (
    <header className="mobile-header flex items-center justify-between p-4 bg-white shadow-md">
      {/* Sidebar toggle button */}
      <button
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
        className="text-2xl font-bold"
      >
        ☰
      </button>

      {/* Logo or Brand */}
      <div className="text-xl font-semibold">BookNest</div>

      {/* Optional: other header buttons/icons */}
      <div></div>
    </header>
  );
};

export default HeaderMobile;
