"use client";

import { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function HomeProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 40;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4 md:gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}