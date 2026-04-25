import { Section, FadeIn } from '@/components/Section'

const services = [
  {
    title: 'Smart HVAC Systems',
    description:
      'Modern HVAC retrofits with sensor-driven monitoring, control-layer upgrades, and performance reporting.',
    emphasis: 'Controls, sensors, and measurable efficiency',
  },
  {
    title: 'ESG Construction',
    description:
      'Sustainability-aligned project execution with documentation support, material discipline, and reporting visibility.',
    emphasis: 'Governed sustainability posture',
  },
  {
    title: 'Commercial Build',
    description:
      'Commercial and institutional project delivery with structured scopes, site coordination, and schedule discipline.',
    emphasis: 'Federal and private-sector readiness',
  },
  {
    title: 'Performance Monitoring',
    description:
      'Connected dashboards for facility performance, energy visibility, and operational follow-through.',
    emphasis: 'Track the work after installation',
  },
]

export function Services() {
  return (
    <Section id="services" title="Capability Lanes" className="bg-[rgba(255,255,255,0.66)]">
      <div className="mb-12 max-w-3xl">
        <p className="text-lg leading-8 text-[var(--text-secondary)]">
          The TCCG offer should read like an execution stack: modernize the system, deliver the
          work, document the sustainability posture, and keep the performance visible after handoff.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <FadeIn key={service.title} className="tccg-panel rounded-[2rem] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              {service.emphasis}
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-8 tracking-tight text-[var(--text-primary)]">
              {service.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              {service.description}
            </p>
            <div className="mt-6 h-px w-full bg-[var(--border-subtle)]" />
            <p className="mt-6 text-sm font-semibold text-[var(--accent-steel)]">
              Project-ready delivery, not generic category language.
            </p>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
