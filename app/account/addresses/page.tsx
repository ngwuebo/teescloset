import AccountNav from "../../../components/AccountNav";
export default function AddressesPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-black px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 border-b border-black pb-3 text-center">
          <p className="text-xs md:text-sm text-zinc-600 uppercase tracking-[0.08em] mb-3">
            My Account
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Saved Addresses</h1>

          <p className="text-zinc-600 mt-3">
            Manage delivery addresses for faster checkout.
          </p>
        </div>

        <AccountNav />

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-md border border-zinc-300 bg-white shadow-sm p-6">
            <p className="text-green-600 text-sm font-semibold mb-2">
              Default Address
            </p>

            <p className="text-zinc-700">
              12 Adeola Odeku Street <br />
              Victoria Island <br />
              Lagos, Nigeria
            </p>

            <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition">
              Edit
            </button>
          </div>

          <div className="rounded-md border border-zinc-300 bg-white shadow-sm p-6 flex items-center justify-center">
            <button className="bg-black text-white px-5 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition">
              Add New Address
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}