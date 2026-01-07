import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/topbar.css'
import { FaSearch, FaPlus, FaChevronDown } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export default function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [productsHover, setProductsHover] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
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

  const productCategories = [
    "Weight Management & Metabolic Support Peptides",
    "Regenerative, Repair & Anti-Aging Peptides",
    "Growth Hormone–Modulating Peptides",
    "Cognitive, Mood & Stress Support Peptides",
    "Skin, Beauty & Cosmetic Peptides",
    "Sexual Wellness Peptides",
    "Fat Burner Injectables (Not Peptides)",
    "Hormones & Growth Factors (Not Peptides)",
    "Vitamins, Cofactors & Others",
    "Injectable Pens"
  ]

  return (
    <div className="topbar-wrapper">
        {/* Utility Bar */}
        <div className="utility-bar">
            <div className="utility-bar-top">
                <p>Welcome to Powermed</p>
            </div>
            <div className="utility-bar-bottom">
                <p>Welcome to Powermed</p>
            </div>
        </div>

        {/* Logo */}
        <div className="logo">
            <img src="https://figmage.com/images/FT6UQOqUgEyM0ZPmMvU6W.png" alt="powermed logo" />
        </div>

        {/* Header with Dropdown */}
        <div className="header-container">
          <header className="header">
              {/* Nav */}
              <div className="header-left">
                  <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
                  <button className="mobile-menu-close" onClick={closeMobileMenu}>
                      ×
                  </button>

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
                  <NavLink 
                      to="/about" 
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={closeMobileMenu}
                  >
                      ABOUT US
                  </NavLink>
                  <NavLink 
                      to="/contact" 
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={closeMobileMenu}
                  >
                      CONTACT US
                  </NavLink>
                  </nav>
              </div>

              <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              ☰
              </button>

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

                  <button className="view-btn">View Products</button>
              </div>
        </header>

        {/* Products Dropdown Menu - MOVED INSIDE header-container */}
        {productsOpen && (
          <div className="products-dropdown">
            <div className="dropdown-content">
              {productCategories.map((category, index) => {
                const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                return (
                  <Link 
                    key={index} 
                    to={`/products?category=${categorySlug}`}
                    className="dropdown-item"
                    onClick={() => setProductsOpen(false)}
                  >
                    {category}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      <div 
        className={`search-overlay ${searchOpen ? 'active' : ''}`}
        onClick={toggleSearch}
      />
      
      <div className={`search-bar-expanded ${searchOpen ? 'active' : ''} ${searchFocused ? 'focused' : ''}`}>
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
    </div>
  )
}