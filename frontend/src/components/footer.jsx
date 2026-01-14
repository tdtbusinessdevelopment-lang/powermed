import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-first-section">
          <div className="footer-img">
            <img src="https://figmage.com/images/pTTH1sn8Q28B5GUZOtSSl.png" alt="Nuthera Logo" />
          </div>
          <div className="footer-button">
            <button>Explore Powermed Products</button>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://figmage.com/images/Or9PvjghGnn-L7Wkcde3m.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://figmage.com/images/kUoQEcp4dpYomWOIrsWtR.png" alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="footer-second-section">
          <div className="learn">
            <h3>LEARN</h3>
            <p>FAQs</p>
            <p>Products</p>
            <p>Pricing</p>
            <p>My Account</p>
          </div>
        </div>
        <div className="footer-third-section">
          <div className="support">
            <h3>SUPPORT</h3>
            <p>Contact</p>
            <p>FAQ</p>
            <p>Partner with Us</p>
            <p>My Account</p>
          </div>
        </div>
        <div className="footer-fourth-section">
          <div className="send email">
            <h3>WELLNESS STARTS HERE.</h3>
            <p><span>Be the first to know.</span> Join the Nuthera community for menu drops, chef notes, and wellness tips tailored to your routine</p>
            <input className="email-input" type="email" placeholder="Enter your email" />
            <button className="email-button">Subscribe</button>
          </div>
        </div>
      </div>
      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">© {new Date().getFullYear()} PowerMed</p>
          <div className="footer-links">
            <a href="/terms">TERMS AND CONDITIONS</a>
            <span className="divider">|</span>
            <a href="/privacy">PRIVACY POLICY</a>
            <span className="divider">|</span>
            <a href="/nutritional">RESEARCH USE ONLY DISCLAIMER</a>
          </div>
        </div>
        <Link to="/admin/login" className="admin-access-link">Admin</Link>
      </div>
    </div>
  )
}
