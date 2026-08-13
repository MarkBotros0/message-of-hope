import { useId, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionBody } from './SectionBody'
import { TabStrip } from './TabStrip'
import { panelId, tabId } from './tabIds'
import { sectionIndex, sectionPath, type Ministry } from '../data/ministries'

interface SubMinistryTabsProps {
  ministry: Ministry
  /** The `:sub` URL segment; an unknown value falls back to the first tab. */
  sub?: string
}

/** Switch between the sub-ministries of a page (خدمة الرحمة and اللاجئون
 *  السودانيون) via a sticky tab bar.
 *
 *  The active tab lives in the URL rather than component state, so each
 *  sub-ministry is linkable from the nav and survives a refresh or a share. */
export function SubMinistryTabs({ ministry, sub }: SubMinistryTabsProps) {
  const navigate = useNavigate()
  const { sections } = ministry
  const active = sectionIndex(ministry, sub)
  const prefix = `sub${useId()}`
  const section = sections[active]

  return (
    // The tab bar joins the header in the sticky stack; anchors offset by both.
    <div style={{ '--tabbar-h': '4.25rem' } as CSSProperties}>
      <div className="sticky top-[var(--header-h)] z-10 -mx-4 mb-2 bg-page/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <TabStrip
          labels={sections.map((s) => s.tabLabel ?? s.heading ?? '')}
          active={active}
          onChange={(index) => navigate(sectionPath(ministry, sections[index]))}
          idPrefix={prefix}
        />
      </div>

      <div
        // Re-keyed per section so the entrance animation replays on switch.
        key={section.slug ?? active}
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
