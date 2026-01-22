import Link from "next/link";

const projects = [
  {
    id: "metro-office-complex",
    title: "Metro Office Complex",
    type: "COMMERCIAL",
    description:
      "40-story office building with integrated smart HVAC system achieving 45% energy reduction.",
    stats: {
      size: "850,000 sq ft",
      savings: "45%",
      certification: "LEED Platinum",
    },
    image: "/projects/metro-office.jpg",
  },
  {
    id: "greentech-data-center",
    title: "GreenTech Data Center",
    type: "INDUSTRIAL",
    description:
      "Tier 4 data center with precision cooling and 99.999% uptime guarantee.",
    stats: {
      size: "150,000 sq ft",
      savings: "38%",
      certification: "EPA Certified",
    },
    image: "/projects/data-center.jpg",
  },
  {
    id: "riverside-medical-campus",
    title: "Riverside Medical Campus",
    type: "HEALTHCARE",
    description:
      "State-of-the-art medical facility with advanced air filtration and climate control.",
    stats: {
      size: "320,000 sq ft",
      savings: "42%",
      certification: "LEED Gold",
    },
    image: "/projects/medical-campus.jpg",
  },
];

export function ProjectsPreview() {
  return (
    <section className="py-20 bg-tccg-blue/10" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-green mb-4">PORTFOLIO</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mx-auto">
            Showcasing our commitment to excellence in construction and sustainable 
            building practices.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="card-hover group overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-tccg-blue to-tccg-navy rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl opacity-50">🏗️</span>
                <div className="absolute top-2 left-2">
                  <span className="badge-cyan text-xs">{project.type}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white group-hover:text-tccg-cyan transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">{project.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-tccg-cyan font-semibold text-sm">{project.stats.size}</p>
                  <p className="text-gray-500 text-xs">SIZE</p>
                </div>
                <div>
                  <p className="text-tccg-green font-semibold text-sm">{project.stats.savings}</p>
                  <p className="text-gray-500 text-xs">ENERGY SAVINGS</p>
                </div>
                <div>
                  <p className="text-tccg-orange font-semibold text-sm">{project.stats.certification}</p>
                  <p className="text-gray-500 text-xs">CERTIFICATION</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/projects" className="btn-secondary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
