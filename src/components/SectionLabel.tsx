import type { ReactNode } from 'react'

/** Small green eyebrow label above a card's heading (e.g. "من خدماتنا"),
 *  led by a short orange mark that echoes the logo's accent. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-sm font-bold text-label">
      <span className="inline-block h-1 w-4 rounded-full bg-secondary" />
      {children}
    </p>
  )
}
