import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Sun } from 'lucide-react'
import { ministries } from '../data/ministries'

/** Top bar: brand (logo + org name) and the ministry nav tabs. */
export function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true)

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-page/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
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
          <span className="text-lg font-extrabold text-ink">منظمة رسالة أمل</span>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
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
      </div>
    </header>
  )
}
