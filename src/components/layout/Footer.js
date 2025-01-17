import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Navigation</h3>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">Projects</Link>
            <Link to="/skills" className="footer-link">Skills</Link>
            <Link to="/bio" className="footer-link">Bio</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: gillian@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Gillian 2025. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

