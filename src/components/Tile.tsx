import type { ReactNode } from 'react'

export type TileTone = 'white' | 'tint' | 'brand' | 'leaf' | 'ink'

interface TileProps {
  tone?: TileTone
  id?: string
  /** Disable the hover lift for tiles that are purely decorative. */
  static?: boolean
  className?: string
  children?: ReactNode
}

const tones: Record<TileTone, string> = {
  white: 'border border-line bg-white text-body',
  tint: 'bg-sage-tint text-body',
  brand: 'bg-brand text-white',
  leaf: 'bg-leaf text-ink',
  ink: 'bg-ink text-on-ink',
}

/** The bento surface every block on the page is built from: a large radius,
 *  a flat colour field and a soft green lift on hover. */
export function Tile({
  tone = 'white',
  id,
  static: isStatic = false,
  className = '',
  children,
}: TileProps) {
  const lift = isStatic
    ? ''
    : 'transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_48px_-32px_rgba(0,120,72,0.4)]'

  return (
    <div id={id} className={`rounded-3xl ${tones[tone]} ${lift} ${className}`}>
      {children}
    </div>
  )
}
