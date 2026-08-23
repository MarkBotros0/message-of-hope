import { Tile } from './Tile'

interface QuoteTileProps {
  /** Names the block — "نبذة عن البرنامج", "رؤيتنا", "من الكتاب المقدس".
   *  Optional: a section may open on a paragraph the document gives no
   *  heading for. */
  label?: string
  /** One paragraph, or several. */
  text: string | string[]
  /** Attribution line, e.g. a scripture reference. */
  source?: string
  /** `card` for the prose blocks a section is built from — an opening note, a
   *  vision, a programme goal. They take the same tint surface the أهداف tiles
   *  below them use, since they are the same kind of thing: statements the page
   *  makes in its own voice. `quote` for a short scripture verse, which is a
   *  pull-quote and takes the brand slab. */
  variant?: 'card' | 'quote'
}

/** A section's prose block: its heading sits inside the card with the text,
 *  not on the band above it, so a page is a stack of self-contained cards. */
export function QuoteTile({
  label,
  text,
  source,
  variant = 'quote',
}: QuoteTileProps) {
  const paragraphs = Array.isArray(text) ? text : [text]

  if (variant === 'card') {
    return (
      <Tile tone="tint" className="mx-auto max-w-[82ch] p-6 sm:p-8">
        {label && (
          <>
            {/* Heading and rule centre with the band headings elsewhere on the
                page; the paragraphs stay start-aligned, since centring several
                lines of prose leaves both edges ragged. */}
            <h2 className="text-center font-display text-xl font-extrabold sm:text-2xl">
              {label}
            </h2>
            <span className="mx-auto mt-4 mb-6 block h-1.5 w-14 rounded-full bg-leaf" />
          </>
        )}
        <div className="space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-loose text-body">
              {paragraph}
            </p>
          ))}
        </div>
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
      {label && (
        <>
          {/* White, not leaf: leaf on brand green is under 3:1. */}
          <h2 className="relative font-display text-xl font-extrabold text-white sm:text-2xl">
            {label}
          </h2>
          {/* The accent survives as the rule the section headings carry. */}
          <span className="relative mt-4 mb-6 block h-1.5 w-14 rounded-full bg-leaf" />
        </>
      )}
      <blockquote className="relative max-w-[52ch] font-display text-2xl leading-snug font-bold text-balance text-white sm:text-3xl lg:text-[2.6rem]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
      {source && (
        <p className="relative mt-5 text-sm font-bold text-white/90">{source}</p>
      )}
    </Tile>
  )
}
