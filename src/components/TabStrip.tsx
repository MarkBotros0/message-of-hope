import { useRef, type KeyboardEvent } from 'react'
import { panelId, tabId } from './tabIds'

interface TabStripProps {
  labels: string[]
  active: number
  onChange: (index: number) => void
  /** Namespace for the tab/panel id pair. */
  idPrefix: string
}

/** Accessible tab strip: ARIA tabs pattern with roving tabindex and RTL-aware
 *  arrow-key navigation (in RTL, ArrowLeft advances and ArrowRight goes back). */
export function TabStrip({ labels, active, onChange, idPrefix }: TabStripProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function focusTab(index: number) {
    const next = (index + labels.length) % labels.length
    onChange(next)
    refs.current[next]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        focusTab(active + 1)
        break
      case 'ArrowRight':
        event.preventDefault()
        focusTab(active - 1)
        break
      case 'Home':
        event.preventDefault()
        focusTab(0)
        break
      case 'End':
        event.preventDefault()
        focusTab(labels.length - 1)
        break
    }
  }

  return (
    <div
      role="tablist"
      onKeyDown={onKeyDown}
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {labels.map((label, i) => {
        const selected = i === active
        return (
          <button
            key={label}
            ref={(el) => {
              refs.current[i] = el
            }}
            id={tabId(idPrefix, i)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(idPrefix, i)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(i)}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              selected
                ? 'bg-brand text-white'
                : 'border border-line bg-white text-body hover:border-brand hover:text-brand'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
