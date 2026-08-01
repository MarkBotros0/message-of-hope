import { MapPin } from 'lucide-react'
import { Card } from './Card'
import { SectionLabel } from './SectionLabel'
import type { ScheduleItem } from '../data/ministries'

interface ScheduleCardProps {
  schedule: ScheduleItem[]
  location?: string
}

export function ScheduleCard({ schedule, location }: ScheduleCardProps) {
  return (
    <Card id="schedule">
      <SectionLabel>المواعيد</SectionLabel>
      <dl className="mt-2 divide-y divide-line">
        {schedule.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 py-3"
          >
            <dt className="text-sm text-body">{item.label}</dt>
            <dd className="text-sm font-bold text-ink">{item.time}</dd>
          </div>
        ))}
      </dl>
      {location && (
        <p className="mt-4 flex items-center gap-2 text-sm text-label">
          <MapPin size={16} className="shrink-0 text-brand" />
          {location}
        </p>
      )}
    </Card>
  )
}
