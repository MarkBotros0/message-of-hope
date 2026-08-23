import { SectionBand } from './SectionBand'
import { ProseCard } from './ProseCard'
import { GoalsGrid } from './GoalsGrid'
import { ServicesTile } from './ServicesTile'
import { AudienceTile } from './AudienceTile'
import { Tile } from './Tile'
import type { MinistrySection } from '../data/ministries'

interface SectionBodyProps {
  section: MinistrySection
}

/** Renders every band a ministry section can have, in reading order:
 *  intro → vision → goals → services → target groups → closing.
 *  Bands with no data are skipped. Contact details are the footer's job on
 *  every page, so a service page ends on its own closing paragraph. */
export function SectionBody({ section }: SectionBodyProps) {
  return (
    <>
      {section.intro?.length ? (
        <SectionBand>
          <ProseCard
            label={section.heading}
            text={section.intro}
          />
        </SectionBand>
      ) : null}

      {section.vision && (
        <SectionBand id="vision">
          <ProseCard
            label={section.visionLabel ?? 'رؤيتنا'}
            text={section.vision}
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
          <Tile tone="tint" className="mx-auto max-w-[82ch] p-6 sm:p-8">
            <p className="leading-loose">{section.outro}</p>
          </Tile>
        </SectionBand>
      )}
    </>
  )
}
