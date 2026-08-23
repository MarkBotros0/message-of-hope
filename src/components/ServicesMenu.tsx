import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** The desktop الخدمات dropdown.
 *
 *  Built as a disclosure (button + panel of plain links), not the ARIA menu
 *  pattern: these are navigation links, and menu semantics would promise
 *  arrow-key command behaviour the panel does not implement.
 *
 *  The panel lists the three services and stops there — الرحمة's two
 *  sub-ministries are reachable from the tabs on that page, and listing them
 *  here left one column hanging far below the other two. */
export function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = `services${useId()}`
  const { pathname } = useLocation()

  // Navigating away closes the panel.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    // pointerdown, not click: closing on press feels immediate and still fires
    // before the link under the pointer navigates.
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative"
      // Tabbing out of the panel closes it, so keyboard users are never left
      // with an open menu behind the content they moved to.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          active || open
            ? 'bg-brand font-bold text-white'
            : 'font-medium text-body hover:bg-sage-tint hover:text-ink'
        }`}
      >
        الخدمات
        <ChevronDown
          size={17}
          aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          id={panelId}
          // Anchored at the inline-end edge so the panel opens back across the
          // header rather than off the side of the viewport.
          className="absolute top-full end-0 z-50 mt-3 w-[min(42rem,calc(100vw-3rem))] rounded-3xl border border-line bg-white p-2 shadow-menu [animation:fadeIn_0.18s_ease]"
        >
          {/* The three services side by side, each a miniature of the card it
              has on the home page: photo, then name, then blurb. */}
          <ul className="grid grid-cols-3 gap-1.5">
            {serviceNav.map((service) => (
              <li key={service.path} className="flex">
                <Link
                  to={service.path}
                  // The blurb is a description, not part of the link's name —
                  // otherwise both spans run together into one long label.
                  aria-label={`خدمة ${service.label}`}
                  aria-describedby={
                    service.blurb ? `${panelId}${service.path}` : undefined
                  }
                  className="group flex flex-1 flex-col gap-2.5 rounded-2xl border border-transparent p-3 transition hover:border-line hover:bg-sage-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {/* The same photo the service leads with on the home page, so
                      the menu entry and the card read as the same thing. */}
                  <span
                    aria-hidden="true"
                    className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-sage-tint"
                  >
                    <img
                      src={service.photo?.src ?? '/placeholder-photo.svg'}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </span>

                  <span className="min-w-0">
                    {/* The arrow is the one moving part: the gap opens on hover. */}
                    <span className="flex items-center gap-1.5 font-display leading-snug font-bold text-ink transition-all duration-300 group-hover:gap-2.5">
                      خدمة {service.label}
                      <ArrowLeft
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-brand"
                      />
                    </span>
                    {service.blurb && (
                      <span
                        id={`${panelId}${service.path}`}
                        className="mt-1 block text-sm leading-relaxed text-muted"
                      >
                        {service.blurb}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
