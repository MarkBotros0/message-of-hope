import { PENDING } from '../data/ministries'

interface PendingProps {
  /** `dark` for use on the ink footer and the dark tiles. */
  tone?: 'light' | 'dark'
  className?: string
}

/** Marker for data the client has not supplied yet. Styled as a deliberate
 *  placeholder chip so it reads as "pending", not as a broken render. */
export function Pending({ tone = 'light', className = '' }: PendingProps) {
  const skin =
    tone === 'dark' ? 'border-white/45 text-white/80' : 'border-muted text-muted'

  return (
    <span
      dir="ltr"
      className={`inline-flex items-center rounded-md border border-dashed px-2.5 py-1 text-xs font-bold tracking-wide ${skin} ${className}`}
    >
      {PENDING}
    </span>
  )
}
