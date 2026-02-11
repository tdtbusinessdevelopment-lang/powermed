import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (e, modalType) => {
    e.preventDefault()
    setActiveModal(modalType)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-first-section">
            <div className="footer-img">
              <img src="https://figmage.com/images/pTTH1sn8Q28B5GUZOtSSl.png" alt="Powermed Logo" />
            </div>
            <div className="footer-button">
              <button>Explore Powermed Products</button>
            </div>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61586383577691" target="_blank" rel="noopener noreferrer">
                <img src="https://figmage.com/images/Or9PvjghGnn-L7Wkcde3m.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/powermed.ph" target="_blank" rel="noopener noreferrer">
                <img src="https://figmage.com/images/kUoQEcp4dpYomWOIrsWtR.png" alt="Instagram" />
              </a>
            </div>
          </div>
          <div className="footer-second-section">
            <div className="learn">
              <h3>LEARN</h3>
              <Link to="/faqs">FAQs</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About Us</Link>
            </div>
          </div>
          <div className="footer-third-section">
            <div className="support">
              <h3>SUPPORT</h3>
              <Link to="/contact">Contact</Link>
              <Link to="/faqs">FAQs</Link>
            </div>
          </div>
          <div className="footer-fourth-section">
            <div className="send email">
              <h3>WELLNESS STARTS HERE.</h3>
              <p><span>Be the first to know.</span> Join the PowerMed community for menu drops, chef notes, and wellness tips tailored to your routine</p>
              <input className="email-input" type="email" placeholder="Enter your email" />
              <button className="email-button">Subscribe</button>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© {new Date().getFullYear()} PowerMed</p>
            <div className="footer-links">
              <span className="footer-link-item" onClick={(e) => openModal(e, 'terms')}>TERMS AND CONDITIONS</span>
              <span className="divider">|</span>
              <span className="footer-link-item" onClick={(e) => openModal(e, 'privacy')}>PRIVACY POLICY</span>
              <span className="divider">|</span>
              <span className="footer-link-item" onClick={(e) => openModal(e, 'disclaimer')}>RESEARCH USE ONLY DISCLAIMER</span>
            </div>
          </div>
          <Link to="/admin/login" className="admin-access-link">Admin</Link>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            
            {activeModal === 'terms' && (
              <div className="modal-body">
                <h2 style={{color: '#e66f27'}}>Terms and Conditions</h2>
                <div className="modal-scroll-content">
                  <p className="last-updated">Last Updated: February 2026</p>
                  
                  <h3 style={{color: '#727272'}}>1. Acceptance of Terms</h3>
                  <p>By accessing and using PowerMed's website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

                  <h3 style={{color: '#727272'}}>2. Research Use Only</h3>
                  <p>All products sold by PowerMed are intended for research purposes only and are not intended for human consumption or clinical use. These products are not approved by any regulatory agency for therapeutic use.</p>

                  <h3 style={{color: '#727272'}}>3. Age Requirement</h3>
                  <p>You must be at least 18 years of age to purchase products from PowerMed. By placing an order, you confirm that you meet this age requirement.</p>

                  <h3 style={{color: '#727272'}}>4. Product Information</h3>
                  <p>While we strive to provide accurate product information, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.</p>

                  <h3 style={{color: '#727272'}} >5. Ordering and Payment</h3>
                  <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be received in full before products are shipped. We accept various payment methods as displayed on our website.</p>

                  <h3 style={{color: '#727272'}}>6. Shipping and Delivery</h3>
                  <p>We ship to addresses within the Philippines. Shipping times are estimates and are not guaranteed. PowerMed is not responsible for delays caused by shipping carriers or customs.</p>

                  <h3 style={{color: '#727272'}}>7. Returns and Refunds</h3>
                  <p>Due to the nature of our products, we have a strict return policy. Returns are only accepted for damaged or defective products received. Please contact us within 48 hours of receiving your order to initiate a return.</p>

                  <h3 style={{color: '#727272'}}>8. Limitation of Liability</h3>
                  <p>PowerMed shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our products or services.</p>

                  <h3 style={{color: '#727272'}}>9. Intellectual Property</h3>
                  <p>All content on this website, including text, graphics, logos, and images, is the property of PowerMed and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

                  <h3 style={{color: '#727272'}}>10. Changes to Terms</h3>
                  <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of any changes.</p>

                  <h3 style={{color: '#727272'}}>11. Governing Law</h3>
                  <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the Philippines.</p>

                  <h3 style={{color: '#727272'}}>12. Contact Information</h3>
                  <p>For questions about these Terms and Conditions, please contact us through our website or social media channels.</p>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div className="modal-body">
                <h2 style={{color: '#e66f27'}}>Privacy Policy</h2>
                <div className="modal-scroll-content">
                  <p className="last-updated">Last Updated: February 2026</p>
                  
                  <h3 style={{color: '#727272'}}>1. Information We Collect</h3>
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul>
                    <li>Name, email address, phone number, and shipping address</li>
                    <li>Payment information (processed securely through third-party payment processors)</li>
                    <li>Order history and preferences</li>
                    <li>Communications with our customer service team</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and our products</li>
                    <li>Send promotional materials and updates (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>3. Information Sharing</h3>
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                  <ul>
                    <li>Service providers who assist in operating our website and conducting our business</li>
                    <li>Shipping carriers to deliver your orders</li>
                    <li>Payment processors to process transactions</li>
                    <li>Law enforcement or regulatory agencies when required by law</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>4. Data Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

                  <h3 style={{color: '#727272'}}>5. Cookies and Tracking Technologies</h3>
                  <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser.</p>

                  <h3 style={{color: '#727272'}}>6. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>7. Data Retention</h3>
                  <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>

                  <h3 style={{color: '#727272'}}>8. Third-Party Links</h3>
                  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

                  <h3 style={{color: '#727272'}}>9. Children's Privacy</h3>
                  <p>Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.</p>

                  <h3 style={{color: '#727272'}}>10. Changes to Privacy Policy</h3>
                  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>

                  <h3 style={{color: '#727272'}}>11. Contact Us</h3>
                  <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us through our website or social media channels.</p>
                </div>
              </div>
            )}

            {activeModal === 'disclaimer' && (
              <div className="modal-body">
                <h2 style={{color: '#e66f27'}}>Research Use Only Disclaimer</h2>
                <div className="modal-scroll-content">
                  <p className="last-updated">Last Updated: February 2026</p>
                  
                  <div className="disclaimer-warning">
                    <h3>⚠️ IMPORTANT NOTICE</h3>
                    <p><strong>ALL PRODUCTS SOLD BY POWERMED ARE FOR RESEARCH PURPOSES ONLY AND NOT FOR HUMAN CONSUMPTION.</strong></p>
                  </div>

                  <h3 style={{color: '#727272'}}>1. Product Classification</h3>
                  <p>All peptides, compounds, and related products offered by PowerMed are sold strictly as research chemicals and laboratory reagents. These products are intended solely for in vitro research and laboratory applications by qualified researchers and institutions.</p>

                  <h3 style={{color: '#727272'}}>2. Not for Human Use</h3>
                  <p>These products are NOT:</p>
                  <ul>
                    <li>Approved for human consumption or clinical use</li>
                    <li>Intended to diagnose, treat, cure, or prevent any disease</li>
                    <li>Evaluated by the FDA, BFAD, or any other regulatory agency for safety or efficacy in humans</li>
                    <li>Intended as dietary supplements or nutritional products</li>
                    <li>Suitable for veterinary use</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>3. Buyer Responsibility</h3>
                  <p>By purchasing products from PowerMed, you acknowledge and agree that:</p>
                  <ul>
                    <li>You are a qualified researcher or purchasing on behalf of a research institution</li>
                    <li>Products will be used only for legitimate research purposes</li>
                    <li>You understand the risks associated with handling research chemicals</li>
                    <li>You will comply with all applicable laws and regulations</li>
                    <li>You have proper training and facilities for handling these materials</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>4. No Medical Claims</h3>
                  <p>PowerMed makes no claims regarding the therapeutic benefits, medical efficacy, or health effects of any products. Any information provided is for educational and research purposes only and should not be construed as medical advice.</p>

                  <h3 style={{color: '#727272'}}>5. Quality and Purity</h3>
                  <p>While we strive to provide high-quality research materials with appropriate documentation, PowerMed:</p>
                  <ul>
                    <li>Does not guarantee results from research use</li>
                    <li>Is not responsible for misuse or adverse effects</li>
                    <li>Recommends independent verification of product specifications</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>6. Legal Compliance</h3>
                  <p>It is the buyer's responsibility to ensure that the purchase, possession, and use of these products comply with all local, state, and federal laws. PowerMed is not responsible for any illegal use of products.</p>

                  <h3 style={{color: '#727272'}}>7. Handling and Storage</h3>
                  <p>Research chemicals should be handled with appropriate safety precautions:</p>
                  <ul>
                    <li>Use proper personal protective equipment (PPE)</li>
                    <li>Store according to product specifications</li>
                    <li>Follow proper disposal procedures</li>
                    <li>Keep out of reach of children and unauthorized persons</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>8. Professional Consultation</h3>
                  <p>For any health-related concerns or before starting any therapy protocol, consult with a licensed healthcare professional. PowerMed does not provide medical advice or consultations.</p>

                  <h3 style={{color: '#727272'}}>9. Liability Limitation</h3>
                  <p>PowerMed shall not be held liable for:</p>
                  <ul>
                    <li>Any adverse effects resulting from product misuse</li>
                    <li>Use of products contrary to their intended research purpose</li>
                    <li>Failure to follow safety guidelines</li>
                    <li>Any consequences of illegal use or possession</li>
                  </ul>

                  <h3 style={{color: '#727272'}}>10. Acknowledgment</h3>
                  <p>By completing a purchase, you acknowledge that you have read, understood, and agree to comply with this Research Use Only Disclaimer. You confirm that you are purchasing these products solely for legitimate research purposes and not for human consumption or clinical application.</p>

                  <div className="disclaimer-footer">
                    <p><strong>If you do not agree with these terms or intend to use products for purposes other than research, please do not purchase from PowerMed.</strong></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}