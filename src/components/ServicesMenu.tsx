import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** The desktop الخدمات dropdown.
 *
 *  Built as a disclosure (button + panel of plain links), not the ARIA menu
 *  pattern: these are navigation links, and menu semantics would promise
 *  arrow-key command behaviour the panel does not implement. Every service and
 *  every sub-service is visible at once, so the shape of the ministry is
 *  readable without opening three separate pages. */
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
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          active || open
            ? 'bg-brand font-bold text-white'
            : 'font-medium text-body hover:bg-sage-tint hover:text-ink'
        }`}
      >
        الخدمات
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          id={panelId}
          // Anchored at the inline-end edge so the panel opens back across the
          // header rather than off the side of the viewport.
          className="absolute top-full end-0 z-50 mt-3 w-[min(42rem,calc(100vw-3rem))] rounded-3xl border border-line bg-page/95 p-4 shadow-[0_28px_60px_-34px_rgba(0,120,72,0.55)] backdrop-blur-lg"
        >
          <ul className="grid grid-cols-3 gap-3">
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link
                  to={service.path}
                  // The blurb is a description, not part of the link's name —
                  // otherwise both spans run together into one long label.
                  aria-label={service.label}
                  aria-describedby={
                    service.blurb ? `${panelId}${service.path}` : undefined
                  }
                  className="block rounded-2xl p-4 transition hover:bg-sage-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="block font-display text-base font-bold text-ink">
                    {service.label}
                  </span>
                  {service.blurb && (
                    <span
                      id={`${panelId}${service.path}`}
                      className="mt-1.5 block text-[13px] leading-relaxed text-muted"
                    >
                      {service.blurb}
                    </span>
                  )}
                </Link>

                {service.children && (
                  <ul className="mt-1 ms-4 border-s-2 border-leaf/60 ps-2">
                    {service.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className="block rounded-lg px-2 py-2 text-[13px] font-semibold text-body transition hover:bg-sage-tint hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
