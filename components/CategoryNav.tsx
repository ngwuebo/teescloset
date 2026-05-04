"use client";

import Image from "next/image";
import { useState } from "react";

type MenuKey = "brands" | "women" | "men" | "wallets" | "travel" | null;

type FeaturedItem = {
  name: string;
  image: string;
};

const menuData: Record<
  Exclude<MenuKey, null>,
  {
    title: string;
    left: string[];
    right: string[];
    featured: FeaturedItem[];
  }
> = {
  brands: {
    title: "Shop All Brands",
    left: ["BALENCIAGA", "BOTTEGA VENETA", "CELINE", "CHANEL", "DIOR"],
    right: ["GUCCI", "HERMES", "LOUIS VUITTON", "PRADA", "SAINT LAURENT"],
    featured: [
      { name: "Louis Vuitton", image: "/brands/lv-bag.jpg" },
      { name: "Chanel", image: "/brands/chanel-bag.jpg" },
      { name: "Dior", image: "/brands/dior-bag.jpg" },
    ],
  },
  women: {
    title: "Women's Bags",
    left: ["TOTE BAGS", "SHOULDER BAGS", "TOP HANDLE", "MINI BAGS"],
    right: ["CROSSBODY", "EVENING BAGS", "SATCHELS", "SHOPPERS"],
    featured: [
      { name: "Top Handle", image: "/brands/women-1.jpg" },
      { name: "Chanel", image: "/brands/women-2.jpg" },
      { name: "Dior", image: "/brands/women-3.jpg" },
      { name: "Luxury Tote", image: "/brands/women-4.jpg" },
    ],
  },
  men: {
    title: "Men's Bags",
    left: ["BACKPACKS", "MESSENGER BAGS", "TRAVEL BAGS", "BRIEFCASES"],
    right: ["BELT BAGS", "SLING BAGS", "CROSSBODY", "DUFFLE BAGS"],
    featured: [
      { name: "Backpack", image: "/brands/men-1.jpg" },
      { name: "Travel", image: "/brands/men-2.jpg" },
      { name: "Black Leather Shoe", image: "/brands/men-3.jpg" },
      { name: "Carry Style", image: "/brands/men-4.jpg" },
    ],
  },
  wallets: {
    title: "Wallets & Clutches",
    left: ["LONG WALLETS", "ZIP WALLETS", "CARD HOLDERS", "POUCHES"],
    right: ["CHAIN WALLETS", "CLUTCHES", "SMALL LEATHER GOODS", "WRISTLETS"],
    featured: [
      { name: "Wallet", image: "/brands/wallet-1.jpg" },
      { name: "Clutch", image: "/brands/wallet-2.jpg" },
      { name: "Leather", image: "/brands/wallet-3.jpg" },
      { name: "Evening", image: "/brands/wallet-4.jpg" },
    ],
  },
  travel: {
    title: "Travel Bags",
    left: ["DUFFLE BAGS", "WEEKENDERS", "CABIN BAGS", "GARMENT BAGS"],
    right: ["TROLLEYS", "LUGGAGE", "TRAVEL CASES", "RIMOWA STYLE"],
    featured: [
      { name: "Travel Bag", image: "/brands/travel-1.jpg" },
      { name: "Weekender", image: "/brands/travel-2.jpg" },
      { name: "Cabin", image: "/brands/travel-3.jpg" },
      { name: "Luggage", image: "/brands/travel-4.jpg" },
    ],
  },
};

const navItems: { key: Exclude<MenuKey, null>; label: string }[] = [
  { key: "brands", label: "Shop All Brands" },
  { key: "women", label: "Women's Bags" },
  { key: "men", label: "Men's Bags" },
  { key: "wallets", label: "Wallets & Clutches" },
  { key: "travel", label: "Travel Bags" },
];

export default function CategoryNav() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  return (
    <div
      className="hidden md:block bg-white relative z-40 border-b border-zinc-200"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-10 text-[16px] font-medium text-zinc-800">
        {navItems.map((item) => (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => setOpenMenu(item.key)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenMenu((prev) => (prev === item.key ? null : item.key))
              }
              className="hover:text-black transition flex items-center gap-2"
            >
              <span>{item.label}</span>
              <span className="text-[10px]">▼</span>
            </button>
          </div>
        ))}
      </div>

      {openMenu && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[96vw] max-w-[1280px]">
          <div className="bg-[#f6f6f6] border border-zinc-200 shadow-xl px-6 md:px-10 py-8 md:py-10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
              <div className="grid grid-cols-2 gap-x-8 md:gap-x-10 gap-y-5">
                <div className="space-y-5 min-w-0">
                  {menuData[openMenu].left.map((brand) => (
                    <a
                      key={brand}
                      href="#"
                      className="flex items-center gap-3 text-[15px] text-zinc-700 hover:text-black transition group"
                    >
                      <span className="text-zinc-400 group-hover:text-black transition shrink-0">
                        –
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200 break-words">
                        {brand}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="space-y-5 min-w-0">
                  {menuData[openMenu].right.map((brand) => (
                    <a
                      key={brand}
                      href="#"
                      className="flex items-center gap-3 text-[15px] text-zinc-700 hover:text-black transition group"
                    >
                      <span className="text-zinc-400 group-hover:text-black transition shrink-0">
                        –
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200 break-words">
                        {brand}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={`grid gap-4 ${
                  openMenu === "brands"
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {menuData[openMenu].featured.map((brand) => (
                  <a key={brand.name} href="#" className="block group min-w-0">
                    <div className="relative overflow-hidden rounded-md bg-white">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition duration-300"
                        sizes="(min-width: 768px) 220px, 180px"
                      />
                    </div>
                    <p className="mt-3 text-[15px] text-zinc-800 group-hover:text-black">
                      {brand.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}