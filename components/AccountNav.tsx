export default function AccountNav() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-8">
      <div className="flex gap-6 text-sm font-medium flex-wrap">
        
        <a
          href="/account/profile"
          className="text-gray-300 hover:text-white transition"
        >
          Profile
        </a>

        <a
          href="/account/addresses"
          className="text-gray-300 hover:text-white transition"
        >
          Addresses
        </a>

        <a
          href="/account/orders"
          className="text-gray-300 hover:text-white transition"
        >
          Orders
        </a>

      </div>
    </div>
  );
}