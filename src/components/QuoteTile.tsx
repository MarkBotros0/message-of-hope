import { Tile } from './Tile'

interface QuoteTileProps {
  /** Names the tile — "الرؤية", "من الكتاب المقدس". */
  label: string
  text: string
  /** Attribution line, e.g. a scripture reference. */
  source?: string
  /** Long prose (a vision paragraph) sets its own, smaller type scale. */
  size?: 'display' | 'prose'
}

/** The brand-green tile with a leaf glow — used for the vision, the programme
 *  goal and the scripture verse. Brand rather than ink: ink is the footer's
 *  near-black, and a slab of it in the middle of a page reads as a hole rather
 *  than as part of the palette. */
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
    <Tile tone="brand" className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.35),transparent_70%)]"
      />
      {/* The label names the tile — on a vision paragraph it is the only
          heading the block has, so it carries the display face at heading
          size rather than sitting there as a small eyebrow. White, not leaf:
          leaf on brand green is under 3:1. */}
      <p className="relative font-display text-xl font-extrabold text-white sm:text-2xl">
        {label}
      </p>
      {/* The accent survives as the rule the section headings carry. */}
      <span className="relative mt-4 mb-6 block h-1.5 w-14 rounded-full bg-leaf" />
      <blockquote className={`relative ${type}`}>{text}</blockquote>
      {source && (
        <p className="relative mt-5 text-sm font-bold text-white/90">{source}</p>
      )}
    </Tile>
  )
}
