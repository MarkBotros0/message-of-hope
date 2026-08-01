import { Button } from './Button'
import { SectionLabel } from './SectionLabel'
import type { Ministry } from '../data/ministries'

/** The main service intro card: text fills one half, a full-height image
 *  fills the other half (stacked on mobile). */
export function ServiceHero({ ministry }: { ministry: Ministry }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm md:flex-row md:items-stretch">
      {/* Text half */}
      <div className="flex flex-col justify-center p-6 sm:p-7 md:w-1/2 md:min-w-0">
        <SectionLabel>{ministry.eyebrow}</SectionLabel>
        <h1 className="text-3xl font-black text-ink sm:text-4xl">{ministry.title}</h1>
        <p className="mt-4 max-w-xl leading-loose text-body">{ministry.description}</p>

        {(ministry.contact || ministry.schedule.length > 0) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {ministry.contact && <Button href="#contact">تواصل معنا</Button>}
            {ministry.schedule.length > 0 && (
              <Button variant="outline" href="#schedule">
                المواعيد
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Image half — fills its side of the card edge to edge */}
      <div className="bg-sage-tint md:w-1/2">
        <img
          src="/placeholder-photo.svg"
          alt={`صورة ${ministry.title}`}
          className="h-52 w-full object-cover sm:h-64 md:h-full"
        />
      </div>
    </div>
  )
}
