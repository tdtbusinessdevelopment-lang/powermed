import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import { productAPI } from '../utils/api'
import { getCloudinaryProductImage } from '../utils/cloudinary'
import '../styles/product_details.css'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const viewIncremented = React.useRef(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await productAPI.getById(id)
        setProduct(data)
        setActiveImageIdx(0)

        // Increment view count only once
        if (!viewIncremented.current) {
          viewIncremented.current = true;
          productAPI.incrementView(id).catch(err => console.error('View increment failed:', err));
        }
      } catch (e) {
        console.error('Failed to load product or increment view', e)
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

  // Build the images list — prefer the new `images` array, fallback to legacy `image`
  const imageList = (product.images && product.images.length > 0)
    ? product.images
    : product.image
      ? [{ url: product.image, label: '' }]
      : []

  const currentImage = imageList[activeImageIdx]

  const goTo = (idx) => {
    setActiveImageIdx(Math.max(0, Math.min(idx, imageList.length - 1)))
  }

  return (
    <div>
      <Topbar />
      <div className="product-details-page">
        <div className="product-details-container">

          {/* ── Image Gallery Column ── */}
          <div className="product-image-column">
            {/* Main display */}
            <div className="product-main-image-wrap">
              {imageList.length > 0 ? (
                <>
                  <img
                    key={activeImageIdx}
                    src={getCloudinaryProductImage(currentImage.url)}
                    alt={currentImage.label || product.name}
                    className="product-detail-image gallery-anim"
                  />
                  {currentImage.label && (
                    <span className="image-label-badge">{currentImage.label}</span>
                  )}
                </>
              ) : (
                <div className="product-image-placeholder">No Image</div>
              )}

              {/* Prev / Next arrows (only when >1 image) */}
              {imageList.length > 1 && (
                <>
                  <button
                    className="gallery-arrow gallery-arrow-left"
                    onClick={() => goTo(activeImageIdx - 1)}
                    disabled={activeImageIdx === 0}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    className="gallery-arrow gallery-arrow-right"
                    onClick={() => goTo(activeImageIdx + 1)}
                    disabled={activeImageIdx === imageList.length - 1}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {imageList.length > 1 && (
              <div className="product-thumbnails">
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${idx === activeImageIdx ? 'thumb-active' : ''}`}
                    onClick={() => goTo(idx)}
                    title={img.label || `Image ${idx + 1}`}
                  >
                    <img
                      src={getCloudinaryProductImage(img.url)}
                      alt={img.label || `Thumbnail ${idx + 1}`}
                    />
                    {img.label && <span className="thumb-label">{img.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info Column ── */}
          <div className="product-info-column">
            <div className="product-meta">
              <h1 className="product_title">{product.name}</h1>
            </div>

            <p className="product-short-desc">{product.description}</p>

            <div className="product-faqs">
              {(product.faqs || []).length === 0 && (
                <p>No FAQs available for this product.</p>
              )}

              {(product.faqs || []).map((faq, index) => (
                <div key={index} className="faq-item">
                  <div
                    className={`faq-question ${expandedFaq === index ? 'open' : ''}`}
                    onClick={() => toggleFaq(index)}
                    role="button"
                    aria-expanded={expandedFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className={`faq-toggle ${expandedFaq === index ? 'expanded' : ''}`}>{expandedFaq === index ? '-' : '+'}</span>
                  </div>
                  <div className={`faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="product-disclaimer">
              <br></br>
              <strong>DISCLAIMER ❗:</strong> All information provided is for educational and scientific reference only. Buyer assumes all responsibility for lawful use and compliance with applicable regulations.
            </p>

            <a
              href="https://shopee.ph/poweraxis.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="shopee-buy-button"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
