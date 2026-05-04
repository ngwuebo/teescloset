"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CartItem,
  closeCartDrawer,
  decreaseQuantity,
  getCart,
  getCartItemCount,
  getCartTotal,
  increaseQuantity,
  removeFromCart,
} from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => getCart());

  const refreshCart = () => setCart(getCart());

  useEffect(() => {
    const handleOpen = () => {
      refreshCart();
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    };

    const handleClose = () => {
      setIsOpen(false);
      document.body.style.overflow = "";
    };

    const handleCartUpdated = () => {
      refreshCart();
    };

    window.addEventListener("openCartDrawer", handleOpen);
    window.addEventListener("closeCartDrawer", handleClose);
    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleCartUpdated);

    return () => {
      window.removeEventListener("openCartDrawer", handleOpen);
      window.removeEventListener("closeCartDrawer", handleClose);
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleCartUpdated);
      document.body.style.overflow = "";
    };
  }, []);

  const subtotal = useMemo(() => getCartTotal(cart), [cart]);
  const itemCount = useMemo(() => getCartItemCount(cart), [cart]);

  const handleOverlayClick = () => {
    setIsOpen(false);
    closeCartDrawer();
    document.body.style.overflow = "";
  };

  const handleDecrease = (lineId: string) => {
    decreaseQuantity(lineId);
    refreshCart();
  };

  const handleIncrease = (lineId: string) => {
    increaseQuantity(lineId);
    refreshCart();
  };

  const handleRemove = (lineId: string) => {
    removeFromCart(lineId);
    refreshCart();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/40"
        onClick={handleOverlayClick}
      />

      <aside className="fixed right-0 top-0 z-[100] h-screen w-full md:max-w-[560px] bg-[#f7f7f7] text-black shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-200">
          <h2 className="text-[22px] font-semibold">
            Review Your Cart ({itemCount})
          </h2>

          <button
            onClick={handleOverlayClick}
            className="text-4xl leading-none text-zinc-600 hover:text-black"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5 space-y-8">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-medium mb-3">Your cart is empty</p>
                <button
                  onClick={handleOverlayClick}
                  className="rounded-lg bg-black px-6 py-3 text-white"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div
                      key={item.lineId}
                      className="grid grid-cols-[96px_1fr_auto] gap-4 items-start"
                    >
                      <div className="relative">
                        <button
                          onClick={() => handleRemove(item.lineId)}
                          className="absolute -left-3 -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-[#eef0f7] text-xl leading-none text-zinc-700"
                          aria-label={`Remove ${item.name}`}
                        >
                          ×
                        </button>

                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-24 w-24 rounded-xl object-cover border border-zinc-200"
                        />
                      </div>

                      <div>
                        <h3 className="text-[18px] leading-tight font-semibold">
                          {item.name}
                        </h3>

                        {item.selectedColor && (
                          <p className="mt-2 text-zinc-500">
                            Color: {item.selectedColor}
                          </p>
                        )}

                        <button className="mt-1 text-[15px] text-blue-600 hover:underline">
                          Select options
                        </button>

                        <div className="mt-4 inline-flex items-center overflow-hidden rounded-xl border border-zinc-300">
                          <button
                            onClick={() => handleDecrease(item.lineId)}
                            className="h-10 w-12 text-2xl text-zinc-700"
                          >
                            −
                          </button>

                          <span className="flex h-10 min-w-[44px] items-center justify-center border-x border-zinc-300 px-4 text-lg">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item.lineId)}
                            className="h-10 w-12 text-2xl text-zinc-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="pt-1 text-[18px] font-medium whitespace-nowrap">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 items-center pt-8">
                  <div className="relative h-[180px] w-full">
                    <Image
                      src="/original-box.jpg"
                      alt="Original box"
                      fill
                      className="rounded-2xl object-cover"
                      sizes="(min-width: 768px) 180px, 100vw"
                    />
                  </div>

                  <div>
                    <h3 className="text-[28px] leading-tight font-semibold">
                      Add Original Box
                    </h3>
                    <p className="mt-3 text-[18px] text-zinc-600">£25</p>

                    <button className="mt-6 rounded-xl bg-black px-8 py-4 text-xl text-white">
                      Add Box
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-[#f7f7f7]">
          <button className="flex w-full items-center justify-between px-5 py-5 text-left text-[18px] font-medium">
            <span>Got a discount code?</span>
            <span className="text-2xl text-zinc-500">⌄</span>
          </button>

          <div className="border-t border-zinc-200 px-5 py-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-[18px] font-semibold">Subtotal</p>
                <p className="text-zinc-500">
                  Shipping & taxes may be re-calculated at checkout
                </p>
              </div>

              <p className="text-[18px] font-semibold">
                {formatCurrency(subtotal)}
              </p>
            </div>

            <Link
              href="/checkout"
              onClick={handleOverlayClick}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#1f86d8] px-5 py-4 text-[20px] text-white"
            >
              Checkout&nbsp; {formatCurrency(subtotal)}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}