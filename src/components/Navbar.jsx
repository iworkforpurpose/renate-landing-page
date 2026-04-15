import { useEffect, useState } from 'react';
import './Navbar.css';
import { Download } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-transparent.png" alt="Renate AI" style={{ height: '120px', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </div>
        
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#product">Product</a>
          <a href="#about">About</a>
        </div>
        
        <div className="nav-actions">
          <button className="btn-primary">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}
