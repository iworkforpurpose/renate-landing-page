import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoIntro from './components/VideoIntro'
import FeatureCurved from './components/FeatureCurved'
import FeatureSplit from './components/FeatureSplit'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Global scroll effects setup
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <VideoIntro />
        <FeatureCurved />
        
        <FeatureSplit 
          title="AI IDE Core" 
          description="A powerful, intelligent environment that anticipates your needs and writes code alongside you."
          imageType="code"
          reversed={false}
        />
        <FeatureSplit 
          title="Higher-level Abstractions" 
          description="Build faster by working with advanced blocks. Let the AI handle the boilerplate."
          imageType="blocks"
          reversed={true}
        />
        <FeatureSplit 
          title="Cross-surface Agents" 
          description="Deploy intelligent agents that span across different parts of your application architecture."
          imageType="nodes"
          reversed={false}
        />
        
        <Carousel type="developers" />
        <Carousel type="blogs" />
      </main>
      <Footer />
    </div>
  )
}

export default App
