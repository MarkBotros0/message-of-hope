import { Card } from './Card'
import { SectionLabel } from './SectionLabel'
import { ServiceHero } from './ServiceHero'
import { VisionCard } from './VisionCard'
import { ServantsCard } from './ServantsCard'
import { ContactCard } from './ContactCard'
import { ScheduleCard } from './ScheduleCard'
import { ArchiveGallery } from './ArchiveGallery'
import { isPublished, type Ministry } from '../data/ministries'

function ComingSoon() {
  return (
    <Card tone="sage" className="text-center">
      <SectionLabel>قريبًا</SectionLabel>
      <p className="py-6 text-lg font-bold text-ink">
        محتوى هذه الخدمة قيد الإعداد، تابعونا قريبًا.
      </p>
    </Card>
  )
}

/** Bento arrangement of a ministry's cards. Empty sections are skipped. */
export function MinistryLayout({ ministry }: { ministry: Ministry }) {
  const published = isPublished(ministry)

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <ServiceHero ministry={ministry} />

      {published ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Right column (RTL: rendered first) */}
          <div className="flex flex-col gap-5">
            {ministry.vision && (
              <VisionCard vision={ministry.vision} by={ministry.visionBy} />
            )}
            {ministry.schedule.length > 0 && (
              <ScheduleCard
                schedule={ministry.schedule}
                location={ministry.location}
              />
            )}
          </div>

          {/* Left column */}
          <div className="flex flex-col gap-5">
            {ministry.servants.length > 0 && (
              <ServantsCard servants={ministry.servants} />
            )}
            {ministry.contact && <ContactCard contact={ministry.contact} />}
          </div>
        </div>
      ) : (
        <ComingSoon />
      )}

      {ministry.archiveSlots > 0 && (
        <ArchiveGallery count={ministry.archiveSlots} />
      )}
    </main>
  )
}
