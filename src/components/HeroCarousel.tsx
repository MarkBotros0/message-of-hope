import { useCallback, useEffect, useRef, useState } from 'react'

import type { ArchivePhoto } from '../data/ministries'

interface HeroCarouselProps {
  photos: ArchivePhoto[]
  /** Milliseconds each slide is held before the next one slides in. */
  interval?: number
}

interface SlideState {
  index: number
  /** The slide being pushed out; -1 before the first move. */
  leaving: number
  /** 1 = forward (the next photo arrives from the end side), -1 = back. */
  direction: number
}

/** How long a slide takes to travel the full width. */
const SLIDE_MS = 700

/** Full-width hero slideshow — the bento page's one non-tile surface, so it
 *  carries the same 3xl radius and hairline edge as everything else. Each
 *  change slides the whole frame sideways: the incoming photo travels in from
 *  one edge while the outgoing one leaves by the other, the way a swipe would
 *  carry it. The page is RTL, so forward brings the next photo in from the
 *  right.
 *
 *  Only the two slides in motion are transitioned; the rest sit staged off
 *  frame, so wrapping from the last photo back to the first costs the same
 *  single step as any other move. The timer runs through hover and through the
 *  dots, stops on a backgrounded tab, and never starts under
 *  `prefers-reduced-motion`. */
export function HeroCarousel({ photos, interval = 2000 }: HeroCarouselProps) {
  const [{ index, leaving, direction }, setSlide] = useState<SlideState>({
    index: 0,
    leaving: -1,
    direction: 1,
  })
  const [paused, setPaused] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const count = photos.length

  const go = useCallback(
    (next: number, towards: number) => {
      setSlide((current) => {
        if (count === 0) return current
        const wrapped = ((next % count) + count) % count
        if (wrapped === current.index) return current
        return { index: wrapped, leaving: current.index, direction: towards }
      })
    },
    [count],
  )

  // Auto-advance. `index` is a dependency so a manual jump restarts the clock
  // rather than cutting the new slide short — the timer is never cancelled by
  // the click itself.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return
    const id = window.setTimeout(() => go(index + 1, 1), interval)
    return () => window.clearTimeout(id)
  }, [count, go, index, interval, paused, reduceMotion])

  // Don't burn transitions on a backgrounded tab.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (count === 0) return null

  /** Percent offset for a slide: 0 on show, one width out on either side.
   *  Physical percentages, not logical ones — a transform ignores `dir`. */
  const offset = (i: number) => {
    if (i === index) return 0
    if (i === leaving) return direction > 0 ? -100 : 100
    // Everything else waits on the side the next photo will arrive from.
    return direction > 0 ? 100 : -100
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="من أرشيف الخدمة"
      // Square and edge-to-edge on phones, a framed tile from `sm` up: a
      // full-bleed panel with rounded corners and side borders reads broken.
      className="relative isolate h-[26rem] overflow-hidden border-b border-line bg-brand shadow-card sm:h-[30rem] sm:rounded-3xl sm:border lg:h-[34rem]"
    >
      {photos.map((photo, i) => {
        const inMotion = i === index || i === leaving
        return (
          <div
            key={photo.src}
            aria-hidden={i === index ? undefined : true}
            style={{
              transform: `translateX(${offset(i)}%)`,
              // Staged slides snap into place; only the two in motion travel.
              transitionDuration: inMotion ? `${SLIDE_MS}ms` : '0ms',
            }}
            className="absolute inset-0 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
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
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/50 to-transparent"
      />

      {/* Dots — the slideshow runs itself, so these jump between photos
          without arrows framing them as the way to drive it. */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 sm:bottom-6">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`الصورة ${i + 1} من ${count}`}
              aria-current={i === index}
              onClick={() => go(i, i > index ? 1 : -1)}
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
