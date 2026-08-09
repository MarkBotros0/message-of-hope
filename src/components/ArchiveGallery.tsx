import { Pending } from './Pending'
import { Tile } from './Tile'

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

/** Archive photo mosaic. No photos have been supplied yet, so the tiles are
 *  gradient placeholders and the block says so explicitly. */
export function ArchiveGallery({ count }: { count: number }) {
  return (
    <>
      <div className="grid auto-rows-[110px] grid-cols-4 gap-3 sm:auto-rows-[120px] sm:gap-4">
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
