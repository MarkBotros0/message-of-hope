interface PhotoProps {
  /** Image source. Use a `/placeholder-*.svg` for now; swap for a real photo later. */
  src: string
  alt: string
  variant?: 'circle' | 'card'
  className?: string
}

/** Static image tile used across the layout (service hero, servants, archive).
 *  Non-interactive — just renders the given image, cropped to fill its box. */
export function Photo({ src, alt, variant = 'card', className = '' }: PhotoProps) {
  const shape = variant === 'circle' ? 'aspect-square rounded-full' : 'rounded-2xl'
  return (
    <div
      className={`overflow-hidden border border-line bg-sage-tint ${shape} ${className}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}
