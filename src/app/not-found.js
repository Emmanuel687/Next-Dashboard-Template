export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa]">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-gray-900">404</h1>

        <p className="mt-3 text-gray-500">
          Page not found
        </p>

        <a
          href="/dashboard"
          className="inline-block mt-6 px-5 py-2 rounded-xl text-white"
          style={{ background: "#03b155" }}
        >
          Go back home
        </a>

      </div>

    </div>
  );
}