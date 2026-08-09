import { Button } from './Button'
import { Reveal } from './Reveal'
import { Tile } from './Tile'
import type { Stat } from '../data/ministries'

interface HeroAction {
  label: string
  href: string
  variant?: 'solid' | 'outline'
}

interface ServiceHeroProps {
  eyebrow?: string
  title: string
  stats?: Stat[]
  actions?: HeroAction[]
}

/** The hero bento: a full-width brand tile, the ministry's headline figures
 *  beside it, and a wide photo tile closing the block. */
export function ServiceHero({
  eyebrow,
  title,
  stats = [],
  actions = [],
}: ServiceHeroProps) {
  return (
    <Reveal className="py-6 sm:py-10">
      <div className="grid gap-4 sm:grid-cols-4">
        <Tile
          tone="brand"
          className="relative overflow-hidden p-8 sm:col-span-4 sm:p-12 lg:p-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.35),transparent_70%)]"
          />
          {eyebrow && (
            <span className="relative mb-5 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold">
              {eyebrow}
            </span>
          )}
          <h1 className="relative text-4xl font-extrabold text-balance text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          {actions.length > 0 && (
            <div className="relative mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={action.variant ?? 'solid'}
                  onBrand
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
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
