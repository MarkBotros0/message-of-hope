import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Tile } from './Tile'
import { serviceNav } from '../data/ministries'

/** The services as photo-led bento tiles for the home page: each one opens with
 *  its own image, so the shape of the work is visible before any text is read.
 *  Only "تعرّف على الخدمة" is clickable — the tile and its title are not links,
 *  so there is one obvious target rather than a whole panel that navigates.
 *
 *  Sub-services are left to the nav and the footer; a tile names its service
 *  and nothing below it. */
export function ServicePhotoTiles() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {serviceNav.map((service) => (
        <li key={service.path} className="flex">
          <Tile className="group flex flex-1 flex-col overflow-hidden">
            {/* Photo panel. The image is decorative: the heading sitting on it
                already names the service — which also keeps the borrowed
                photos from claiming to show a service they don't. */}
            <div className="relative aspect-[16/10] overflow-hidden bg-sage-tint">
              <img
                src={service.photo?.src ?? '/placeholder-photo.svg'}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              {/* The wash is there to seat the heading, not to tint the photo,
                  so it holds its weight only across the bottom band and is
                  gone by the middle of the frame. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand/75 via-brand/10 via-30% to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                {/* The rule stretches on hover — the tile's one moving part. */}
                <span className="mb-3 block h-1 w-10 rounded-full bg-leaf transition-all duration-300 group-hover:w-16" />
                {/* The nav labels are shorthand (السيدات…); on a tile standing
                    on its own the full "خدمة …" name reads better. */}
                <h3 className="font-display text-xl font-bold text-white">
                  خدمة {service.label}
                </h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              {service.blurb && (
                <p className="text-base leading-loose">{service.blurb}</p>
              )}

              {/* The tile's only link. Every tile would otherwise announce the
                  same "تعرّف على الخدمة", so the accessible name carries the
                  service it belongs to. */}
              <Link
                to={service.path}
                aria-label={`تعرّف على خدمة ${service.label}`}
                className="mt-auto inline-flex items-center gap-1.5 self-start rounded pt-5 text-sm font-bold text-brand transition-all duration-300 hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                تعرّف على الخدمة
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </div>
          </Tile>
        </li>
      ))}
    </ul>
  )
}
