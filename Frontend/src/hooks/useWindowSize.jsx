import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // শুধুমাত্র ক্লায়েন্ট সাইডে 실행 হবে
    if (typeof window === "undefined") {
      return;
    }

    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);

    // Initial size সেট করুন
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default useWindowSize;
