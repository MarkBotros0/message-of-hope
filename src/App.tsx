import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { MinistryPage } from './pages/MinistryPage'

function App() {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/youth" replace />} />
        <Route path="/:slug" element={<MinistryPage />} />
      </Routes>
    </div>
  )
}

export default App
