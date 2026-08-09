import { useId, useState, type CSSProperties } from 'react'
import { SectionBody } from './SectionBody'
import { TabStrip } from './TabStrip'
import { panelId, tabId } from './tabIds'
import type { MinistrySection } from '../data/ministries'

/** Switch between the sub-ministries of a page (خدمة الرحمة and اللاجئون
 *  السودانيون) via a sticky tab bar, so both stay discoverable. */
export function SubMinistryTabs({ sections }: { sections: MinistrySection[] }) {
  const [active, setActive] = useState(0)
  const prefix = `sub${useId()}`
  const section = sections[active]

  return (
    // The tab bar joins the header in the sticky stack; anchors offset by both.
    <div style={{ '--tabbar-h': '4.25rem' } as CSSProperties}>
      <div className="sticky top-[var(--header-h)] z-10 -mx-4 mb-2 bg-page/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <TabStrip
          labels={sections.map((s) => s.tabLabel ?? s.heading ?? '')}
          active={active}
          onChange={setActive}
          idPrefix={prefix}
        />
      </div>

      <div
        id={panelId(prefix, active)}
        role="tabpanel"
        aria-labelledby={tabId(prefix, active)}
        tabIndex={0}
        className="[animation:fadeIn_0.35s_ease] focus-visible:outline-none"
      >
        <SectionBody section={section} showStats />
      </div>
    </div>
  )
}
