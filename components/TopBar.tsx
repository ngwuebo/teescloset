"use client";

import { useEffect, useState } from "react";

export default function TopBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-black text-white text-xs overflow-hidden transition-all duration-300 ${
        hidden ? "max-h-0 opacity-0 -translate-y-full" : "max-h-12 opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <p className="whitespace-nowrap">Worldwide Express Delivery</p>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="hover:text-zinc-300 transition">
            About Us
          </a>
          <a href="#" className="hover:text-zinc-300 transition">
            Blog
          </a>
          <a href="#" className="hover:text-zinc-300 transition">
            FAQ
          </a>
          <a href="#" className="hover:text-zinc-300 transition">
            Contact Us
          </a>
          <a href="#" className="hover:text-zinc-300 transition">
            Return and Refund Policy
          </a>
        </div>
      </div>
    </div>
  );
}