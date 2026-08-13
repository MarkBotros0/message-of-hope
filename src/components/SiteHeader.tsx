import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Sun, X } from 'lucide-react'
import { ministries, serviceNav } from '../data/ministries'
import { ServicesMenu } from './ServicesMenu'

/** Top-level pages. The services live behind their own dropdown, so they are
 *  deliberately absent here. */
const pages = [
  { path: '/', label: 'الرئيسية' },
  { path: '/about', label: 'من نحن' },
]

const navLink = 'rounded-full px-4 py-2 text-sm transition'

/** Floating pill header: brand mark on one side, the top-level pages plus the
 *  الخدمات dropdown on the other. On phones everything collapses into a panel
 *  where الخدمات becomes an accordion. */
export function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Is the reader inside one of the service pages? Both the desktop trigger and
  // the mobile accordion use this, so the current section stays visible.
  const inService = ministries.some(
    (m) => pathname === `/${m.slug}` || pathname.startsWith(`/${m.slug}/`),
  )
  const [servicesOpen, setServicesOpen] = useState(inService)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Reopen the accordion when the reader lands inside a service page.
  useEffect(() => {
    if (inService) setServicesOpen(true)
  }, [inService])

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
        <Link
          to="/"
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
        </Link>

        {/* Desktop / tablet nav */}
        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 md:flex">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end
              className={({ isActive }) =>
                `${navLink} ${
                  isActive
                    ? 'bg-brand font-bold text-white'
                    : 'font-medium text-body hover:bg-sage-tint hover:text-ink'
                }`
              }
            >
              {page.label}
            </NavLink>
          ))}
          <ServicesMenu active={inService} />
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
          aria-label="التنقل الرئيسي"
          className="mx-auto mt-2 flex max-h-[70svh] max-w-6xl flex-col gap-1 overflow-y-auto rounded-3xl border border-line bg-page/95 p-2 shadow-[0_18px_40px_-28px_rgba(0,120,72,0.5)] backdrop-blur-lg md:hidden"
        >
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-body hover:bg-sage-tint hover:text-ink'
                }`
              }
            >
              {page.label}
            </NavLink>
          ))}

          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="mobile-services"
            onClick={() => setServicesOpen((v) => !v)}
            className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
              inService ? 'bg-brand text-white' : 'text-body hover:bg-sage-tint hover:text-ink'
            }`}
          >
            الخدمات
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {servicesOpen && (
            <ul id="mobile-services" className="ms-3 grid gap-0.5 border-s-2 border-leaf/60 ps-2">
              {serviceNav.map((service) => (
                <li key={service.path}>
                  <NavLink
                    to={service.path}
                    end
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                        isActive
                          ? 'bg-sage-tint text-brand'
                          : 'text-body hover:bg-sage-tint hover:text-ink'
                      }`
                    }
                  >
                    {service.label}
                  </NavLink>

                  {service.children && (
                    <ul className="ms-3 border-s border-line ps-2">
                      {service.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block rounded-xl px-4 py-2.5 text-[13px] font-semibold transition ${
                                isActive
                                  ? 'bg-sage-tint text-brand'
                                  : 'text-muted hover:bg-sage-tint hover:text-ink'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>
      )}
    </header>
  )
}
