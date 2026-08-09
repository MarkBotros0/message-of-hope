import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { Footer } from './components/Footer'
import { MinistryPage } from './pages/MinistryPage'

/** Send the reader back to the top when the route changes — an SPA otherwise
 *  keeps the previous scroll offset. Hash links are left alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

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
          <Route path="/" element={<Navigate to="/children" replace />} />
          <Route path="/:slug" element={<MinistryPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
