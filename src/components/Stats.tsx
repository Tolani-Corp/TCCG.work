const stats = [
  { value: "500+", label: "Projects Completed", description: "Commercial & residential installations" },
  { value: "98%", label: "ESG Compliance Rate", description: "Exceeding industry standards" },
  { value: "40%", label: "Avg Energy Savings", description: "For smart HVAC clients" },
  { value: "15+", label: "Years Experience", description: "Industry-leading expertise" },
];

export function Stats() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
