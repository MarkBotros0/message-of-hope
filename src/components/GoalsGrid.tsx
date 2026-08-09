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

/** Numbered goal tiles, alternating tint and ink like the design's paired
 *  cards. Each goal may carry extra clarifying notes from the document. */
export function GoalsGrid({ items }: { items: NamedItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => {
        const dark = i % 2 === 1
        return (
          <Tile
            key={item.title}
            tone={dark ? 'ink' : 'tint'}
            className="p-7 sm:p-8"
          >
            <span
              className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-bold ${
                dark ? 'bg-leaf text-ink' : 'bg-brand text-white'
              }`}
            >
              {ordinal(i + 1)}
            </span>
            <h3
              className={`text-xl font-bold sm:text-2xl ${dark ? 'text-white' : ''}`}
            >
              {item.title}
            </h3>
            <p
              className={`mt-3 leading-loose ${dark ? 'text-on-ink' : 'text-body'}`}
            >
              {item.body}
            </p>

            {item.notes && (
              <ul
                className={`mt-5 space-y-3 border-t pt-5 text-[0.95rem] leading-loose ${
                  dark ? 'border-white/15 text-on-ink' : 'border-brand/15 text-body'
                }`}
              >
                {item.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${
                        dark ? 'bg-leaf' : 'bg-brand'
                      }`}
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            )}
          </Tile>
        )
      })}
    </div>
  )
}
