import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-tccg-blue to-tccg-green py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Build<br />Beyond?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Let's discuss your next project. Whether you need smart HVAC installation, 
          ESG-compliant construction, or comprehensive building solutions, we're here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white hover:bg-gray-100 text-tccg-blue px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Request a Quote
          </Link>
          <Link
            href="/careers"
            className="border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Join Our Team
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Free Consultation</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Nationwide Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
