import { Card } from './Card'
import { SectionLabel } from './SectionLabel'

interface VisionCardProps {
  vision: string
  by?: string
}

export function VisionCard({ vision, by }: VisionCardProps) {
  return (
    <Card tone="sage" className="flex h-full flex-col justify-center">
      <SectionLabel>الرؤية</SectionLabel>
      <blockquote className="text-xl font-bold leading-relaxed text-ink sm:text-2xl">
        «{vision}»
      </blockquote>
      {by && <p className="mt-4 text-sm font-semibold text-label">– {by}</p>}
    </Card>
  )
}
