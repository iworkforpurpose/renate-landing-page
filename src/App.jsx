import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoIntro from './components/VideoIntro'
import FeaturesTabbed from './components/FeaturesTabbed'
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
        
        <FeaturesTabbed />
        
        <Carousel type="developers" />
        <Carousel type="blogs" />
      </main>
      <Footer />
    </div>
  )
}

export default App
