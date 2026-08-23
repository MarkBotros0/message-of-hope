import { Check } from 'lucide-react'
import { topicIcon } from './topicIcons'

/** A ministry's services list as small cards, two to a row: a round icon chip
 *  and the line beside it. Each entry carries an icon for what it actually is;
 *  anything the map does not name falls back to a tick. */
export function ServicesTile({ items }: { items: string[] }) {
  return (
    <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = topicIcon(item) ?? Check
        return (
          <li
            key={item}
            className={`flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-card ${
              // A last row holding one card centres under the pair above.
              items.length % 2 === 1 && i === items.length - 1
                ? 'sm:col-span-2 sm:w-[calc((100%-0.75rem)/2)] sm:justify-self-center'
                : ''
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-tint text-brand">
              <Icon size={18} aria-hidden="true" />
            </span>
            {/* Start-aligned so an entry that wraps keeps one edge. */}
            <span className="text-start text-base leading-relaxed font-semibold text-body">
              {item}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
