import { Tile } from './Tile'
import type { AudienceItem } from '../data/ministries'

/** Target groups, each with the share of the programme's focus the document
 *  gives it. The رئيسي/فرعي priority the document also records is carried in
 *  the data but not drawn — the share already says which groups the work
 *  centres on, and a badge repeating it on three cards out of four said
 *  nothing the number had not. */
export function AudienceTile({ items }: { items: AudienceItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Tile key={item.value} tone="tint" className="flex items-center gap-5 p-7">
          {item.share && (
            <span className="font-display text-3xl leading-none font-extrabold text-brand sm:text-4xl">
              {item.share}
            </span>
          )}
          <p className="min-w-0 leading-loose text-body">{item.value}</p>
        </Tile>
      ))}
    </div>
  )
}
