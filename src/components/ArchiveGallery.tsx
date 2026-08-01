import { Card } from './Card'
import { SectionLabel } from './SectionLabel'
import { ImageUpload } from './ImageUpload'

export function ArchiveGallery({ count }: { count: number }) {
  return (
    <Card>
      <SectionLabel>من أرشيف الخدمة والفعاليات</SectionLabel>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <ImageUpload
            key={index}
            label="صورة من الأرشيف"
            className="aspect-[4/3] w-full"
          />
        ))}
      </div>
    </Card>
  )
}
