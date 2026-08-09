import { Tile } from './Tile'

interface QuoteTileProps {
  /** Small leaf-green eyebrow above the quote (e.g. "الرؤية"). */
  label: string
  text: string
  /** Attribution line, e.g. a scripture reference. */
  source?: string
  /** Long prose (a vision paragraph) sets its own, smaller type scale. */
  size?: 'display' | 'prose'
}

/** The dark ink tile with a leaf glow — used for the vision, the programme
 *  goal and the scripture verse. */
export function QuoteTile({
  label,
  text,
  source,
  size = 'display',
}: QuoteTileProps) {
  // A short verse reads best as a narrow, punchy column; a full vision
  // paragraph should use the width of the tile rather than leave it empty.
  const type =
    size === 'display'
      ? 'max-w-[52ch] font-display text-2xl font-bold leading-snug text-white text-balance sm:text-3xl lg:text-[2.6rem]'
      : 'max-w-none text-lg leading-loose text-white/90'

  return (
    <Tile tone="ink" className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.3),transparent_70%)]"
      />
      <p className="relative mb-5 text-sm font-bold text-leaf">{label}</p>
      <blockquote className={`relative ${type}`}>{text}</blockquote>
      {source && (
        <p className="relative mt-5 text-sm font-bold text-leaf">{source}</p>
      )}
    </Tile>
  )
}
