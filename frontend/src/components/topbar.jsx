import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/topbar.css'
import { FaSearch, FaPlus, FaChevronDown } from 'react-icons/fa'
import { BsBag } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { categoryAPI } from '../utils/api'

export default function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [productsHover, setProductsHover] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [productCategories, setProductCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentBottomTextIndex, setCurrentBottomTextIndex] = useState(0)
  
  const utilityTexts = [
    "Introducing PowerMed — Advanced Peptide Solutions for Modern Wellness. Science-Driven. Results-Focused.",
    "Start strong. Stay consistent. Save up to 25%"
  ]
  
  const utilityBottomTexts = [
    "Semaglutide - Clinically proven weight management.",
    "Tirzepatide - Elevating Standards in Personalized Endocrine Care.",
    "Retatrutide - Manage weight, improve metabolism.",
    "Cagrilintide - Precision Intervention in Hormonal Weight Regulation.",
    "AOD9604 - Precision Adipose Tissue Regulation and Metabolic Efficiency.",
    "5-Amino-1MO - Insulin sense for defense that is dense.",
    "Survodutide - Metabolic flow helps your health grow.",
    "MOTS-C - Natural essence for health's fluorescence.",
    "BPC-157 - Accelerates tissue repair and reduces inflammation.",
    "TB-500 - Accelerate healing and reduce recovery time.",
    "Epitalon - Advanced cellular rejuvenation for timeless skin vitality.",
    "SS31 - Maximizing mitochondrial resilience for prolonged metabolic health.",
    "GHK-Cu - Advanced peptide therapy for systemic dermal regeneration.",
    "DSIP -  Neuromodulating peptide for optimized sleep architecture and stress resilience.",
    "Semax - Advanced melanocortin therapy for neural regeneration and cognitive optimization.",
    "Selank - Acilitating neuromuscular performance and systemic mental wellness.",
    "Snap-8 - Advanced relief for wrinkle grief.",
    "BB20 - Systemic flow to help your health grow.",
    "GHK-Cu - Wellness attained and strength regained.",
    "Glow ( GHK-Cu, TB-500, BPC-157) - Triple blend for health to mend",
    "PT-141 - Clinical-grade melanocortin agonist for rapid-onset sexual wellness and response.",
    "Kisspeptin - Precision hormonal signaling for the restoration of physiological reproductive health.",
    "Oxytocin - Advanced hormonal support for cardiovascular health and emotional homeostasis.",
    "Lipo-C - A synergistic lipotropic formulation designed for systemic fat metabolism support.",
    "Lemon Bottle - Strategic metabolic solution for targeted localized lipolysis.",
    "HGH - Hormonal grace for a steady pace.",
    "HCG - Integrity gained as health is sustained.",
    "IGF-1 LR3 - Potency clear throughout the year.",
    "BAC Water - Stability found for a health that's sound.",
    "Botox - Surface repair for skin beyond compare.",
    "NAD+ - DNA repair with clinical flair."
  ]

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Text rotation effect for top bar
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % utilityTexts.length)
    }, 8000) // 8 seconds
    return () => clearInterval(interval)
  }, [])

  // Text rotation effect for bottom bar - faster
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBottomTextIndex((prevIndex) => (prevIndex + 1) % utilityBottomTexts.length)
    }, 4000) // 4 seconds
    return () => clearInterval(interval)
  }, [])

  // Fetch categories when products dropdown opens
  useEffect(() => {
    if (productsOpen && productCategories.length === 0) {
      setLoading(true)
      categoryAPI.getAll()
        .then(data => {
          setProductCategories(data.categories || data || [])
        })
        .catch(error => {
          console.error('Error fetching categories:', error)
          setProductCategories([])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [productsOpen, productCategories.length])

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (cartOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [cartOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setProductsOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (searchOpen) {
      setSearchFocused(false)
    }
  }

  const handleSearchFocus = () => {
    setSearchFocused(true)
  }

  const toggleProducts = (e) => {
    e.preventDefault()
    setProductsOpen(!productsOpen)
  }

  const toggleCart = (e) => {
    e.preventDefault()
    setCartOpen(!cartOpen)
  }

  const closeCart = () => {
    setCartOpen(false)
  }

  // Function to convert category name to slug
  const categoryToSlug = (categoryName) => {
    return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  return (
    <div className="topbar-wrapper">
        {/* Utility Bar */}
        <div className="utility-bar">
            <div className={`utility-bar-top ${isScrolled ? 'hidden' : ''}`}>
                <div className="utility-text-container">
                  {utilityTexts.map((text, index) => (
                    <p 
                      key={index}
                      className={`utility-text ${index === currentTextIndex ? 'active' : ''}`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
            </div>
            <div className="utility-bar-bottom">
                <div className="utility-text-container">
                  {utilityBottomTexts.map((text, index) => (
                    <p 
                      key={index}
                      className={`utility-text ${index === currentBottomTextIndex ? 'active' : ''}`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
            </div>
        </div>
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="https://figmage.com/images/_yDQ0sv0GGwgHZsY5Pnnf.png" alt="powermed logo" />
          </Link>
        </div>
        {/* Header with Dropdown */}
        <div className="header-container">
          <header className="header">
              {/* Mobile Menu Toggle - moved before nav */}
              <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                ☰
              </button>
              {/* Nav - removed header-left wrapper */}
              <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
                <button className="mobile-menu-close" onClick={closeMobileMenu}>
                    ×
                </button>
                <div className="nav-link-wrapper">
                  <NavLink 
                      to="/products" 
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={toggleProducts}
                      onMouseEnter={() => setProductsHover(true)}
                      onMouseLeave={() => setProductsHover(false)}
                  >
                      PRODUCTS 
                      <span className="dropdown-icon-wrapper">
                        <FaChevronDown className={`dropdown-icon chevron ${productsHover || productsOpen ? 'hide' : ''}`} />
                        <FaPlus className={`dropdown-icon plus ${productsHover || productsOpen ? 'show' : ''}`} />
                      </span>
                  </NavLink>
                  
                  {/* Products Dropdown - Inside mobile menu */}
                  {productsOpen && (
                    <div className="products-dropdown mobile-dropdown">
                      <div className="dropdown-content">
                        {loading ? (
                          <div className="dropdown-item">Loading Products...</div>
                        ) : productCategories.length === 0 ? (
                          <div className="dropdown-item">No categories available</div>
                        ) : (
                          productCategories.map((category) => {
                            const categorySlug = categoryToSlug(category.name)
                            return (
                              <Link 
                                key={category._id} 
                                to={`/products?category=${categorySlug}`}
                                className="dropdown-item"
                                onClick={closeMobileMenu}
                              >
                                {category.name}
                              </Link>
                            )
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    onClick={closeMobileMenu}
                >
                    ABOUT US
                </NavLink>
                <NavLink 
                    to="/calculator" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    onClick={closeMobileMenu}
                >
                    CALCULATOR
                </NavLink>
                <NavLink 
                    to="/contact" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    onClick={closeMobileMenu}
                >
                    CONTACT US
                </NavLink>
              </nav>
              <div 
                className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
              ></div>
              <div className="header-right">
                  <div className="search-container">
                      <button className="search-btn" onClick={toggleSearch}>
                          <FaSearch />
                      </button>
                  </div>
                  <Link to="/products" className="view-btn">View Products</Link>
                  <button className="cart-btn" onClick={toggleCart}>
                    <BsBag />
                  </button>
              </div>
              
        </header>
        {/* Products Dropdown Menu - Desktop only */}
        {productsOpen && (
          <div className="products-dropdown desktop-dropdown">
            <div className="dropdown-content">
              {loading ? (
                <div className="dropdown-item">Loading Products...</div>
              ) : productCategories.length === 0 ? (
                <div className="dropdown-item">No categories available</div>
              ) : (
                productCategories.map((category) => {
                  const categorySlug = categoryToSlug(category.name)
                  return (
                    <Link 
                      key={category._id} 
                      to={`/products?category=${categorySlug}`}
                      className="dropdown-item"
                      onClick={() => setProductsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
      {/* Search Overlay */}
      <div 
        className={`search-overlay ${searchOpen ? 'active' : ''}`}
        onClick={toggleSearch}
      />
      
      <div className={`search-bar-expanded ${searchOpen ? 'active' : ''} ${searchFocused ? 'focused' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <input
          type="text"
          placeholder="Search"
          className="search-input-expanded"
          onFocus={handleSearchFocus}
        />
        <button className="search-close-btn" onClick={toggleSearch}>
          <IoClose />
        </button>
      </div>
      {/* Cart Overlay */}
      <div 
        className={`cart-overlay ${cartOpen ? 'active' : ''}`}
        onClick={closeCart}
      />
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? 'active' : ''}`}>
        <div className="cart-sidebar-header">
          <BsBag className="cart-header-icon" />
          <h2 className="cart-header-title">Cart</h2>
          <button className="cart-close-btn" onClick={closeCart}>
            <IoClose />
          </button>
        </div>
        <div className="cart-sidebar-content">
          <div className="cart-empty">
            <BsBag className="cart-empty-icon" />
            <p className="cart-empty-text">Your cart is empty</p>
          </div>
        </div>
      </div>
    </div>
  )
}