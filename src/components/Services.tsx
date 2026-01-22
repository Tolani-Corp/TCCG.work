import Link from "next/link";

const services = [
  {
    id: "smart-hvac",
    title: "Smart HVAC Systems",
    description: "Next-generation HVAC installations with IoT sensors, real-time monitoring, and AI-driven optimization. Reduce energy costs by up to 40%.",
    features: ["IoT Integration", "Remote Monitoring", "Predictive Maintenance", "Energy Analytics"],
    icon: "🌡️",
    color: "tccg-orange",
  },
  {
    id: "esg-solutions",
    title: "ESG Construction",
    description: "Sustainable building practices that meet and exceed environmental standards. Full ESG compliance documentation and reporting.",
    features: ["Carbon Tracking", "LEED Certification", "Green Materials", "Compliance Reports"],
    icon: "🌿",
    color: "tccg-green",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    description: "Full-service commercial construction from planning to completion. Specializing in office buildings, retail spaces, and industrial facilities.",
    features: ["Project Management", "Design-Build", "Tenant Improvements", "Renovations"],
    icon: "🏗️",
    color: "tccg-blue",
  },
  {
    id: "design",
    title: "Design Partnership",
    description: "In collaboration with Tolani Labs, we offer integrated design-build services using cutting-edge Revit modeling and BIM technology.",
    features: ["3D BIM Modeling", "Revit Integration", "Virtual Walkthroughs", "Clash Detection"],
    icon: "📐",
    color: "tccg-blue",
  },
  {
    id: "monitoring",
    title: "Performance Monitoring",
    description: "Web3-enabled contract performance dashboards. Track ESG metrics, energy consumption, and project milestones in real-time.",
    features: ["Blockchain Verified", "Real-time Dashboards", "Performance Analytics", "Automated Reports"],
    icon: "📊",
    color: "tccg-green",
  },
  {
    id: "maintenance",
    title: "Maintenance Programs",
    description: "Comprehensive preventive maintenance programs to ensure optimal system performance and longevity of your installations.",
    features: ["Scheduled Service", "Emergency Response", "Parts Warranty", "System Upgrades"],
    icon: "🔧",
    color: "tccg-orange",
  },
];

export function Services() {
  return (
    <section className="bg-gray-50 py-20" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-tccg-green text-sm font-semibold uppercase tracking-wider">Our Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Comprehensive Construction &<br />HVAC Solutions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-sm card-hover border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <Link
                href={`/services#${service.id}`}
                className="text-tccg-blue hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
