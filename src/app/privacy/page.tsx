import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TC Construction Group privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white mb-8">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-8">Last updated: January 22, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-400">
                TC Construction Group ("TCCG," "we," "our," or "us") respects your privacy and is 
                committed to protecting your personal data. This privacy policy explains how we 
                collect, use, and safeguard your information when you visit our website or use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-400">We may collect the following types of information:</p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Company and project details</li>
                <li>Technical data (IP address, browser type, device information)</li>
                <li>Usage data (pages visited, features used)</li>
                <li>ESG dashboard data (for authenticated users)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-400">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-2">
                <li>Respond to inquiries and provide quotes</li>
                <li>Deliver and improve our services</li>
                <li>Send project updates and communications</li>
                <li>Maintain ESG compliance records</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-gray-400">
                We implement industry-standard security measures to protect your data. ESG 
                performance data is secured using blockchain technology for immutable record-keeping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <p className="text-gray-400">
                For privacy-related inquiries, contact us at:{" "}
                <a href="mailto:privacy@tccg.work" className="text-tccg-cyan hover:underline">
                  privacy@tccg.work
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
