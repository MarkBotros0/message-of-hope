import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'solid' | 'outline'
  /** Recolour for use inside the brand-green hero tile. */
  onBrand?: boolean
  href?: string
  onClick?: () => void
  className?: string
  children: ReactNode
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const skins = {
  'solid-page': 'bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand',
  'outline-page':
    'border border-line bg-white text-ink hover:border-brand hover:text-brand focus-visible:ring-brand',
  'solid-brand':
    'bg-page text-ink hover:bg-white focus-visible:ring-white focus-visible:ring-offset-brand',
  'outline-brand':
    'border border-white/40 bg-white/15 text-white hover:bg-white/25 focus-visible:ring-white focus-visible:ring-offset-brand',
}

export function Button({
  variant = 'solid',
  onBrand = false,
  href,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  const skin =
    skins[`${variant}-${onBrand ? 'brand' : 'page'}` as keyof typeof skins]
  const classes = `${base} ${skin} ${className}`

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
