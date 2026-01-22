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
    <footer className="bg-tccg-slate text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-tccg-blue to-tccg-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TC</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">TC Construction</span>
                <span className="text-gray-500 text-xs block -mt-1">BUILDING BEYOND</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Specializing in smart HVAC installations, ESG-compliant construction, and sustainable building solutions.
              Part of the Tolani Corp ecosystem.
            </p>
            <div className="flex gap-3">
              <span className="text-xs bg-tccg-green/20 text-tccg-green px-2 py-1 rounded">ESG CERTIFIED</span>
              <span className="text-xs bg-tccg-blue/20 text-blue-400 px-2 py-1 rounded">LEED PARTNER</span>
              <span className="text-xs bg-tccg-orange/20 text-tccg-orange px-2 py-1 rounded">EPA CERTIFIED</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tolani Ecosystem</h3>
            <ul className="space-y-2">
              {ecosystem.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">Employee Portal:</p>
              <a
                href="https://tolanicorp.us/employee-portal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-tccg-orange hover:text-orange-400 transition-colors"
              >
                Visit HQ Portal →
              </a>
            </div>
          </div>
        </div>

        {/* Contact & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <a href="mailto:info@tccg.work" className="hover:text-white transition-colors">
              info@tccg.work
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a href="tel:+1-800-TCCG-BUILD" className="hover:text-white transition-colors">
              (800) TCCG-BUILD
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span>Nationwide Coverage</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/safety" className="hover:text-white transition-colors">Safety Standards</Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TC Construction Group. A{" "}
          <a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer" className="text-tolani-red hover:underline">
            Tolani Corp
          </a>{" "}
          Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
