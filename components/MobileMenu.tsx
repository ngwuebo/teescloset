"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../data/products";
import { formatCurrency } from "../lib/formatCurrency";

type MenuSectionKey =
  | "brands"
  | "women"
  | "men"
  | "wallets"
  | "travel"
  | null;

type ChildLink = {
  label: string;
  href: string;
};

type MenuSection = {
  key: Exclude<MenuSectionKey, null>;
  label: string;
  href: string;
  children: ChildLink[];
};

const WHATSAPP_LINK = "https://wa.me/2348012345678";

const menuSections: MenuSection[] = [
  {
    key: "brands",
    label: "SHOP ALL BRANDS",
    href: "/brands",
    children: [
      { label: "Replica Balenciaga Bags", href: "/brands/balenciaga" },
      { label: "Replica Bottega Veneta Bags", href: "/brands/bottega-veneta" },
      { label: "Replica Celine Bags", href: "/brands/celine" },
      { label: "Replica Chanel Bags", href: "/brands/chanel" },
      { label: "Replica Dior Bags", href: "/brands/dior" },
      { label: "Replica Fendi Bags", href: "/brands/fendi" },
      { label: "Replica Goyard Bags", href: "/brands/goyard" },
      { label: "Replica Gucci Bags", href: "/brands/gucci" },
      { label: "Replica Hermes Bags", href: "/brands/hermes" },
      { label: "Replica Louis Vuitton Bags", href: "/brands/louis-vuitton" },
      { label: "Replica Miu Miu Bags", href: "/brands/miu-miu" },
      { label: "Replica Prada Bags", href: "/brands/prada" },
      { label: "Replica Rimowa Luggage", href: "/brands/rimowa" },
      { label: "Replica Saint Laurent Bags", href: "/brands/saint-laurent" },
    ],
  },
  {
    key: "women",
    label: "WOMEN’S BAGS",
    href: "/womens-bags",
    children: [
      { label: "Replica Balenciaga Women’s Bags", href: "/womens-bags/balenciaga" },
      { label: "Replica Bottega Veneta Women’s Bags", href: "/womens-bags/bottega-veneta" },
      { label: "Replica Dior Women’s Bags", href: "/womens-bags/dior" },
      { label: "Replica Goyard Women’s Bags", href: "/womens-bags/goyard" },
      { label: "Replica Gucci Women’s Bags", href: "/womens-bags/gucci" },
      { label: "LV-Inspired Women’s Bags", href: "/womens-bags/lv-inspired" },
      { label: "Replica Prada Women’s Bags", href: "/womens-bags/prada" },
      { label: "Replica Saint Laurent Women’s Bags", href: "/womens-bags/saint-laurent" },
    ],
  },
  {
    key: "men",
    label: "MEN’S BAGS",
    href: "/mens-bags",
    children: [
      { label: "Replica Balenciaga Men’s Bags", href: "/mens-bags/balenciaga" },
      { label: "Replica Bottega Veneta Men’s Bags", href: "/mens-bags/bottega-veneta" },
      { label: "Replica Dior Men’s Bags", href: "/mens-bags/dior" },
      { label: "Replica Goyard Men’s Bags", href: "/mens-bags/goyard" },
      { label: "Replica Gucci Men’s Bags", href: "/mens-bags/gucci" },
      { label: "LV-Inspired Men’s Bags", href: "/mens-bags/lv-inspired" },
      { label: "Replica Prada Men’s Bags", href: "/mens-bags/prada" },
      { label: "Replica Saint Laurent Men’s Bags", href: "/mens-bags/saint-laurent" },
    ],
  },
  {
    key: "wallets",
    label: "WALLETS & CLUTCHES",
    href: "/wallets-and-clutches",
    children: [
      { label: "Long Wallets", href: "/wallets-and-clutches/long-wallets" },
      { label: "Zip Wallets", href: "/wallets-and-clutches/zip-wallets" },
      { label: "Card Holders", href: "/wallets-and-clutches/card-holders" },
      { label: "Clutches", href: "/wallets-and-clutches/clutches" },
      { label: "Chain Wallets", href: "/wallets-and-clutches/chain-wallets" },
    ],
  },
  {
    key: "travel",
    label: "TRAVEL BAGS",
    href: "/travel-bags",
    children: [
      { label: "Duffle Bags", href: "/travel-bags/duffle-bags" },
      { label: "Weekenders", href: "/travel-bags/weekenders" },
      { label: "Cabin Bags", href: "/travel-bags/cabin-bags" },
      { label: "Travel Cases", href: "/travel-bags/travel-cases" },
      { label: "Luggage", href: "/travel-bags/luggage" },
    ],
  },
];

