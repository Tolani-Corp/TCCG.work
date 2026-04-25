import { Section, FadeIn } from '@/components/Section'

const projects = [
  {
    name: 'Eco-Smart Warehouse',
    description:
      'Retrofitted a 50k sqft warehouse with smart HVAC sensors, reducing energy spread by 40%.',
    stat: '40% Savings',
    note: 'Warehouse retrofit and systems modernization',
  },
  {
    name: 'Federal Office Complex',
    description:
      'ESG-compliant renovation for GSA standards, including sustainable material sourcing.',
    stat: 'LEED Platinum',
    note: 'Public-sector sustainability delivery',
  },
  {
    name: 'Tolani Labs HQ',
    description: 'Built the flagship innovation hub with integrated smart building OS.',
    stat: 'Net Zero',
    note: 'Innovation workspace and operating stack',
  },
]

export function CaseStudies() {
  return (
    <Section id="projects" title="Featured Delivery Profiles">
      <div className="mb-12 max-w-3xl">
        <p className="text-lg leading-8 text-[var(--text-secondary)]">
          These profiles show the TCCG posture the brand should communicate: measurable outcomes,
          disciplined execution, and systems that still matter after the ribbon cutting.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <FadeIn key={project.name} className="tccg-panel flex flex-col rounded-[2rem] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              {project.note}
            </p>
            <h3 className="mt-4 text-xl font-semibold leading-8 text-[var(--text-primary)]">
              {project.name}
            </h3>
            <p className="mt-4 flex-auto text-base leading-7 text-[var(--text-secondary)]">
              {project.description}
            </p>
            <p className="mt-6 text-3xl font-black tracking-tight text-[var(--accent-primary)]">
              {project.stat}
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--accent-steel)]">
              Built for portfolio-grade proof, not filler case-study copy.
            </p>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
