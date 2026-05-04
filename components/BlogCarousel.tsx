"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const blogPosts = [
  {
    id: 1,
    title:
      "Replica Goyard Bag — The Craftsmanship Behind 1:1 Goyard Superclone Bags",
    excerpt:
      "all replica bags — the #1 store for goyard replica bags, wallets and backpacks the replica goyard bag world has changed. what was once a ...",
    image: "/blog/blog1.jpg",
    month: "DEC",
    day: "14",
  },
  {
    id: 2,
    title:
      "Replica Dior Bag — The Real Story Behind Dior Replica Bags, Wallets And Accessories",
    excerpt:
      "all replica bags — the #1 store for dior superclone bags and luxury replicas a fake dior bag today is a masterpiece of precision. the ...",
    image: "/blog/blog2.jpg",
    month: "DEC",
    day: "14",
  },
  {
    id: 3,
    title:
      "Replica Chanel & Dior Bags: An Insider’s Perspective On Quality And Craftsmanship",
    excerpt:
      "replica chanel & dior bags: an insider’s perspective on quality and craftsmanship for years, our team of luxury authenticators and fashion industry veterans has operated ...",
    image: "/blog/blog3.jpg",
    month: "NOV",
    day: "17",
  },
  {
    id: 4,
    title:
      "Luxury Replica Bags Guide — What To Look For Before You Buy",
    excerpt:
      "Learn how material quality, stitching, hardware, and shape all affect the final look and feel of a premium replica handbag...",
    image: "/blog/blog4.jpg",
    month: "NOV",
    day: "08",
  },
  {
    id: 5,
    title:
      "Best Everyday Designer-Inspired Bags For Work, Travel And Weekend Style",
    excerpt:
      "A closer look at practical designer-inspired bags that combine structure, storage, and timeless styling for daily use...",
    image: "/blog/blog5.jpg",
    month: "OCT",
    day: "29",
  },
];

export default function BlogCarousel() {
  const duplicatedPosts = useMemo(() => [...blogPosts, ...blogPosts], []);
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const goTo = (target: number) => {
    setIndex(target);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-16">
      <h2 className="text-center text-[30px] md:text-[44px] font-light uppercase text-black">
        Blog
      </h2>

      <div className="mt-8 relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 33.3333}%)` }}
        >
          {duplicatedPosts.map((post, i) => (
            <div
              key={`${post.id}-${i}`}
              className="w-full md:w-1/3 shrink-0 px-2"
            >
              <article className="bg-white">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 430px, 300px"
                  />

                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-[70px] w-[70px] rounded-full bg-black text-white flex flex-col items-center justify-center text-sm leading-tight">
                    <span>{post.month}</span>
                    <span>{post.day}</span>
                  </div>
                </div>

                <div className="px-5 pt-12 pb-8 text-center">
                  <h3 className="text-[18px] md:text-[22px] font-semibold leading-9 text-zinc-700">
                    {post.title}
                  </h3>

                  <p className="mt-5 text-[16px] md:text-[18px] leading-9 text-zinc-700">
                    {post.excerpt}
                  </p>

                  <Link
                    href="/blog"
                    className="inline-flex mt-6 items-center justify-center bg-black text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition"
                  >
                    Read More
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next blog posts"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-zinc-200 w-10 h-10 rounded-full flex items-center justify-center text-black"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() =>
            setIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)
          }
          aria-label="Previous blog posts"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-zinc-200 w-10 h-10 rounded-full flex items-center justify-center text-black"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {blogPosts.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            onClick={() => goTo(dotIndex)}
            aria-label={`Go to blog slide ${dotIndex + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index % blogPosts.length === dotIndex ? "bg-zinc-500" : "bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}