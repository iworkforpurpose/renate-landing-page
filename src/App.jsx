import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PipelineCompressionStrip from './components/PipelineCompressionStrip'
import DesignPartners from './components/DesignPartners'
import ScoringPipeline from './components/ScoringPipeline'
import VoiceInterview from './components/VoiceInterview'
import TalkToRecruiter from './components/TalkToRecruiter'
import MetricsCTA from './components/MetricsCTA'
import Footer from './components/Footer'
import SignupPage from './pages/SignupPage'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-ink-800 font-display antialiased">
      <Navbar />
      <main>
        <Hero />
        <PipelineCompressionStrip />
        <DesignPartners />
        <ScoringPipeline />
        <VoiceInterview />
        <TalkToRecruiter />
        <MetricsCTA />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default App
