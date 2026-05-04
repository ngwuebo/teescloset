"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CartItem,
  getCart,
  getCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";

type PaymentMethod =
  | "crypto"
  | "revolut"
  | "bank"
  | "card"
  | "skrill";

const SHIPPING_FEE = 35;
const DISCOUNT_RATE = 0.1;
const discountEligibleMethods = ["crypto", "revolut", "bank", "skrill"];

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("crypto");

  useEffect(() => {
    const loadCart = () => {
      setCart(getCart());
    };

    loadCart();

    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const refreshCart = () => {
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrease = (lineId: string) => {
    increaseQuantity(lineId);
    refreshCart();
  };

  const handleDecrease = (lineId: string) => {
    decreaseQuantity(lineId);
    refreshCart();
  };

  const handleRemove = (lineId: string) => {
    removeFromCart(lineId);
    refreshCart();
  };

  const subtotal = useMemo(() => getCartTotal(cart), [cart]);

  const discount = useMemo(() => {
    if (discountEligibleMethods.includes(paymentMethod)) {
      return subtotal * DISCOUNT_RATE;
    }
    return 0;
  }, [subtotal, paymentMethod]);

  const total = useMemo(
    () => subtotal - discount + SHIPPING_FEE,
    [subtotal, discount]
  );

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 border-b border-black pb-3 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Checkout
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-600">
            Where to ship it?
          </p>
        </header>

        {/* ORDER SUMMARY */}
        <section className="mb-4 rounded-md border border-zinc-300 bg-white shadow-sm">
          <div className="p-4 md:p-5">
            <h2 className="text-xl md:text-2xl font-semibold uppercase">
              Order Summary
            </h2>

            <button className="mt-3 text-sm text-blue-600 hover:underline">
              Have a coupon? Click here to enter your code
            </button>

            <div className="mt-5 space-y-4">
              {cart.length === 0 ? (
                <p className="text-zinc-600">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <div className="relative shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-14 w-14 md:h-16 md:w-16 object-cover border border-zinc-300"
                      />
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-400 text-[10px] text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm md:text-base leading-5">
                            {item.name}
                            {item.selectedColor
                              ? ` - ${item.selectedColor}`
                              : ""}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => handleDecrease(item.lineId)}
                              className="h-7 w-7 rounded border border-zinc-300 text-sm hover:bg-zinc-50"
                            >
                              −
                            </button>
                            <button
                              onClick={() => handleIncrease(item.lineId)}
                              className="h-7 w-7 rounded border border-zinc-300 text-sm hover:bg-zinc-50"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleRemove(item.lineId)}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <p className="whitespace-nowrap text-sm md:text-base">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 border-t border-zinc-300 pt-4 space-y-2 text-sm md:text-base">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>10 % discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(SHIPPING_FEE)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-zinc-300 pt-4 flex items-center justify-between">
              <span className="text-2xl font-medium">Total</span>
              <span className="text-3xl font-semibold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </section>

        {/* SHIPPING INFORMATION */}
        <section className="mb-4 rounded-md border border-zinc-300 bg-white shadow-sm">
          <div className="p-4 md:p-5">
            <h2 className="text-xl md:text-2xl font-semibold uppercase">
              Shipping Information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <input
                type="email"
                placeholder="Email *"
                className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
              />

              <div className="grid grid-cols-[88px_1fr] gap-3">
                <div className="h-12 rounded border border-zinc-300 px-3 flex items-center text-sm">
                  🇬🇧 +44
                </div>
                <input
                  type="text"
                  placeholder="Phone"
                  className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
                />
              </div>

              <input
                type="text"
                placeholder="First name *"
                className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Last name *"
                className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
              />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
                <input
                  type="text"
                  placeholder="Street address *"
                  className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
                />
                <button className="text-sm text-blue-600 hover:underline md:justify-self-start">
                  + Add Apartment, suite, unit, etc.
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Town / City *"
                  className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Postcode *"
                  className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black bg-white">
                  <option>United Kingdom (UK)</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>

                <input
                  type="text"
                  placeholder="State"
                  className="h-12 w-full rounded border border-zinc-300 px-4 outline-none focus:border-black"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Use a different billing address (optional)</span>
              </label>

              <textarea
                placeholder="Order notes"
                className="min-h-[110px] w-full rounded border border-zinc-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>
        </section>

        {/* SHIPPING METHOD */}
        <section className="mb-4 rounded-md border border-zinc-300 bg-white shadow-sm">
          <div className="p-4 md:p-5">
            <h2 className="text-xl md:text-2xl font-semibold uppercase">
              Shipping Method
            </h2>

            <div className="mt-4 text-sm font-medium">Shipping method</div>

            <div className="mt-3 flex items-center justify-between rounded border border-zinc-300 px-4 py-3 text-sm md:text-base">
              <span>Flat rate</span>
              <span>{formatCurrency(SHIPPING_FEE)}</span>
            </div>
          </div>
        </section>

        {/* PAYMENT */}
        <section className="rounded-md border border-zinc-300 bg-white shadow-sm">
          <div className="p-4 md:p-5">
            <h2 className="text-xl md:text-2xl font-semibold uppercase">
              Payment
            </h2>
            <p className="mt-1 text-[11px] uppercase text-zinc-500">
              All transactions are secure and encrypted.
            </p>

            <div className="mt-4 overflow-hidden rounded border border-zinc-300">
              {/* CRYPTO */}
              <label className="block cursor-pointer border-b border-zinc-300">
                <div className="flex items-center gap-3 px-4 py-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "crypto"}
                    onChange={() => setPaymentMethod("crypto")}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                      <span>Crypto Payment (USDT / BTC & More)</span>
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs">
                        ₿
                      </span>
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs">
                        USDT
                      </span>
                      <span className="text-zinc-600">- 10% Discount</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === "crypto" && (
                  <div className="border-t border-zinc-300 bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
                    We recommend paying with cryptocurrency. Traditional card
                    processors often restrict or block transactions in this
                    niche due to their regulations. Crypto payments are more
                    reliable for completing your order smoothly.
                    <br />
                    For step-by-step instructions, please check our Crypto
                    Payment Guide.
                  </div>
                )}
              </label>

              {/* REVOLUT */}
              <label className="flex cursor-pointer items-center gap-3 border-b border-zinc-300 px-4 py-4 text-sm md:text-base">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "revolut"}
                  onChange={() => setPaymentMethod("revolut")}
                />
                <span className="flex-1">
                  Revolut / Wise App Transfers
                </span>
                <span className="rounded bg-lime-400 px-2 py-0.5 text-xs font-semibold text-black">
                  TWISE
                </span>
                <span className="text-zinc-600">- 10% discount</span>
              </label>

              {/* BANK */}
              <label className="flex cursor-pointer items-center gap-3 border-b border-zinc-300 px-4 py-4 text-sm md:text-base">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span className="flex-1">
                  Bank Wire (SEPA / ACH / SWIFT)
                </span>
                <span className="text-zinc-600">- 10% discount</span>
              </label>

              {/* CARD */}
              <label className="flex cursor-pointer items-center gap-3 border-b border-zinc-300 px-4 py-4 text-sm md:text-base">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span className="flex-1">
                  Pay by Card (Visa / Mastercard)
                </span>
                <span className="font-semibold text-blue-700">VISA</span>
                <span className="font-semibold text-orange-500">Mastercard</span>
              </label>

              {/* SKRILL */}
              <label className="flex cursor-pointer items-center gap-3 px-4 py-4 text-sm md:text-base">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "skrill"}
                  onChange={() => setPaymentMethod("skrill")}
                />
                <span className="flex-1">Skrill / Neteller</span>
                <span className="rounded bg-fuchsia-700 px-2 py-0.5 text-xs text-white">
                  Skrill
                </span>
                <span className="rounded bg-green-700 px-2 py-0.5 text-xs text-white">
                  Neteller
                </span>
                <span className="text-zinc-600">- 10% discount</span>
              </label>
            </div>

            <div className="mt-4 space-y-3 text-[11px] leading-5 text-zinc-700 md:text-xs">
              <p>
                Dear customer, we will keep you fully informed about your order
                at every stage and share all details transparently.
              </p>
              <p>
                After you place your order, our team will contact you to
                confirm the payment method. Before shipment, you will receive
                clear QC photos of your items so you can verify everything is
                correct.
              </p>
            </div>

            <button className="mt-6 flex w-full items-center justify-center rounded-md bg-black px-5 py-4 text-lg font-semibold text-white hover:bg-zinc-900">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Place Order&nbsp;&nbsp;{formatCurrency(total)}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}