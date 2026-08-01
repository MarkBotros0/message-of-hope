import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { ministries } from '../data/ministries'

/** Small green→brand footer heading, echoing the SectionLabel orange mark. */
function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
      <span className="inline-block h-1 w-4 rounded-full bg-secondary" />
      {children}
    </h3>
  )
}

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

const linkClass =
  'rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {/* Brand, tagline & socials */}
        <div className="lg:col-span-2">
          <p className="text-xl font-extrabold">رسالة أمل</p>
          <p className="mt-3 max-w-sm leading-loose text-white/75">
            نخدم كل الأجيال بالكلمة والصلاة والمحبة، ونبني معًا حياةً لها رجاء.
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

        {/* Ministries */}
        <nav aria-label="روابط الخدمات">
          <FooterHeading>خدماتنا</FooterHeading>
          <ul className="space-y-2 text-sm text-white/75">
            {ministries.map((m) => (
              <li key={m.slug}>
                <Link to={`/${m.slug}`} className={linkClass}>
                  {m.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <FooterHeading>تواصل معنا</FooterHeading>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
              {/* TODO: real address */}
              <span>العنوان يُضاف لاحقًا</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-secondary" />
              {/* TODO: real email */}
              <a href="mailto:info@risalatamal.org" dir="ltr" className={linkClass}>
                info@risalatamal.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-white/70 sm:px-6">
          © {year} رسالة أمل · جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
