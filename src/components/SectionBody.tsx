import { SectionBand } from './SectionBand'
import { QuoteTile } from './QuoteTile'
import { GoalsGrid } from './GoalsGrid'
import { ServicesTile } from './ServicesTile'
import { AudienceTile } from './AudienceTile'
import { Tile } from './Tile'
import type { MinistrySection } from '../data/ministries'

interface SectionBodyProps {
  section: MinistrySection
}

/** Renders every band a ministry section can have, in reading order:
 *  intro → vision → verse → goals → services → target groups → closing.
 *  Bands with no data are skipped. Contact details are the footer's job on
 *  every page, so a service page ends on its own closing paragraph. */
export function SectionBody({ section }: SectionBodyProps) {
  return (
    <>
      {(section.heading || section.intro?.length) && (
        <SectionBand title={section.heading} banner>
          {section.intro?.length ? (
            <Tile className="p-7 sm:p-9">
              <div className="mx-auto max-w-[75ch] space-y-5">
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
        <SectionBand id="goals" title={section.goals.label} banner>
          <GoalsGrid items={section.goals.items} />
        </SectionBand>
      )}

      {section.services && (
        <SectionBand id="services" title={section.services.label} banner>
          {/* The section's headline figures ride under the heading as badges.
              Every section that carries stats also carries this band. */}
          {section.stats?.length ? (
            <ul className="mb-6 flex flex-wrap justify-center gap-2">
              {section.stats.map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-full bg-sage-tint px-4 py-2 text-sm leading-6"
                >
                  <span className="font-bold text-ink">{stat.label}</span>
                  <span aria-hidden="true" className="mx-2 text-leaf-dark">
                    ·
                  </span>
                  <span className="font-bold text-brand">{stat.value}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <ServicesTile items={section.services.items} />
        </SectionBand>
      )}

      {section.audience && (
        <SectionBand title={section.audience.label} banner>
          <AudienceTile items={section.audience.items} />
        </SectionBand>
      )}

      {section.outro && (
        <SectionBand>
          <Tile tone="tint" className="p-7 sm:p-9">
            <p className="mx-auto max-w-[75ch] leading-loose">{section.outro}</p>
          </Tile>
        </SectionBand>
      )}
    </>
  )
}
