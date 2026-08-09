import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Sun, X } from 'lucide-react'
import { ministries } from '../data/ministries'

const navLink = 'rounded-full px-4 py-2 text-sm font-medium transition'

/** Floating pill header: brand mark on one side, the ministry tabs on the
 *  other. On phones the tabs collapse into a dropdown under the pill. */
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
    <header className="sticky top-3 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-line bg-page/80 px-3 py-2 shadow-[0_12px_30px_-22px_rgba(0,120,72,0.4)] backdrop-blur-lg">
        <NavLink
          to={`/${ministries[0].slug}`}
          className="flex shrink-0 items-center gap-2.5 rounded-full pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="رسالة أمل — الصفحة الرئيسية"
        >
          {logoOk ? (
            <img
              src="/logo.png"
              alt=""
              className="h-10 w-10 rounded-xl object-contain"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
              <Sun className="text-sun" size={20} strokeWidth={2.2} />
            </span>
          )}
          <span className="hidden font-display text-base font-bold text-ink sm:inline">
            رسالة أمل
          </span>
        </NavLink>

        {/* Desktop / tablet nav */}
        <nav aria-label="الخدمات" className="hidden items-center gap-1 md:flex">
          {ministries.map((m) => (
            <NavLink
              key={m.slug}
              to={`/${m.slug}`}
              className={({ isActive }) =>
                `${navLink} ${
                  isActive
                    ? 'bg-brand font-bold text-white'
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-sage-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
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
          aria-label="الخدمات"
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-line bg-page/95 p-2 shadow-[0_18px_40px_-28px_rgba(0,120,72,0.5)] backdrop-blur-lg md:hidden"
        >
          {ministries.map((m) => (
            <NavLink
              key={m.slug}
              to={`/${m.slug}`}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
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
