import { Tile } from './Tile'
import type { AudienceItem } from '../data/ministries'

/** Target groups. Where the document gives a percentage share and a
 *  رئيسي/فرعي priority, both are surfaced next to the group. */
export function AudienceTile({ items }: { items: AudienceItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Tile key={item.value} tone="tint" className="flex gap-5 p-7">
          {item.share && (
            <span className="font-display text-3xl font-extrabold leading-none text-brand sm:text-4xl">
              {item.share}
            </span>
          )}
          <div className="min-w-0">
            <p className="leading-loose text-body">{item.value}</p>
            {item.priority && (
              <span className="mt-3 inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                {item.priority}
              </span>
            )}
          </div>
        </Tile>
      ))}
    </div>
  )
}
