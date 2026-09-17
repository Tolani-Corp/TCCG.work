import type { Metadata } from "next";
import Link from "next/link";

import { TCCG_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Portal Access Not Authorized",
  robots: { index: false, follow: false, nocache: true },
};

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-slate-100 px-4 py-16 text-center sm:px-6">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">Protected workspace</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Your account is not authorized for this TCCG portal.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Authentication confirms identity; access still requires an approved TCCG role and explicit portal authorization. Contact the project owner or administrator if you believe access should be granted.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700">Return to public site</Link>
          <a href={TCCG_CONTACT.phone.telHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:bg-slate-50">Call {TCCG_CONTACT.phone.display}</a>
        </div>
      </div>
    </main>
  );
}
