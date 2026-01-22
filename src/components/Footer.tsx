import Link from "next/link";

const quickLinks = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "ESG Dashboard", href: "/dashboard" },
];

const services = [
  { name: "Smart HVAC", href: "/services#smart-hvac" },
  { name: "ESG Solutions", href: "/services#esg-solutions" },
  { name: "Commercial Construction", href: "/services#commercial" },
  { name: "Design Partnership", href: "/services#design" },
];

const ecosystem = [
  { name: "Tolani Corp HQ", href: "https://tolanicorp.us", external: true },
  { name: "Tolani Labs", href: "https://tolanilabs.io", external: true },
  { name: "Foundation", href: "https://tolanifoundation.org", external: true },
];

export function Footer() {
  return (
    <footer className="bg-tccg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-tccg-cyan rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-tccg-navy text-xl">TC</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-xl">TC Construction</p>
                <p className="text-xs text-tccg-cyan tracking-widest">BUILDING BEYOND</p>
              </div>
            </Link>
            <p className="mt-4 text-gray-400 text-sm max-w-xs">
              Specializing in smart HVAC installations, ESG-compliant construction, 
              and sustainable building solutions. Part of the Tolani Corp ecosystem.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="badge-green">ESG Certified</span>
              <span className="badge-cyan">LEED Partner</span>
              <span className="badge-orange">EPA Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-tccg-cyan text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-tccg-cyan text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem & Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tolani Ecosystem</h4>
            <ul className="space-y-2">
              {ecosystem.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-tccg-cyan text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-white mb-4 mt-6">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:info@tccg.work" className="hover:text-tccg-cyan transition-colors">
                  info@tccg.work
                </a>
              </li>
              <li>
                <a href="tel:+1-800-TCCG-BUILD" className="hover:text-tccg-cyan transition-colors">
                  (800) TCCG-BUILD
                </a>
              </li>
              <li>Nationwide Coverage</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 TC Construction Group. A{" "}
            <a
              href="https://tolanicorp.us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tccg-cyan hover:underline"
            >
              Tolani Corp
            </a>{" "}
            Company. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/safety" className="text-gray-500 hover:text-gray-300">
              Safety Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
