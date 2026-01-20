import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import { productAPI } from '../utils/api'
import '../styles/products.css'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await productAPI.getById(id)
        setProduct(data)
      } catch (e) {
        console.error('Failed to load product', e)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  if (loading) return (
    <div>
      <Topbar />
      <div className="products-page"><div className="loading-text">Loading product...</div></div>
      <Footer />
    </div>
  )

  if (!product) return (
    <div>
      <Topbar />
      <div className="products-page"><div className="loading-text">Product not found</div></div>
      <Footer />
    </div>
  )

  return (
    <div>
      <Topbar />
      <div className="product-details-page">
        <div className="product-details-container">
          <div className="product-image-column">
            {product.image ? (
              <img src={product.image} alt={product.name} className="product-detail-image" />
            ) : (
              <div className="product-image-placeholder">No Image</div>
            )}
          </div>

          <div className="product-info-column">
            <div className="product-meta">
              <div className="product-prescription">Rx</div>
              <h1 className="product-title">{product.name}</h1>
            </div>

            <p className="product-short-desc">{product.description}</p>

            <ul className="product-highlights">
              <li>Formulated in FDA-regulated pharmacies</li>
              <li>Free consultation with licensed providers</li>
              <li>Unlimited complementary follow-ups</li>
              <li>100% online, hassle-free, and convenient</li>
            </ul>
            

            <div className="product-faqs">
                
              
              {(product.faqs || []).length === 0 && (
                <p>No FAQs available for this product.</p>
              )}

              {(product.faqs || []).map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
                  </div>
                  {expandedFaq === index && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>

            <p className="product-disclaimer">
              This product is compounded in an FDA-regulated pharmacy and available if prescribed after an online consultation with a provider.
              <br></br>
              <br></br>
              <strong>Please note:</strong> The FDA does not verify the safety or effectiveness of compounded medications.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
