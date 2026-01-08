import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/landingpage.css'
import bg from '../assets/images/landingpage-bg.png'

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
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#c0c0c0'
    },
    {
      id: 2,
      title: 'Regenerative, Repair & Anti-Aging Peptides',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#b72b1f'
    },
    {
      id: 3,
      title: 'Growth Hormone–Modulating Peptides',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#000000'
    },
    {
      id: 4,
      title: 'Cognitive, Mood & Stress Support Peptides',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#c0c0c0'
    },
    {
      id: 5,
      title: 'Skin, Beauty & Cosmetic Peptides',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#b72b1f'
    },
    {
      id: 6,
      title: 'Sexual Wellness Peptides',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#f1c40f'
    },
    {
      id: 7,
      title: 'Fat Burner Injectables (Not Peptides)',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#c0c0c0'
    },
    {
      id: 8,
      title: 'Hormones & Growth Factors (Not Peptides)',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#b72b1f'
    },
    {
      id: 9,
      title: 'Vitamins, Cofactors & Others"',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#000000'
    },
    {
      id: 10,
      title: 'Injectable Pens',
      image: 'https://figmage.com/images/gNZcqExlrP_owjc3QubrA.png',
      bgColor: '#f1c40f'
    },
  ]

  

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
      </div>
    </div>
  )
}