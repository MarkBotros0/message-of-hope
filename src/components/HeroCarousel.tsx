import { useCallback, useEffect, useRef, useState } from 'react'

import type { ArchivePhoto } from '../data/ministries'

interface HeroCarouselProps {
  photos: ArchivePhoto[]
  /** Milliseconds each slide is held before the next one fades up. */
  interval?: number
}

interface SlideState {
  index: number
  /** The slide still showing underneath; -1 before the first move. */
  leaving: number
}

/** How long the incoming photo takes to fade up over the one it replaces.
 *  Kept to half the hold so each photo still gets a beat of stillness. */
const FADE_MS = 1000

/** How much larger a photo sits before it settles — enough to read as a drift
 *  towards the viewer, not as a zoom. */
const REST_SCALE = 1.05

/** Full-width hero slideshow — the bento page's one non-tile surface, so it
 *  carries the same 3xl radius and hairline edge as everything else. Photos
 *  cross-dissolve rather than swipe: the incoming one fades up *over* the
 *  outgoing one while easing down from a slight scale, so there is never a hard
 *  seam between two images and never a frame where the backdrop shows through.
 *
 *  Only the two photos in play are transitioned; the rest sit staged at zero
 *  opacity, so wrapping from the last photo back to the first costs the same
 *  single step as any other move. The timer runs through hover and through the
 *  dots, stops on a backgrounded tab, and never starts under
 *  `prefers-reduced-motion`. */
export function HeroCarousel({ photos, interval = 2000 }: HeroCarouselProps) {
  const [{ index, leaving }, setSlide] = useState<SlideState>({
    index: 0,
    leaving: -1,
  })
  const [paused, setPaused] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const count = photos.length

  const go = useCallback(
    (next: number) => {
      setSlide((current) => {
        if (count === 0) return current
        const wrapped = ((next % count) + count) % count
        if (wrapped === current.index) return current
        return { index: wrapped, leaving: current.index }
      })
    },
    [count],
  )

  // Auto-advance. `index` is a dependency so a manual jump restarts the clock
  // rather than cutting the new slide short — the timer is never cancelled by
  // the click itself.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return
    const id = window.setTimeout(() => go(index + 1), interval)
    return () => window.clearTimeout(id)
  }, [count, go, index, interval, paused, reduceMotion])

  // Don't burn transitions on a backgrounded tab.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (count === 0) return null

  return (
    <section
      aria-roledescription="carousel"
      aria-label="من أرشيف الخدمة"
      // Square and edge-to-edge on phones, a framed tile from `sm` up: a
      // full-bleed panel with rounded corners and side borders reads broken.
      className="relative isolate h-[26rem] overflow-hidden border-b border-line bg-brand shadow-card sm:h-[30rem] sm:rounded-3xl sm:border lg:h-[34rem]"
    >
      {photos.map((photo, i) => {
        const showing = i === index
        // The outgoing photo holds full opacity underneath while the new one
        // fades up, so the dissolve never dips towards the backdrop.
        const beneath = i === leaving
        return (
          <div
            key={photo.src}
            aria-hidden={showing ? undefined : true}
            style={{
              opacity: showing || beneath ? 1 : 0,
              transform: `scale(${showing || beneath ? 1 : REST_SCALE})`,
              // Staged photos snap into position; only the two in play travel.
              transitionDuration: showing || beneath ? `${FADE_MS}ms` : '0ms',
              zIndex: showing ? 2 : beneath ? 1 : 0,
            }}
            className="absolute inset-0 transition-[opacity,transform] ease-[cubic-bezier(0.33,0,0.2,1)] will-change-[opacity,transform]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        )
      })}

      {/* A short wash at the foot of the frame — just enough for the dots to
          stay legible over a light photo; the image itself stays clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink/50 to-transparent"
      />

      {/* Dots — the slideshow runs itself, so these jump between photos
          without arrows framing them as the way to drive it. */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2 sm:bottom-6">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`الصورة ${i + 1} من ${count}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink/40 ${
                i === index ? 'w-7 bg-leaf' : 'w-2.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

/** Tracks the OS "reduce motion" setting so the slideshow can stay still. */
function usePrefersReducedMotion() {
  const query = useRef<MediaQueryList | null>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    query.current = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(query.current.matches)
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches)
    query.current.addEventListener('change', onChange)
    return () => query.current?.removeEventListener('change', onChange)
  }, [])

  return reduce
}
