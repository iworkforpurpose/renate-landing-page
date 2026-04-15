import './Footer.css';
import { Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        <div className="pricing-cta-cards">
          <div className="cta-card developer-card">
            <div className="cta-header">
              <h3>For Developers</h3>
              <p>Everything you need to build faster and smarter.</p>
            </div>
            <div className="cta-action">
              <button className="btn-primary">
                <Download size={18} />
                Download beta
              </button>
              <div className="subtext">Free for individual use</div>
            </div>
          </div>
          
          <div className="cta-card org-card">
            <div className="cta-header">
              <h3>For Organizations</h3>
              <p>Scalable, secure, and enterprise-ready agent deployments.</p>
            </div>
            <div className="cta-action">
              <button className="btn-secondary">
                Notify me
              </button>
              <div className="subtext">Coming soon</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-branding">
            <img src="/logo-transparent.png" alt="Renate AI" style={{ height: '100px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
