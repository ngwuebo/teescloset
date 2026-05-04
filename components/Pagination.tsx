"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisible = 10;

  let startPage = Math.max(1, currentPage - 4);
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap mt-12">
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-14 h-14 rounded-full border-4 text-xl font-semibold transition ${
              currentPage === 1
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-700 border-zinc-500 hover:border-black hover:text-black"
            }`}
          >
            1
          </button>

          {startPage > 2 && (
            <div className="w-14 h-14 rounded-full border-4 border-zinc-500 bg-white text-zinc-700 flex items-center justify-center text-2xl font-semibold">
              …
            </div>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-14 h-14 rounded-full border-4 text-xl font-semibold transition ${
            currentPage === page
              ? "bg-black text-white border-black"
              : "bg-white text-zinc-700 border-zinc-500 hover:border-black hover:text-black"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <div className="w-14 h-14 rounded-full border-4 border-zinc-500 bg-white text-zinc-700 flex items-center justify-center text-2xl font-semibold">
              …
            </div>
          )}

          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-14 h-14 rounded-full border-4 text-xl font-semibold transition ${
              currentPage === totalPages
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-700 border-zinc-500 hover:border-black hover:text-black"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-14 h-14 rounded-full border-4 border-zinc-500 bg-white text-zinc-700 flex items-center justify-center text-2xl font-semibold hover:border-black hover:text-black transition"
          aria-label="Next page"
        >
          ›
        </button>
      )}
    </div>
  );
}