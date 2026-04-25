import clsx from 'clsx'
import { ReactNode } from 'react'

export function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={clsx('py-24 sm:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {title && (
          <div className="mx-auto max-w-3xl lg:mx-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)]">
              TC Construction Group
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {title}
            </h2>
          </div>
        )}
        <div className={clsx(title && 'mt-16', 'mx-auto max-w-2xl lg:mx-0 lg:max-w-none')}>
          {children}
        </div>
      </div>
    </section>
  )
}

export function FadeIn({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={className}>{children}</div>
}
