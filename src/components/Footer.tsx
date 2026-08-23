import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { serviceNav } from '../data/ministries'
import { Pending } from './Pending'

function FooterHeading({ children }: { children: string }) {
  return (
    <h4 className="mb-3 font-display text-sm font-bold text-leaf">{children}</h4>
  )
}

/** The page sets a 1.9 line-height for reading prose; a footer index is a list
 *  of labels, not prose, so these rows opt back down to a compact leading. */
const listClass = 'text-sm leading-5 text-on-ink'

const linkClass =
  'inline-block rounded py-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

/** Contact rows the client still needs to fill in — the social accounts among
 *  them, which is why there is no row of icons linking nowhere. */
const pendingContact = [
  { key: 'phone', Icon: Phone, label: 'هاتف' },
  { key: 'email', Icon: Mail, label: 'بريد إلكتروني' },
  { key: 'address', Icon: MapPin, label: 'العنوان' },
  { key: 'social', Icon: Share2, label: 'حسابات التواصل' },
]

/** Arabic-Indic digits, to match the numerals used across the site. */
function arabicYear(year: number): string {
  return String(year).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])
}

export function Footer() {
  const year = arabicYear(new Date().getFullYear())

  return (
    <footer className="bg-ink text-page">
      {/* Three equal columns — logo, services, contact — so the row reads as
          even spans rather than a mark squeezed against the edge. Stacked and
          centred on phones. */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:grid-cols-3 sm:gap-8 sm:px-6 sm:text-start">
        {/* The cell stretches to the row height and centres the mark inside it,
            so the link columns keep starting at their headings. */}
        <div className="flex items-center justify-center sm:justify-start">
          <Link
            to="/"
            aria-label="رسالة أمل — الصفحة الرئيسية"
            className="inline-flex rounded-2xl transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {/* A transparent cut of the mark, so it sits straight on the ink
                field with no white tile or ring behind it — the artwork brings
                its own rounded green plate. */}
            <img
              src="/logo-mark.png"
              alt="رسالة أمل"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
          </Link>
        </div>

        {/* Top-level services only. الرئيسية، من نحن and the sub-ministries are
            all one click away in the header, so the footer stays a short index
            rather than a second copy of the nav. */}
        <nav aria-label="روابط الخدمات">
          <FooterHeading>خدماتنا</FooterHeading>
          <ul className={listClass}>
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link to={service.path} className={linkClass}>
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>تواصل معنا</FooterHeading>
          <ul className={`flex flex-col items-center gap-3 sm:items-start ${listClass}`}>
            {pendingContact.map(({ key, Icon, label }) => (
              <li key={key} className="flex flex-wrap items-center gap-2">
                <Icon size={16} className="shrink-0 text-leaf" aria-hidden="true" />
                <span>{label}</span>
                <Pending tone="dark" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm leading-5 text-on-ink sm:px-6 sm:text-start">
          © {year} رسالة أمل — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}
