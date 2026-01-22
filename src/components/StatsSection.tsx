export function StatsSection() {
  const stats = [
    {
      value: "500+",
      label: "Projects Completed",
      description: "Commercial & residential installations",
      icon: "🏗️",
    },
    {
      value: "98%",
      label: "ESG Compliance Rate",
      description: "Exceeding industry standards",
      icon: "🌿",
    },
    {
      value: "40%",
      label: "Avg Energy Savings",
      description: "For smart HVAC clients",
      icon: "⚡",
    },
    {
      value: "15+",
      label: "Years Experience",
      description: "Industry-leading expertise",
      icon: "📅",
    },
  ];

  return (
    <section className="py-20 bg-tccg-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-hover text-center"
            >
              <span className="text-4xl mb-4 block">{stat.icon}</span>
              <p className="text-4xl font-display font-bold text-tccg-cyan">
                {stat.value}
              </p>
              <p className="text-white font-semibold mt-2">{stat.label}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
