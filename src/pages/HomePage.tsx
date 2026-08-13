import { ServiceHero } from '../components/ServiceHero'
import { SectionBand } from '../components/SectionBand'
import { ServiceTiles } from '../components/ServiceTiles'
import { QuoteTile } from '../components/QuoteTile'
import { ArchiveGallery } from '../components/ArchiveGallery'
import { ContactTile } from '../components/ContactTile'
import { getMinistry, highlightPhotos, site } from '../data/ministries'

/** الرئيسية — the site's front door.
 *
 *  Everything here is drawn from the service pages' own content: the three
 *  services, the verse خدمة الرحمة opens with, and the archive photos the
 *  client has supplied. Nothing is invented for the home page. */
export function HomePage() {
  const verse = getMinistry('mercy')?.sections[0].quote

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
      <ServiceHero
        eyebrow={site.tagline}
        title={site.name}
        description={site.intro}
        actions={[
          { label: 'خدماتنا', href: '#services' },
          { label: 'تواصل معنا', href: '#contact', variant: 'outline' },
        ]}
      />

      <SectionBand
        id="services"
        title="خدماتنا"
        lead="ثلاث خدمات، وتحت خدمة الرحمة قسمان."
      >
        <ServiceTiles />
      </SectionBand>

      {verse && (
        <SectionBand>
          <QuoteTile
            label="من الكتاب المقدس"
            text={verse.text}
            source={verse.source}
          />
        </SectionBand>
      )}

      {highlightPhotos.length > 0 && (
        <SectionBand title="من أرشيف الخدمة والفعاليات">
          <ArchiveGallery count={0} photos={highlightPhotos} />
        </SectionBand>
      )}

      <SectionBand id="contact" className="pb-14">
        <ContactTile />
      </SectionBand>
    </main>
  )
}
