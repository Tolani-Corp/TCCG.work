import Link from "next/link";

const projects = [
  {
    title: "Metro Office Complex",
    category: "COMMERCIAL",
    description: "40-story office building with integrated smart HVAC system achieving 45% energy reduction.",
    size: "850,000 sq ft",
    savings: "45%",
    certification: "LEED Platinum",
    image: "/projects/metro-office.jpg",
  },
  {
    title: "GreenTech Data Center",
    category: "INDUSTRIAL",
    description: "Tier 4 data center with precision cooling and 99.999% uptime guarantee.",
    size: "150,000 sq ft",
    savings: "38%",
    certification: "EPA Certified",
    image: "/projects/data-center.jpg",
  },
  {
    title: "Riverside Medical Campus",
    category: "HEALTHCARE",
    description: "State-of-the-art medical facility with advanced air filtration and climate control.",
    size: "320,000 sq ft",
    savings: "42%",
    certification: "LEED Gold",
    image: "/projects/medical-campus.jpg",
  },
];

export function Projects() {
  return (
    <section className="bg-white py-20" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-tccg-green text-sm font-semibold uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Featured Projects
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Showcasing our commitment to excellence in construction and sustainable building practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-gray-50 rounded-xl overflow-hidden card-hover">
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-tccg-slate to-gray-700 relative">
                <div className="absolute top-4 left-4">
                  <span className="text-xs bg-tccg-blue text-white px-2 py-1 rounded font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{project.size}</div>
                    <div className="text-xs text-gray-500">SIZE</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-tccg-green">{project.savings}</div>
                    <div className="text-xs text-gray-500">ENERGY SAVINGS</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-tccg-blue">{project.certification}</div>
                    <div className="text-xs text-gray-500">CERTIFICATION</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-tccg-slate hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
