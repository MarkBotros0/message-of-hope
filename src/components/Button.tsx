import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'solid' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

const variants = {
  solid: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-line bg-white text-ink hover:border-brand hover:text-brand',
}

export function Button({
  variant = 'solid',
  href,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`
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
