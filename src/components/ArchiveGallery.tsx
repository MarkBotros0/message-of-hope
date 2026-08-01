import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from './Card'
import { SectionLabel } from './SectionLabel'
import { Photo } from './Photo'

/** Horizontal, snap-scrolling carousel of archive photos with arrow controls. */
export function ArchiveGallery({ count }: { count: number }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByPage(sign: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: sign * track.clientWidth * 0.85, behavior: 'smooth' })
  }

  const arrow =
    'flex h-8 w-8 items-center justify-center rounded-full border border-line text-body transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand'

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <SectionLabel>من أرشيف الخدمة والفعاليات</SectionLabel>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="السابق"
            className={arrow}
          >
            <ChevronRight size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="التالي"
            className={arrow}
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }).map((_, index) => (
          <Photo
            key={index}
            src="/placeholder-photo.svg"
            alt="صورة من الأرشيف"
            className="aspect-[4/3] w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
          />
        ))}
      </div>
    </Card>
  )
}
