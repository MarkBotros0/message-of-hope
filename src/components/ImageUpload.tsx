import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ImagePlus } from 'lucide-react'

interface ImageUploadProps {
  /** Text shown inside the empty placeholder (e.g. "صورة الخدمة"). */
  label: string
  variant?: 'circle' | 'card'
  className?: string
}

/**
 * Interactive "browse files" slot. Clicking opens the file picker; the chosen
 * image is previewed in place. The object URL is revoked on replace/unmount.
 */
export function ImageUpload({
  label,
  variant = 'card',
  className = '',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const urlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const url = URL.createObjectURL(file)
    urlRef.current = url
    setPreview(url)
  }

  const isCircle = variant === 'circle'
  const shape = isCircle ? 'aspect-square rounded-full' : 'rounded-2xl'

  return (
    <label
      className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed border-line bg-sage-tint/40 text-center transition hover:border-brand hover:bg-sage-tint ${shape} ${className}`}
    >
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />
      {preview ? (
        <img
          src={preview}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className="flex flex-col items-center gap-1 px-2 text-label">
          <ImagePlus
            className="mb-1 opacity-70 transition group-hover:opacity-100"
            size={isCircle ? 18 : 24}
            strokeWidth={1.5}
          />
          <span className="text-xs font-semibold leading-tight">{label}</span>
          <span className="text-[11px] text-body/70" dir="ltr">
            or <span className="underline">browse files</span>
          </span>
        </span>
      )}
    </label>
  )
}
