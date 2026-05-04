import Image from "next/image";

export default function WhyBuySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <h2 className="text-[28px] md:text-[34px] font-light tracking-[0.02em] uppercase text-black">
            Why Buy From Us?
          </h2>

          <div className="relative mt-6 overflow-hidden bg-white">
            <Image
              src="/sections/why-buy-main.jpg"
              alt=""
              fill
              className="object-cover object-top"
              sizes="(min-width: 768px) 560px, 100vw"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-[22px] md:text-[24px] font-medium uppercase text-black">
              Expert Craftsmanship
            </h3>

            <p className="mt-5 text-[15px] md:text-[18px] leading-8 text-zinc-700">
              We believe everyone should enjoy the beauty of a high end designer
              bag. For this reason, we only provide replica bags made to look and
              feel like authentic ones. We create all of our items with premium
              materials, clean stitches, and well-made hardware. Whether it is a
              fake handbag or aaa purses we make sure it meets high standards
              before it reaches you. We want to fulfill your designer bags dupes
              that stands out, stays solid over time, and is a pleasure to touch.
            </p>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-[22px] md:text-[24px] font-medium uppercase text-black">
              Affordable Designer Luxury
            </h3>

            <p className="mt-5 text-[15px] md:text-[18px] leading-8 text-zinc-700">
              We’ve built a strong reputation by keeping things simple: great
              quality, fair prices, and happy customers. Since many customers
              return to buy more, it speaks for itself about the product. We pay
              attention to your feedback and are always looking for ways to
              improve our services. Expect luxury fashion without experiencing any
              stress.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-[22px] md:text-[24px] font-medium uppercase text-black">
              Lasting Durability & Style
            </h3>

            <p className="mt-5 text-[15px] md:text-[18px] leading-8 text-zinc-700">
              Trusting us means a lot to us. Our photos of designer replica bags
              are real and we do not mislead with our descriptions. What you
              notice is precisely what you see. We show accurate photos, detailed
              explanations, and real prices on our website. If you ever have a
              question about knock off handbags we offer our friendly customer
              support team is ready to help. Your order also arrives quickly and
              safely because we offer secure payments. We ensure that your privacy
              is respected and we do not give away any of your information. All
              steps from buying perfect knock off designer bags to receiving
              orders are done efficiently and with full transparency.
            </p>
          </div>

          <div className="relative mt-8 overflow-hidden bg-white">
            <Image
              src="/sections/why-buy-detail.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 300px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}