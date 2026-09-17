import Link from "next/link";

export type PublicInfoSection = {
  title: string;
  body?: string;
  items?: string[];
};

export function PublicInfoPage({
  eyebrow,
  title,
  intro,
  sections,
  primaryCta,
  secondaryCta,
  notice,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PublicInfoSection[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  notice?: string;
}) {
  return (
    <div>
      <section className="border-b border-[var(--border-subtle)] bg-slate-950 text-white">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{intro}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && <Link href={primaryCta.href} className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white">{primaryCta.label}</Link>}
              {secondaryCta && <Link href={secondaryCta.href} className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white">{secondaryCta.label}</Link>}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-[90rem] px-6 py-14 lg:px-8 lg:py-20">
          {notice && (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              {notice}
            </div>
          )}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-950">{section.title}</h2>
                {section.body && <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>}
                {section.items && (
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                    {section.items.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
