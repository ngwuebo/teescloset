import ProductDetailsClient from "./product-details-client";
import { products } from "../../../data/products";
import TopBar from "@/components/TopBar";
import MainStoreHeader from "@/components/MainStoreHeader";
import Footer from "@/components/Footer";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <TopBar />
        <MainStoreHeader />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <MainStoreHeader />
      <ProductDetailsClient product={product} />
      <Footer />
    </>
  );
}