import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PipelineCompressionStrip from '../components/PipelineCompressionStrip'
import DesignPartners from '../components/DesignPartners'
import ScoringPipeline from '../components/ScoringPipeline'
import VoiceInterview from '../components/VoiceInterview'
import TalkToRecruiter from '../components/TalkToRecruiter'
import MetricsCTA from '../components/MetricsCTA'
import Footer from '../components/Footer'

export default function LandingPage() {
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
