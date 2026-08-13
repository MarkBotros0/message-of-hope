import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Tile } from './Tile'
import { serviceNav } from '../data/ministries'

/** The three services as bento tiles, each listing its sub-services so the full
 *  shape of the ministry is visible outside the nav dropdown too. */
export function ServiceTiles() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {serviceNav.map((service, i) => (
        <li key={service.path} className="flex">
          <Tile
            // One tile in three carries the tint, so the row has a rhythm
            // without any single service reading as the important one.
            tone={i === 1 ? 'tint' : 'white'}
            className="flex flex-1 flex-col p-7"
          >
            <h3 className="font-display text-xl font-extrabold">
              <Link
                to={service.path}
                className="rounded transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {service.label}
              </Link>
            </h3>

            {service.blurb && (
              <p className="mt-3 text-[15px] leading-loose">{service.blurb}</p>
            )}

            {service.children && (
              <ul className="mt-4 ms-1 border-s-2 border-leaf/60 ps-3">
                {service.children.map((child) => (
                  <li key={child.path}>
                    <Link
                      to={child.path}
                      // py-2 keeps the row a comfortable tap target on phones.
                      className="block rounded py-2 text-sm font-semibold text-body transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* The real link for the tile, not a decorative echo of the title:
                it reads as the primary affordance, so it must be focusable. */}
            <Link
              to={service.path}
              aria-label={`تعرّف على ${service.label}`}
              className="mt-auto inline-flex items-center gap-1.5 self-start rounded pt-5 text-sm font-bold text-brand transition hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              تعرّف على الخدمة
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </Tile>
        </li>
      ))}
    </ul>
  )
}
