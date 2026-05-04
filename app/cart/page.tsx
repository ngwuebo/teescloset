"use client";

import { useEffect, useState } from "react";
import {
  CartItem,
  getCart,
  getCartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const handleRemove = (lineId: string) => {
    removeFromCart(lineId);
    refreshCart();
  };

  const handleIncrease = (lineId: string) => {
    increaseQuantity(lineId);
    refreshCart();
  };

  const handleDecrease = (lineId: string) => {
    decreaseQuantity(lineId);
    refreshCart();
  };

  const total = getCartTotal(cart);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Your Cart</h1>
        <p className="text-gray-400 mb-10">Review your selected items.</p>

        {cart.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl p-8">
            <p className="text-lg text-gray-300">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.lineId}
                  className="bg-zinc-900 rounded-2xl p-5 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                    {item.selectedColor && (
                      <p className="text-gray-400 text-sm mt-1">
                        Color: {item.selectedColor}
                      </p>
                    )}

                    <p className="text-gray-300 mb-2 mt-2">
                      {formatCurrency(item.price)}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecrease(item.lineId)}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700"
                      >
                        −
                      </button>

                      <span className="px-2">{item.quantity}</span>

                      <button
                        onClick={() => handleIncrease(item.lineId)}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </div>

                  <button
                    onClick={() => handleRemove(item.lineId)}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="flex justify-between mb-4 text-gray-300">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-6 text-gray-300">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <a
                href="/checkout"
                className="block w-full text-center bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}