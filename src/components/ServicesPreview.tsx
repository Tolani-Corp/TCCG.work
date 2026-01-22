import Link from "next/link";

const services = [
  {
    id: "smart-hvac",
    title: "Smart HVAC Systems",
    description:
      "Next-generation HVAC installations with IoT sensors, real-time monitoring, and AI-driven optimization. Reduce energy costs by up to 40%.",
    features: ["IoT Integration", "Remote Monitoring", "Predictive Maintenance", "Energy Analytics"],
    icon: "❄️",
    color: "cyan",
  },
  {
    id: "esg-solutions",
    title: "ESG Construction",
    description:
      "Sustainable building practices that meet and exceed environmental standards. Full ESG compliance documentation and reporting.",
    features: ["Carbon Tracking", "LEED Certification", "Green Materials", "Compliance Reports"],
    icon: "🌿",
    color: "green",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    description:
      "Full-service commercial construction from planning to completion. Specializing in office buildings, retail spaces, and industrial facilities.",
    features: ["Project Management", "Design-Build", "Tenant Improvements", "Renovations"],
    icon: "🏢",
    color: "orange",
  },
  {
    id: "design",
    title: "Design Partnership",
    description:
      "In collaboration with Tolani Labs, we offer integrated design-build services using cutting-edge Revit modeling and BIM technology.",
    features: ["3D BIM Modeling", "Revit Integration", "Virtual Walkthroughs", "Clash Detection"],
    icon: "📐",
    color: "cyan",
  },
  {
    id: "monitoring",
    title: "Performance Monitoring",
    description:
      "Web3-enabled contract performance dashboards. Track ESG metrics, energy consumption, and project milestones in real-time.",
    features: ["Blockchain Verified", "Real-time Dashboards", "Performance Analytics", "Automated Reports"],
    icon: "📊",
    color: "green",
  },
  {
    id: "maintenance",
    title: "Maintenance Programs",
    description:
      "Comprehensive preventive maintenance programs to ensure optimal system performance and longevity of your installations.",
    features: ["Scheduled Service", "Emergency Response", "Parts Warranty", "System Upgrades"],
    icon: "🔧",
    color: "orange",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-20" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-cyan mb-4">OUR EXPERTISE</span>
          <h2 className="section-title">
            Comprehensive Construction &<br />
            <span className="text-tccg-cyan">HVAC Solutions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From smart HVAC installations to full ESG-compliant construction projects, 
            we deliver excellence at every stage.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.id}`}
              className="card-hover group"
            >
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">
                {service.icon}
              </span>
              <h3 className="text-xl font-semibold text-white group-hover:text-tccg-cyan transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className={`badge badge-${service.color}`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-tccg-cyan text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
