import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-tccg-blue to-tccg-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-tccg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tccg-green/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
          Ready to Build<br />
          <span className="text-tccg-cyan">Beyond?</span>
        </h2>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          Let's discuss your next project. Whether you need smart HVAC installation, 
          ESG-compliant construction, or comprehensive building solutions, we're here to help.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/contact" className="btn-cta text-lg px-8 py-4">
            Request a Quote
          </Link>
          <Link href="/careers" className="btn-secondary text-lg px-8 py-4">
            Join Our Team
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-tccg-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free Consultation</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-tccg-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-tccg-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Nationwide Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
