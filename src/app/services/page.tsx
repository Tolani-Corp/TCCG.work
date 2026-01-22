import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Smart HVAC, ESG Construction, Commercial Building, and Design Partnership services from TC Construction Group.",
};

const services = [
  {
    id: "smart-hvac",
    title: "Smart HVAC Systems",
    subtitle: "Next-Generation Climate Control",
    description:
      "Transform your building's efficiency with our intelligent HVAC solutions. Our systems integrate IoT sensors, machine learning algorithms, and real-time monitoring to deliver optimal comfort while reducing energy costs by up to 40%.",
    features: [
      { name: "IoT Sensor Integration", description: "Smart sensors throughout your building for precise climate monitoring" },
      { name: "Remote Monitoring", description: "24/7 access to system performance via web and mobile apps" },
      { name: "Predictive Maintenance", description: "AI-driven alerts prevent breakdowns before they happen" },
      { name: "Energy Analytics", description: "Detailed reports on consumption patterns and optimization opportunities" },
    ],
    benefits: ["40% average energy savings", "Reduced maintenance costs", "Improved air quality", "Carbon footprint reduction"],
    icon: "❄️",
  },
  {
    id: "esg-solutions",
    title: "ESG Construction",
    subtitle: "Sustainable Building Practices",
    description:
      "Meet and exceed environmental, social, and governance standards with our comprehensive ESG construction services. We provide full documentation, reporting, and certification support.",
    features: [
      { name: "Carbon Tracking", description: "Real-time monitoring of project carbon footprint" },
      { name: "LEED Certification", description: "Expert guidance through LEED certification process" },
      { name: "Green Materials", description: "Sustainable and recycled building materials sourcing" },
      { name: "Compliance Reports", description: "Automated ESG compliance documentation" },
    ],
    benefits: ["LEED certification support", "Stakeholder transparency", "Regulatory compliance", "Enhanced property value"],
    icon: "🌿",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    subtitle: "Full-Service Building Solutions",
    description:
      "From ground-up construction to tenant improvements, we deliver commercial projects on time and on budget. Our team specializes in office buildings, retail spaces, and industrial facilities.",
    features: [
      { name: "Project Management", description: "End-to-end project oversight and coordination" },
      { name: "Design-Build", description: "Integrated design and construction services" },
      { name: "Tenant Improvements", description: "Custom buildouts for commercial tenants" },
      { name: "Renovations", description: "Modernization and adaptive reuse projects" },
    ],
    benefits: ["On-time delivery", "Budget transparency", "Quality craftsmanship", "Single point of contact"],
    icon: "🏢",
  },
  {
    id: "design",
    title: "Design Partnership",
    subtitle: "Powered by Tolani Labs",
    description:
      "In collaboration with Tolani Labs, we offer cutting-edge design-build services using advanced Revit modeling and BIM technology. Visualize your project before breaking ground.",
    features: [
      { name: "3D BIM Modeling", description: "Full Building Information Modeling for coordination" },
      { name: "Revit Integration", description: "Industry-standard design documentation" },
      { name: "Virtual Walkthroughs", description: "Experience your project in VR before construction" },
      { name: "Clash Detection", description: "Identify and resolve conflicts before they cost money" },
    ],
    benefits: ["Reduced change orders", "Better coordination", "Faster approvals", "Cost certainty"],
    icon: "📐",
  },
  {
    id: "monitoring",
    title: "Performance Monitoring",
    subtitle: "Web3-Enabled Dashboards",
    description:
      "Track your building's performance with blockchain-verified data. Our dashboards provide real-time insights into ESG metrics, energy consumption, and contract milestones.",
    features: [
      { name: "Blockchain Verification", description: "Immutable records of performance data" },
      { name: "Real-time Dashboards", description: "Live metrics accessible from anywhere" },
      { name: "Performance Analytics", description: "AI-powered insights and recommendations" },
      { name: "Automated Reports", description: "Scheduled reports for stakeholders" },
    ],
    benefits: ["Data integrity", "Stakeholder confidence", "Operational insights", "Compliance automation"],
    icon: "📊",
  },
  {
    id: "maintenance",
    title: "Maintenance Programs",
    subtitle: "Preventive Care & Support",
    description:
      "Protect your investment with comprehensive maintenance programs. Our technicians ensure optimal system performance and rapid response when issues arise.",
    features: [
      { name: "Scheduled Service", description: "Regular preventive maintenance visits" },
      { name: "Emergency Response", description: "24/7 support for critical issues" },
      { name: "Parts Warranty", description: "Extended warranties on all components" },
      { name: "System Upgrades", description: "Technology refresh programs" },
    ],
    benefits: ["Extended equipment life", "Reduced downtime", "Predictable costs", "Priority support"],
    icon: "🔧",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-cyan mb-4">OUR SERVICES</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Comprehensive Construction &<br />
            <span className="text-tccg-cyan">HVAC Solutions</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            From smart HVAC installations to full ESG-compliant construction projects, 
            we deliver excellence at every stage.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-tccg-navy" : "bg-tccg-blue/10"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-5xl mb-4 block">{service.icon}</span>
                <h2 className="font-display text-3xl font-bold text-white">
                  {service.title}
                </h2>
                <p className="text-tccg-cyan font-medium mt-1">{service.subtitle}</p>
                <p className="text-gray-400 mt-4">{service.description}</p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {service.benefits.map((benefit) => (
                    <span key={benefit} className="badge-green">
                      ✓ {benefit}
                    </span>
                  ))}
                </div>

                <Link href="/contact" className="btn-cta inline-block mt-8">
                  Get Started
                </Link>
              </div>

              {/* Features */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                {service.features.map((feature) => (
                  <div key={feature.name} className="card">
                    <h4 className="font-semibold text-white">{feature.name}</h4>
                    <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-tccg-blue/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-gray-400 mt-4">
            Our experts will help you identify the right solutions for your project.
          </p>
          <Link href="/contact" className="btn-cta inline-block mt-8">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
