import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { Footer } from './components/Footer'
import { MinistryPage } from './pages/MinistryPage'

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/youth" replace />} />
          <Route path="/:slug" element={<MinistryPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
