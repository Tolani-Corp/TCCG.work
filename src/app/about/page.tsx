import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about TC Construction Group - A Tolani Corp company building beyond traditional construction.",
};

const timeline = [
  { year: "2010", title: "Founded", description: "TC Construction Group established as HVAC specialists" },
  { year: "2015", title: "Smart HVAC Launch", description: "Pioneered IoT-integrated HVAC systems" },
  { year: "2018", title: "ESG Focus", description: "Launched comprehensive ESG compliance services" },
  { year: "2020", title: "Tolani Corp", description: "Joined Tolani Corp ecosystem as construction arm" },
  { year: "2023", title: "Web3 Integration", description: "Blockchain-verified ESG monitoring deployed" },
  { year: "2026", title: "500+ Projects", description: "Milestone: 500 completed projects, 10M sq ft built" },
];

const leadership = [
  { name: "Marcus Chen", role: "CEO", bio: "25+ years in commercial construction" },
  { name: "Sarah Williams", role: "COO", bio: "Former VP at leading HVAC manufacturer" },
  { name: "David Park", role: "CTO", bio: "Smart building technology pioneer" },
  { name: "Jennifer Adams", role: "VP Sustainability", bio: "LEED Fellow, ESG expert" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="badge-cyan mb-4">ABOUT US</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Building <span className="text-tccg-cyan">Beyond</span>
            </h1>
            <p className="mt-6 text-xl text-gray-400">
              TC Construction Group is the construction and HVAC arm of the Tolani Corp 
              ecosystem. We combine decades of construction expertise with cutting-edge 
              smart building technology to deliver sustainable, efficient buildings.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-tccg-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-white">Our Mission</h2>
              <p className="text-gray-400 mt-4">
                To transform the construction industry through smart technology and 
                sustainable practices. We believe every building should be efficient, 
                comfortable, and environmentally responsible.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Deliver 40%+ energy savings on every project",
                  "Achieve ESG compliance as standard practice",
                  "Integrate Web3 transparency into all operations",
                  "Build healthier, more comfortable spaces",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-tccg-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 className="font-semibold text-white mb-6">Tolani Ecosystem</h3>
              <div className="space-y-4">
                {[
                  { name: "Tolani Corp", role: "Parent DAO LLC", url: "https://tolanicorp.us" },
                  { name: "Tolani Labs", role: "Education & Design", url: "https://tolanilabs.io" },
                  { name: "TC Construction", role: "This company", url: "#", current: true },
                  { name: "Tolani Foundation", role: "Nonprofit arm", url: "https://tolanifoundation.org" },
                ].map((company) => (
                  <a
                    key={company.name}
                    href={company.url}
                    target={company.current ? undefined : "_blank"}
                    rel={company.current ? undefined : "noopener noreferrer"}
                    className={`block p-4 rounded-lg border transition-colors ${
                      company.current
                        ? "bg-tccg-cyan/10 border-tccg-cyan"
                        : "border-white/10 hover:border-tccg-cyan/50"
                    }`}
                  >
                    <p className="font-semibold text-white">{company.name}</p>
                    <p className="text-gray-500 text-sm">{company.role}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-tccg-blue" />
            
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-tccg-cyan rounded-full -translate-x-1/2" />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-tccg-cyan font-bold">{item.year}</span>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-tccg-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="card text-center">
                <div className="w-20 h-20 bg-tccg-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-tccg-navy">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{person.name}</h3>
                <p className="text-tccg-cyan text-sm">{person.role}</p>
                <p className="text-gray-500 text-sm mt-2">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to Build Beyond?
          </h2>
          <p className="text-gray-400 mt-4">
            Partner with us on your next construction or HVAC project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/contact" className="btn-cta">
              Contact Us
            </Link>
            <Link href="/careers" className="btn-secondary">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
