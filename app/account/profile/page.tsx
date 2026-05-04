import AccountNav from "../../../components/AccountNav";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-black px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8 border-b border-black pb-3 text-center">
          <p className="text-xs md:text-sm text-zinc-600 uppercase tracking-[0.08em] mb-3">
            My Account
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Profile</h1>

          <p className="text-zinc-600 mt-3">
            Manage your personal details for faster checkout.
          </p>
        </div>

        <AccountNav />

        <div className="rounded-md border border-zinc-300 bg-white shadow-sm p-6 md:p-8 space-y-6">

          <div>
            <label className="block mb-2 text-sm text-zinc-700 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-700 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-700 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black transition"
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-zinc-800 transition">
            Save Profile
          </button>

        </div>
      </div>
    </main>
  );
}