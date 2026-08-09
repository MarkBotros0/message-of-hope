import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Reveal a band once it scrolls into view, as the Bento Grid design does.
 *
 *  The animation is strictly an enhancement: anything already on screen shows
 *  immediately, and a failsafe reveals everything if IntersectionObserver never
 *  reports (hidden tabs and some embedded webviews never deliver callbacks).
 *  Content must never depend on the animation having run. */
export function Reveal({
  as: Tag = 'section',
  className = '',
  children,
  ...rest
}: {
  as?: 'section' | 'div'
  className?: string
  children: ReactNode
} & { id?: string; 'aria-labelledby'?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }

    // Already on screen at mount — no need to wait for a callback.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)

    // Failsafe: never leave content hidden if no callback ever arrives.
    const failsafe = window.setTimeout(() => setShown(true), 1500)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={ref as never}
      // The hidden state is expressed by *adding* utilities, so the revealed
      // state is simply the element's default — nothing to override.
      className={`transition-[opacity,transform] duration-700 ease-out ${
        shown ? '' : 'translate-y-6 opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
