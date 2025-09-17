import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Animate text elements
    tl.fromTo(
      textRef.current.querySelectorAll(".text-animate"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    );

    // Animate image
    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
      "-=0.5"
    );

    // Animate CTA button
    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.3"
    );

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen  flex items-center justify-center px-4 py-4"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div ref={textRef} className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            <span className="block text-animate">Simple,</span>
            <span className="block text-animate">Readable &</span>
            <span className="block text-animate text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Understanding
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-animate">
            Apressure, for gain & Performance on your personal workflow. Apresso
            to help Shenkan rule and consumers.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              PLAY NOW (153)
            </button>

            <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
              <span className="mr-2">Set Price</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div ref={imageRef} className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
              alt="Hero illustration"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-300 rounded-lg opacity-70 rotate-45 animate-pulse"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
