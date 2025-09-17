import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/Sidebar";
import Footer from "../components/Footer/Footer";

const DesktopLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header />
      </div>

      {/* Content with padding to account for fixed header */}
      <div className="flex flex-1 pt-16 mt-16">
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default DesktopLayout;
