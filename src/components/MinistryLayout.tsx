import { ServiceHero } from './ServiceHero'
import { SectionBody } from './SectionBody'
import { SubMinistryTabs } from './SubMinistryTabs'
import type { Ministry } from '../data/ministries'

interface MinistryLayoutProps {
  ministry: Ministry
  /** The `:sub` URL segment, forwarded to the sub-ministry tabs. */
  sub?: string
}

export function MinistryLayout({ ministry, sub }: MinistryLayoutProps) {
  const multi = ministry.sections.length > 1
  const first = ministry.sections[0]

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
      <ServiceHero
        title={ministry.title}
        photo={ministry.cardPhoto}
      />

      {multi ? (
        <SubMinistryTabs ministry={ministry} sub={sub} />
      ) : (
        <SectionBody section={first} />
      )}
    </main>
  )
}
