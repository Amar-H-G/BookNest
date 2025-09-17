import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/Sidebar";
import Footer from "../components/Footer/Footer";
import MobileScreenFooter from "../components/Footer/MobileScreenFooter";

export default function MobileLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (sidebarOpen) {
      // Sidebar খুলতে animation
      gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    } else {
      // Sidebar বন্ধ করতে animation
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [sidebarOpen]);

  return (
    <div className="mobile-layout relative min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header onMenuClick={toggleSidebar} />
      </div>

      {/* Sidebar with GSAP animation */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} ref={sidebarRef} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-white blur-2xl bg-opacity-50 z-40 opacity-0"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content with padding to account for fixed header and footer */}
      <div className="flex-1 pt-16 pb-16 overflow-auto">
        <main className="p-4 min-h-full">{children}</main>

        {/* MobileFooter (scrollable part of content) */}
        <div className="px-4">
          <Footer />
        </div>
      </div>

      {/* Fixed MobileScreenFooter at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <MobileScreenFooter />
      </div>
    </div>
  );
}
