import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join TC Construction Group - Building careers in smart HVAC and sustainable construction.",
};

const openings = [
  {
    id: "hvac-project-manager",
    title: "HVAC Project Manager",
    department: "Operations",
    location: "Multiple Locations",
    type: "Full-time",
    description: "Lead smart HVAC installation projects from planning to completion. Manage teams, budgets, and client relationships.",
    requirements: ["5+ years HVAC experience", "PMP certification preferred", "Smart building technology knowledge"],
  },
  {
    id: "bim-coordinator",
    title: "BIM Coordinator",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Coordinate BIM models across disciplines. Work closely with Tolani Labs design team on Revit integration.",
    requirements: ["Revit expertise", "BIM coordination experience", "Construction background"],
  },
  {
    id: "esg-analyst",
    title: "ESG Compliance Analyst",
    department: "Sustainability",
    location: "Corporate HQ",
    type: "Full-time",
    description: "Develop and maintain ESG compliance programs. Generate reports and manage LEED certification processes.",
    requirements: ["LEED AP certification", "ESG reporting experience", "Data analysis skills"],
  },
  {
    id: "smart-systems-technician",
    title: "Smart Systems Technician",
    department: "Field Services",
    location: "Regional",
    type: "Full-time",
    description: "Install and maintain IoT sensors, building automation systems, and smart HVAC controls.",
    requirements: ["HVAC certification", "IoT/automation experience", "Troubleshooting skills"],
  },
  {
    id: "construction-superintendent",
    title: "Construction Superintendent",
    department: "Construction",
    location: "Project-based",
    type: "Full-time",
    description: "Oversee daily construction operations. Ensure safety, quality, and schedule compliance.",
    requirements: ["10+ years commercial construction", "OSHA certification", "Leadership experience"],
  },
  {
    id: "web3-developer",
    title: "Web3 Developer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description: "Build blockchain-based monitoring dashboards and smart contract integrations for ESG tracking.",
    requirements: ["Solidity/Web3 experience", "React/Next.js", "Construction tech interest"],
  },
];

const benefits = [
  { icon: "💰", title: "Competitive Salary", description: "Market-leading compensation packages" },
  { icon: "🏥", title: "Health Benefits", description: "Medical, dental, and vision coverage" },
  { icon: "📈", title: "401(k) Match", description: "Generous retirement contributions" },
  { icon: "🎓", title: "Education", description: "Tuition reimbursement and certifications" },
  { icon: "🏖️", title: "PTO", description: "Flexible vacation and sick leave" },
  { icon: "🪙", title: "Token Rewards", description: "TUT token bonuses via Tolani Labs" },
];

export default function CareersPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-orange mb-4">JOIN OUR TEAM</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Build Your <span className="text-tccg-cyan">Career</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Join a team that's Building Beyond traditional construction. We're looking for 
            talented individuals passionate about smart buildings and sustainability.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-tccg-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-white mb-8">
            Why Work at TCCG?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card text-center">
                <span className="text-3xl mb-2 block">{benefit.icon}</span>
                <h4 className="font-semibold text-white text-sm">{benefit.title}</h4>
                <p className="text-gray-500 text-xs mt-1">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Open Positions
          </h2>

          <div className="space-y-6">
            {openings.map((job) => (
              <div key={job.id} className="card-hover">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="badge-cyan">{job.department}</span>
                      <span className="badge bg-white/10 text-gray-400">{job.location}</span>
                      <span className="badge-green">{job.type}</span>
                    </div>
                  </div>
                  <Link
                    href={`/careers/${job.id}`}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Apply Now
                  </Link>
                </div>
                <p className="text-gray-400 mt-4">{job.description}</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-gray-500 text-sm">
                    <span className="text-white font-medium">Requirements: </span>
                    {job.requirements.join(" • ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-20 bg-tccg-blue/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Don't See Your Role?
          </h2>
          <p className="text-gray-400 mt-4">
            We're always looking for talented individuals. Send us your resume and 
            we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@tccg.work"
            className="btn-cta inline-block mt-8"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}
