import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/Sidebar";
import Footer from "../components/Footer/Footer";

const DesktopLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DesktopLayout;
