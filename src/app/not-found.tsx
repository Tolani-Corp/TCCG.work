import Link from "next/link";

import { TCCG_CONTACT } from "@/lib/contact";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-slate-100 px-4 py-16 text-center sm:px-6">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">404 · Page not found</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">The requested TCCG page is unavailable.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The link may be outdated, the page may be protected, or the requested resource may have moved.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700">Return home</Link>
          <a href={TCCG_CONTACT.phone.telHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:bg-slate-50">Call {TCCG_CONTACT.phone.display}</a>
        </div>
      </div>
    </main>
  );
}
