'use client'

import { type ReactNode, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { versionedAsset } from '@/lib/brandAssets'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Portfolio' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/digital-launch', label: 'Digital Launch' },
  { href: '/operations', label: 'Operations' },
  { href: '/capture', label: 'Capture' },
  { href: '/contact', label: 'Contact' },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[rgba(248,246,241,0.92)] backdrop-blur-md">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="TC Construction Group home" className="flex items-center">
            <Image
              src={versionedAsset('/logo.svg')}
              alt="TC Construction Group"
              width={204}
              height={40}
              className="hidden h-10 w-auto sm:block"
              priority
            />
            <Image
              src={versionedAsset('/icon.png')}
              alt="TC Construction Group"
              width={44}
              height={44}
              className="h-11 w-11 sm:hidden"
              priority
            />
          </Link>

          <div className="hidden xl:flex xl:gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md lg:inline-flex"
            >
              Request review <span aria-hidden="true">&rarr;</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-[var(--text-secondary)] xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
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
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] xl:hidden">
          <div className="grid gap-1 px-6 py-4 sm:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 block rounded-lg bg-[var(--accent-primary)] px-4 py-3 text-center text-sm font-semibold text-white sm:col-span-2"
              onClick={() => setMobileOpen(false)}
            >
              Request project review
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
                src={versionedAsset('/logo.svg')}
                alt="TC Construction Group"
                width={306}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
              Technology-forward construction delivery connecting preconstruction, BIM/VDC,
              HVAC, procurement, project controls, quality, safety, commissioning and owner
              reporting through evidence-based workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['BIM / VDC', 'HVAC', 'Project Controls', 'QA / HSE'].map((label) => (
                <span key={label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">TCCG</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li><Link href="/services" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Services</Link></li>
              <li><Link href="/projects" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Verified Portfolio</Link></li>
              <li><Link href="/capabilities" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Capabilities</Link></li>
              <li><Link href="/digital-launch" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Digital Launch</Link></li>
              <li><Link href="/careers" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Careers + Training</Link></li>
              <li><Link href="/about" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Ecosystem</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li><a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Tolani Corp HQ</a></li>
              <li><a href="https://tolanilabs.io" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Tolani Labs</a></li>
              <li><Link href="/operations" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Operations Platform</Link></li>
              <li><Link href="/capture" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Capture Desk</Link></li>
              <li><Link href="/contact" className="text-sm leading-6 text-white/65 transition-colors hover:text-white">Contact TCCG</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <div>
            <p>info@tccg.work</p>
            <p className="mt-1">Capabilities and qualifications are subject to project-specific verification.</p>
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
      <div className="isolate pt-16">{children}</div>
      <Footer />
    </div>
  )
}
