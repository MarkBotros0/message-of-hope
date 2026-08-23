import { Tile } from './Tile'
import { toArabicNumeral } from './numerals'
import type { AudienceItem } from '../data/ministries'

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

/** The document writes its shares as "٤٠٪". Read the number back out so the
 *  ring can be drawn from it; the string itself is what gets displayed. */
function parseShare(share: string | undefined): number | null {
  if (!share) return null
  const ascii = [...share]
    .map((ch) => {
      const i = ARABIC_DIGITS.indexOf(ch)
      return i === -1 ? ch : String(i)
    })
    .join('')
  const n = Number.parseFloat(ascii.replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : null
}

/** Four distinct fields from the palette. The ring is the one place on the site
 *  where colour carries meaning, so the segments run dark green → mid → leaf →
 *  sun rather than four shades of one hue. */
const SEGMENT_COLOURS = [
  'var(--color-brand)',
  'var(--color-brand-mid)',
  'var(--color-leaf)',
  'var(--color-sun)',
]

/** Numerals sit on brand, brand-mid and sun as white, but leaf is a light green
 *  that needs the dark ink instead. Index-matched to the colours above. */
const NUMERAL_COLOURS = ['#fff', '#fff', 'var(--color-ink)', '#fff']

/** Where each group sits once there are four of them and the room to place
 *  them: the four corners around the ring, read from the start edge. The
 *  middle column belongs to the ring. */
const CORNERS = [
  'md:col-start-1 md:row-start-1',
  'md:col-start-3 md:row-start-1',
  'md:col-start-1 md:row-start-2',
  'md:col-start-3 md:row-start-2',
]

// Ring geometry, in the SVG's own 180×180 units.
const CENTRE = 90
const RADIUS = 56
const STROKE = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
/** The marker orbit: clear of the ring's outer edge, inside the viewBox. */
const MARKER_ORBIT = 78
const MARKER_R = 11

/** Target groups. Where every group carries a share and they add up to a whole,
 *  they are drawn as one ring split between them.
 *
 *  Each slice is marked with its number rather than trailed by a leader line:
 *  with four slices spread round the ring and the labels stacked down one side,
 *  three of every four leaders have to cross the ring to reach their label. A
 *  numeral on the slice and the same numeral on the row say the same thing and
 *  cross nothing — and unlike colour, they still say it in greyscale.
 *
 *  The رئيسي/فرعي priority the document also records is carried in the data but
 *  not drawn — the share already says which groups the work centres on. */
export function AudienceTile({ items }: { items: AudienceItem[] }) {
  const shares = items.map((item) => parseShare(item.share))
  const total = shares.reduce<number>((sum, n) => sum + (n ?? 0), 0)
  const chartable =
    items.length > 1 &&
    items.length <= SEGMENT_COLOURS.length &&
    shares.every((n) => n !== null && n > 0) &&
    Math.abs(total - 100) < 1

  // No shares to divide, or too many groups to tell apart by colour: the
  // groups are numbered cards, the way the أهداف tiles above them are.
  if (!chartable) {
    return (
      <ol className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.value} className="flex">
            <Tile tone="tint" className="flex flex-1 items-center gap-5 p-7">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand font-display font-bold text-white"
              >
                {toArabicNumeral(i + 1)}
              </span>
              {item.share && (
                <span className="font-display text-3xl leading-none font-extrabold text-brand sm:text-4xl">
                  {item.share}
                </span>
              )}
              <p className="min-w-0 leading-loose text-body">{item.value}</p>
            </Tile>
          </li>
        ))}
      </ol>
    )
  }

  // Each slice starts where the last one ended; the ring opens at twelve
  // o'clock, so every angle is measured from there.
  let offset = 0
  const segments = (shares as number[]).map((share, i) => {
    const length = (share / 100) * CIRCUMFERENCE
    const mid =
      ((offset + length / 2) / CIRCUMFERENCE) * 2 * Math.PI - Math.PI / 2
    const segment = {
      length,
      offset,
      colour: SEGMENT_COLOURS[i],
      numeralColour: NUMERAL_COLOURS[i],
      cos: Math.cos(mid),
      sin: Math.sin(mid),
    }
    offset += length
    return segment
  })

  return (
    <Tile tone="tint" className="p-7 sm:p-9">
      {/* Four groups at the four corners with the ring in the middle of them.
          The grid keeps the middle column empty and the ring is centred over
          it, so the two never fight for the same space. Below `md` there is no
          room for corners: the ring goes on top and the groups stack. */}
      <div className="relative flex flex-col items-center gap-8 md:block md:min-h-[21rem]">
        <ol className="grid w-full gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-[1fr_19rem_1fr] md:items-center md:gap-y-12">
          {items.map((item, i) => (
            <li
              key={item.value}
              className={`flex gap-4 ${CORNERS[i] ?? ''}`}
            >
              {/* The same marker the slice wears. */}
              <span
                aria-hidden="true"
                className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold"
                style={{
                  backgroundColor: segments[i].colour,
                  color: segments[i].numeralColour,
                }}
              >
                {toArabicNumeral(i + 1)}
              </span>
              <div className="min-w-0">
                {/* Ink, not the slice colour — leaf and sun both fall under
                    4.5:1 on the tint surface. The marker carries the colour. */}
                <span className="font-display text-xl font-extrabold text-ink">
                  {item.share}
                </span>
                <p className="leading-loose text-body">{item.value}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Decorative: the list carries every number the ring shows, so there
            is nothing here for a screen reader to miss. */}
        <svg
          viewBox="0 0 180 180"
          aria-hidden="true"
          className="order-first h-56 w-56 shrink-0 sm:h-64 sm:w-64 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-72 md:w-72"
        >
          {/* White track, so a ring that did not quite total 100 would show it
              rather than closing over the gap. */}
          <circle
            cx={CENTRE}
            cy={CENTRE}
            r={RADIUS}
            fill="none"
            stroke="#fff"
            strokeWidth={STROKE + 1}
          />
          {segments.map((segment, i) => (
            <circle
              key={items[i].value}
              cx={CENTRE}
              cy={CENTRE}
              r={RADIUS}
              fill="none"
              stroke={segment.colour}
              strokeWidth={STROKE}
              strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
              strokeDashoffset={-segment.offset}
              transform={`rotate(-90 ${CENTRE} ${CENTRE})`}
            />
          ))}

          {segments.map((segment, i) => {
            const x = CENTRE + MARKER_ORBIT * segment.cos
            const y = CENTRE + MARKER_ORBIT * segment.sin
            return (
              <g key={`marker-${items[i].value}`}>
                {/* A stub joining the marker to its own slice, so a marker
                    sitting between two thin slices is never ambiguous. */}
                <line
                  x1={CENTRE + (RADIUS + STROKE / 2) * segment.cos}
                  y1={CENTRE + (RADIUS + STROKE / 2) * segment.sin}
                  x2={CENTRE + (MARKER_ORBIT - MARKER_R) * segment.cos}
                  y2={CENTRE + (MARKER_ORBIT - MARKER_R) * segment.sin}
                  stroke={segment.colour}
                  strokeWidth="2"
                />
                <circle cx={x} cy={y} r={MARKER_R} fill={segment.colour} />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={segment.numeralColour}
                  className="font-display text-[11px] font-extrabold"
                >
                  {toArabicNumeral(i + 1)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Tile>
  )
}
