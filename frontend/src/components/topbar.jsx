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

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
                <p>Welcome to Powermed</p>
            </div>
            <div className="utility-bar-bottom">
                <p>Welcome to Powermed</p>
            </div>
        </div>

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="https://figmage.com/images/FT6UQOqUgEyM0ZPmMvU6W.png" alt="powermed logo" />
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
                          <div className="dropdown-item">Loading categories...</div>
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
                <div className="dropdown-item">Loading categories...</div>
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