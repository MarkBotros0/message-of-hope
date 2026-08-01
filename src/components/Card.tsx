import type { ReactNode } from 'react'

interface CardProps {
  tone?: 'white' | 'sage'
  className?: string
  id?: string
  children: ReactNode
}

/** Rounded, bordered surface used for every card in the bento layout. */
export function Card({ tone = 'white', className = '', id, children }: CardProps) {
  const bg = tone === 'sage' ? 'bg-sage-tint' : 'bg-white'
  return (
    <div
      id={id}
      className={`rounded-3xl border border-line ${bg} p-6 shadow-sm sm:p-7 ${className}`}
    >
      {children}
    </div>
  )
}
