import AccountNav from "../../../components/AccountNav";

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-black px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8 border-b border-black pb-3 text-center">
          <p className="text-xs md:text-sm text-zinc-600 uppercase tracking-[0.08em] mb-3">
            My Account
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Order History</h1>

          <p className="text-zinc-600 mt-3">
            View and track your recent purchases.
          </p>
        </div>

        <AccountNav />

        <div className="rounded-md border border-zinc-300 bg-white shadow-sm overflow-hidden">

          <div className="grid grid-cols-4 px-6 py-4 border-b border-zinc-300 text-zinc-600 text-sm font-medium">
            <div>Order</div>
            <div>Date</div>
            <div>Status</div>
            <div>Total</div>
          </div>

          <div className="grid grid-cols-4 px-6 py-4 border-b border-zinc-200">
            <div className="font-medium">#TC1001</div>
            <div className="text-zinc-700">Mar 9</div>
            <div className="text-yellow-600 font-medium">Processing</div>
            <div className="font-medium">₦185,000</div>
          </div>

          <div className="grid grid-cols-4 px-6 py-4">
            <div className="font-medium">#TC1000</div>
            <div className="text-zinc-700">Mar 4</div>
            <div className="text-green-600 font-medium">Delivered</div>
            <div className="font-medium">₦220,000</div>
          </div>

        </div>

      </div>
    </main>
  );
}