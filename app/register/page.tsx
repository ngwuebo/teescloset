export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-black px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center border-b border-black pb-3">
          <p className="text-xs md:text-sm text-zinc-600 uppercase tracking-[0.08em] mb-3">
            Join TeesCloset
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Create Account</h1>
          <p className="text-zinc-600 mt-3">
            Save your details for faster checkout and order tracking.
          </p>
        </div>

        <div className="rounded-md border border-zinc-300 bg-white shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <label className="block mb-2 text-sm text-zinc-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black transition"
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-zinc-800 transition">
            Create Account
          </button>

          <p className="text-sm text-zinc-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}