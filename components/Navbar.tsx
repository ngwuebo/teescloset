"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart } from "../lib/cart";

export default function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCount(total);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
            TeesCloset
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>

            <Link
              href="/products"
              className="text-gray-300 hover:text-white transition"
            >
              Shop
            </Link>

            <Link
              href="/checkout"
              className="text-gray-300 hover:text-white transition"
            >
              Checkout
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-900 transition"
            >
             Log In
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-900 transition"
            >
              <span>🛒</span>
              <span className="inline-flex min-w-6 h-6 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-black">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}