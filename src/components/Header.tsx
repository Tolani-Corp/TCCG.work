"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "ESG Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-tccg-slate sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-tccg-blue to-tccg-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TC</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg">TC Construction</span>
              <span className="text-gray-400 text-xs block -mt-1">BUILDING BEYOND</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-tccg-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-4 bg-tccg-orange text-white px-4 py-2 rounded-lg text-center font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
