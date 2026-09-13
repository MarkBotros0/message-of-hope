import { SectionBand } from '../components/SectionBand'
import { ServicesPuzzle } from '../components/ServicesPuzzle'
import { TenetTiles } from '../components/TenetTiles'
import { Tile } from '../components/Tile'
import { about } from '../data/ministries'

/** A labelled row inside the رؤية/مهمة spread: the label takes a narrow fixed
 *  column and the text the rest, so both rows share one label edge. The columns
 *  only split from `md` — below that the label stacks above its text, where a
 *  9rem column would leave the prose nothing to sit in. */
const aboutRow = 'grid gap-4 p-7 sm:p-9 md:grid-cols-[9rem_1fr] md:gap-10'

/** من نحن — the organisation's own statement of itself: vision, mission, and
 *  the seven values it is held to. Every line is the client's own text (see
 *  `about` in `data/ministries`). */
export function AboutPage() {
  return (
    <main id="main">
      {/* Full-bleed banner, flush under the header: the ministries as the
          pieces of one puzzle. It carries no heading of its own — the picture
          is the statement, and the page's title follows on the tiles below.
          Capped at 90rem so the pieces never grow past a banner's height on a
          wide monitor; the rule underneath still runs edge to edge. */}
      <div className="border-b border-line">
        <div className="mx-auto max-w-[90rem]">
          <ServicesPuzzle />
        </div>
      </div>

      {/* The page still needs to say what it is to screen readers and to
          search — the heading is kept, just not drawn. */}
      <h1 className="sr-only">من نحن</h1>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* One tile, two labelled rows, rather than two stacked tiles. The
            label sits in its own narrow column with the text beside it, so a
            one-line vision and a two-paragraph mission each fill their row
            instead of leaving a tile mostly empty, and the pair reads as one
            statement of purpose with two parts. */}
        <SectionBand title="رؤيتنا ومهمتنا" banner>
          <Tile className="overflow-hidden">
            <div className={aboutRow}>
              <div>
                <h3 className="font-display text-lg font-extrabold">رؤيتنا</h3>
                <span className="mt-2 block h-1 w-10 rounded-full bg-leaf" />
              </div>
              {/* The vision outranks the mission prose on size, not on weight —
                  it is the aspiration the rest of the page answers to. */}
              <p className="text-xl leading-[1.9] text-ink sm:text-2xl sm:leading-[1.8]">
                {about.vision}
              </p>
            </div>

            <div className={`border-t border-line ${aboutRow}`}>
              <div>
                <h3 className="font-display text-lg font-extrabold">مهمتنا</h3>
                <span className="mt-2 block h-1 w-10 rounded-full bg-leaf" />
              </div>
              <div className="space-y-4">
                {about.mission.map((paragraph) => (
                  <p key={paragraph} className="leading-loose">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Tile>
        </SectionBand>

        <SectionBand id="values" title="قيمنا الأساسية" className="pb-14" banner>
          <TenetTiles items={about.values} columns={2} />
        </SectionBand>
      </div>
    </main>
  )
}
