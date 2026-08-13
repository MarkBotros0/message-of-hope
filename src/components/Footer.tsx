import { Link } from 'react-router-dom'
import { serviceNav } from '../data/ministries'
import { Pending } from './Pending'

type IconProps = { size?: number }

function FacebookIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46H17V3.96c-.28-.04-1.2-.12-2.26-.12-2.24 0-3.77 1.37-3.77 3.88V10H8.3v3h2.67v8z" />
    </svg>
  )
}

function YoutubeIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 12s0-3.2-.41-4.73a2.4 2.4 0 0 0-1.69-1.7C19.36 5.16 12 5.16 12 5.16s-7.36 0-8.9.41a2.4 2.4 0 0 0-1.69 1.7C1 8.8 1 12 1 12s0 3.2.41 4.73a2.4 2.4 0 0 0 1.69 1.7c1.54.41 8.9.41 8.9.41s7.36 0 8.9-.41a2.4 2.4 0 0 0 1.69-1.7C23 15.2 23 12 23 12zM9.75 15.02V8.98L15.5 12z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// TODO: replace the "#" placeholders with the real social profile URLs.
const socials = [
  { label: 'فيسبوك', href: '#', Icon: FacebookIcon },
  { label: 'يوتيوب', href: '#', Icon: YoutubeIcon },
  { label: 'إنستجرام', href: '#', Icon: InstagramIcon },
]

function FooterHeading({ children }: { children: string }) {
  return (
    <h4 className="mb-4 font-display text-sm font-bold text-leaf">{children}</h4>
  )
}

const linkClass =
  'rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

/** Arabic-Indic digits, to match the numerals used across the site. */
function arabicYear(year: number): string {
  return String(year).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])
}

export function Footer() {
  const year = arabicYear(new Date().getFullYear())

  return (
    <footer className="mt-8 bg-ink text-page">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <img
            src="/logo.png"
            alt="رسالة أمل"
            className="mb-4 h-11 w-11 rounded-xl object-contain ring-1 ring-white/15"
          />
          <p className="max-w-[28ch] text-[15px] text-on-ink">
            مساحةٌ للنمو الروحيّ والخدمة والمحبة.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Mirrors the header so the footer is a complete second route to
            everything, sub-ministries included. */}
        <nav aria-label="روابط الموقع">
          <FooterHeading>الموقع</FooterHeading>
          <ul className="grid gap-2.5 text-[15px] text-on-ink">
            <li>
              <Link to="/" className={linkClass}>
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                من نحن
              </Link>
            </li>
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link to={service.path} className={linkClass}>
                  {service.label}
                </Link>
                {service.children && (
                  <ul className="mt-2 ms-2 grid gap-2 border-s border-white/15 ps-3 text-[14px] text-on-ink/85">
                    {service.children.map((child) => (
                      <li key={child.path}>
                        <Link to={child.path} className={linkClass}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>تواصل</FooterHeading>
          <ul className="grid gap-3 text-[15px] text-on-ink">
            <li className="flex flex-wrap items-center gap-2">
              هاتف
              <Pending tone="dark" />
            </li>
            <li className="flex flex-wrap items-center gap-2">
              بريد إلكتروني
              <Pending tone="dark" />
            </li>
            <li className="flex flex-wrap items-center gap-2">
              العنوان
              <Pending tone="dark" />
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>تابعنا</FooterHeading>
          <ul className="grid gap-2.5 text-[15px] text-on-ink">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-on-ink sm:px-6">
          © {year} رسالة أمل — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}
