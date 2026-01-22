import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TC Construction Group terms of service and conditions of use.",
};

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-8">Last updated: January 22, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-400">
                By accessing or using TC Construction Group's website and services, you agree 
                to be bound by these Terms of Service. If you do not agree, please do not use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
              <p className="text-gray-400">
                TCCG provides smart HVAC installation, ESG-compliant construction, commercial 
                construction, design partnership, performance monitoring, and maintenance services. 
                Specific terms for individual projects will be detailed in separate contracts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
              <p className="text-gray-400">
                All content on this website, including text, graphics, logos, and software, is 
                the property of TC Construction Group or its licensors and is protected by 
                intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
              <p className="text-gray-400">
                TCCG shall not be liable for any indirect, incidental, special, or consequential 
                damages arising from the use of our website or services. Our liability is limited 
                to the amount paid for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Governing Law</h2>
              <p className="text-gray-400">
                These terms shall be governed by and construed in accordance with the laws of 
                the State of Wyoming, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact</h2>
              <p className="text-gray-400">
                For questions about these terms, contact us at:{" "}
                <a href="mailto:legal@tccg.work" className="text-tccg-cyan hover:underline">
                  legal@tccg.work
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
