import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Standards",
  description: "TC Construction Group safety standards and certifications.",
};

export default function SafetyPage() {
  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white mb-8">
            Safety Standards
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Safety</h2>
              <p className="text-gray-400">
                At TC Construction Group, safety is our top priority. We maintain rigorous 
                safety standards across all projects, ensuring the well-being of our workers, 
                clients, and the public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Certifications</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  { name: "OSHA 30-Hour", description: "All supervisors certified" },
                  { name: "EPA RRP", description: "Lead-safe work practices" },
                  { name: "NATE Certified", description: "HVAC technician certification" },
                  { name: "First Aid/CPR", description: "All field personnel trained" },
                ].map((cert) => (
                  <div key={cert.name} className="card">
                    <h4 className="font-semibold text-white">{cert.name}</h4>
                    <p className="text-gray-500 text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Safety Metrics</h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="card text-center">
                  <p className="text-3xl font-bold text-tccg-green">0.8</p>
                  <p className="text-gray-500 text-sm">EMR Rating</p>
                </div>
                <div className="card text-center">
                  <p className="text-3xl font-bold text-tccg-cyan">500K+</p>
                  <p className="text-gray-500 text-sm">Safe Work Hours</p>
                </div>
                <div className="card text-center">
                  <p className="text-3xl font-bold text-tccg-orange">100%</p>
                  <p className="text-gray-500 text-sm">PPE Compliance</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Report a Safety Concern</h2>
              <p className="text-gray-400">
                If you observe a safety concern on any TCCG project, please report it immediately:{" "}
                <a href="mailto:safety@tccg.work" className="text-tccg-cyan hover:underline">
                  safety@tccg.work
                </a>
                {" "}or call our 24/7 safety hotline.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
