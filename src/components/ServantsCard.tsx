import { Card } from './Card'
import { SectionLabel } from './SectionLabel'
import { Photo } from './Photo'
import type { Servant } from '../data/ministries'

function ServantCard({ servant }: { servant: Servant }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Photo
        variant="circle"
        src="/placeholder-avatar.svg"
        alt={`صورة ${servant.name}`}
        className="w-24"
      />
      <p className="mt-3 font-bold text-ink">{servant.name}</p>
      <p className="text-sm text-label">{servant.role}</p>
    </div>
  )
}

export function ServantsCard({ servants }: { servants: Servant[] }) {
  return (
    <Card tone="sage" className="h-full">
      <SectionLabel>خدام الخدمة</SectionLabel>
      <div className="mt-4 grid grid-cols-2 gap-6">
        {servants.map((servant) => (
          <ServantCard key={servant.name} servant={servant} />
        ))}
      </div>
    </Card>
  )
}
