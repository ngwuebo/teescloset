"use client";

import { useEffect, useState } from "react";

const images = [
  {
    src: "/hero/home-hero.jpg",
    position: "center center",
  },
  {
    src: "/hero/home-hero-2.jpg",
    position: "center center",
  },
  {
    src: "/hero/home-hero-3.jpg",
    position: "center center",
  },

{
    src: "/hero/home-hero-4.jpg",
    position: "center center",
  },

  {
    src: "/hero/home-hero-5.jpg",
    position: "center center",
  },

];

export default function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-0">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[430px] overflow-hidden bg-black">
        {images.map((image, i) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt="Premium replica designer bags"
              className="w-full h-full object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-6 md:pb-10">
            <div className="max-w-[92%] sm:max-w-[500px] md:max-w-[620px] text-white">
              <p className="mb-2 text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-white/75">
                Soft luxury collection
              </p>

              <h1 className="text-[22px] sm:text-[26px] md:text-[38px] font-medium leading-[1.08] tracking-[-0.02em]">
                Premium Replica Designer Bags
              </h1>

              <p className="mt-2 md:mt-3 max-w-[34ch] text-[13px] md:text-[15px] leading-6 text-white/82">
                Refined styles with polished details 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}