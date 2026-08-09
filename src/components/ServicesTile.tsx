import { Check } from 'lucide-react'
import { Tile } from './Tile'

/** Checklist of services or interventions, laid out two-up inside one tile. */
export function ServicesTile({ items }: { items: string[] }) {
  return (
    <Tile className="p-7 sm:p-9">
      <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-tint text-brand">
              <Check size={15} strokeWidth={2.6} />
            </span>
            <span className="leading-loose">{item}</span>
          </li>
        ))}
      </ul>
    </Tile>
  )
}
