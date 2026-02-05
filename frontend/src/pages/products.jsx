import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import '../styles/products.css'


import { categoryAPI, productAPI } from '../utils/api'
import { getCloudinaryThumbnail } from '../utils/cloudinary'


export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)
  const [filtersExpanded, setFiltersExpanded] = useState([true, false, false, false])
  const [selectedFilters, setSelectedFilters] = useState({})

  const filterGroups = [
    {
      name: 'Product Type',
      options: [
        { label: 'Peptides', count: 12 },
        { label: 'Hormones & Growth Factors', count: 8 },
        { label: 'Vitamins & Cofactors', count: 5 },
        { label: 'Fat Burner Injectables', count: 6 }
      ],
      expanded: true
    },
    {
      name: 'Benefits',
      options: [
        { label: 'Weight Management', count: 10 },
        { label: 'Anti-Aging & Repair', count: 8 },
        { label: 'Cognitive Support', count: 6 },
        { label: 'Skin & Beauty', count: 5 },
        { label: 'Sexual Wellness', count: 4 }
      ],
      expanded: false
    },
    {
      name: 'Administration Method',
      options: [
        { label: 'Injectable', count: 15 },
        { label: 'Oral', count: 8 },
        { label: 'Topical', count: 4 }
      ],
      expanded: false
    },
    {
      name: 'Price Range',
      options: [
        { label: 'Under $500', count: 6 },
        { label: '$500 - $1,000', count: 10 },
        { label: '$1,000 - $2,000', count: 8 },
        { label: 'Above $2,000', count: 5 }
      ],
      expanded: false
    }
  ]

  // Function to convert category name to slug
  const categoryToSlug = (categoryName) => {
    return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  // Function to convert slug to category name
  const slugToCategoryName = (slug) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  // Set active category from URL parameter
  useEffect(() => {
    if (categories.length > 0) {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
        // Find category by slug
        const category = categories.find(cat => 
          categoryToSlug(cat.name) === categoryParam
        )
        if (category) {
          setActiveCategory(category)
          fetchProducts(category._id)
        } else {
          // If no category found, set first category as active
          setActiveCategory(categories[0])
          fetchProducts(categories[0]._id)
        }
      } else {
        // No category in URL, set first category as active
        if (categories.length > 0) {
          setActiveCategory(categories[0])
          fetchProducts(categories[0]._id)
        }
      }
    }
  }, [categories, searchParams])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryAPI.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async (categoryId) => {
    try {
      setProductsLoading(true)
      const data = await productAPI.getAll({ category: categoryId })
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
      setProducts([])
    } finally {
      setProductsLoading(false)
    }
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    const categorySlug = categoryToSlug(category.name)
    setSearchParams({ category: categorySlug })
    fetchProducts(category._id)
  }

  const toggleFilterGroup = (index) => {
    const newExpanded = [...filtersExpanded]
    newExpanded[index] = !newExpanded[index]
    setFiltersExpanded(newExpanded)
  }

  const toggleFilter = (groupIndex, optionIndex) => {
    const key = `${groupIndex}-${optionIndex}`
    setSelectedFilters({
      ...selectedFilters,
      [key]: !selectedFilters[key]
    })
  }

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

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className="products-page">
      <Topbar />
      <div className="products-content">
        <h1>Looking for Peptides & Wellness Products?</h1>
        <h3>Discover our comprehensive range of premium peptides, hormones, and wellness solutions tailored to your health needs.</h3>
        {loading ? (
          <div className="categories-scroll-container">
            <div className="categories-scroll">
              <div className="loading-text">Loading Products...</div>
            </div>
          </div>
        ) : (
        <div className="categories-scroll-container">
          <div className="categories-scroll">
              {categories.map((category) => (
                <div 
                  key={category._id} 
                  className={`category-card ${activeCategory?._id === category._id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="category-image"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                      }}
                    />
                  ) : null}
                  <div 
                    className="category-image-placeholder"
                    style={{ display: category.image ? 'none' : 'block' }}
                  ></div>
                  <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
      
      <div className="products-listing-section">
        <div className="filter-sidebar">
          <h2 className="filter-title">Filter:</h2>
          <div className="filter-separator"></div>
          {filterGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="filter-group">
              <div 
                className="filter-group-header"
                onClick={() => toggleFilterGroup(groupIndex)}
              >
                <span className="filter-group-name">{group.name}</span>
                <span className="filter-group-icon">
                  {filtersExpanded[groupIndex] ? '▲' : '▼'}
                </span>
              </div>
              {filtersExpanded[groupIndex] && (
                <div className="filter-group-options">
                  {group.options.map((option, optionIndex) => {
                    const key = `${groupIndex}-${optionIndex}`
                    return (
                      <label key={optionIndex} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedFilters[key] || false}
                          onChange={() => toggleFilter(groupIndex, optionIndex)}
                        />
                        <span>{option.label} ({option.count})</span>
                      </label>
                    )
                  })}
                </div>
              )}
              <div className="filter-separator"></div>
            </div>
          ))}
        </div>

        <div className="products-container">
          <div className="products-header">
            <select className="sort-dropdown">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
            <span className="products-count">
              {productsLoading ? 'Loading...' : `${products.length} products`}
            </span>
          </div>
          
          <div className="products-grid-container">
            {productsLoading ? (
              <div className="loading-text">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="loading-text">No products found in this category</div>
            ) : (
            <div className="products-grid">
              {products.map((product) => (
                  <div key={product._id} className="product-card">
                    {product.image ? (
                      <img 
                        src={getCloudinaryThumbnail(product.image, 300)} 
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'block'
                        }}
                      />
                    ) : null}
                    <div 
                      className="product-image-placeholder"
                      style={{ display: product.image ? 'none' : 'block' }}
                    ></div>
                    <div className="product-brand">{product.brand || 'PowerMed'}</div>
                    <div className="product-price">starts at ₱{formatPrice(product.price)}</div>
                    <h4 className="product-title">{product.name}</h4>
                    <p className="product-category-type">{product.categoryType || ''}</p>
                    <p className="product-description">{product.description || ''}</p>
                  <Link to={`/product/${product._id}`} className="view-product-btn">
                    VIEW PRODUCT
                    <span className="arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="faq-section">
        <div className="faq-content">
          <h2 className="faq-heading">Have Questions?</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-separator"></div>
                <div className="faq-question-wrapper" onClick={() => handleFaqClick(index)}>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-icon">{expandedFaq === index ? '−' : '+'}</span>
                </div>
                <div className={`faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                  <div className="faq-answer-inner">{faq.answer}</div>
                </div>
              </div>
            ))}
            <div className="faq-separator"></div>
          </div>
          <button className="view-all-faqs-btn">VIEW ALL FAQS</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
