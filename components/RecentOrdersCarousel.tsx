"use client";

import Image from "next/image";

const recentOrders = [
  {
    id: 1,
    image: "/bags/bag4b.jpg",
    name: "Replica LV Onthego PM Beige",
    price: "£239 - £339",
  },
  {
    id: 2,
    image: "/bags/bag12c.jpg",
    name: "Replica Louis Vuitton Capucines Blue Velvet",
    price: "£269 - £369",
  },
  {
    id: 3,
    image: "/bags/bag3b.jpg",
    name: "Replica Prada Saffiano White Small Envelope",
    price: "£285",
  },
  {
    id: 4,
    image: "/bags/bag7e.jpg",
    name: "Replica Louis Vuitton Loop Denim Canvas",
    price: "£259 - £359",
  },
  {
    id: 5,
    image: "/bags/bag8b.jpg",
    name: "Replica Chanel Classic Mini Flap Bag",
    price: "£249 - £329",
  },
  {
    id: 6,
    image: "/bags/bag9b.jpg",
    name: "Replica Dior Saddle Blue Oblique",
    price: "£255 - £349",
  },
  {
    id: 7,
    image: "/bags/bag11b.jpg",
    name: "Replica Gucci Jackie Shoulder Bag",
    price: "£245 - £335",
  },
  {
    id: 8,
    image: "/bags/bag13b.jpg",
    name: "Replica Fendi Peekaboo Mini Bag",
    price: "£279 - £379",
  },
];

const loopOrders = [...recentOrders, ...recentOrders];

export default function RecentOrdersCarousel() {
  return (
    <section className="bg-[#f3f3f3] border-t border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-5 md:py-6">
        <h3 className="text-xl md:text-2xl text-zinc-700 mb-4">
          Recent Orders...
        </h3>

        <div className="overflow-hidden">
          <div className="recent-orders-marquee flex w-max items-start gap-4 md:gap-6">
            {loopOrders.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-[calc(50vw-1.5rem)] max-w-[220px] md:w-[calc(25vw-2rem)] md:max-w-[320px]"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={144}
                    height={144}
                    className="w-24 h-24 md:w-32 md:h-28 lg:w-36 lg:h-32 object-cover rounded-md"
                  />

                  <div className="min-w-0 pt-1">
                    <p className="text-[13px] md:text-[15px] leading-5 md:leading-6 text-zinc-700 line-clamp-3">
                      {item.name}
                    </p>
                    <p className="mt-2 text-[13px] md:text-[15px] font-semibold text-zinc-700">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .recent-orders-marquee {
          animation: recent-orders-scroll 32s linear infinite;
        }

        @keyframes recent-orders-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 767px) {
          .recent-orders-marquee {
            animation-duration: 22s;
          }
        }
      `}</style>
    </section>
  );
}