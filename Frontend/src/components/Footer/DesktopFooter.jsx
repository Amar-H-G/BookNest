import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Twitter, Linkedin, Github, Mail, ArrowUp } from "lucide-react";

// GSAP প্লাগিন রেজিস্টার করুন
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DesktopFooter = () => {
  const footerRef = useRef(null);
  const backToTopRef = useRef(null);

  useEffect(() => {
    // ফুটার অ্যানিমেশন
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

    // Back to top বাটন অ্যানিমেশন
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

    // স্ক্রোল ইভেন্ট লিসেনার
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

  return (
    <footer
      ref={footerRef}
      className=" text-black border-1 border-gray-800 rounded-4xl  pt-16 pb-8 px-4 md:px-8 relative"
    >
      {/* Back to top বাটন */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 opacity-0 scale-0 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="max-w-6xl mx-auto">
        {/* মূল কন্টেন্ট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* ব্র্যান্ড বিভাগ */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Graphy</h3>
            <p className="text-gray-400 mb-6 max-w-xs">
              Graphy empowers teams to transform raw data into clear, compelling
              visuals — making insights easier to share, understand, and act on.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* প্রোডাক্ট বিভাগ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* রিসোর্সেস বিভাগ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "Tutorials", "Blog", "Support"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* কোম্পানি বিভাগ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Careers", "Contact", "Partners"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* কপিরাইট এবং অতিরিক্ত লিংক */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-400 mr-2">
              © 2025 Graphy. All rights reserved.
            </span>
            <Heart size={14} className="text-red-500" fill="currentColor" />
          </div>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookies Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
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
