import Image from 'next/image'
import Link from 'next/link'

import { FadeIn } from '@/components/Section'

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute right-[-8%] top-[-10%] h-[30rem] w-[30rem] rounded-full bg-[rgba(240,95,94,0.18)] blur-[120px]" />
      <div className="absolute bottom-[-12%] left-[-8%] h-[24rem] w-[24rem] rounded-full bg-[rgba(205,181,141,0.24)] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:pb-32 lg:flex lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-12">
          <FadeIn>
            <div className="mt-16 sm:mt-20 lg:mt-8">
              <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-white px-5 py-4 shadow-sm">
                <Image src="/logo.svg" alt="TC Construction Group" width={240} height={72} className="h-10 w-auto" priority />
              </div>
            </div>

            <div className="mt-8">
              <Link href="/#projects" className="inline-flex space-x-6">
                <span className="rounded-full bg-[rgba(240,95,94,0.12)] px-3 py-1 text-sm font-semibold leading-6 text-[var(--accent-primary)] ring-1 ring-inset ring-[rgba(240,95,94,0.22)]">
                  Commercial delivery
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-[var(--text-secondary)]">
                  <span>Explore recent execution</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </div>

            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-[var(--text-primary)]">Building Beyond with </span>
              <span className="text-gradient">
                smart HVAC, ESG discipline, and real project control
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
              TC Construction Group modernizes facilities and commercial environments through
              intelligent HVAC systems, sustainability-aligned construction delivery, and a sharper
              operating standard across every site.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(240,95,94,0.25)] transition hover:opacity-90 hover:shadow-xl"
              >
                Request a project review
              </Link>
              <Link
                href="/#services"
                className="text-sm font-semibold leading-6 text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
              >
                See capability lanes <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Signal value="Smart HVAC" label="Sensor-driven modernization" />
              <Signal value="ESG ready" label="Tracked sustainability posture" />
              <Signal value="Commercial" label="Federal and private execution" />
            </div>
          </FadeIn>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-14 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-24">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-[2rem] bg-[var(--bg-strong)] p-2 shadow-2xl ring-1 ring-inset ring-black/10 lg:-m-4 lg:p-4">
              <div className="grid w-[76rem] gap-5 rounded-[1.65rem] bg-[linear-gradient(180deg,#111317,#1b1f24_100%)] p-8 text-white shadow-2xl ring-1 ring-white/10 sm:w-[80rem] lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                    Delivery posture
                  </p>
                  <h2 className="mt-4 text-3xl font-black tracking-tight">
                    TCCG is the physical execution layer inside the Tolani ecosystem.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                    The brand should feel like disciplined field execution: clean proposals,
                    credible capability lanes, measurable sustainability posture, and a direct path
                    from discovery to project review.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Capability
                      title="Facility modernization"
                      detail="HVAC retrofits, sensor overlays, and operational efficiency upgrades."
                    />
                    <Capability
                      title="ESG construction"
                      detail="Sustainability-aligned scopes, reporting, and documentation support."
                    />
                    <Capability
                      title="Commercial readiness"
                      detail="General contractor coordination, trades, and stakeholder communication."
                    />
                    <Capability
                      title="Operator integration"
                      detail="Connected into Tolani communications, management, and enterprise routing."
                    />
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-3">
                      <Image src="/icon.svg" alt="TC Construction Group icon" width={56} height={56} className="h-12 w-12" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                        Brand system
                      </p>
                      <p className="mt-2 text-2xl font-black">TC Construction Group</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <MetricRow label="Primary mark" value="Official TCCG wordmark and icon" />
                    <MetricRow label="Voice" value="Disciplined, commercial, direct" />
                    <MetricRow label="Palette" value="Concrete, slate, steel, coral accent" />
                    <MetricRow label="CTA" value="Request a project review" />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                      Operating note
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      This site now behaves like a focused construction front door instead of a
                      generic portfolio template.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Signal({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-4 shadow-sm">
      <p className="text-sm font-bold text-[var(--text-primary)]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{label}</p>
    </div>
  )
}

function Capability({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{detail}</p>
    </div>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  )
}
