import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Sun, X } from 'lucide-react'
import { ministries } from '../data/ministries'

/** Top bar: brand (logo + org name) and the ministry nav tabs.
 *  On phones the tabs collapse into a hamburger dropdown. */
export function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-page/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {logoOk ? (
            <img
              src="/logo.png"
              alt="رسالة أمل"
              className="h-11 w-11 rounded-2xl object-contain"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand">
              <Sun className="text-sun" size={22} strokeWidth={2.2} />
            </span>
          )}
          <span className="text-lg font-extrabold text-ink">رسالة أمل</span>
        </div>

        {/* Desktop / tablet nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {ministries.map((m) => (
            <NavLink
              key={m.slug}
              to={`/${m.slug}`}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-body hover:bg-sage-tint hover:text-ink'
                }`
              }
            >
              {m.navLabel}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition hover:bg-sage-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-line px-4 pb-3 pt-2 sm:px-6 md:hidden"
        >
          {ministries.map((m) => (
            <NavLink
              key={m.slug}
              to={`/${m.slug}`}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-body hover:bg-sage-tint hover:text-ink'
                }`
              }
            >
              {m.navLabel}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
