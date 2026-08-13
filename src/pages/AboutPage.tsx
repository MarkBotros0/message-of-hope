import { ServiceHero } from '../components/ServiceHero'
import { SectionBand } from '../components/SectionBand'
import { ServiceTiles } from '../components/ServiceTiles'
import { ContactTile } from '../components/ContactTile'
import { Pending } from '../components/Pending'
import { Tile } from '../components/Tile'
import { site } from '../data/ministries'

/** من نحن — the organisation at a glance.
 *
 *  Composed from the service pages' own content. The client's document carries
 *  no founding story or organisational profile, so that band stays an explicit
 *  PENDING placeholder rather than invented copy. */
export function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
      <ServiceHero
        eyebrow={site.tagline}
        title="من نحن"
        description={site.intro}
        actions={[
          { label: 'مجالات خدمتنا', href: '#areas' },
          { label: 'تواصل معنا', href: '#contact', variant: 'outline' },
        ]}
      />

      <SectionBand
        id="areas"
        title="أين نخدم"
        lead="ثلاثة مجالات رئيسية، وتحت خدمة الرحمة قسمان."
      >
        <ServiceTiles />
      </SectionBand>

      <SectionBand title="نبذة عن المؤسسة">
        <Tile tone="tint" className="p-7 sm:p-9">
          <p className="max-w-[75ch] leading-loose">
            نبذة تعريفية عن نشأة الخدمة وهيكلها التنظيمي وشركائها — بانتظار
            النص من المؤسسة.
          </p>
          <Pending className="mt-4" />
        </Tile>
      </SectionBand>

      <SectionBand id="contact" className="pb-14">
        <ContactTile />
      </SectionBand>
    </main>
  )
}
