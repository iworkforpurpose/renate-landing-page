import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemStrip from './components/ProblemStrip'
import Workflow from './components/Workflow'
import FeaturesTabbed from './components/FeaturesTabbed'
import BenefitsGrid from './components/BenefitsGrid'
import AlwaysReachable from './components/AlwaysReachable'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <ProblemStrip />
        <Workflow />
        <FeaturesTabbed />
        <BenefitsGrid />
        <AlwaysReachable />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
