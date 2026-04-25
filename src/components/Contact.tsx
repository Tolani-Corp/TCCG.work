import { Section, FadeIn } from '@/components/Section'

export function Contact() {
  return (
    <Section id="contact" title="Ready to Start the Conversation?">
      <FadeIn className="rounded-[2rem] bg-[var(--bg-strong)] px-6 py-20 text-white sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bring the scope. We&apos;ll bring the operating discipline.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">
            Whether the next move is a smart HVAC retrofit, an ESG-aligned construction program,
            or a broader commercial modernization effort, TCCG should present a direct, credible
            path into review.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:info@tccg.work?subject=TCCG%20Project%20Review"
              className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-[var(--bg-strong)] shadow-sm hover:bg-[var(--bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Email project review
            </a>
            <a
              href="https://tolanicorp.us/communications"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Enter Tolani HQ network
            </a>
          </div>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Primary contact
              </p>
              <p className="mt-2 text-sm font-semibold text-white">info@tccg.work</p>
              <p className="mt-1 text-sm leading-6 text-white/65">
                Best for scopes, project intros, partnerships, and procurement conversations.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Parent-company routing
              </p>
              <p className="mt-2 text-sm font-semibold text-white">Tolani Corp communications</p>
              <p className="mt-1 text-sm leading-6 text-white/65">
                For multi-brand enterprise routing, partner coordination, and executive handoff.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
