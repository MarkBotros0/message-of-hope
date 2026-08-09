import { useId, type ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionBandProps {
  id?: string
  /** Section heading — renders a real <h2> and names the landmark. */
  title?: string
  /** Supporting line under the heading. */
  lead?: string
  className?: string
  children: ReactNode
}

/** One vertical band of the bento page: optional heading, then its tiles.
 *  Reveals itself on scroll, matching the design's `.reveal` sections. */
export function SectionBand({
  id,
  title,
  lead,
  className = '',
  children,
}: SectionBandProps) {
  const headingId = useId()

  return (
    <Reveal
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`py-7 sm:py-10 ${id ? 'scroll-anchor' : ''} ${className}`}
    >
      {title && (
        <div className="mb-6">
          <h2
            id={headingId}
            className="text-3xl font-extrabold text-balance sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {lead && <p className="mt-2 text-muted">{lead}</p>}
        </div>
      )}
      {children}
    </Reveal>
  )
}
