"use client";

import { useState } from "react";
import { Product } from "../data/products";
import { addToCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 md:w-5 md:h-5"
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

export default function ProductCard({ product }: { product: Product }) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedColor: product.colors?.[0]?.name,
    });
  };

  return (
    <div
      className="
        group relative bg-white rounded-md overflow-hidden
        border border-zinc-100 md:border-zinc-200
        transition-all duration-200
        active:border-zinc-300 active:shadow-md active:-translate-y-[1px]
        md:hover:border-zinc-300 md:hover:shadow-xl md:hover:-translate-y-1
      "
    >
      <a href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {product.onSale && (
            <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 bg-white text-black text-[10px] md:text-xs rounded-full px-2.5 py-1 shadow">
              Sale!
            </div>
          )}

          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
            className="
              absolute top-2 right-2 md:top-3 md:right-3 z-10
              w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 shadow
              flex items-center justify-center text-black
              opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition
            "
          >
            <CartIcon />
          </button>

          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f8f8f8]">
            <img
              src={product.image}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                product.image2
                  ? "md:group-hover:opacity-0 md:group-hover:scale-105"
                  : ""
              }`}
            />

            {product.image2 && (
              <img
                src={product.image2}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 md:group-hover:opacity-100 md:group-hover:scale-105"
              />
            )}
          </div>
        </div>
      </a>

      <div className="px-2.5 md:px-4 py-3 md:py-4 text-center">
        <a href={`/products/${product.id}`} className="block">
          <h3 className="text-[12px] md:text-base text-zinc-800 leading-5 md:leading-6 min-h-[40px] md:min-h-[52px] md:hover:text-black">
            {product.name}
          </h3>
        </a>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 mb-2.5 md:mt-3 md:mb-3">
            <div className="flex justify-center flex-wrap gap-1.5 md:gap-2 relative">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="relative"
                  onMouseEnter={() => setHoveredColor(color.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <button
                    className="w-4 h-4 md:w-6 md:h-6 rounded-full border border-zinc-300 shadow-sm md:hover:scale-110 transition"
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    type="button"
                  />

                  {hoveredColor === color.name && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-200 text-zinc-800 text-xs px-3 py-1 rounded shadow-md z-20">
                      {color.name}
                    </div>
                  )}
                </div>
              ))}

              {product.colors.length > 4 && (
                <span className="text-[10px] md:text-xs text-zinc-500 flex items-center">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-1">
          {product.onSale && product.oldPrice ? (
            <div className="space-y-0.5">
              <p className="text-xs md:text-sm text-zinc-400 line-through">
                {formatCurrency(product.oldPrice)}
              </p>
              <p className="text-sm md:text-lg font-semibold text-black">
                {formatCurrency(product.price)}
              </p>
            </div>
          ) : (
            <p className="text-sm md:text-lg font-semibold text-black">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}