"use client";

import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-3 md:px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Products</h1>
        <p className="text-gray-400 mb-8 md:mb-10">
          Explore our luxury bag collection.
        </p>

        <div className="grid grid-cols-2 gap-x-2 gap-y-5 md:gap-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}