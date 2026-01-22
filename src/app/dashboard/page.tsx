import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESG Dashboard",
  description: "Real-time ESG metrics and performance monitoring for TC Construction Group projects.",
};

const metrics = [
  { label: "Carbon Offset (tons)", value: "12,450", change: "+8%", trend: "up" },
  { label: "Energy Savings (MWh)", value: "45,230", change: "+12%", trend: "up" },
  { label: "Water Conservation (gal)", value: "2.1M", change: "+5%", trend: "up" },
  { label: "Waste Diverted (%)", value: "94%", change: "+2%", trend: "up" },
];

const certifications = [
  { name: "LEED Platinum", count: 15, icon: "🏆" },
  { name: "LEED Gold", count: 28, icon: "🥇" },
  { name: "LEED Silver", count: 12, icon: "🥈" },
  { name: "Energy Star", count: 45, icon: "⭐" },
  { name: "EPA Certified", count: 38, icon: "✅" },
  { name: "WELL Certified", count: 8, icon: "💚" },
];

const recentProjects = [
  { name: "Metro Office Complex", score: 98, status: "Certified", certification: "LEED Platinum" },
  { name: "GreenTech Data Center", score: 95, status: "Certified", certification: "EPA Certified" },
  { name: "Riverside Medical", score: 92, status: "Certified", certification: "LEED Gold" },
  { name: "Tech Campus Phase 2", score: 88, status: "In Progress", certification: "LEED Gold" },
  { name: "Sustainable Retail Plaza", score: 96, status: "Certified", certification: "Zero Net Energy" },
];

export default function DashboardPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-12 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="badge-green mb-2">LIVE DATA</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                ESG Performance Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Real-time environmental, social, and governance metrics
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Last Updated</p>
              <p className="text-white font-mono">
                {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 bg-tccg-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="card">
                <p className="text-gray-500 text-sm">{metric.label}</p>
                <div className="flex items-end gap-2 mt-2">
                  <p className="text-3xl font-display font-bold text-white">
                    {metric.value}
                  </p>
                  <span className={`text-sm font-medium ${metric.trend === "up" ? "text-tccg-green" : "text-red-500"}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Certifications */}
            <div className="lg:col-span-1">
              <div className="card">
                <h3 className="font-semibold text-white mb-4">Certifications Achieved</h3>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cert.icon}</span>
                        <span className="text-gray-300">{cert.name}</span>
                      </div>
                      <span className="text-tccg-cyan font-bold">{cert.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Certifications</span>
                    <span className="text-white font-bold">146</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="lg:col-span-2 space-y-8">
              {/* Energy Chart */}
              <div className="card">
                <h3 className="font-semibold text-white mb-4">Energy Savings Trend (2025)</h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 72, 78].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-tccg-cyan to-tccg-green rounded-t"
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-gray-600 text-xs mt-2">
                        {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Projects */}
              <div className="card">
                <h3 className="font-semibold text-white mb-4">Recent ESG Scores</h3>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">{project.name}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="badge bg-white/5 text-gray-500 text-xs">
                            {project.certification}
                          </span>
                          <span className={`badge text-xs ${
                            project.status === "Certified" ? "badge-green" : "badge-orange"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-tccg-cyan">{project.score}</p>
                        <p className="text-gray-500 text-xs">ESG Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Verification */}
      <section className="py-12 bg-tccg-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-tccg-cyan/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">⛓️</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Blockchain Verified</h3>
                <p className="text-gray-500 text-sm">
                  All ESG data is immutably recorded on Base L2
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">Latest Block</p>
              <a
                href="https://basescan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tccg-cyan hover:underline font-mono text-sm"
              >
                View on Basescan →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
