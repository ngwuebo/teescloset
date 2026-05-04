export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-black px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-black pb-3 text-center">
          <p className="text-xs md:text-sm text-zinc-600 uppercase tracking-[0.08em] mb-3">
            My Account
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Account Dashboard</h1>
          <p className="text-zinc-600 mt-3">
            Manage your profile, addresses, orders and payment preferences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/account/profile"
            className="rounded-md border border-zinc-300 bg-white shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Profile</h2>
            <p className="text-zinc-600">
              Update your personal details and contact information.
            </p>
          </a>

          <a
            href="/account/addresses"
            className="rounded-md border border-zinc-300 bg-white shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Addresses</h2>
            <p className="text-zinc-600">
              Manage saved delivery addresses for faster checkout.
            </p>
          </a>

          <a
            href="/account/orders"
            className="rounded-md border border-zinc-300 bg-white shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Orders</h2>
            <p className="text-zinc-600">
              View your order history and track recent purchases.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}