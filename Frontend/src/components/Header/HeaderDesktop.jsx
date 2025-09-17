import React, { useEffect, useRef } from "react";
import { LogIn, UserPlus } from "lucide-react";
import gsap from "gsap";

// Menu items array
const menu = [
  { name: "AI System", link: "#" },
  { name: "Guide", link: "#" },
  { name: "Explore", link: "#" },
  { name: "Contact Us", link: "#" },
  { name: "Discover", link: "#" },
];

const HeaderDesktop = () => {
  const headerRef = useRef(null);

  // useEffect(() => {
  //   // GSAP animation
  //   gsap.from(headerRef.current, {
  //     y: -40,
  //     opacity: 0,
  //     duration: 0.8,
  //     ease: "power2.out",
  //   });
  // }, []);

  return (
    <div className=" py-5">
      <div
        ref={headerRef}
        className="max-w-6xl mx-auto flex items-center justify-between px-6"
      >
        {/* Logo/Brand Name */}
        <span className="font-bold text-2xl tracking-tight">BookNest</span>

        {/* Menu */}
        <div className="flex gap-8 items-center">
          <div className="flex bg-white rounded-full px-6 py-2 shadow gap-8">
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="text-gray-700 font-medium hover:text-pink-500 transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#login"
            className="font-medium flex items-center gap-1 hover:text-pink-500 transition"
          >
            <LogIn size={20} />
            Log in
          </a>
          <a
            href="#signup"
            className="ml-2 px-5 py-2 rounded-md bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-lg flex items-center gap-1 transition hover:scale-105"
          >
            <UserPlus size={20} />
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
