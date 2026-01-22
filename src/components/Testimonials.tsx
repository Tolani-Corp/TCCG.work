const testimonials = [
  {
    quote: "TC Construction transformed our office with their smart HVAC system. Energy costs dropped 42% in the first year alone.",
    name: "Sarah Mitchell",
    title: "Facilities Director",
    company: "TechCorp Industries",
  },
  {
    quote: "The ESG compliance reporting they provide is exceptional. Our stakeholders love the transparency and real-time metrics.",
    name: "Michael Chen",
    title: "Sustainability Officer",
    company: "GreenPath Properties",
  },
  {
    quote: "Their partnership with Tolani Labs gave us a complete BIM model that caught issues before they became expensive problems.",
    name: "Jennifer Brooks",
    title: "Project Manager",
    company: "Riverside Development",
  },
];

export function Testimonials() {
  return (
    <section className="bg-tccg-slate py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-tccg-green text-sm font-semibold uppercase tracking-wider">Client Success</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <svg className="w-8 h-8 text-tccg-green/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-tccg-blue to-tccg-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.title}</div>
                  <div className="text-tccg-green text-sm">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
