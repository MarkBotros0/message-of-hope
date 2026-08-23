import { HeroCarousel } from '../components/HeroCarousel'
import { SectionBand } from '../components/SectionBand'
import { ServicePhotoTiles } from '../components/ServicePhotoTiles'
import { highlightPhotos } from '../data/ministries'

/** الرئيسية — the site's front door, matching أمل جديد: the archive photos as a
 *  hero slideshow, then the services as photo-led tiles. Nothing else. The
 *  verse, the archive grid and the contact tile all still live on the pages
 *  they belong to (the service pages and من نحن). */
export function HomePage() {
  return (
    <main id="main">
      {/* Full-bleed on phones, and flush to the header: the gutters and the gap
          above cost a screen-width photo more than the framing is worth. No
          bottom padding either — the services band brings its own. */}
      <div className="mx-auto max-w-6xl sm:px-6 sm:pt-8">
        <HeroCarousel photos={highlightPhotos} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionBand id="services" title="خدماتنا">
          <ServicePhotoTiles />
        </SectionBand>
      </div>
    </main>
  )
}
