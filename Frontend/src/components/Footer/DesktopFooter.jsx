import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUp,
  BookOpen,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

// GSAP plugin registration
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DesktopFooter = () => {
  const footerRef = useRef(null);
  const backToTopRef = useRef(null);

  useEffect(() => {
    // Footer animation
    gsap.fromTo(
      footerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Back to top button animation
    gsap.fromTo(
      backToTopRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 500) {
        gsap.to(backToTopRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      } else {
        gsap.to(backToTopRef.current, { opacity: 0, scale: 0, duration: 0.3 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 0.8, scrollTo: 0, ease: "power2.inOut" });
  };

  const companyLinks = {
    About: "/about",
    Careers: "/careers",
    Contact: "/contact",
    Partners: "/partners",
  };

  return (
    <footer
      ref={footerRef}
      className="bg-white text-gray-800 border-t border-gray-200 pt-16 pb-8 px-4 md:mx-8 rounded-t-4xl rounded-b-1xl relative"
    >
      {/* Back to top button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white p-3 rounded-full shadow-lg z-50 opacity-0 scale-0 transition-all duration-300 hover:shadow-xl"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="h-12 w-12 mr-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                <BookOpen size={20} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">
                BookNest
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              BookNest is your premier destination for discovering, purchasing,
              and discussing books. We connect readers with their next favorite
              story and authors with their audience. Explore our vast collection
              today!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/amarpatra89?t=QQAgWJ04jucV95_oK4iG4Q&s=03"
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300 shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/amarpatra/"
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/Amar-H-G"
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300 shadow-sm"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:amarpatra932@gmail.com"
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300 shadow-sm"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product section */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900 border-b border-gray-200 pb-2">
              Products
            </h4>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Tutorials",
                "Roadmap",
                "New Releases",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors flex items-center group"
                  >
                    <span className="h-1 w-1 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company section */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900 border-b border-gray-200 pb-2">
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Careers", "Contact", "Partners", "Testimonials"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={companyLinks[item] || "#"}
                      className="text-gray-600 hover:text-pink-600 transition-colors flex items-center group"
                    >
                      <span className="h-1 w-1 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900 border-b border-gray-200 pb-2">
              Stay Updated
            </h4>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates
            </p>

            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 rounded-r-lg hover:from-pink-500 hover:to-pink-700 transition-all duration-300 flex items-center">
                <Send size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2 text-pink-500" />
                <span>+91 8927426099</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2 text-pink-500" />
                <span>amarpatra932@gmail.com</span>
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin
                  size={16}
                  className="mr-2 mt-1 text-pink-500 flex-shrink-0"
                />
                <span>32, Chatakal, Dumdum, Kolkata, West Bengal - 700074</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and additional links */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-500 text-sm mr-2">
              © 2025 BookNest. All rights reserved.
            </span>
            <Heart size={14} className="text-pink-500" fill="currentColor" />
          </div>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-pink-600 text-sm transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
