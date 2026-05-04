"use client";

import { useEffect, useRef } from "react";

const brands = [
  "GUCCI",
  "LOUIS VUITTON",
  "CHANEL",
  "DIOR",
  "PRADA",
  "FENDI",
  "HERMES",
  "CELINE",
  "BALENCIAGA",
  "SAINT LAURENT",
];

export default function BrandCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const loopBrands = [...brands, ...brands]; // needed for seamless loop

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;
    const scrollSpeed = 2; // 🔥 adjust speed here

    const animate = () => {
      container.scrollLeft += scrollSpeed;

      // reset when halfway (seamless loop)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 py-5 overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-3 overflow-x-hidden"
        >
          {loopBrands.map((brand, i) => (
            <div
              key={i}
              className="
                shrink-0
                bg-black text-white
                rounded-md
                px-6 py-4
                font-semibold
                tracking-wide
                text-sm md:text-base
                min-w-[48%] md:min-w-55
                flex items-center justify-center
              "
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}