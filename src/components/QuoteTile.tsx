import { Tile } from './Tile'

interface QuoteTileProps {
  /** Names the block — "رؤيتنا", "هدف البرنامج", "من الكتاب المقدس". */
  label: string
  text: string
  /** Attribution line, e.g. a scripture reference. */
  source?: string
  /** `card` for a vision or programme-goal paragraph — the same tint surface
   *  the أهداف tiles below it use, since it is the same kind of thing: a
   *  statement the page makes in its own voice. `quote` for a short scripture
   *  verse, which is a pull-quote and takes the brand slab. */
  variant?: 'card' | 'quote'
}

/** The vision / programme-goal card, and the scripture pull-quote. */
export function QuoteTile({
  label,
  text,
  source,
  variant = 'quote',
}: QuoteTileProps) {
  if (variant === 'card') {
    return (
      <Tile tone="tint" className="p-7 sm:p-9">
        {/* Heading and rule centre with the band headings above them; the
            paragraph stays start-aligned, since centring several lines of
            prose leaves both edges ragged. */}
        <h3 className="text-center font-display text-xl font-extrabold sm:text-2xl">
          {label}
        </h3>
        <span className="mx-auto mt-4 block h-1.5 w-14 rounded-full bg-leaf" />
        <p className="mt-6 leading-loose text-body">{text}</p>
        {source && <p className="mt-5 text-sm font-bold text-brand">{source}</p>}
      </Tile>
    )
  }

  return (
    <Tile tone="brand" className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.35),transparent_70%)]"
      />
      {/* White, not leaf: leaf on brand green is under 3:1. */}
      <p className="relative font-display text-xl font-extrabold text-white sm:text-2xl">
        {label}
      </p>
      {/* The accent survives as the rule the section headings carry. */}
      <span className="relative mt-4 mb-6 block h-1.5 w-14 rounded-full bg-leaf" />
      <blockquote className="relative max-w-[52ch] font-display text-2xl leading-snug font-bold text-balance text-white sm:text-3xl lg:text-[2.6rem]">
        {text}
      </blockquote>
      {source && (
        <p className="relative mt-5 text-sm font-bold text-white/90">{source}</p>
      )}
    </Tile>
  )
}
