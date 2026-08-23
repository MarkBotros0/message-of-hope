import { Tile } from './Tile'

interface ProseCardProps {
  /** Names the block — "نبذة عن البرنامج", "رؤيتنا", "هدف البرنامج".
   *  Optional: a section may open on a paragraph the document gives no
   *  heading for. */
  label?: string
  /** One paragraph, or several. */
  text: string | string[]
}

/** A section's prose block: an opening note, a vision, a programme goal. Its
 *  heading sits inside the card with the text, not on the band above it, so a
 *  page reads as a stack of self-contained cards. Tint, the same surface the
 *  أهداف and الخدمات tiles use — these are the same kind of thing, statements
 *  the page makes in its own voice. */
export function ProseCard({ label, text }: ProseCardProps) {
  const paragraphs = Array.isArray(text) ? text : [text]

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
    </Tile>
  )
}
