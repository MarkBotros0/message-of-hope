import { Phone, Mail } from 'lucide-react'
import { Card } from './Card'
import { SectionLabel } from './SectionLabel'
import type { Contact } from '../data/ministries'

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

/** Convert Arabic-Indic digits to Latin so tel: links work. */
function telHref(phone: string): string {
  const latin = phone.replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
  return `tel:${latin.replace(/\s+/g, '')}`
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      className="shrink-0 text-brand"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-4.5 4.43c-.15 0-.4.06-.6.28-.2.22-.79.77-.79 1.88 0 1.1.8 2.17.92 2.32.11.15 1.57 2.4 3.8 3.36.53.23.94.37 1.27.47.53.17 1.02.15 1.4.09.43-.06 1.32-.54 1.5-1.06.19-.52.19-.97.13-1.06-.05-.09-.2-.15-.42-.26-.22-.11-1.32-.65-1.53-.73-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.11-.66-.59-1.11-1.32-1.24-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.69-1.66-.18-.44-.37-.38-.5-.39-.13-.01-.28-.01-.43-.01Z" />
    </svg>
  )
}

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card id="contact">
      <SectionLabel>تواصل معنا</SectionLabel>
      <ul className="mt-2 space-y-3 text-sm">
        {contact.phones.map((phone) => (
          <li key={phone} className="flex items-center gap-3">
            <Phone size={16} className="shrink-0 text-brand" />
            <a href={telHref(phone)} dir="ltr" className="hover:text-brand">
              {phone}
            </a>
          </li>
        ))}
        <li className="flex items-center gap-3">
          <WhatsAppIcon />
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand"
          >
            واتساب
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail size={16} className="shrink-0 text-brand" />
          <a href={`mailto:${contact.email}`} dir="ltr" className="hover:text-brand">
            {contact.email}
          </a>
        </li>
      </ul>
    </Card>
  )
}
