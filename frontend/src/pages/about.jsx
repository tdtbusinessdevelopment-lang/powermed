import React from 'react'
import '../styles/about.css'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import aboutImage from '../assets/images/abt-img.png'

function About() {  
  return (
    <div>
      <Topbar />
      <div className="about-container">
        <div className="about-content">
          <h1>About <span>U</span>s</h1>
          <p>At PowerMed, we believe that wellness is most effective when it is understood, responsible, and intentional. True health and performance come from informed decisions, and our mission is to provide clear, science-backed guidance that empowers thoughtful and responsible choices. We place responsibility at the center of wellness science. Every solution we provide is guided by safety, ethical practice, and structured protocols, creating a wellness ecosystem that is trustworthy, sustainable, and reliable.</p>
          <p>Our commitment to purity, consistency, and research integrity ensures that every product and protocol meets the highest standards, supporting meaningful, long-term results with confidence. We embrace a relationship-centered approach, prioritizing long-term collaboration over one-time transactions By offering guidance, support, and ongoing service, we help our partners achieve their wellness goals safely and effectively.</p>
        </div>
        <img src={aboutImage} alt="About Us" />
      </div>
      <div className="about-second-container">
        <div className="about-second-content">
          <div className="video-container">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
              title="PowerMed Values"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="values-container">
            <h2>Our <span>Values</span></h2>
            <p>Every interaction with PowerMed reflects a calm, professional, and credible experience. From communications to product presentation, we focus on clarity and integrity, helping our clients make informed decisions with confidence.</p>
          </div>
        </div>
      </div>
      <div className="second-info-section">
          <div className="second-info-text">
            <h1 className="second-info-title">Why Powermed?</h1>
            <p>PowerMed is more than a provider of wellness solutions — it is a partner in informed, responsible, and sustainable health, committed to empowering individuals and organizations to achieve lasting results.</p>
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default About  
