import "./globals.css";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "TeesCloset",
  description: "Luxury bags and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f6f6f6] text-black">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}