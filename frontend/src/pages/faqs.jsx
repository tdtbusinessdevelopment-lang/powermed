import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import '../styles/faqs.css'

export default function FAQs() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All FAQs', count: 24 },
    { id: 'products', name: 'Products & Peptides', count: 8 },
    { id: 'ordering', name: 'Ordering & Payment', count: 5 },
    { id: 'shipping', name: 'Shipping & Delivery', count: 4 },
    { id: 'usage', name: 'Usage & Safety', count: 7 }
  ]

  const faqData = [
    // Products & Peptides
    {
      category: 'products',
      question: 'What are peptides and how do they work?',
      answer: 'Peptides are short chains of amino acids that act as signaling molecules in the body. They can help regulate various biological functions including metabolism, tissue repair, and hormone production. Each peptide has a specific sequence that determines its function and target receptors in the body.'
    },
    {
      category: 'products',
      question: 'What is the difference between peptides and hormones?',
      answer: 'While both are signaling molecules, peptides are shorter amino acid chains (typically 2-50 amino acids), whereas protein hormones are longer. Peptides often work by mimicking natural hormones or growth factors in the body, but with more targeted and specific effects.'
    },
    {
      category: 'products',
      question: 'Are your products pharmaceutical-grade?',
      answer: 'Yes, all PowerMed products undergo strict quality control and testing procedures. We ensure that every product meets pharmaceutical-grade standards with verified purity levels, typically 98% or higher, before reaching our customers.'
    },
    {
      category: 'products',
      question: 'How should I store peptide products?',
      answer: 'Unreconstituted (powder form) peptides should be stored in a cool, dry place away from direct sunlight, ideally in a refrigerator at 2-8°C. Once reconstituted, most peptides must be kept refrigerated and used within the timeframe specified in the product information.'
    },
    {
      category: 'products',
      question: 'What is the shelf life of your products?',
      answer: 'Unreconstituted peptides typically have a shelf life of 2-3 years when stored properly. Once reconstituted with bacteriostatic water, most peptides remain stable for 28-30 days when refrigerated. Always check the specific product information for exact details.'
    },
    {
      category: 'products',
      question: 'Do you offer product testing certificates?',
      answer: 'Yes, we provide Certificates of Analysis (COA) for our products upon request. These documents verify the purity, composition, and quality of each batch through third-party laboratory testing.'
    },
    {
      category: 'products',
      question: 'Can I request custom peptide formulations?',
      answer: 'We offer select custom formulation services for qualified researchers and institutions. Please contact our customer service team to discuss your specific requirements and minimum order quantities.'
    },
    {
      category: 'products',
      question: 'What makes PowerMed products different from competitors?',
      answer: 'PowerMed combines pharmaceutical-grade quality, rigorous third-party testing, transparent sourcing, and expert customer support. We prioritize purity, consistency, and safety in every product, backed by comprehensive documentation and research resources.'
    },

    // Ordering & Payment
    {
      category: 'ordering',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), bank transfers, GCash, PayMaya, and other local payment methods. All transactions are processed through secure, encrypted payment gateways to protect your information.'
    },
    {
      category: 'ordering',
      question: 'Do I need a prescription to order?',
      answer: 'Some peptide products may require a prescription or medical consultation depending on local regulations and the specific compound. We recommend consulting with a healthcare professional before starting any new supplement or peptide regimen. Research-grade products are available for qualified researchers and institutions.'
    },
    {
      category: 'ordering',
      question: 'Can I modify or cancel my order after placing it?',
      answer: 'Orders can be modified or cancelled within 24 hours of placement, provided they have not yet been processed for shipping. Please contact our customer service team immediately if you need to make changes to your order.'
    },
    {
      category: 'ordering',
      question: 'Do you offer bulk or wholesale pricing?',
      answer: 'Yes, we offer competitive bulk pricing for larger orders and wholesale programs for qualified businesses, clinics, and research institutions. Contact our sales team for a custom quote based on your volume requirements.'
    },
    {
      category: 'ordering',
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption and PCI-DSS compliant payment processors. We never store your complete credit card information on our servers, ensuring maximum security for all transactions.'
    },

    // Shipping & Delivery
    {
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within Metro Manila and 5-7 business days for provincial areas. Express shipping options are available for faster delivery, usually arriving within 1-2 business days for Metro Manila.'
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Currently, we primarily serve customers within the Philippines. International shipping is available on a case-by-case basis for select products and destinations. Please contact us to discuss international shipping options and requirements.'
    },
    {
      category: 'shipping',
      question: 'How are products packaged for shipping?',
      answer: 'All products are carefully packaged with appropriate temperature control measures, including ice packs and insulated packaging for temperature-sensitive items. Packages are discreet and secure to ensure product integrity during transit.'
    },
    {
      category: 'shipping',
      question: 'What if my product arrives damaged or compromised?',
      answer: 'If your product arrives damaged, compromised, or if the temperature indicators show exposure to improper conditions, please contact us immediately with photos. We will arrange for a replacement or full refund according to our quality guarantee policy.'
    },

    // Usage & Safety
    {
      category: 'usage',
      question: 'How do I reconstitute peptide powder?',
      answer: 'Most peptides are reconstituted using bacteriostatic water. Inject the water slowly down the side of the vial, allowing it to gently dissolve the powder without vigorous shaking. Swirl gently if needed. Always refer to the specific product instructions for exact reconstitution volumes and procedures.'
    },
    {
      category: 'usage',
      question: 'What are the potential side effects?',
      answer: 'Side effects vary depending on the specific peptide and individual response. Common mild effects may include injection site reactions, temporary flushing, or mild nausea. Serious side effects are rare when used properly. Always consult with a healthcare provider before use and report any adverse reactions immediately.'
    },
    {
      category: 'usage',
      question: 'Can I combine different peptides?',
      answer: 'Some peptides can be safely combined, while others should not be used together. Peptide stacking requires careful consideration of mechanisms of action, dosing timing, and potential interactions. Always consult with a knowledgeable healthcare provider before combining peptides.'
    },
    {
      category: 'usage',
      question: 'What is the recommended dosage?',
      answer: 'Dosage varies significantly based on the specific peptide, individual factors (age, weight, health status), and intended use. We provide general dosage information for research purposes, but personalized dosing should be determined by a qualified healthcare professional.'
    },
    {
      category: 'usage',
      question: 'When is the best time to administer peptides?',
      answer: 'Timing depends on the specific peptide and its mechanism of action. Some peptides work best when taken before bedtime (like growth hormone-releasing peptides), while others are more effective in the morning or around exercise. Refer to specific product guidelines for optimal timing.'
    },
    {
      category: 'usage',
      question: 'Are there any contraindications I should know about?',
      answer: 'Contraindications vary by peptide. Generally, pregnant or nursing women, individuals with cancer history, and those with certain medical conditions should avoid specific peptides. Always disclose your complete medical history to your healthcare provider before starting any peptide therapy.'
    },
    {
      category: 'usage',
      question: 'How long should I use peptides before seeing results?',
      answer: 'Results vary by peptide type and individual factors. Some effects may be noticed within days (like improved sleep or recovery), while others take several weeks to months (like body composition changes or anti-aging effects). Consistent use as directed is important for optimal results.'
    }
  ]

  const handleFaqClick = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    setExpandedFaq(null)
  }

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="faqs-page">
      <Topbar />
      
      <div className="faqs-hero">
        <div className="faqs-hero-content">
          <h1 className="faqs-hero-title">Frequently Asked Questions</h1>
          <p className="faqs-hero-subtitle">Find answers to common questions about PowerMed products, ordering, and usage</p>
          
          <div className="faqs-search-container">
            <input 
              type="text"
              placeholder="Search for answers..."
              className="faqs-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="faqs-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="faqs-content">
        <div className="faqs-container">
          <div className="faqs-categories">
            <h3 className="faqs-categories-title">Categories</h3>
            {categories.map(category => (
              <button
                key={category.id}
                className={`faqs-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="faqs-category-name">{category.name}</span>
                <span className="faqs-category-count">{category.count}</span>
              </button>
            ))}
          </div>

          <div className="faqs-list-container">
            {filteredFaqs.length === 0 ? (
              <div className="faqs-no-results">
                <p>No FAQs found matching your search.</p>
                <p className="faqs-no-results-suggestion">Try adjusting your search terms or browse all FAQs.</p>
              </div>
            ) : (
              <div className="faqs-list">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="faqs-item">
                    <div 
                      className={`faqs-question-wrapper ${expandedFaq === index ? 'active' : ''}`}
                      onClick={() => handleFaqClick(index)}
                    >
                      <span className="faqs-question">{faq.question}</span>
                      <span className={`faqs-toggle ${expandedFaq === index ? 'expanded' : ''}`}>
                        {expandedFaq === index ? '−' : '+'}
                      </span>
                    </div>
                    <div className={`faqs-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                      <div className="faqs-answer-inner">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="faqs-contact-section">
        <div className="faqs-contact-content">
          <h2 className="faqs-contact-title">Still have questions?</h2>
          <p className="faqs-contact-text">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <div className="faqs-contact-buttons">
            <Link to="/contact" className="faqs-contact-btn primary">
              Contact Support
            </Link>
            <Link to="/products" className="faqs-contact-btn secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}