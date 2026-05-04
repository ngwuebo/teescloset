import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#94856a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-5 md:py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg md:text-xl font-light tracking-[0.18em] leading-none text-center md:text-left">
            TEES CLOSET
          </h2>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
              alt="Visa"
              width={24}
              height={24}
              className="h-4 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              width={24}
              height={24}
              className="h-4 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
              alt="American Express"
              width={24}
              height={24}
              className="h-4 w-auto object-contain bg-white px-1 rounded opacity-80 hover:opacity-100 transition"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              width={24}
              height={24}
              className="h-4 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
              alt="Bitcoin"
              width={24}
              height={24}
              className="h-4 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png"
              alt="Bank Transfer"
              width={24}
              height={24}
              className="h-4 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 md:gap-x-5 md:gap-y-2.5 text-[10px] md:text-xs uppercase tracking-[0.08em] text-white/85">
          <a href="#" className="hover:text-white transition">
            About Us
          </a>
          <Link href="/blog" className="hover:text-white transition">
            Blog
          </Link>
          <a href="#" className="hover:text-white transition">
            Your Wishlist
          </a>
          <a href="#" className="hover:text-white transition">
            Sale
          </a>
          <a href="#" className="hover:text-white transition">
            FAQ
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
          <a href="#" className="hover:text-white transition">
            Legal Disclaimer
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Use
          </a>
          <a href="#" className="hover:text-white transition">
            Refund and Returns Policy
          </a>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 border-t border-white/20 pt-3 text-[10px] md:flex-row md:items-center md:justify-between md:text-xs text-white/65">
          <span className="text-center md:text-left">
            2026 © TeesCloset All Right Reserved
          </span>
          <span className="text-center md:text-right">
            Worldwide Express Delivery
          </span>
        </div>
      </div>
    </footer>
  );
}