"use client";

import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div className="w-full border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 md:py-3 text-xs md:text-sm text-zinc-600 flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-black transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-black font-medium">{item.label}</span>
            )}

            {index !== items.length - 1 && (
              <span className="text-zinc-400">›</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}