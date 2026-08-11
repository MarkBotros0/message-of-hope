import { Pending } from './Pending'
import { Tile } from './Tile'
import type { ArchivePhoto } from '../data/ministries'

/** The mosaic tile shapes and gradients of the design's gallery block, cycled
 *  so any slot count keeps the bento rhythm. */
const slots = [
  { span: 'col-span-2 row-span-2', from: '#007848', to: '#8dc63f' },
  { span: '', from: '#00925a', to: '#e8f3ec' },
  { span: '', from: '#f7941d', to: '#007848' },
  { span: 'col-span-2', from: '#5a8a1e', to: '#8dc63f' },
  { span: 'col-span-2 row-span-2', from: '#8dc63f', to: '#007848' },
  { span: 'col-span-2', from: '#007848', to: '#00925a' },
]

/** Photos need spans the gradients don't: every tile at least two rows tall,
 *  or a 3:2 photograph gets cropped to a letterbox sliver. Two halves above a
 *  full-width banner tiles the four-column grid with no holes, and cycles. */
const photoSlots = [
  'col-span-2 row-span-2',
  'col-span-2 row-span-2',
  'col-span-4 row-span-2',
]

interface ArchiveGalleryProps {
  /** Gradient placeholder count, used only while no photos are supplied. */
  count: number
  photos?: ArchivePhoto[]
}

/** Archive photo mosaic. Where the client has supplied photos they fill the
 *  bento tiles; the rest of the site still shows gradient placeholders and
 *  says so explicitly. */
export function ArchiveGallery({ count, photos }: ArchiveGalleryProps) {
  const grid = 'grid auto-rows-[110px] grid-cols-4 gap-3 sm:auto-rows-[120px] sm:gap-4'

  if (photos?.length) {
    return (
      <div className={grid}>
        {photos.map((photo, i) => (
          <Tile
            key={photo.src}
            static
            className={`overflow-hidden ${photoSlots[i % photoSlots.length]}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-3xl object-cover"
            />
          </Tile>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className={grid}>
        {Array.from({ length: count }).map((_, i) => {
          const slot = slots[i % slots.length]
          return (
            <Tile key={i} static className={slot.span}>
              <div
                aria-hidden="true"
                className="h-full w-full rounded-3xl"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${slot.from}, ${slot.to})`,
                }}
              />
            </Tile>
          )
        })}
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        صور الأرشيف
        <Pending />
      </p>
    </>
  )
}
