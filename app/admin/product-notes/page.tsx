"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";

import MainStoreHeader from "@/components/MainStoreHeader";
import Footer from "@/components/Footer";

type Entry = {
  id: number;
  price: string;
  quantity: string;
  status: "Brand New" | "Pre-loved";
  colors: string;
  notes: string;
};

export default function ProductNotesPage() {
  const [entries, setEntries] = useState<Entry[]>(
    products.map((product) => ({
      id: product.id,
      price: String(product.price),
      quantity: "",
      status:
        product.condition?.toLowerCase().includes("pre")
          ? "Pre-loved"
          : "Brand New",
      colors: product.colors?.map((c) => c.name).join(", ") || "",
      notes: "",
    }))
  );

  function updateEntry(id: number, field: keyof Entry, value: string) {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  }

  function formatPriceForOutput(price: string) {
    const number = Number(price);
    if (!price || Number.isNaN(number)) return "£";
    return formatCurrency(number);
  }

  const output = useMemo(() => {
    return entries
      .map((entry) => {
        const product = products.find((p) => p.id === entry.id);

        return `Product ID: ${entry.id}
Product Name: ${product?.name || ""}
Price: ${formatPriceForOutput(entry.price)}
Quantity: ${entry.quantity}
Status: ${entry.status}
Colors: ${entry.colors}
Notes: ${entry.notes}`;
      })
      .join("\n\n---\n\n");
  }, [entries]);

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    alert("Copied all product updates");
  }

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-black">
      <MainStoreHeader />

      <section className="mx-auto max-w-7xl px-3 pb-10 pt-6 md:px-4">
        <div className="mb-5 text-[12px] text-zinc-500 md:text-sm">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span>Product Update Notes</span>
        </div>

        <div className="border border-zinc-200 bg-white p-4 md:p-7">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Client Product Form
          </p>

          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[28px] font-semibold md:text-[42px]">
                Product Update Notes
              </h1>
              <p className="mt-2 max-w-2xl text-[14px] text-zinc-700 md:text-[17px]">
                Fill in the price, quantity available, status, colors, and any
                extra notes for each product. The final text can be copied and
                sent for website updates.
              </p>
            </div>

            <button
              onClick={copyOutput}
              className="h-11 bg-black px-6 text-[15px] font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              Copy All Updates
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {products.map((product) => {
            const entry = entries.find((e) => e.id === product.id)!;

            return (
              <div
                key={product.id}
                className="grid gap-4 border border-zinc-200 bg-white p-4 md:grid-cols-[140px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500">
                        Product #{product.id}
                      </p>
                      <h2 className="text-lg font-semibold md:text-xl">
                        {product.name}
                      </h2>
                    </div>

                    <p className="text-sm text-zinc-600 md:text-base">
                      Current: {formatCurrency(product.price)}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    <label className="block">
                      <span className="text-[13px] font-medium text-zinc-700">
                        Price
                      </span>
                      <input
                        type="number"
                        value={entry.price}
                        onChange={(e) =>
                          updateEntry(product.id, "price", e.target.value)
                        }
                        placeholder="Enter price only, e.g. 200"
                        className="mt-1 h-11 w-full border border-zinc-300 bg-[#f6f6f6] px-3 outline-none focus:border-black"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-medium text-zinc-700">
                        Quantity
                      </span>
                      <input
                        value={entry.quantity}
                        onChange={(e) =>
                          updateEntry(product.id, "quantity", e.target.value)
                        }
                        placeholder="How many? e.g. 5"
                        className="mt-1 h-11 w-full border border-zinc-300 bg-[#f6f6f6] px-3 outline-none focus:border-black"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-medium text-zinc-700">
                        Status
                      </span>
                      <select
                        value={entry.status}
                        onChange={(e) =>
                          updateEntry(product.id, "status", e.target.value)
                        }
                        className="mt-1 h-11 w-full border border-zinc-300 bg-[#f6f6f6] px-3 outline-none focus:border-black"
                      >
                        <option value="Brand New">Brand New</option>
                        <option value="Pre-loved">Pre-loved</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-medium text-zinc-700">
                        Colors
                      </span>
                      <input
                        value={entry.colors}
                        onChange={(e) =>
                          updateEntry(product.id, "colors", e.target.value)
                        }
                        placeholder="e.g. Black, Pink"
                        className="mt-1 h-11 w-full border border-zinc-300 bg-[#f6f6f6] px-3 outline-none focus:border-black"
                      />
                    </label>
                  </div>

                  <label className="mt-3 block">
                    <span className="text-[13px] font-medium text-zinc-700">
                      Notes
                    </span>
                    <textarea
                      value={entry.notes}
                      onChange={(e) =>
                        updateEntry(product.id, "notes", e.target.value)
                      }
                      placeholder="Write any extra instructions, corrections, or special details"
                      className="mt-1 w-full min-h-20 border border-zinc-300 bg-[#f6f6f6] p-3 outline-none focus:border-black"
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-10 border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Copy Output</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Copy this text and send it for the product updates.
              </p>
            </div>

            <button
              onClick={copyOutput}
              className="h-10 bg-black px-5 text-white"
            >
              Copy
            </button>
          </div>

          <textarea
            readOnly
            value={output}
            className="mt-4 w-full min-h-[400px] border border-zinc-300 bg-[#f6f6f6] p-4 text-sm font-mono outline-none"
          />
        </section>
      </section>

      <Footer />
    </main>
  );
}