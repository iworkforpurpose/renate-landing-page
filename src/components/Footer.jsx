import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo-transparent.png" alt="Renate" className="footer-logo" />
            <p className="footer-tagline">
              Your autonomous AI recruiter. Always on, always reachable.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <ul>
              <li><a href="#product">Platform</a></li>
              <li><a href="#workflow">How it works</a></li>
              <li><a href="#benefits">Why Renate</a></li>
              <li><a href="#">Book a demo</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="mailto:hello@renate.in">Contact</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {year} Renate. All rights reserved.</span>
          <span className="footer-confidential">Confidential · {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
    </footer>
  );
}