const bottomLinks = [
  { label: "ABOUT US", href: "/about" },
  { label: "BLOG", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "CONTACT US", href: "/contact" },
  { label: "REAL REVIEWS OF REPLICA BAGS", href: "/reviews" },
  { label: "RETURN AND REFUND POLICY", href: "/return-and-refund-policy" },
  { label: "MY ACCOUNT", href: "/login" },
];

function WhatsAppIcon() {
  return (
    <Image
      src="/WhatsApp-Logo.jpg"
      alt="WhatsApp"
      width={64}
      height={64}
      className="shrink-0 transform -rotate-12"
    />
  );
}

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<MenuSectionKey>(null);
  const [query, setQuery] = useState("");

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
    if (!normalizedQuery || matchedProducts.length > 0) return [];
    return products.slice(0, 4);
  }, [normalizedQuery, matchedProducts]);

  const showSearchResults = normalizedQuery.length > 0;

  const goToProduct = (id: number) => {
    router.push(`/products/${id}`);
    setQuery("");
    onClose();
  };

  return (
    <>
      <div
        className={`md:hidden fixed inset-0 z-[70] bg-black/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`md:hidden fixed top-0 left-0 z-[80] h-screen w-[calc(100%-2.25rem)] max-w-[520px] bg-[#f6f6f6] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="sticky top-0 z-20 bg-[#f6f6f6] px-4 pt-4 pb-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="text-3xl leading-none text-zinc-700"
              >
                ×
              </button>
            </div>

            <div className="mt-3">
              <div className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 flex items-center gap-3 text-sm text-zinc-500">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full bg-transparent outline-none text-zinc-700 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="mt-4 border-b border-black" />
          </div>

          <div className="pb-8">
            {showSearchResults && (
              <div className="border-b border-zinc-200 bg-white">
                {matchedProducts.length > 0 ? (
                  <>
                    <div className="px-6 py-3 text-xs uppercase tracking-[0.08em] text-zinc-400">
                      Search Results
                    </div>

                    {matchedProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => goToProduct(product.id)}
                        className="w-full flex items-center gap-3 px-6 py-4 text-left border-t border-zinc-200 hover:bg-zinc-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover border border-zinc-200 shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="text-[15px] font-medium text-zinc-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="px-6 pt-4 text-[15px] font-medium text-zinc-900">
                      No exact match found
                    </div>
                    <div className="px-6 pb-3 text-xs uppercase tracking-[0.08em] text-zinc-400">
                      Suggested bags
                    </div>

                    {suggestedProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => goToProduct(product.id)}
                        className="w-full flex items-center gap-3 px-6 py-4 text-left border-t border-zinc-200 hover:bg-zinc-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover border border-zinc-200 shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="text-[15px] font-medium text-zinc-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}

            {menuSections.map((section) => {
              const expanded = openSection === section.key;

              return (
                <div key={section.key} className="border-b border-zinc-200">
                  <div className="grid grid-cols-[1fr_72px] min-h-[74px]">
                    <a
                      href={section.href}
                      className="flex items-center px-6 text-[17px] font-semibold tracking-[0.04em] text-zinc-900"
                      onClick={onClose}
                    >
                      {section.label}
                    </a>

                    <button
                      type="button"
                      aria-label={`Toggle ${section.label}`}
                      onClick={() =>
                        setOpenSection((prev) =>
                          prev === section.key ? null : section.key
                        )
                      }
                      className="border-l border-zinc-200 flex items-center justify-center text-2xl text-zinc-800"
                    >
                      {expanded ? "⌃" : "⌄"}
                    </button>
                  </div>

                  {expanded && (
                    <div className="bg-[#f1f1f1]">
                      {section.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-6 py-6 text-[15px] text-zinc-700 border-t border-zinc-200 hover:bg-white transition"
                        >
                          <span className="text-zinc-400">-</span>
                          <span className="text-lg leading-none text-zinc-500">›</span>
                          <span>{child.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="block border-b border-zinc-200 px-6 py-8 text-[17px] font-semibold tracking-[0.04em] text-zinc-900"
              >
                {link.label}
              </a>
            ))}

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-6 text-[16px] text-zinc-900"
            >
              <WhatsAppIcon />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}