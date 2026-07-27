"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

import { versionedAsset } from "@/lib/brandAssets";
import { TCCG_CONTACT } from "@/lib/contact";

const publicNav = [
  { href: "/#services", label: "Services" },
  { href: "/#sectors", label: "Who we serve" },
  { href: "/#process", label: "Delivery process" },
  { href: "/#faq", label: "FAQ" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="TC Construction Group home" className="flex items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600">
          <Image src={versionedAsset("/logo.svg")} alt="TC Construction Group" width={230} height={45} className="hidden h-10 w-auto sm:block" priority />
          <Image src={versionedAsset("/icon.png")} alt="TC Construction Group" width={44} height={44} className="h-11 w-11 sm:hidden" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={TCCG_CONTACT.phone.telHref} className="hidden min-h-11 items-center rounded-lg px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 md:inline-flex">
            {TCCG_CONTACT.phone.display}
          </a>
          <Link href="/#contact" className="hidden min-h-11 items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:inline-flex">
            Request project review
          </Link>
          <button type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-lg border border-slate-300 bg-white text-slate-950 lg:hidden">
            <span aria-hidden="true" className="relative h-5 w-5">
              <span className={`absolute left-0 top-1 block h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-navigation" className="fixed inset-x-0 top-[72px] min-h-[calc(100vh-72px)] overflow-y-auto border-t border-slate-200 bg-slate-950 px-4 py-6 text-white lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Mobile navigation">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-bold text-white">
                {item.label}
              </Link>
            ))}
            <a href={TCCG_CONTACT.phone.telHref} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-bold text-white">
              Call {TCCG_CONTACT.phone.display}
            </a>
            <Link href="/#contact" onClick={() => setMobileOpen(false)} className="mt-3 rounded-xl bg-red-600 px-4 py-4 text-center text-base font-black text-white">
              Request project review
            </Link>
            <Link href="/operations" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-center text-sm font-bold text-white/60 hover:text-white">
              Team and client portal
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <div className="inline-flex rounded-xl bg-white p-2">
              <Image src={versionedAsset("/logo.svg")} alt="TC Construction Group" width={260} height={51} className="h-11 w-auto" />
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
              Commercial building modernization, HVAC coordination, BIM-supported delivery, project support, and public-sector opportunity review—backed by disciplined scope and documentation.
            </p>
            <a href={TCCG_CONTACT.phone.telHref} className="mt-5 inline-block text-xl font-black text-white hover:text-red-400">{TCCG_CONTACT.phone.display}</a>
            <p className="mt-1 text-sm text-white/55">{TCCG_CONTACT.email}</p>
          </div>

          <div>
            <h2 className="text-sm font-black text-white">Services</h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/60">
              <li><Link href="/#services" className="hover:text-white">Facility modernization</Link></li>
              <li><Link href="/#services" className="hover:text-white">HVAC and controls</Link></li>
              <li><Link href="/#services" className="hover:text-white">BIM and MEP coordination</Link></li>
              <li><Link href="/#services" className="hover:text-white">Commercial project support</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-black text-white">Company</h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/60">
              <li><Link href="/#process" className="hover:text-white">How we work</Link></li>
              <li><Link href="/#contact" className="hover:text-white">Project review</Link></li>
              <li><a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer" className="hover:text-white">Tolani Corp</a></li>
              <li><Link href="/operations" className="hover:text-white">Team portal</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-black text-white">Legal</h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/60">
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-xs leading-5 text-white/45 md:grid-cols-[1fr_auto] md:items-end">
          <p>
            Service availability, contracting authority, trade scope, geographic coverage, pricing, schedule, and permit responsibility are confirmed only through an executed agreement. Website content is general information and is not a construction proposal, engineering opinion, or guarantee.
          </p>
          <p className="md:text-right">© 2026 TC Construction Group. A Tolani Corp company.</p>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-slate-950 focus:shadow-xl">
        Skip to content
      </a>
      <Header />
      <div id="main-content">{children}</div>
      <Footer />
    </div>
  );
}
