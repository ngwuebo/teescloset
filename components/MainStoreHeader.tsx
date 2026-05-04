"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, openCartDrawer } from "../lib/cart";
import { formatCurrency } from "../lib/formatCurrency";
import { products } from "../data/products";
import MobileMenu from "./MobileMenu";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 md:w-6 md:h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 21a6 6 0 0 0-12 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 md:w-6 md:h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 20-1.4-1.3C5.4 14 2 10.9 2 7.1 2 4.2 4.2 2 7.1 2c1.7 0 3.4.8 4.5 2.1C12.7 2.8 14.4 2 16.1 2 19 2 21.2 4.2 21.2 7.1c0 3.8-3.4 6.9-8.6 11.6L12 20Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 md:w-6 md:h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6h15l-1.5 8h-12z" />
      <path d="M6 6l-1-3H2" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="18" cy="19" r="1.5" />
    </svg>
  );
}

export default function MainStoreHeader() {
  const router = useRouter();

  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCount(totalCount);
      setTotalPrice(total);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const formattedTotal = useMemo(() => formatCurrency(totalPrice), [totalPrice]);

  const normalizedQuery = query.trim().toLowerCase();

  const matchedProducts = useMemo(() => {
    if (!normalizedQuery) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.brand || "",
          product.description || "",
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [normalizedQuery]);

  const suggestedProducts = useMemo(() => {
    if (matchedProducts.length > 0) return [];
    return products.slice(0, 4);
  }, [matchedProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!normalizedQuery) return;

    if (matchedProducts.length > 0) {
      router.push(`/products/${matchedProducts[0].id}`);
      setSearchOpen(false);
      setQuery("");
      return;
    }

    if (suggestedProducts.length > 0) {
      router.push(`/products/${suggestedProducts[0].id}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const goToProduct = (id: number) => {
    router.push(`/products/${id}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200 w-full">
        {/* Mobile */}
        <div className="md:hidden px-4 py-3">
          <div className="grid grid-cols-[32px_1fr_auto] items-center gap-3 min-w-0">
            <button
              type="button"
              aria-label="Open menu"
              className="text-black leading-none flex items-center justify-center"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 min-w-0 text-center text-[13px] font-semibold tracking-[0.12em] text-black truncate"
            >
              <span className="relative h-9 w-9 rounded-full overflow-hidden border border-zinc-200 bg-white">
                <Image
                  src="/logo.png"
                  alt="Site logo"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </span>
              <span className="truncate">TEES CLOSET</span>
            </Link>

            <div className="flex items-center gap-3 text-black shrink-0">
              <Link href="/login" aria-label="Account" className="hover:opacity-70">
                <AccountIcon />
              </Link>

              <a href="#" aria-label="Wishlist" className="hover:opacity-70">
                <WishlistIcon />
              </a>

              <button
                type="button"
                onClick={openCartDrawer}
                aria-label="Open cart"
                className="relative hover:opacity-70 w-8 h-8 flex items-center justify-center"
              >
                <CartIcon />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid max-w-7xl mx-auto px-4 py-7 grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="flex justify-start min-w-0">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-[420px]">
              <div className="w-full rounded-full border border-zinc-300 bg-white px-5 py-3.5 flex items-center gap-3 text-sm text-zinc-500">
                <SearchIcon />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => {
                    setTimeout(() => setSearchOpen(false), 150);
                  }}
                  placeholder="Search for products..."
                  className="w-full bg-transparent outline-none text-zinc-700 placeholder:text-zinc-500"
                />
              </div>
            </form>
          </div>

          <div className="text-center min-w-0">
            <Link href="/" className="inline-flex items-center justify-center gap-4">
              <span className="relative h-12 w-12 rounded-full overflow-hidden border border-zinc-200 bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Site logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </span>
              <span className="text-4xl lg:text-5xl font-bold tracking-tight text-black whitespace-nowrap">
                TEES CLOSET
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-5 text-black min-w-0">
            <button
              type="button"
              className="text-xs font-medium border border-zinc-300 px-2.5 py-1 rounded-sm hover:bg-zinc-50"
              aria-label="Currency EUR"
            >
              EUR
            </button>

            <Link
              href="/login"
              className="hover:opacity-70"
              aria-label="Account"
            >
              <AccountIcon />
            </Link>

            <a href="#" className="hover:opacity-70" aria-label="Wishlist">
              <WishlistIcon />
            </a>

            <button
              type="button"
              onClick={openCartDrawer}
              className="relative hover:opacity-70 flex items-center gap-3 shrink-0"
              aria-label="Open cart"
            >
              <span className="relative w-8 h-8 flex items-center justify-center">
                <CartIcon />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </span>

              <span className="hidden md:inline text-sm font-medium">
                {formattedTotal}
              </span>
            </button>
          </div>
        </div>
      </div>

      {searchOpen && query.trim() && (
        <div className="hidden md:block fixed top-[118px] left-[76px] w-full max-w-[420px] rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden z-[9999]">
          {matchedProducts.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs uppercase tracking-[0.08em] text-zinc-400">
                Search Results
              </div>

              {matchedProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onMouseDown={() => goToProduct(product.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-zinc-50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover border border-zinc-200"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-2">
              <div className="px-4 pt-3 text-sm font-medium text-black">
                No exact match found
              </div>
              <div className="px-4 pb-2 text-xs uppercase tracking-[0.08em] text-zinc-400">
                Suggested bags
              </div>

              {suggestedProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onMouseDown={() => goToProduct(product.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-zinc-50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover border border-zinc-200"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}