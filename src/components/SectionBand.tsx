import { useId, type ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionBandProps {
  id?: string
  /** Section heading — renders a real <h2> and names the landmark. */
  title?: string
  /** Supporting line under the heading. */
  lead?: string
  /** أمل جديد's band header: the heading centred at a smaller size with a
   *  leaf rule beneath it. For the short headings that stand as a banner over
   *  a grid. Bands default to the start edge at display size, which is what
   *  the long headings lifted from the client's document need — a rule under
   *  a full sentence reads as an underline rather than an accent. */
  banner?: boolean
  className?: string
  children: ReactNode
}

/** One vertical band of the bento page: optional heading, then its tiles.
 *  Reveals itself on scroll, matching the design's `.reveal` sections. */
export function SectionBand({
  id,
  title,
  lead,
  banner = false,
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
        <div className={`mb-6 ${banner ? 'text-center' : ''}`}>
          <h2
            id={headingId}
            className={
              banner
                ? 'text-2xl font-bold text-balance sm:text-3xl'
                : 'text-3xl font-bold text-balance sm:text-4xl lg:text-5xl'
            }
          >
            {title}
          </h2>
          {banner && (
            <span className="mx-auto mt-4 block h-1.5 w-14 rounded-full bg-leaf" />
          )}
          {lead && (
            <p className={`mt-2 text-muted ${banner ? 'mx-auto' : ''}`}>{lead}</p>
          )}
        </div>
      )}
      {children}
    </Reveal>
  )
}
