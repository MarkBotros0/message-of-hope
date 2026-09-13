import { Tile } from './Tile'
import { toArabicNumeral } from './numerals'
import type { AudienceItem } from '../data/ministries'

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

/** The document writes its shares as "٤٠٪". Read the number back out so the
 *  pie can be drawn from it; the string itself is what gets displayed. */
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

/** Four fields from the palette, ordered so that no two neighbouring slices
 *  are near-relatives. brand and brand-mid were the obvious pair to reach for
 *  and the wrong one — both are the same teal green a shade apart, and at a
 *  glance the two largest slices read as one. The greens are split by the sun
 *  instead, and the two that remain differ in hue (teal vs olive) as well as
 *  in weight. */
const SLICE_COLOURS = [
  'var(--color-brand)',
  'var(--color-leaf-dark)',
  'var(--color-sun)',
  'var(--color-leaf)',
]

/** The two dark fields carry white; the two light ones carry ink. Index-matched
 *  to the colours above, and each pairing clears 3:1 — the figures are set at
 *  15 units, which is over 18.66px bold at every size the pie is drawn. */
const LABEL_COLOURS = [
  '#fff',
  '#fff',
  'var(--color-ink)',
  'var(--color-ink)',
]

// Pie geometry, in the SVG's own 180×180 units.
const CENTRE = 90
const RADIUS = 62
/** Where a share is written when it fits inside its own slice. */
const INSIDE_ORBIT = RADIUS * 0.64
/** …and where it goes when it does not. */
const OUTSIDE_ORBIT = RADIUS + 14
/** Below this, a slice is too narrow to hold its own figure. */
const INSIDE_MIN_SHARE = 8

function point(angle: number, radius: number): [number, number] {
  return [CENTRE + radius * Math.cos(angle), CENTRE + radius * Math.sin(angle)]
}

/** Target groups. Where every group carries a share and they add up to a whole,
 *  they are drawn as one pie, with the groups listed beside it.
 *
 *  Every slice is labelled with its own share, so the figures are read off the
 *  pie rather than repeated beside each group's name.
 *
 *  The رئيسي/فرعي priority the document also records is carried in the data but
 *  not drawn — the share already says which groups the work centres on. */
export function AudienceTile({ items }: { items: AudienceItem[] }) {
  const shares = items.map((item) => parseShare(item.share))
  const total = shares.reduce<number>((sum, n) => sum + (n ?? 0), 0)
  const chartable =
    items.length > 1 &&
    items.length <= SLICE_COLOURS.length &&
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
                <span className="font-display text-3xl leading-none font-bold text-brand sm:text-4xl">
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

  // Each slice starts where the last one ended; the pie opens at twelve
  // o'clock, so every angle is measured from there.
  let offset = 0
  const slices = (shares as number[]).map((share, i) => {
    const from = (offset / 100) * 2 * Math.PI - Math.PI / 2
    offset += share
    const to = (offset / 100) * 2 * Math.PI - Math.PI / 2
    const mid = (from + to) / 2
    const inside = share >= INSIDE_MIN_SHARE
    const [sx, sy] = point(from, RADIUS)
    const [ex, ey] = point(to, RADIUS)
    const [lx, ly] = point(mid, inside ? INSIDE_ORBIT : OUTSIDE_ORBIT)
    return {
      d: `M ${CENTRE} ${CENTRE} L ${sx} ${sy} A ${RADIUS} ${RADIUS} 0 ${
        share > 50 ? 1 : 0
      } 1 ${ex} ${ey} Z`,
      colour: SLICE_COLOURS[i],
      inside,
      // A figure sitting outside its slice needs a tick back to it.
      tick: inside ? null : [...point(mid, RADIUS), ...point(mid, OUTSIDE_ORBIT - 7)],
      labelColour: inside ? LABEL_COLOURS[i] : 'var(--color-ink)',
      lx,
      ly,
    }
  })

  return (
    // Capped like the prose cards above it: at full width the pie and the list
    // sit at opposite edges with a hole between them.
    <Tile tone="tint" className="mx-auto max-w-4xl p-7 sm:p-8">
      {/* Groups on the start side, pie on the end side. Below `md` there is no
          room for two columns: the pie goes on top and the groups stack. */}
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
        <ol className="w-full flex-1 space-y-5">
          {items.map((item, i) => (
            <li key={item.value} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-3.5 h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: slices[i].colour }}
              />
              <p className="min-w-0 leading-loose text-body">
                {/* The share is drawn on the slice, so the row does not repeat
                    it — but the pie is hidden from assistive tech, so the
                    figure has to reach a screen reader from here. */}
                <span className="sr-only">{item.share} — </span>
                {item.value}
              </p>
            </li>
          ))}
        </ol>

        {/* Decorative: the list carries every figure the pie shows, so there
            is nothing here for a screen reader to miss. */}
        <svg
          viewBox="0 0 180 180"
          aria-hidden="true"
          className="order-first h-56 w-56 shrink-0 sm:h-64 sm:w-64 md:order-last"
        >
          {slices.map((slice, i) => (
            <path
              key={items[i].value}
              d={slice.d}
              fill={slice.colour}
              // A hairline in the card's own colour, so neighbouring greens
              // read as two slices rather than one shape.
              stroke="var(--color-sage-tint)"
              strokeWidth="1.5"
            />
          ))}

          {slices.map((slice, i) => (
            <g key={`label-${items[i].value}`}>
              {slice.tick && (
                <line
                  x1={slice.tick[0]}
                  y1={slice.tick[1]}
                  x2={slice.tick[2]}
                  y2={slice.tick[3]}
                  stroke={slice.colour}
                  strokeWidth="1.5"
                />
              )}
              <text
                x={slice.lx}
                y={slice.ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={slice.labelColour}
                className="font-display text-[15px] font-bold"
              >
                {items[i].share}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Tile>
  )
}
