import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PipelineCompressionStrip from './components/PipelineCompressionStrip'
import DesignPartners from './components/DesignPartners'
import ScoringPipeline from './components/ScoringPipeline'
import ShortlistDeepDive from './components/ShortlistDeepDive'
import SeeItRun from './components/SeeItRun'
import VoiceInterview from './components/VoiceInterview'
import Workflow from './components/Workflow'
import TalkToRecruiter from './components/TalkToRecruiter'
import Team from './components/Team'
import MetricsCTA from './components/MetricsCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white text-ink-800 font-display antialiased">
      <Navbar />
      <main>
        <Hero />
        <PipelineCompressionStrip />
        <DesignPartners />
        <ScoringPipeline />
        <ShortlistDeepDive />
        <SeeItRun />
        <VoiceInterview />
        <Workflow />
        <TalkToRecruiter />
        <Team />
        <MetricsCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
