import React from 'react'
import '../styles/footer.css'


export default function footer() {
  return (
    <div className="footer">
        <div className="footer-content">
            <div className="footer-first-section">
                <div className="footer-img">
                    <img src="https://figmage.com/images/iMa9rM-IVDGz6AHEzuP_s.png" alt="" />
                </div>
                <div className="footer-button">
                    <button>Explore Powermed Products</button>
                </div>
            </div>
            <div className="footer-second-section">
                <div className="learn">
                    <h3>LEARN</h3>
                    <p>FAQs</p>
                    <p>Menu</p>
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
    </div>
  )
}
