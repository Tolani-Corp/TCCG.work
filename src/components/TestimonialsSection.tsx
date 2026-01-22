const testimonials = [
  {
    quote:
      "TC Construction transformed our office with their smart HVAC system. Energy costs dropped 42% in the first year alone.",
    author: "Sarah Mitchell",
    role: "Facilities Director",
    company: "TechCorp Industries",
    avatar: "S",
  },
  {
    quote:
      "The ESG compliance reporting they provide is exceptional. Our stakeholders love the transparency and real-time metrics.",
    author: "Michael Chen",
    role: "Sustainability Officer",
    company: "GreenPath Properties",
    avatar: "M",
  },
  {
    quote:
      "Their partnership with Tolani Labs gave us a complete BIM model that caught issues before they became expensive problems.",
    author: "Jennifer Brooks",
    role: "Project Manager",
    company: "Riverside Development",
    avatar: "J",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-orange mb-4">CLIENT SUCCESS</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="card">
              {/* Quote Icon */}
              <svg
                className="w-10 h-10 text-tccg-cyan/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-300 italic">{testimonial.quote}</p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="w-12 h-12 bg-tccg-cyan rounded-full flex items-center justify-center">
                  <span className="font-bold text-tccg-navy text-lg">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
