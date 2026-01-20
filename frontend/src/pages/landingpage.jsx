import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/landingpage.css'

import bg from '../assets/images/landingpage-bg.png'
import model from '../assets/images/landingpage-model.png'

export default function landingpage() {
  const settings = {
    dots: false, 
    arrows: false, 
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,

    speed: 12000,      
    autoplaySpeed: 0, 
    cssEase: 'linear', 
    pauseOnHover: false, 

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const slides = [
    {
      id: 1,
      title: 'Weight Management & Metabolic Support Peptides',
      image: 'https://figmage.com/images/puRiWO2Z6MBtD1teOhC48.png',
      bgColor: '#c0c0c0'
    },
    {
      id: 2,
      title: 'Regenerative, Repair & Anti-Aging Peptides',
      image: 'https://figmage.com/images/XDecqGJAAJav0VJY_fXO5.png',
      bgColor: '#b72b1f'
    },
    {
      id: 3,
      title: 'Growth Hormone–Modulating Peptides',
      image: 'https://figmage.com/images/rxKLzrCBAm1jKlR75BTxV.png',
      bgColor: '#000000'
    },
    {
      id: 4,
      title: 'Cognitive, Mood & Stress Support Peptides',
      image: 'https://figmage.com/images/LfTurMlKN905xgbPlI6Ep.png',
      bgColor: '#c0c0c0'
    },
    {
      id: 5,
      title: 'Skin, Beauty & Cosmetic Peptides',
      image: 'https://figmage.com/images/sOsMv7TTRaVrKDpd_7IvI.png',
      bgColor: '#b72b1f'
    },
    {
      id: 6,
      title: 'Sexual Wellness Peptides',
      image: 'https://figmage.com/images/8eTV3sYYcirmsV22U2F_2.png',
      bgColor: '#f1c40f'
    },
    {
      id: 7,
      title: 'Fat Burner Injectables (Not Peptides)',
      image: 'https://figmage.com/images/NlWdD5i3UFKL9xgi6BWOe.png',
      bgColor: '#c0c0c0'
    },
    {
      id: 8,
      title: 'Hormones & Growth Factors (Not Peptides)',
      image: 'https://figmage.com/images/mzW3hIwGW8b1x1SLv4P2F.png',
      bgColor: '#b72b1f'
    },
    {
      id: 9,
      title: 'Vitamins, Cofactors & Others',
      image: 'https://figmage.com/images/rW9JTYeLDI1_8F22Y54Co.png',
      bgColor: '#000000'
    },
    {
      id: 10,
      title: 'Injectable Pens',
      image: 'https://figmage.com/images/WiIA4wRF4bvNEuEPplWrB.png',
      bgColor: '#f1c40f'
    },
  ]

  // FAQ data
    const faqs = [
      {
        question: 'What are peptides and how do they work?',
        answer: 'Peptides are short chains of amino acids that act as signaling molecules in the body. They can help regulate various biological functions including metabolism, tissue repair, and hormone production.'
      },
      {
        question: 'Are your products safe and tested?',
        answer: 'Yes, all our products undergo strict quality control and testing procedures. We ensure that every product meets pharmaceutical-grade standards before reaching our customers.'
      },
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 3-5 business days within Metro Manila and 5-7 business days for provincial areas. Express shipping options are also available.'
      },
      {
        question: 'Do I need a prescription for peptide products?',
        answer: 'Some peptide products may require a prescription depending on local regulations. We recommend consulting with a healthcare professional before starting any new supplement regimen.'
      }
    ]
  
    const [expandedFaq, setExpandedFaq] = useState(0)
  
    const handleFaqClick = (index) => {
      setExpandedFaq(expandedFaq === index ? null : index)
    }

  return (
    <div>
      <Topbar />
      <div className="landingpage-content">
        <div className="hero-content">
          <div className="hero-background">
            <img src={bg} alt="bg" />
          </div>
          <div className="hero-text">
            <h1 className="hero-tagline">
              <div className="tagline-line-1">Elevate Your</div>
              <div className="tagline-line-2">Wellness Journey</div>
              <div className="tagline-line-3">
                with <span className="tagline-power">Power</span><span className="tagline-m">M</span><span className="tagline-ed">ed</span>
              </div>
            </h1>
            <p>We combine quality, innovation, and safety to bring you products you can trust. From daily health essentials to advanced wellness solutions, PowerMed is committed to helping you feel confident, comfortable, and in control of your well-being.</p>
            <Link to="/products">
              <button className="shop-now-btn">SHOP NOW</button>
            </Link>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="carousel-section">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div key={slide.id} className="slide-item">
                <div
                  className="slide-content"
                  style={{ backgroundColor: slide.bgColor }}
                >
                  <div className="slide-text">
                    <img src={slide.image} alt={slide.title} className="slide-image" />
                    <h3>{slide.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="first-info-section">
          <img src={model} alt="model" />
          <div className="info-text">
            {/* How It Works Header */}
            <div className="how-it-works-header">
              <p className="how-it-works-subtitle">HOW IT WORKS</p>
              <h2 className="how-it-works-title">
                Your Performance & Wellness Journey Starts with PowerMed
              </h2>
            </div>

            {/* Steps */}
            <div className="how-it-works-steps">
              {/* Step 01 */}
              <div className="step-item">
                <div className="step-badge active">
                  <span>01</span>
                </div>
                <div className="step-content">
                  <h3>Explore Targeted Therapy Categories</h3>
                  <p>Find science-backed solutions designed to support your goals — from metabolic health and recovery to beauty, cognition, and performance.</p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="step-item">
                <div className="step-badge">
                  <span>02</span>
                </div>
                <div className="step-content">
                  <h3>Choose the Right Product for Your Needs</h3>
                  <p className="step-intro">Select from PowerMed's specialized product lines:</p>
                  <ul className="product-list">
                    <li>Weight Management & Metabolic Support Peptides</li>
                    <li>Regenerative, Repair & Anti-Aging Peptides</li>
                    <li>Growth Hormone–Modulating Peptides</li>
                    <li>Cognitive, Mood & Stress Support Peptides</li>
                    <li>Skin, Beauty & Cosmetic Peptides</li>
                    <li>Sexual Wellness Peptides</li>
                    <li>Fat Burner Injectables (Not Peptides)</li>
                    <li>Hormones & Growth Factors (Not Peptides)</li>
                    <li>Vitamins, Cofactors & Others</li>
                    <li>Injectable Pens</li>
                  </ul>
                  <span className="step-note">Each category is clearly organized to help you find exactly what fits your protocol.</span>
                </div>
              </div>

              {/* Step 03 */}
              <div className="step-item">
                <div className="step-badge">
                  <span>03</span>
                </div>
                <div className="step-content">
                  <h3>Integrate into Your Wellness Routine</h3>
                  <p>Receive high-quality research products prepared for precision and consistency. Follow your prescribed or research-based protocol and take control of your wellness journey with confidence.</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="how-it-works-cta">
                <button className="explore-products-btn">EXPLORE POWERMED PRODUCTS</button>
              </div>
            </div>
          </div>
        </div>

        <div className="second-info-section">
          <div className="second-info-text">
            <h1 className="second-info-title">Why Powermed?</h1>
            <p>Lorem ipsum dolor sit amet. Vel debitis quis in pariatur natus aut rerum assumenda rem quos Quis! A obcaecati voluptatem est obcaecati assumenda ut quidem nemo non quibusdam tempora ea eligendi assumenda et quibusdam impedit. Id tempore necessitatibus vel velit architecto eos fugit officia rem veritatis distinctio! Aut dignissimos ducimus et sequi voluptatibus aut quaerat velit ut consequatur optio.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="landing-faq-section">
          <div className="landing-faq-content">
            <h2 className="landing-faq-heading">Have Questions?</h2>
            <div className="landing-faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="landing-faq-item">
                  <div className="landing-faq-separator"></div>
                  <div className="landing-faq-question-wrapper" onClick={() => handleFaqClick(index)}>
                    <span className="landing-faq-question">{faq.question}</span>
                    <span className="landing-faq-icon">{expandedFaq === index ? '−' : '+'}</span>
                  </div>
                  {expandedFaq === index && (
                    <div className="landing-faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
              <div className="landing-faq-separator"></div>
            </div>
            <button className="landing-view-all-faqs-btn">VIEW ALL FAQS</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}