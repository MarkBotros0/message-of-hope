import { Card } from './Card'
import { Button } from './Button'
import { SectionLabel } from './SectionLabel'
import { Photo } from './Photo'
import type { Ministry } from '../data/ministries'

/** The main service intro card: eyebrow, title, description, CTAs, image slot. */
export function ServiceHero({ ministry }: { ministry: Ministry }) {
  return (
    <Card className="flex flex-col gap-6 md:flex-row md:items-stretch">
      <div className="flex flex-1 flex-col">
        <SectionLabel>{ministry.eyebrow}</SectionLabel>
        <h1 className="text-3xl font-black text-ink sm:text-4xl">{ministry.title}</h1>
        <p className="mt-4 max-w-xl leading-loose text-body">{ministry.description}</p>

        {(ministry.contact || ministry.schedule.length > 0) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {ministry.contact && (
              <Button href="#contact">تواصل معنا</Button>
            )}
            {ministry.schedule.length > 0 && (
              <Button variant="outline" href="#schedule">
                المواعيد
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="md:w-60">
        <Photo
          src="/placeholder-photo.svg"
          alt={`صورة ${ministry.title}`}
          className="h-40 w-full sm:h-48 md:h-full"
        />
      </div>
    </Card>
  )
}
