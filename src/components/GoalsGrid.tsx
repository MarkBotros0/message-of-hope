import { Tile } from './Tile'
import type { NamedItem } from '../data/ministries'

const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/** 1 → "٠١". The design numbers its tiles with padded Arabic-Indic digits. */
function ordinal(n: number): string {
  return String(n)
    .padStart(2, '0')
    .split('')
    .map((d) => arabicDigits[Number(d)])
    .join('')
}

/** Numbered goal tiles, all on the one tint surface — the goals are a set of
 *  equals, and alternating a dark tile through them read as though every other
 *  goal were the important one. Each may carry extra clarifying notes from the
 *  document. */
export function GoalsGrid({ items }: { items: NamedItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <Tile key={item.title} tone="tint" className="p-7 sm:p-8">
          {/* Numeral and title share a row, so the tile opens on its name
              rather than on a badge with the name underneath. */}
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand font-display text-lg font-bold text-white">
              {ordinal(i + 1)}
            </span>
            <h3 className="text-xl leading-snug font-bold sm:text-2xl">
              {item.title}
            </h3>
          </div>
          <p className="mt-4 leading-loose text-body">{item.body}</p>

          {item.notes && (
            <ul className="mt-5 space-y-3 border-t border-brand/15 pt-5 text-base leading-loose text-body">
              {item.notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}
        </Tile>
      ))}
    </div>
  )
}
