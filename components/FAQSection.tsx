"use client";

import { useState } from "react";

const faqs = [
  {
    question:
      "1. WHAT MAKES ALLREPLICABAGS A TRUSTED SOURCE FOR REPLICA DESIGNER HANDBAGS?",
    answer:
      "We focus on accurate product photos, premium materials, strict quality control, and clear communication before shipment.",
  },
  {
    question:
      "2. HOW DO I KNOW YOUR REPLICA BAGS ARE ACTUALLY HIGH QUALITY?",
    answer:
      "We use detailed materials, close-up photos, and careful finishing standards so the quality matches what you see on the website.",
  },
  {
    question:
      "3. HOW CLOSE ARE YOUR REPLICAS TO REAL DESIGNER BAGS?",
    answer:
      "Our pieces are selected for strong visual accuracy, premium finishing, and everyday usability, making them close in look and feel.",
  },
  {
    question:
      "4. WHY DO CUSTOMERS TRUST ALLREPLICABAGS OVER OTHER REPLICA SELLERS?",
    answer:
      "Customers return because of consistent quality, honest communication, and safe delivery support throughout the ordering process.",
  },
  {
    question:
      "5. DO YOU OFFER REPLICA BAGS MADE FROM REAL LEATHER AND PREMIUM MATERIALS?",
    answer:
      "Yes, many styles are made with premium leather and carefully selected materials depending on the design and model.",
  },
  {
    question:
      "6. CAN I BUY REPLICA BAGS ONLINE SAFELY THROUGH YOUR STORE?",
    answer:
      "Yes. We keep the process simple, secure, and transparent, with customer support available if you need help before ordering.",
  },
  {
    question:
      "7. WHAT STYLES OF REPLICA HANDBAGS DO YOU SPECIALIZE IN?",
    answer:
      "We carry women’s bags, men’s bags, wallets, clutches, travel styles, and many best-selling designer-inspired silhouettes.",
  },
  {
    question:
      "8. WHY CHOOSE A REPLICA BAG INSTEAD OF AN ORIGINAL DESIGNER BAG?",
    answer:
      "A high-quality replica lets you enjoy the look, style, and luxury feel of designer fashion at a far more accessible price.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14 md:py-16">
      <h2 className="text-center text-[26px] md:text-[34px] font-medium uppercase text-black">
        Replica Bags FAQ — AllReplicaBags Answers Your Most Asked Questions
      </h2>

      <div className="mt-8 border border-zinc-300 bg-[#f8f8f8]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question} className="border-b border-zinc-300 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center gap-3 px-4 py-5 text-left text-[15px] md:text-[18px] text-black"
              >
                <span className="text-[28px] leading-none">+</span>
                <span>{faq.question}</span>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 pl-12 text-[15px] md:text-[17px] leading-8 text-zinc-700">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-[17px] md:text-[18px] font-medium text-zinc-700">
        Still have questions? Our friendly support team is happy to help —{" "}
        <a
          href="https://wa.me/2348012345678"
          target="_blank"
          rel="noreferrer"
          className="text-black font-semibold"
        >
          chat with us on WhatsApp
        </a>
      </p>
    </section>
  );
}