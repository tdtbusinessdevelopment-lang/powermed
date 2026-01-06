import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/topbar.css'

export default function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div>
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

        {/* Header */}
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
                    onClick={closeMobileMenu}
                >
                    PRODUCTS <span className="dropdown-arrow">▼</span>
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
                    <input
                    type="text"
                    placeholder="Search products..."
                    className="search-input"
                    />
                    <button className="search-btn">
                    🔍
                    </button>
                </div>

                <button className="choose-btn">View Products</button>
            </div>

      </header>
    </div>
  )
}