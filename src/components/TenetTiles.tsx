import { Tile } from './Tile'
import { toArabicNumeral } from './numerals'
import type { Tenet } from '../data/ministries'

interface TenetTilesProps {
  items: Tenet[]
  /** Tiles per row on a wide screen. Three columns hold each tile to a
   *  comfortable line length for the longer statements, so they only split
   *  from `md`; two columns are roomy enough to split at `sm`. */
  columns?: 2 | 3
  /** Show the English name under the Arabic one. Both callers pass false —
   *  the Arabic stands alone — but `titleEn` is carried in the data, so this
   *  stays a switch rather than a deletion. */
  englishTitles?: boolean
}

/** A numbered set of named statements — the goals the work rests on, the
 *  values it is held to. An ordered list, because the client numbers them.
 *  Every third tile carries the tint, so a long row has a rhythm without any
 *  one statement reading as the important one. */
export function TenetTiles({
  items,
  columns = 2,
  englishTitles = false,
}: TenetTilesProps) {
  const grid = columns === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'

  // A last row left holding one tile sits against the start edge with an empty
  // cell beside it. Let that tile span the row and take a single column's width
  // back (the row minus its gaps, divided by the column count), so it centres
  // under the pairs above instead of hanging off one side.
  const lastIsAlone = items.length % columns === 1
  const centreOrphan =
    columns === 3
      ? 'md:col-span-3 md:w-[calc((100%-2rem)/3)] md:justify-self-center'
      : 'sm:col-span-2 sm:w-[calc((100%-1rem)/2)] sm:justify-self-center'

  return (
    <ol className={`grid gap-4 ${grid}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`flex ${
            lastIsAlone && i === items.length - 1 ? centreOrphan : ''
          }`}
        >
          <Tile
            tone={i % 3 === 1 ? 'tint' : 'white'}
            className="flex flex-1 flex-col p-7"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf font-display text-base font-extrabold text-ink"
              >
                {toArabicNumeral(i + 1)}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-snug font-extrabold">
                  {item.title}
                </h3>
                {englishTitles && (
                  <p className="mt-0.5 text-sm font-semibold text-muted">
                    <bdi>{item.titleEn}</bdi>
                  </p>
                )}
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-loose">{item.body}</p>
          </Tile>
        </li>
      ))}
    </ol>
  )
}
