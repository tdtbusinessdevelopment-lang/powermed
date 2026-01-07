import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import '../styles/products.css'

export default function Products() {
  const categories = [
    'Weight Management & Metabolic Support Peptides',
    'Regenerative, Repair & Anti-Aging Peptides',
    'Growth Hormone–Modulating Peptides',
    'Cognitive, Mood & Stress Support Peptides',
    'Skin, Beauty & Cosmetic Peptides',
    'Sexual Wellness Peptides',
    'Fat Burner Injectables (Not Peptides)',
    'Hormones & Growth Factors (Not Peptides)',
    'Injectable Pens',
    'Vitamins, Cofactors & Others'
  ]

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

  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(0)
  const [filtersExpanded, setFiltersExpanded] = useState(filterGroups.map(fg => fg.expanded))
  const [selectedFilters, setSelectedFilters] = useState({})

  // Function to convert category name to slug (matching topbar logic)
  const categoryToSlug = (categoryName) => {
    return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  // Set active category from URL parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      // Find the category index that matches the slug
      const categoryIndex = categories.findIndex(cat => 
        categoryToSlug(cat) === categoryParam
      )
      if (categoryIndex !== -1) {
        setActiveCategory(categoryIndex)
      }
    }
  }, [searchParams, categories])

  // All products organized by category
  const allProducts = [
    // Category 0: Weight Management & Metabolic Support Peptides
    {
      id: 1,
      category: 0,
      brand: 'PowerMed',
      price: '2,775.00',
      title: 'Semaglutide',
      categoryType: 'GLP-1 analog',
      description: 'Supports appetite management and healthy lifestyle goals.',
      image: ''
    },
    {
      id: 2,
      category: 0,
      brand: 'PowerMed',
      price: '3,885.00',
      title: 'Tirzepatide',
      categoryType: 'GIP/GLP-1 dual',
      description: 'Promotes balanced eating habits and metabolic wellness.',
      image: ''
    },
    {
      id: 3,
      category: 0,
      brand: 'PowerMed',
      price: '4,200.00',
      title: 'Retatrutide',
      categoryType: 'Triple agonist',
      description: 'Supports body composition and metabolic balance.',
      image: ''
    },
    {
      id: 4,
      category: 0,
      brand: 'PowerMed',
      price: '2,950.00',
      title: 'Cagrilintide',
      categoryType: 'Amylin analog',
      description: 'Aids in satiety and mindful eating patterns.',
      image: ''
    },
    {
      id: 5,
      category: 0,
      brand: 'PowerMed',
      price: '3,500.00',
      title: 'Survodutide',
      categoryType: 'Glucagon/GLP-1',
      description: 'Supports fitness routines and metabolic wellness.',
      image: ''
    },
    {
      id: 6,
      category: 0,
      brand: 'PowerMed',
      price: '1,200.00',
      title: 'AOD9604',
      categoryType: 'Peptide fragment',
      description: 'Promotes metabolic balance and cellular wellness.',
      image: ''
    },
    {
      id: 7,
      category: 0,
      brand: 'PowerMed',
      price: '1,350.00',
      title: '5-Amino-1MQ',
      categoryType: 'Metabolic peptide',
      description: 'Supports metabolic function and healthy lifestyle.',
      image: ''
    },
    {
      id: 8,
      category: 0,
      brand: 'PowerMed',
      price: '1,500.00',
      title: 'MOTS-C',
      categoryType: 'Mitochondrial peptide',
      description: 'Enhances metabolic wellness and cellular function.',
      image: ''
    },
    // Category 1: Regenerative, Repair & Anti-Aging Peptides
    {
      id: 9,
      category: 1,
      brand: 'PowerMed',
      price: '950.00',
      title: 'BPC-157',
      categoryType: 'Healing peptide',
      description: 'Supports active lifestyles and recovery routines.',
      image: ''
    },
    {
      id: 10,
      category: 1,
      brand: 'PowerMed',
      price: '1,100.00',
      title: 'TB-500',
      categoryType: 'Repair peptide',
      description: 'Promotes vitality and performance recovery.',
      image: ''
    },
    {
      id: 11,
      category: 1,
      brand: 'PowerMed',
      price: '850.00',
      title: 'GHK-Cu',
      categoryType: 'Cosmetic peptide',
      description: 'Supports skin quality and appearance.',
      image: ''
    },
    {
      id: 12,
      category: 1,
      brand: 'PowerMed',
      price: '1,200.00',
      title: 'Epitalon',
      categoryType: 'Anti-aging peptide',
      description: 'Promotes longevity and general wellness.',
      image: ''
    },
    {
      id: 13,
      category: 1,
      brand: 'PowerMed',
      price: '1,350.00',
      title: 'SS-31',
      categoryType: 'Mitochondrial peptide',
      description: 'Supports cell wellness and vitality.',
      image: ''
    },
    {
      id: 14,
      category: 1,
      brand: 'PowerMed',
      price: '750.00',
      title: 'DSIP',
      categoryType: 'Sleep peptide',
      description: 'Promotes relaxation and sleep support.',
      image: ''
    },
    // Category 2: Growth Hormone–Modulating Peptides
    {
      id: 15,
      category: 2,
      brand: 'PowerMed',
      price: '1,800.00',
      title: 'CJC-1295 (DAC)',
      categoryType: 'GH peptide',
      description: 'Supports vitality and active lifestyle optimization.',
      image: ''
    },
    {
      id: 16,
      category: 2,
      brand: 'PowerMed',
      price: '1,600.00',
      title: 'CJC-1295 (no DAC)',
      categoryType: 'GH peptide',
      description: 'Enhances wellness programs and performance research.',
      image: ''
    },
    {
      id: 17,
      category: 2,
      brand: 'PowerMed',
      price: '2,200.00',
      title: 'CJC + Ipamorelin',
      categoryType: 'Peptide blend',
      description: 'Promotes balanced wellness and recovery.',
      image: ''
    },
    {
      id: 18,
      category: 2,
      brand: 'PowerMed',
      price: '1,400.00',
      title: 'Ipamorelin',
      categoryType: 'GH secretagogue',
      description: 'Supports age-optimization and performance.',
      image: ''
    },
    {
      id: 19,
      category: 2,
      brand: 'PowerMed',
      price: '1,250.00',
      title: 'Sermorelin',
      categoryType: 'GH secretagogue',
      description: 'Promotes vitality and body composition.',
      image: ''
    },
    {
      id: 20,
      category: 2,
      brand: 'PowerMed',
      price: '1,550.00',
      title: 'Tesamorelin',
      categoryType: 'GH-related peptide',
      description: 'Supports wellness and body composition goals.',
      image: ''
    },
    // Category 3: Cognitive, Mood & Stress Support Peptides
    {
      id: 21,
      category: 3,
      brand: 'PowerMed',
      price: '900.00',
      title: 'Selank',
      categoryType: 'Nootropic peptide',
      description: 'Promotes calmness and balanced mood.',
      image: ''
    },
    {
      id: 22,
      category: 3,
      brand: 'PowerMed',
      price: '950.00',
      title: 'Semax',
      categoryType: 'Nootropic peptide',
      description: 'Supports focus and mental performance.',
      image: ''
    },
    {
      id: 23,
      category: 3,
      brand: 'PowerMed',
      price: '750.00',
      title: 'DSIP',
      categoryType: 'Sleep peptide',
      description: 'Promotes relaxation and nighttime wellness.',
      image: ''
    },
    // Category 4: Skin, Beauty & Cosmetic Peptides
    {
      id: 24,
      category: 4,
      brand: 'PowerMed',
      price: '650.00',
      title: 'Snap-8',
      categoryType: 'Anti-wrinkle peptide',
      description: 'Popular for cosmetic purposes and skin texture.',
      image: ''
    },
    {
      id: 25,
      category: 4,
      brand: 'PowerMed',
      price: '850.00',
      title: 'GHK-Cu',
      categoryType: 'Cosmetic peptide',
      description: 'Used for skin appearance and rejuvenation.',
      image: ''
    },
    {
      id: 26,
      category: 4,
      brand: 'PowerMed',
      price: '750.00',
      title: 'BB20',
      categoryType: 'Beauty peptide blend',
      description: 'Cosmetic blend for skin vitality.',
      image: ''
    },
    {
      id: 27,
      category: 4,
      brand: 'PowerMed',
      price: '2,100.00',
      title: 'GLOW (GHK-Cu + TB-500 + BPC-157)',
      categoryType: 'Peptide blend',
      description: 'Cosmetic and wellness blend supporting skin appearance.',
      image: ''
    },
    {
      id: 28,
      category: 4,
      brand: 'PowerMed',
      price: '2,350.00',
      title: 'KLOW (BPC + TB-500 + GHK-Cu + KPV)',
      categoryType: 'Peptide blend',
      description: 'Used in aesthetic and wellness programs.',
      image: ''
    },
    // Category 5: Sexual Wellness Peptides
    {
      id: 29,
      category: 5,
      brand: 'PowerMed',
      price: '1,100.00',
      title: 'PT-141',
      categoryType: 'Peptide',
      description: 'Supports intimacy wellness and mood.',
      image: ''
    },
    {
      id: 30,
      category: 5,
      brand: 'PowerMed',
      price: '1,300.00',
      title: 'Kisspeptin',
      categoryType: 'Peptide',
      description: 'Included in wellness programs for hormonal balance research.',
      image: ''
    },
    {
      id: 31,
      category: 5,
      brand: 'PowerMed',
      price: '1,400.00',
      title: 'Oxytocin',
      categoryType: 'Hormone (NOT peptide)',
      description: 'Used for bonding and mood support under professional guidance.',
      image: ''
    },
    // Category 6: Fat Burner Injectables (Not Peptides)
    {
      id: 32,
      category: 6,
      brand: 'PowerMed',
      price: '450.00',
      title: 'Lipo-C',
      categoryType: 'Lipotropic injection',
      description: 'Supports metabolic wellness alongside diet and exercise.',
      image: ''
    },
    {
      id: 33,
      category: 6,
      brand: 'PowerMed',
      price: '550.00',
      title: 'Lemon Bottle',
      categoryType: 'Fat-dissolving injectable',
      description: 'Offered in aesthetic programs for contouring and cosmetic purposes.',
      image: ''
    },
    // Category 7: Hormones & Growth Factors (Not Peptides)
    {
      id: 34,
      category: 7,
      brand: 'PowerMed',
      price: '1,800.00',
      title: 'HCG',
      categoryType: 'Hormone',
      description: 'Used in wellness programs under professional oversight.',
      image: ''
    },
    {
      id: 35,
      category: 7,
      brand: 'PowerMed',
      price: '3,500.00',
      title: 'HGH',
      categoryType: 'Growth hormone',
      description: 'For vitality and performance protocols under medical supervision.',
      image: ''
    },
    {
      id: 36,
      category: 7,
      brand: 'PowerMed',
      price: '2,800.00',
      title: 'IGF-1 LR3',
      categoryType: 'Growth factor',
      description: 'Used in advanced performance and research programs.',
      image: ''
    },
    // Category 8: Vitamins, Cofactors & Others
    {
      id: 37,
      category: 8,
      brand: 'PowerMed',
      price: '1,200.00',
      title: 'NAD+',
      categoryType: 'Cofactor',
      description: 'Popular for energy, cellular wellness, and longevity programs.',
      image: ''
    },
    {
      id: 38,
      category: 8,
      brand: 'PowerMed',
      price: '25.00',
      title: 'Bac Water',
      categoryType: 'Diluent',
      description: 'Sterile water used for reconstitution.',
      image: ''
    },
    {
      id: 39,
      category: 8,
      brand: 'PowerMed',
      price: '35.00',
      title: 'Acid Water',
      categoryType: 'Cosmetic solution',
      description: 'Used for topical aesthetic purposes.',
      image: ''
    },
    {
      id: 40,
      category: 8,
      brand: 'PowerMed',
      price: '450.00',
      title: 'Botox',
      categoryType: 'Cosmetic injectable',
      description: 'For wrinkle reduction under licensed practitioners.',
      image: ''
    }
  ]

  // Filter products by active category
  const products = allProducts.filter(product => product.category === activeCategory)

  const handleCategoryClick = (index) => {
    setActiveCategory(index)
    // Update URL with the selected category slug
    const categorySlug = categoryToSlug(categories[index])
    setSearchParams({ category: categorySlug })
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

  return (
    <div className="products-page">
      <Topbar />
      <div className="products-content">
        <h1>Looking for Peptides & Wellness Products?</h1>
        <h3>Discover our comprehensive range of premium peptides, hormones, and wellness solutions tailored to your health needs.</h3>
        <div className="categories-scroll-container">
          <div className="categories-scroll">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`category-card ${index === activeCategory ? 'active' : ''}`}
                onClick={() => handleCategoryClick(index)}
              >
                <div className="category-image-placeholder"></div>
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div>
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
            <span className="products-count">{products.length} products</span>
          </div>
          
          <div className="products-grid-container">
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-placeholder"></div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">starts at {product.price}</div>
                  <h4 className="product-title">{product.title}</h4>
                  <p className="product-category-type">{product.categoryType}</p>
                  <p className="product-description">{product.description}</p>
                  <button className="view-product-btn">
                    VIEW PRODUCT
                    <span className="arrow">→</span>
                  </button>
                </div>
              ))}
            </div>
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
                {expandedFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
            <div className="faq-separator"></div>
          </div>
          <button className="view-all-faqs-btn">VIEW ALL FAQS</button>
        </div>
      </div>
    </div>
  )
}
