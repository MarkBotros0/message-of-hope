import { Reveal } from './Reveal'
import { Tile } from './Tile'
import type { ArchivePhoto } from '../data/ministries'

interface ServiceHeroProps {
  title: string
  /** Supporting paragraph under the headline. The service pages carry their
   *  intro in a band of its own, so only the site-level pages set this. */
  description?: string
  /** Fills the hero's second half. Omit to fall back to the placeholder. */
  photo?: ArchivePhoto
}

/** The hero: one brand tile split in half — the ministry's name on one side,
 *  its own photograph on the other. The halves stack on phones, where a
 *  half-width photo would be a sliver. */
export function ServiceHero({
  title,
  description,
  photo,
}: ServiceHeroProps) {
  return (
    <Reveal className="py-6 sm:py-10">
      <Tile tone="brand" className="overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Text half. Centred both ways, so the name sits level with the
              middle of the photo beside it and reads as a title block
              rather than a paragraph opening. */}
          <div className="relative flex flex-col items-center justify-center p-8 text-center sm:p-10 md:w-1/2 md:min-w-0 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.35),transparent_70%)]"
            />
            <h1 className="relative text-2xl font-extrabold text-balance text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.25]">
              {title}
            </h1>
            {/* The same leaf rule the section headings carry. */}
            <span className="relative mt-4 block h-1.5 w-14 rounded-full bg-leaf" />

            {description && (
              <p className="relative mt-5 max-w-[62ch] leading-loose text-white/90">
                {description}
              </p>
            )}
          </div>

          {/* Photo half. A real photo carries its own alt text; the
              placeholder is decorative and stays hidden from assistive
              tech. */}
          <div className="bg-brand-dark md:w-1/2">
            <img
              src={photo?.src ?? '/placeholder-photo.svg'}
              alt={photo?.alt ?? ''}
              aria-hidden={photo ? undefined : true}
              fetchPriority="high"
              className="h-52 w-full object-cover sm:h-64 md:h-full md:min-h-[20rem]"
            />
          </div>
        </div>
      </Tile>
    </Reveal>
  )
}
