import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-tccg-slate overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs bg-tccg-green/20 text-tccg-green px-3 py-1 rounded-full font-medium">
                Tolani Corp Ecosystem
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Smart HVAC &<br />
              <span className="text-gradient">ESG Construction</span><br />
              Solutions
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              TC Construction Group delivers cutting-edge smart HVAC installations and ESG-compliant 
              construction services. We're Building Beyond traditional methods with Web3-enabled 
              contract monitoring and sustainable practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-tccg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/services"
                className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
              >
                Our Services
              </Link>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-tccg-green/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-tccg-green" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">EPA Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-tccg-blue/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">LEED Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-tccg-orange/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-tccg-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Web3 Enabled</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-tccg-blue/20 to-tccg-green/20 rounded-2xl p-8 backdrop-blur">
              <div className="bg-tccg-slate/80 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Smart Monitoring</span>
                  <span className="text-tccg-green text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-tccg-green rounded-full animate-pulse"></span>
                    Active
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Energy Efficiency</span>
                      <span className="text-white">94%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-tccg-blue to-tccg-green rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">ESG Compliance</span>
                      <span className="text-white">98%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-tccg-green to-emerald-400 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">System Health</span>
                      <span className="text-white">100%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-tccg-orange to-yellow-400 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
