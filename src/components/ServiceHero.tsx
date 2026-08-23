import { Reveal } from './Reveal'
import { Tile } from './Tile'
import type { ArchivePhoto, Stat } from '../data/ministries'

interface ServiceHeroProps {
  eyebrow?: string
  title: string
  /** Supporting paragraph under the headline. The service pages carry their
   *  intro in a band of its own, so only the site-level pages set this. */
  description?: string
  /** Fills the hero's second half. Omit to fall back to the placeholder. */
  photo?: ArchivePhoto
  stats?: Stat[]
}

/** The hero bento: one brand tile split in half — the ministry's name on one
 *  side, its own photograph on the other — with the headline figures on tiles
 *  below. The halves stack on phones, where a half-width photo would be a
 *  sliver. */
export function ServiceHero({
  eyebrow,
  title,
  description,
  photo,
  stats = [],
}: ServiceHeroProps) {
  return (
    <Reveal className="py-6 sm:py-10">
      <div className="grid gap-4 sm:grid-cols-4">
        <Tile tone="brand" className="overflow-hidden sm:col-span-4">
          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Text half. Centred down the tile's height so the name sits
                level with the middle of the photo beside it. */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10 md:w-1/2 md:min-w-0 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.35),transparent_70%)]"
              />
              {eyebrow && (
                <span className="relative mb-5 inline-block self-start rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold">
                  {eyebrow}
                </span>
              )}
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

        {stats.map((stat, i) => (
          <Tile
            key={stat.label}
            tone={i === 0 ? 'leaf' : 'tint'}
            className={`flex flex-col justify-center p-7 ${
              stats.length === 1 ? 'sm:col-span-4' : 'sm:col-span-2'
            }`}
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
    </Reveal>
  )
}
