import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "View our portfolio of smart HVAC installations and ESG-compliant construction projects.",
};

const projects = [
  {
    id: "metro-office-complex",
    title: "Metro Office Complex",
    type: "COMMERCIAL",
    location: "Downtown Metro Area",
    year: "2025",
    description:
      "40-story office building with integrated smart HVAC system achieving 45% energy reduction. This flagship project showcases our ability to deliver large-scale commercial projects with cutting-edge sustainability features.",
    stats: {
      size: "850,000 sq ft",
      savings: "45%",
      certification: "LEED Platinum",
      duration: "24 months",
    },
    features: ["Smart HVAC", "IoT Sensors", "BIM Design", "ESG Monitoring"],
  },
  {
    id: "greentech-data-center",
    title: "GreenTech Data Center",
    type: "INDUSTRIAL",
    location: "Tech Park Valley",
    year: "2024",
    description:
      "Tier 4 data center with precision cooling and 99.999% uptime guarantee. Custom-designed HVAC system handles extreme heat loads while maintaining optimal efficiency.",
    stats: {
      size: "150,000 sq ft",
      savings: "38%",
      certification: "EPA Certified",
      duration: "18 months",
    },
    features: ["Precision Cooling", "Redundant Systems", "Hot Aisle Containment", "PUE Optimization"],
  },
  {
    id: "riverside-medical-campus",
    title: "Riverside Medical Campus",
    type: "HEALTHCARE",
    location: "Riverside District",
    year: "2024",
    description:
      "State-of-the-art medical facility with advanced air filtration and climate control. HEPA filtration and pressure differentials ensure patient safety.",
    stats: {
      size: "320,000 sq ft",
      savings: "42%",
      certification: "LEED Gold",
      duration: "30 months",
    },
    features: ["HEPA Filtration", "Pressure Control", "Humidity Management", "24/7 Monitoring"],
  },
  {
    id: "sustainable-retail-plaza",
    title: "Sustainable Retail Plaza",
    type: "RETAIL",
    location: "Eastside Shopping District",
    year: "2025",
    description:
      "Mixed-use retail development featuring green roofs, solar integration, and smart building controls. Zero net energy certification achieved.",
    stats: {
      size: "200,000 sq ft",
      savings: "52%",
      certification: "Zero Net Energy",
      duration: "20 months",
    },
    features: ["Solar Integration", "Green Roof", "Smart Controls", "EV Charging"],
  },
  {
    id: "tech-campus-expansion",
    title: "Tech Campus Expansion",
    type: "COMMERCIAL",
    location: "Innovation Park",
    year: "2023",
    description:
      "Three-building expansion for major tech company featuring collaborative spaces and wellness-focused HVAC design.",
    stats: {
      size: "500,000 sq ft",
      savings: "40%",
      certification: "WELL Certified",
      duration: "28 months",
    },
    features: ["Fresh Air Systems", "Circadian Lighting", "Acoustic Comfort", "Air Quality Sensors"],
  },
  {
    id: "logistics-hub",
    title: "Regional Logistics Hub",
    type: "INDUSTRIAL",
    location: "Distribution Corridor",
    year: "2024",
    description:
      "1.2 million square foot distribution center with climate-controlled zones for temperature-sensitive goods.",
    stats: {
      size: "1,200,000 sq ft",
      savings: "35%",
      certification: "EPA Certified",
      duration: "16 months",
    },
    features: ["Zone Control", "Cold Storage", "Loading Dock HVAC", "Energy Recovery"],
  },
];

const typeColors: Record<string, string> = {
  COMMERCIAL: "cyan",
  INDUSTRIAL: "orange",
  HEALTHCARE: "green",
  RETAIL: "cyan",
};

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-green mb-4">PORTFOLIO</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-tccg-cyan">Projects</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing our commitment to excellence in construction and sustainable 
            building practices across commercial, industrial, and healthcare sectors.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-tccg-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-display font-bold text-tccg-cyan">500+</p>
              <p className="text-gray-500 text-sm">Projects Completed</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-tccg-green">10M+</p>
              <p className="text-gray-500 text-sm">Square Feet Built</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-tccg-orange">50+</p>
              <p className="text-gray-500 text-sm">LEED Certifications</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white">40%</p>
              <p className="text-gray-500 text-sm">Avg Energy Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card-hover">
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-tccg-blue to-tccg-navy rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                  <span className="text-8xl opacity-30">🏗️</span>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`badge-${typeColors[project.type]}`}>{project.type}</span>
                    <span className="badge bg-white/10 text-white">{project.year}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-tccg-cyan text-sm mt-1">{project.location}</p>
                <p className="text-gray-400 mt-4">{project.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.features.map((feature) => (
                    <span key={feature} className="badge bg-white/5 text-gray-400">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-tccg-cyan font-semibold">{project.stats.size}</p>
                    <p className="text-gray-500 text-xs">Size</p>
                  </div>
                  <div>
                    <p className="text-tccg-green font-semibold">{project.stats.savings}</p>
                    <p className="text-gray-500 text-xs">Energy Savings</p>
                  </div>
                  <div>
                    <p className="text-tccg-orange font-semibold">{project.stats.certification}</p>
                    <p className="text-gray-500 text-xs">Certification</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{project.stats.duration}</p>
                    <p className="text-gray-500 text-xs">Duration</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-tccg-blue/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 mt-4">
            Let's discuss how we can bring your vision to life with smart, sustainable construction.
          </p>
          <Link href="/contact" className="btn-cta inline-block mt-8">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
