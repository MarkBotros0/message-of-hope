import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { MinistryPage } from './pages/MinistryPage'

/** Send the reader back to the top when the route changes — an SPA otherwise
 *  keeps the previous scroll offset. Hash links are left alone.
 *
 *  Keyed on the first path segment, not the whole pathname: switching between
 *  sub-ministry tabs is a move *within* a page, so it must keep its place. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const page = pathname.split('/')[1] ?? ''

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0 })
  }, [page, hash])

  return null
}

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>
      <SiteHeader />
      <ScrollToTop />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* `:sub` selects a sub-ministry on multi-section pages. */}
          <Route path="/:slug" element={<MinistryPage />} />
          <Route path="/:slug/:sub" element={<MinistryPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
