import React, { useState } from 'react'
import '../styles/contact.css'
import Topbar from '../components/topbar.jsx'
import Footer from '../components/footer.jsx'
import maps from '../assets/images/maps-sample.png'
import { useNavigate } from 'react-router-dom';
import FAQs from './faqs.jsx';


function Contact() {
  const [inquiryType, setInquiryType] = useState('')
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    contactNumber: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: ''
  })

  const navigate = useNavigate();

  const handleInquiryChange = (type) => {
    setInquiryType(type)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    alert('Inquiry submitted successfully!')
  }

  return (
    <div>
      <Topbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Need assistance? Start with our Help Center for quick answers, or connect with the right team below.</p>

        <div className="help-center">
          <h2>Help Center</h2>

          {/* Inquiry Type Selection */}
          <div className="inquiry-type-section">
            <h3>Inquiry Type</h3>
            <p className="inquiry-label">I am inquiring for:</p>
            
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="inquiryType"
                  value="corporate"
                  checked={inquiryType === 'corporate'}
                  onChange={() => handleInquiryChange('corporate')}
                />
                <span>Product Inquiry</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="inquiryType"
                  value="event"
                  checked={inquiryType === 'event'}
                  onChange={() => handleInquiryChange('event')}
                />
                <span>Order/Delivery Inquiry</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="inquiryType"
                  value="general"
                  checked={inquiryType === 'general'}
                  onChange={() => handleInquiryChange('general')}
                />
                <span>General Inquiry</span>
              </label>
            </div>
          </div>

          {/* Form appears when inquiry type is selected */}
          {inquiryType && (
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-fields">
                {/* Company/Organization Name */}
                <div className="form-group">
                  <label>Company/Organization Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Address Line 1 */}
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address Line 1"
                  />
                </div>

                {/* City, State, Country */}
                <div className="form-row-three">
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State / Province / Region"
                    />
                  </div>
                  <div className="form-group">
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Country</option>
                      <option value="us">United States</option>
                      <option value="ph">Philippines</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="form-group">
                  <label>Contact Person <span className="required">*</span></label>
                  <div className="form-row">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last"
                    />
                  </div>
                </div>

                {/* Role/Designation */}
                <div className="form-group">
                  <label>Role/Designation of Contact Person</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label>Email Address of Contact Person <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Contact Number */}
                <div className="form-group">
                  <label>Contact Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Company Website */}
                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Upload Supporting Documents */}
                <div className="form-group">
                  <label>Upload Supporting Documents</label>
                  <div className="upload-area">
                    <button
                      type="button"
                      onClick={() => document.getElementById('fileInput').click()}
                      className="upload-btn"
                    >
                      Upload
                    </button>
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => console.log(e.target.files)}
                    />
                    <span>or drag files here.</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="submit-section">
                  <button onClick={handleSubmit} className="submit-btn">
                    Submit Inquiry
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="visit-faqs">
          <p>Find instant answers about product information, delivery schedules, and account management in our Help Center.</p>
          <button className="visit-faqs-btn" onClick={() => navigate('/FAQs')}>
            Visit FAQs
          </button>
        </div>

        <div className="customer-support">
          <div className="customer-support-content">
            <div className="map-section">
              <img 
                src={maps}
                alt="TDT Powersteel Corporation Location Map" 
                className="map-image"
              />
            </div>
            
            <div className="contact-options">
              <h2>Customer Support</h2>
              <p>Need more help? Reach out for assistance with your order, subscription, or account.</p>
              
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" fill="currentColor"/>
                      <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.086-1.391l-4.064-3.696z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>Call Us</span>
                  <p>09178007835</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.707 12.293a.999.999 0 00-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 000-1.414l-4-4a.999.999 0 00-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 000-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 00-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 00.912-.271L17 14.414 19.586 17l-2.006 2.005z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>Viber</span>
                  <p>09178007835</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 001.228 0L20 9.044 20.002 18H4z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>Email</span>
                  <p>powermed.ph@gmail.com</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.9 8c0-.46-.35-.85-.8-.98V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v1.02c-.45.13-.8.52-.8.98L2 22h20l-.1-14zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM5 8V6h14v2H5z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>Location</span>
                  <p>4th floor TDT Powersteel Building, 1017-A Vicente Cruz St., Sampaloc, Manila City, Philippines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact