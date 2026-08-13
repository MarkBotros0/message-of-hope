import { ServiceHero } from './ServiceHero'
import { SectionBody } from './SectionBody'
import { SubMinistryTabs } from './SubMinistryTabs'
import type { Ministry } from '../data/ministries'

/** Where the hero's primary call to action should jump — always real content,
 *  never the pending contact block. */
function primaryTarget(ministry: Ministry): string {
  const first = ministry.sections[0]
  if (first.vision) return '#vision'
  if (first.goals) return '#goals'
  if (first.services) return '#services'
  return '#contact'
}

interface MinistryLayoutProps {
  ministry: Ministry
  /** The `:sub` URL segment, forwarded to the sub-ministry tabs. */
  sub?: string
}

export function MinistryLayout({ ministry, sub }: MinistryLayoutProps) {
  const multi = ministry.sections.length > 1
  const first = ministry.sections[0]

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
      <ServiceHero
        eyebrow={ministry.eyebrow}
        title={ministry.title}
        stats={multi ? [] : first.stats}
        actions={[
          { label: 'تعرّف على الخدمة', href: primaryTarget(ministry) },
          { label: 'تواصل معنا', href: '#contact', variant: 'outline' },
        ]}
      />

      {multi ? (
        <SubMinistryTabs ministry={ministry} sub={sub} />
      ) : (
        <SectionBody section={first} />
      )}
    </main>
  )
}
