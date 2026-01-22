import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-tccg-cyan/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-tccg-green/10 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Ecosystem Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <div className="w-6 h-6 bg-tolani-red rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-gray-400 text-sm">Tolani Corp Ecosystem</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Smart HVAC &<br />
          <span className="text-tccg-cyan">ESG Construction</span><br />
          Solutions
        </h1>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          TC Construction Group delivers cutting-edge smart HVAC installations and 
          ESG-compliant construction services. We're Building Beyond traditional 
          methods with Web3-enabled contract monitoring and sustainable practices.
        </p>

        {/* Badges */}
        <div className="flex justify-center gap-4 mt-8">
          <span className="badge-green">EPA Certified</span>
          <span className="badge-cyan">LEED Partner</span>
          <span className="badge-orange">Web3 Enabled</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/contact" className="btn-cta text-lg px-8 py-4">
            Get a Quote
          </Link>
          <Link href="/services" className="btn-secondary text-lg px-8 py-4">
            Our Services
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { value: "500+", label: "Projects Completed" },
            { value: "98%", label: "ESG Compliance" },
            { value: "40%", label: "Energy Savings" },
            { value: "15+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-tccg-cyan">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
