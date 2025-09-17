import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Ghost, Home } from "lucide-react";
import gsap from "gsap";

const NotFoundPage = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        duration: 0.5,
        autoAlpha: 0,
        ease: "power2.inOut",
      }).from(".animate-item", {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex items-center justify-center  w-full px-4 text-gray-800 font-sans"
    >
      <div
        ref={contentRef}
        className="w-full max-w-lg text-center sm:p-8 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        {/* Lucide Icon */}
        <div className="flex justify-center mb-6 animate-item">
          <Ghost className="h-24 w-24 sm:h-28 sm:w-28 text-indigo-500" />{" "}
        </div>

        {/* 404 Error Text */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-gray-900 leading-none animate-item">
          {" "}
          404
        </h1>

        <p className="text-xl sm:text-2xl mt-4 font-semibold text-gray-700 animate-item">
          {" "}
          Page Not Found
        </p>
        <p className="mt-2 text-base text-gray-500 animate-item">
          The page you are looking for might have been removed or doesn't exist.
        </p>
        <div className="mt-8 md:mt-10 animate-item">
          {" "}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3 font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Home className="h-5 w-5" />
            Go to Home Page
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
