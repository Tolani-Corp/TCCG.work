"use client";

import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Operations", href: "/operations" },
  { name: "Digital Launch", href: "/digital-launch" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-tccg-slate sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.svg" alt="TC Construction Group" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white">TC Construction</span>
              <span className="-mt-1 block text-xs text-gray-400">BUILDING BEYOND</span>
            </div>
          </Link>

          <div className="hidden items-center gap-4 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <Link
              href="/contact"
              className="rounded-lg bg-tccg-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            className="text-gray-300 hover:text-white lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-700 py-4 lg:hidden">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-300 transition-colors hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="block w-full py-2 text-left text-gray-300 transition-colors hover:text-white">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <div className="mt-4">
              <Link
                href="/contact"
                className="block rounded-lg bg-tccg-orange px-4 py-2 text-center font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
