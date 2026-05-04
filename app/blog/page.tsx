import Image from "next/image";
import TopBar from "@/components/TopBar";
import MainStoreHeader from "@/components/MainStoreHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Replica Bags Blog | Fashion Insights & Style Guide",
  description: "Discover expert insights on luxury replica bags, fashion trends, and style guides. Learn about craftsmanship, quality, and the world of designer-inspired accessories.",
  keywords: "luxury replica bags, fashion blog, designer bags, style guide, Goyard, Dior, Chanel, replica craftsmanship",
  openGraph: {
    title: "Luxury Replica Bags Blog | Fashion Insights & Style Guide",
    description: "Discover expert insights on luxury replica bags, fashion trends, and style guides.",
    type: "website",
    images: ["/blog/blog1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Replica Bags Blog | Fashion Insights & Style Guide",
    description: "Discover expert insights on luxury replica bags, fashion trends, and style guides.",
    images: ["/blog/blog1.jpg"],
  },
};

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

export default function BlogPage() {
  return (
    <main className="bg-[#f6f6f6] min-h-screen">
      <div className="sticky top-0 z-50">
        <TopBar />
        <MainStoreHeader />
        <CategoryNav />
      </div>

      <section className="max-w-7xl mx-auto px-4 pt-10 md:pt-14 pb-16">
        <h1 className="text-center text-[34px] md:text-[52px] font-light uppercase text-black">
          Blog
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white">
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 380px, 280px"
                />

                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-[70px] w-[70px] rounded-full bg-black text-white flex flex-col items-center justify-center text-sm leading-tight">
                  <span>{post.month}</span>
                  <span>{post.day}</span>
                </div>
              </div>

              <div className="px-5 pt-12 pb-8 text-center">
                <h2 className="text-[20px] md:text-[24px] font-semibold leading-9 text-zinc-700">
                  {post.title}
                </h2>

                <p className="mt-5 text-[16px] md:text-[18px] leading-9 text-zinc-700">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
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
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}