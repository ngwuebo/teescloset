"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TopBar from "../components/TopBar";
import MainStoreHeader from "../components/MainStoreHeader";
import CategoryNav from "../components/CategoryNav";
import BrandCarousel from "../components/BrandCarousel";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Breadcrumb from "../components/Breadcrumb";
import HomeProductGrid from "../components/HomeProductGrid";
import RecentOrdersCarousel from "../components/RecentOrdersCarousel";
import Footer from "../components/Footer";
import HomeHero from "../components/HomeHero";
import WhyBuySection from "../components/WhyBuySection";
import FAQSection from "../components/FAQSection";
import BlogCarousel from "../components/BlogCarousel";

const categories = [
  { name: "Women's Bags", count: 2007 },
  { name: "Men's Bags", count: 390 },
  { name: "Travel Bags", count: 158 },
  { name: "Wallets & Clutches", count: 331 },
];

const brands = [
  { name: "Replica Gucci Bags", count: 313, image: "/brands/gucci.jpg" },
  { name: "Replica Hermes Bags", count: 225, image: "/brands/hermes.jpg" },
  { name: "Replica Dior Bags", count: 383, image: "/brands/dior.jpg" },
  { name: "Replica Louis Vuitton Bags", count: 664, image: "/brands/lv.jpg" },
  { name: "Replica Chanel Bags", count: 252, image: "/brands/chanel.jpg" },
  { name: "Replica Prada Bags", count: 142, image: "/brands/prada.jpg" },
  { name: "Replica Saint Laurent Bags", count: 84, image: "/brands/saint-laurent.jpg" },
  { name: "Replica Fendi Bags", count: 153, image: "/brands/fendi.jpg" },
  { name: "Replica Celine Bags", count: 58, image: "/brands/celine.jpg" },
  { name: "Replica Bottega Veneta Bags", count: 106, image: "/brands/bottega.jpg" },
  { name: "Replica Miu Miu Bags", count: 71, image: "/brands/miu-miu.jpg" },
  { name: "Replica Balenciaga Bags", count: 76, image: "/brands/balenciaga.jpg" },
];

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function HomePage() {
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

  return (
    <>
      <main className="bg-[#f6f6f6] min-h-screen">
        <div className="sticky top-0 z-50">
          <TopBar />
          <MainStoreHeader />
          <CategoryNav />
        </div>

        <HomeHero />

        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products" },
          ]}
        />

        <BrandCarousel />

        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 gap-3 mb-5 md:grid-cols-[180px_260px] md:justify-between md:items-center">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="h-10 bg-black text-white px-4 rounded text-sm font-medium flex items-center justify-center gap-2"
            >
              <FilterIcon />
              <span>Filters</span>
            </button>

            <div className="relative">
              <select className="appearance-none h-10 bg-white border border-zinc-300 rounded px-4 pr-10 text-sm text-zinc-600 w-full">
                <option>Default sorting</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>

              <span className="absolute inset-y-0 right-3 flex items-center text-zinc-500 pointer-events-none">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          <HomeProductGrid />
        </section>

        <WhyBuySection />
        <FAQSection />
        <BlogCarousel />
        <RecentOrdersCarousel />
        <Footer />
        <WhatsAppFloat />
      </main>

      {/* DARK TINT OVER PAGE */}
      <div
        className={`fixed inset-0 z-[95] transition-opacity duration-300 ${
          filterOpen
            ? "opacity-100 pointer-events-auto bg-black/55"
            : "opacity-0 pointer-events-none bg-black/0"
        }`}
        onClick={() => setFilterOpen(false)}
      />

      {/* FILTER DRAWER */}
      <aside
        className={`fixed left-0 top-0 z-[100] h-screen w-[88%] max-w-[380px] bg-white text-black shadow-2xl border-r border-zinc-200 transition-transform duration-300 ${
          filterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 bg-white">
            <h2 className="text-[28px] font-semibold">Filters</h2>

            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="text-zinc-600 hover:text-black"
              aria-label="Close filters"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 bg-white">
            {/* PRICE */}
            <section className="mb-10">
              <h3 className="text-[26px] font-medium mb-6">Price</h3>

              <div className="flex items-center justify-between mb-6">
                <div className="h-14 w-[92px] border border-zinc-300 bg-white rounded-sm" />
                <div className="h-14 w-[92px] border border-zinc-300 bg-white rounded-sm" />
              </div>

              <div className="relative h-10">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-zinc-300 bg-white shadow-sm" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-zinc-300 bg-white shadow-sm" />
              </div>
            </section>

            {/* CATEGORIES */}
            <section className="mb-10">
              <h3 className="text-[26px] font-medium mb-6">Categories</h3>

              <div className="space-y-5">
                {categories.map((category) => (
                  <label
                    key={category.name}
                    className="flex items-center gap-3 text-[17px] text-black"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-zinc-400 shrink-0"
                    />
                    <span>{category.name}</span>
                    <span className="text-zinc-400">{category.count}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* BRANDS */}
            <section>
              <h3 className="text-[26px] font-medium mb-6">Brands</h3>

              <div className="space-y-5">
                {brands.map((brand) => (
                  <label
                    key={brand.name}
                    className="flex items-center gap-3 text-[17px] text-black"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-zinc-400 shrink-0"
                    />

                    <div className="relative h-[58px] w-[112px] overflow-hidden rounded-xl border border-zinc-200 bg-white shrink-0">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>

                    <div className="min-w-0 leading-6">
                      <span>{brand.name}</span>{" "}
                      <span className="text-zinc-400">{brand.count}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}