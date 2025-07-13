import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-auto flex flex-col items-center text-center">
      <div className="text-gray-400 text-base font-semibold">404</div>
      <div className="mt-2 font-bold text-5xl sm:text-7xl tracking-tight text-balance">Page not found</div>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-gray-400"
      >
        Go back home
      </Link>
    </div>
  )
}