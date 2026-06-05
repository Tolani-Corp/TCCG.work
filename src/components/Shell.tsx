'use client'

import { type ReactNode, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { versionedAsset } from '@/lib/brandAssets'

const navLinks = [
  { href: '/#operations', label: 'Operations' },
  { href: '/#work', label: 'Work Board' },
  { href: '/#pipeline', label: 'Pipeline' },
  { href: '/capture', label: 'Capture' },
  { href: '/#contact', label: 'Crew Intake' },
  { href: 'https://tolanicorp.us/communications', label: 'HQ Network', external: true },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[rgba(248,246,241,0.92)] backdrop-blur-md">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="TC Construction Group" className="flex items-center">
            <Image
              src={versionedAsset("/logo.svg")}
              alt="TC Construction Group"
              width={204}
              height={40}
              className="hidden h-10 w-auto sm:block"
              priority
            />
            <Image
              src={versionedAsset("/icon.png")}
              alt="TC Construction Group"
              width={44}
              height={44}
              className="h-11 w-11 sm:hidden"
              priority
            />
          </Link>

          <div className="hidden md:flex md:gap-x-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/capture"
              className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md"
            >
              Source work <span aria-hidden="true">&rarr;</span>
            </Link>
            <button
              type="button"
              className="md:hidden -m-2.5 p-2.5 text-[var(--text-secondary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="space-y-1 px-6 py-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/capture"
              className="mt-3 block rounded-lg bg-[var(--accent-primary)] px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Source work
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-strong)] py-16 text-[var(--text-inverse)] sm:py-20">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="inline-flex rounded-lg bg-white p-2">
              <Image
                src={versionedAsset("/logo.svg")}
                alt="TC Construction Group"
                width={306}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
              TC Construction Group runs smart HVAC modernization, BIM-supported delivery,
              ESG documentation, service tickets, and field execution through a construction
              operations workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75">
                Open jobs
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75">
                DAO tasks
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75">
                Field crews
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Navigate</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li><Link href="/#operations" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Operations</Link></li>
              <li><Link href="/#work" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Work Board</Link></li>
              <li><Link href="/#pipeline" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Pipeline</Link></li>
              <li><Link href="/capture" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Capture</Link></li>
              <li><Link href="/#contact" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Crew Intake</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Ecosystem</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li><a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Tolani Corp HQ</a></li>
              <li><a href="https://tolanilabs.io" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Tolani Labs</a></li>
              <li><a href="https://tolanicorp.us/communications" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Communications Network</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <div>
            <p>info@tccg.work</p>
            <p className="mt-1">Nationwide commercial and sustainability delivery.</p>
          </div>
          <p>&copy; 2026 TC Construction Group. A Tolani Corp company.</p>
        </div>
      </div>
    </footer>
  )
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased" style={{ fontFamily: 'var(--font-sans)' }}>
      <Header />
      <main className="isolate pt-16">{children}</main>
      <Footer />
    </div>
  )
}
