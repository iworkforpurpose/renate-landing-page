import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import DashboardOverviewPage from './pages/DashboardOverviewPage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import CandidatesPage from './pages/CandidatesPage'
import CandidateDetailPage from './pages/CandidateDetailPage'
import SettingsPage from './pages/SettingsPage'
import { isSignedUp } from './lib/auth'

function RequireSignup({ children }) {
  return isSignedUp() ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<RequireSignup><DashboardOverviewPage /></RequireSignup>} />
        <Route path="/dashboard/jobs" element={<RequireSignup><JobsPage /></RequireSignup>} />
        <Route path="/dashboard/jobs/:jobId" element={<RequireSignup><JobDetailPage /></RequireSignup>} />
        <Route path="/dashboard/jobs/:jobId/:candidateId" element={<RequireSignup><CandidateDetailPage /></RequireSignup>} />
        <Route path="/dashboard/candidates" element={<RequireSignup><CandidatesPage /></RequireSignup>} />
        <Route path="/dashboard/settings" element={<RequireSignup><SettingsPage /></RequireSignup>} />
      </Route>
    </Routes>
  )
}

export default App
