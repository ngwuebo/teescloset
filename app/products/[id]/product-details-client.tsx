"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products, Product } from "@/data/products";
import { addToCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 17H6V6h8z" />
      <path d="M14 10h3l2 2v5h-5z" />
      <circle cx="8.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="15" r="4" />
      <path d="M10 3h4l-1 5h-2z" />
      <path d="m9 3 3 4 3-4" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="8" width="18" height="13" rx="1.5" />
      <path d="M12 8v13M3 12h18" />
      <path d="M7.5 8c-1.4 0-2.5-.9-2.5-2.1S6 3.8 7.4 4.5C8.6 5.1 9.5 6.5 10 8Z" />
      <path d="M16.5 8c1.4 0 2.5-.9 2.5-2.1s-1-2.1-2.4-1.4c-1.2.6-2.1 2-2.6 3.5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <Image
      src="/WhatsApp-Logo.jpg"
      alt="WhatsApp"
      width={64}
      height={64}
      className="shrink-0 transform -rotate-12"
    />
  );
}

export default function ProductDetailsClient({ product }: { product: Product }) {
  const rawGalleryImages = useMemo(() => {
    const fromImages = product.images?.filter(Boolean) || [];
    const fallback = [product.image, product.image2].filter(Boolean) as string[];
    const unique = [...new Set(fromImages.length ? fromImages : fallback)];
    return unique.length ? unique : [product.image];
  }, [product]);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [lastAction, setLastAction] = useState<"image" | "color">("image");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;

    const loadExistingImages = async () => {
      const checks = await Promise.all(
        rawGalleryImages.map(
          (src) =>
            new Promise<string | null>((resolve) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => resolve(src);
              img.onerror = () => resolve(null);
            })
        )
      );

      const validImages = checks.filter((src): src is string => Boolean(src));

      if (!active) return;

      const fallbackImages = rawGalleryImages.filter(Boolean);
      const finalImages = validImages.length ? validImages : fallbackImages;

      setGalleryImages(finalImages);
      setSelectedImageIndex(0);
    };

    loadExistingImages();

    return () => {
      active = false;
    };
  }, [rawGalleryImages]);

  const selectedColorImage = product.colors?.[selectedColorIndex]?.image;

  const selectedImage =
    lastAction === "color"
      ? selectedColorImage ||
        galleryImages[selectedImageIndex] ||
        galleryImages[selectedColorIndex] ||
        galleryImages[0] ||
        product.image
      : galleryImages[selectedImageIndex] ||
        selectedColorImage ||
        galleryImages[selectedColorIndex] ||
        galleryImages[0] ||
        product.image;

  const reviewImages =
    product.testimonialImages?.length
      ? product.testimonialImages
      : [
          "/reviews/review1.jpg",
          "/reviews/review2.jpg",
          "/reviews/review3.jpg",
          "/reviews/review4.jpg",
          "/reviews/review5.jpg",
        ];

  const relatedProducts = useMemo(() => {
    if (product.relatedIds?.length) {
      return product.relatedIds
        .map((id) => products.find((item) => item.id === id))
        .filter(Boolean) as Product[];
    }

    const sameBrand = products.filter(
      (item) => item.id !== product.id && item.brand === product.brand
    );

    if (sameBrand.length >= 4) return sameBrand.slice(0, 4);

    return products.filter((item) => item.id !== product.id).slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      quantity,
      selectedColor: product.colors?.[selectedColorIndex]?.name || undefined,
    });
  };

  return (
    <main className="bg-[#f6f6f6]">
      <section className="max-w-7xl mx-auto px-3 md:px-4 pt-3 md:pt-5 pb-6 md:pb-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4 md:gap-6 items-start">
          <div>
            <div className="relative overflow-hidden bg-white border border-zinc-200 aspect-[4/4.25] md:aspect-[4/4.15]">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 620px, 100vw"
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="mt-3 flex gap-2 md:gap-3 overflow-x-auto pb-1">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setLastAction("image");
                    }}
                    className={`min-w-[72px] md:min-w-[90px] overflow-hidden border bg-white
                      transition-all duration-200 ease-out transform-gpu
                      active:scale-[0.97] active:-translate-y-0.5 active:shadow-lg
                      ${
                        selectedImageIndex === index
                          ? "border-black shadow-md"
                          : "border-zinc-200"
                      }`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="90px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3 md:space-y-5">
            <div className="text-[12px] md:text-sm text-zinc-500 leading-5 md:leading-6">
              <Link href="/" className="hover:text-black">
                Home
              </Link>
              <span className="mx-1.5">/</span>
              <span>{product.brand || "Products"}</span>
              <span className="mx-1.5">/</span>
              <span>{product.name}</span>
            </div>

            <div>
              <h1 className="text-[24px] md:text-[34px] leading-tight font-semibold text-black">
                {product.name}
              </h1>

              <div className="mt-2 flex items-end gap-3">
                <p className="text-[24px] md:text-[34px] font-medium text-black">
                  {formatCurrency(product.price)}
                </p>

                {product.oldPrice && (
                  <p className="text-base md:text-xl text-zinc-400 line-through">
                    {formatCurrency(product.oldPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2 space-y-1.5 text-[13px] md:text-[16px] text-zinc-800 leading-5 md:leading-6">
              <div>
                <span className="font-semibold">Quality:</span> Highest
              </div>

              <div>
                <span className="font-semibold">Condition:</span> {product.condition}
              </div>

              <div>
                <span className="font-semibold">Material:</span> {product.material}
              </div>

              <div>
                <span className="font-semibold">Processing:</span> 24 HOURS
              </div>

              <div>
                <span className="font-semibold">Shipping:</span> 1–3 DAYS
              </div>

              <div>
                <span className="font-semibold">Packaging:</span> Dust bag included
              </div>
            </div>

            <p className="text-[14px] md:text-[18px] leading-6 md:leading-8 text-zinc-700">
              {product.description}
            </p>

            {!!product.colors?.length && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => {
                    const activeColor = selectedColorIndex === index;

                    return (
                      <button
                        key={color.name}
                        type="button"
                        aria-label={color.name}
                        onClick={() => {
                          setSelectedColorIndex(index);
                          setLastAction("color");
                        }}
                        className={`relative h-9 w-9 rounded-full border-2 transition-all duration-200 ease-out transform-gpu active:scale-[0.94] ${
                          activeColor ? "border-black" : "border-zinc-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {activeColor && (
                          <span className="absolute inset-0 flex items-center justify-center text-white">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m5 13 4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {product.colors?.[selectedColorIndex]?.name && (
                  <p className="text-[15px] md:text-[16px] font-medium text-black">
                    {product.colors[selectedColorIndex].name}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="inline-flex h-10 shrink-0 items-center rounded-md border border-zinc-300 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="flex h-10 w-10 items-center justify-center text-black transition active:translate-y-[1px] active:bg-zinc-100"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon />
                </button>

                <div className="flex h-10 min-w-[34px] items-center justify-center border-x border-zinc-300 px-2 text-[15px] font-medium text-black">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="flex h-10 w-10 items-center justify-center text-black transition active:translate-y-[1px] active:bg-zinc-100"
                  aria-label="Increase quantity"
                >
                  <PlusIcon />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="h-10 min-w-0 flex-1 px-5 bg-black text-white text-[15px] md:text-[17px] font-medium
                transition-all duration-200 ease-out transform-gpu
                hover:bg-zinc-800 hover:-translate-y-0.5 hover:shadow-lg
                active:scale-[0.98] active:translate-y-0 active:shadow-md"
              >
                Add to cart
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-[20px] bg-black text-white px-3 py-4 md:px-5 md:py-5">
              <div className="flex flex-col items-center text-center gap-2">
                <ClockIcon />
                <p className="text-[10px] md:text-[13px] tracking-[0.08em] uppercase leading-4 md:leading-5">
                  Processing : 24 Hours
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <TruckIcon />
                <p className="text-[10px] md:text-[13px] tracking-[0.08em] uppercase leading-4 md:leading-5">
                  Shipping : 1–3 Days
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <MedalIcon />
                <p className="text-[10px] md:text-[13px] tracking-[0.08em] uppercase leading-4 md:leading-5">
                  Quality Guarantee
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-zinc-200 bg-white">
              <div className="relative grid grid-cols-[108px_1fr] md:grid-cols-[155px_1fr] items-stretch h-full">
                <div className="relative h-full w-full">
                  <Image
                    src="/bags/original-box.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 155px, 108px"
                  />
                </div>

                <div className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-4">
                  <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <GiftIcon />
                  </div>

                  <p className="text-[14px] md:text-[16px] leading-6 md:leading-7 text-black">
                    The Item Will Come With A Dust Bag And Well Packed.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-black"
            >
              <WhatsAppIcon />
              <p className="text-[14px] md:text-[17px] leading-6 md:leading-7">
                For more Brands and Colors not displayed on our website contact us via WhatsApp
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-3 md:px-4 pt-4 md:pt-6 pb-2 md:pb-4 bg-[#f6f6f6]">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
          <div className="h-px flex-1 bg-black/70" />
          <h2 className="text-[15px] md:text-[18px] font-medium text-center whitespace-nowrap text-black">
            Product Description:
          </h2>
          <div className="h-px flex-1 bg-black/70" />
        </div>

        <div className="max-w-4xl">
          {product.productDescription ? (
            <div className="text-black">
              <p className="text-[14px] md:text-[18px] leading-6 md:leading-8 text-zinc-800">
                {product.productDescription.intro}
              </p>

              {product.productDescription.whyLoveTitle && (
                <h3 className="mt-5 md:mt-8 text-[20px] md:text-[26px] font-semibold text-black">
                  {product.productDescription.whyLoveTitle}
                </h3>
              )}

              {!!product.productDescription.whyLoveItems?.length && (
                <ul className="mt-3 space-y-1.5 text-[14px] md:text-[18px] leading-6 md:leading-8 list-disc pl-5 md:pl-8 text-zinc-800">
                  {product.productDescription.whyLoveItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}

              {product.productDescription.keyFeaturesTitle && (
                <h3 className="mt-5 md:mt-8 text-[20px] md:text-[26px] font-semibold text-black">
                  {product.productDescription.keyFeaturesTitle}
                </h3>
              )}

              {!!product.productDescription.keyFeaturesItems?.length && (
                <ul className="mt-3 space-y-1.5 text-[14px] md:text-[18px] leading-6 md:leading-8 list-disc pl-5 md:pl-8 text-zinc-800">
                  {product.productDescription.keyFeaturesItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="max-w-5xl">
              <h3 className="text-[22px] md:text-[36px] font-semibold leading-tight text-black">
                {product.name}
              </h3>
              <p className="mt-4 text-[14px] md:text-[18px] leading-6 md:leading-8 text-gray-700">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-3 md:px-4 pt-4 md:pt-6 pb-2 md:pb-4">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="h-px flex-1 bg-black/70" />
          <h2 className="text-[15px] md:text-[18px] font-medium text-center whitespace-nowrap text-black">
            Customer Reviews:
          </h2>
          <div className="h-px flex-1 bg-black/70" />
        </div>

        <div className="flex md:grid md:grid-cols-5 gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-2">
          {reviewImages.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="relative min-w-[48%] md:min-w-0 overflow-hidden bg-white border border-zinc-200 h-[200px] md:h-[360px]"
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 360px, 200px"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-3 md:px-4 pt-4 md:pt-6 pb-6 md:pb-12">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="h-px flex-1 bg-black/70" />
          <h2 className="text-[15px] md:text-[18px] font-medium text-center whitespace-nowrap text-black">
            You may also like this...
          </h2>
          <div className="h-px flex-1 bg-black/70" />
        </div>

        <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-5 overflow-x-auto md:overflow-visible pb-2">
          {relatedProducts.slice(0, 8).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group min-w-[48%] md:min-w-0 bg-white border border-zinc-200 overflow-hidden
              transition-all duration-200 ease-out transform-gpu
              hover:shadow-md hover:-translate-y-1
              active:scale-[0.985] active:-translate-y-1 active:shadow-xl"
            >
              <div className="relative w-full h-[170px] md:h-[260px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0"
                  sizes="(min-width: 768px) 260px, 170px"
                />

                {item.image2 && (
                  <Image
                    src={item.image2}
                    alt={item.name}
                    fill
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                    sizes="(min-width: 768px) 260px, 170px"
                  />
                )}
              </div>

              <div className="p-3 md:p-4">
                <h3 className="text-[13px] md:text-[16px] leading-5 md:leading-6 min-h-[40px] md:min-h-[48px] text-black">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-black">
                    {formatCurrency(item.price)}
                  </p>

                  {item.oldPrice && (
                    <p className="text-sm text-zinc-400 line-through">
                      {formatCurrency(item.oldPrice)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}