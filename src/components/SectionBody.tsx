import { SectionBand } from './SectionBand'
import { QuoteTile } from './QuoteTile'
import { GoalsGrid } from './GoalsGrid'
import { ServicesTile } from './ServicesTile'
import { AudienceTile } from './AudienceTile'
import { ContactTile } from './ContactTile'
import { ArchiveGallery } from './ArchiveGallery'
import { Tile } from './Tile'
import type { MinistrySection } from '../data/ministries'

interface SectionBodyProps {
  section: MinistrySection
  /** Sub-ministry sections render their own stat tiles; the single-section
   *  pages show them in the hero instead. */
  showStats?: boolean
}

/** Renders every band a ministry section can have, in reading order:
 *  intro → vision → verse → goals → services → target groups → closing →
 *  contact → archive. Bands with no data are skipped. */
export function SectionBody({ section, showStats = false }: SectionBodyProps) {
  return (
    <>
      {(section.heading || section.intro?.length) && (
        <SectionBand title={section.heading}>
          {section.intro?.length ? (
            <Tile className="p-7 sm:p-9">
              <div className="max-w-[75ch] space-y-5">
                {section.intro.map((text) => (
                  <p key={text} className="leading-loose">
                    {text}
                  </p>
                ))}
              </div>
            </Tile>
          ) : null}
        </SectionBand>
      )}

      {showStats && section.stats?.length ? (
        <SectionBand>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.stats.map((stat, i) => (
              <Tile
                key={stat.label}
                tone={i === 0 ? 'leaf' : 'tint'}
                className="p-7"
              >
                <span
                  className={`font-display text-2xl font-extrabold sm:text-3xl ${
                    i === 0 ? 'text-ink' : 'text-brand'
                  }`}
                >
                  {stat.value}
                </span>
                <p className="mt-1 font-semibold">{stat.label}</p>
              </Tile>
            ))}
          </div>
        </SectionBand>
      ) : null}

      {section.vision && (
        <SectionBand id="vision">
          <QuoteTile
            label={section.visionLabel ?? 'الرؤية'}
            text={section.vision}
            size={section.vision.length > 320 ? 'prose' : 'display'}
          />
        </SectionBand>
      )}

      {section.quote && (
        <SectionBand>
          <QuoteTile
            label="من الكتاب المقدس"
            text={section.quote.text}
            source={section.quote.source}
          />
        </SectionBand>
      )}

      {section.goals && (
        <SectionBand id="goals" title={section.goals.label}>
          <GoalsGrid items={section.goals.items} />
        </SectionBand>
      )}

      {section.services && (
        <SectionBand id="services" title={section.services.label}>
          <ServicesTile items={section.services.items} />
        </SectionBand>
      )}

      {section.audience && (
        <SectionBand title={section.audience.label}>
          <AudienceTile items={section.audience.items} />
        </SectionBand>
      )}

      {section.outro && (
        <SectionBand>
          <Tile tone="tint" className="p-7 sm:p-9">
            <p className="max-w-[75ch] leading-loose">{section.outro}</p>
          </Tile>
        </SectionBand>
      )}

      <SectionBand id="contact">
        <ContactTile />
      </SectionBand>

      {section.archiveSlots || section.archive?.length ? (
        <SectionBand title="من أرشيف الخدمة والفعاليات" className="pb-14">
          <ArchiveGallery count={section.archiveSlots ?? 0} photos={section.archive} />
        </SectionBand>
      ) : null}
    </>
  )
}
