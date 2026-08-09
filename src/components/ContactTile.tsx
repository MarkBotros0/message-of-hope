import { Mail, MapPin, Phone } from 'lucide-react'
import { Tile } from './Tile'
import { Pending } from './Pending'

const rows = [
  { label: 'هاتف', Icon: Phone },
  { label: 'بريد إلكتروني', Icon: Mail },
  { label: 'العنوان', Icon: MapPin },
]

/** Contact bento: a leaf headline tile beside the contact rows. The document
 *  supplies no contact details, so every row is an explicit pending field
 *  rather than an invented number. */
export function ContactTile() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Tile tone="leaf" className="flex flex-col justify-center p-8 sm:p-11">
        <h3 className="text-3xl font-extrabold sm:text-4xl">تواصل معنا</h3>
        <p className="mt-3 max-w-[28ch] font-medium text-ink/80">
          بيانات التواصل الخاصة بالخدمة لم تصل بعد، وسيتم إضافتها فور توفّرها.
        </p>
      </Tile>

      <div className="grid gap-3">
        {rows.map(({ label, Icon }) => (
          <Tile key={label} className="flex items-center gap-4 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-tint text-brand">
              <Icon size={18} />
            </span>
            <span className="font-semibold text-ink">{label}</span>
            <Pending className="mr-auto" />
          </Tile>
        ))}
      </div>
    </div>
  )
}
