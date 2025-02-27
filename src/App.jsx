import React, { useState, useEffect } from 'react';
import './App.css';
import circles from "./assets/three-circles.png";
import circles2 from "./assets/circles2.png";
import hamburger from "./assets/menu.png";
import logo from "./assets/logo.png";
import Refer from './components/Refer/Refer'; // Import the Refer component

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [referFormOpen, setReferFormOpen] = useState(false); // State to control the refer form
  const [activeTab, setActiveTab] = useState('eligibility');
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Animation state tracking
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a slight delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Function to open the refer form
  const openReferForm = () => {
    setReferFormOpen(true);
  };

  // Function to close the refer form
  const closeReferForm = () => {
    setReferFormOpen(false);
  };

  // Toggle FAQ item expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // FAQ data
  const faqData = {
    eligibility: [
      {
        question: "Do I need to have prior Product Management and Project Management experience to enroll in the program?",
        answer: "No, the program is designed to be inclusive of all levels of experience. All topics will be covered from the basics, making it suitable for individuals from any field of work."
      },
      {
        question: "What is the minimum system configuration required?",
        answer: "A computer with at least 4GB RAM, a modern web browser, and a stable internet connection is recommended for the best learning experience."
      },
      {
        question: "Is there any academic qualification required to join the program?",
        answer: "Participants should have completed a bachelor's degree in any discipline. However, exceptions can be made based on relevant work experience."
      },
      {
        question: "Can international students enroll in the program?",
        answer: "Yes, our programs are open to international students. All sessions are conducted online, making them accessible globally."
      }
    ],
    howToUse: [
      {
        question: "How do I access the course materials?",
        answer: "Once enrolled, you'll receive login credentials to our learning platform where all course materials, recorded sessions, and assignments will be available."
      },
      {
        question: "What is the duration of access to course materials?",
        answer: "You will have access to the course materials for 12 months from the date of enrollment."
      },
      {
        question: "How do I submit assignments and projects?",
        answer: "Assignments and projects can be submitted through our learning platform. Detailed submission guidelines will be provided with each assignment."
      },
      {
        question: "How can I interact with instructors and fellow participants?",
        answer: "Our platform includes discussion forums, live Q&A sessions, and dedicated support channels for interacting with instructors and peers."
      }
    ],
    termsConditions: [
      {
        question: "What is the refund policy?",
        answer: "We offer a 7-day refund policy from the date of enrollment, provided you have not accessed more than 20% of the course content."
      },
      {
        question: "Can I transfer my enrollment to someone else?",
        answer: "Enrollment transfers are considered on a case-by-case basis. Please contact our support team for assistance."
      },
      {
        question: "What happens if I miss a live session?",
        answer: "All live sessions are recorded and made available on the platform within 24 hours, so you can catch up at your convenience."
      },
      {
        question: "Is there a time limit to complete the program?",
        answer: "While we recommend following the suggested timeline, you have the flexibility to complete the program at your own pace within the 12-month access period."
      }
    ]
  };

  return (
    <div className="app">
      {/* Top Navigation Bar */}
      <div className={`top-banner ${isLoaded ? 'fade-in' : ''}`}>
        <span>Navigate your ideal career path with tailored expert advice</span>
        <a href="#" className="contact-expert">Contact Expert</a>
      </div>
      
      <header className={`header ${isLoaded ? 'fade-in' : ''}`}>
        <div className="logo-container">
          <img className='logo' src={logo} alt="Logo" />
          <button className="courses-dropdown">
            Courses <span className="dropdown-icon">▼</span>
          </button>
        </div>
        
        
        
        <nav className="main-nav">
          <a href="#" className="nav-item">Refer & Earn</a>
          <a href="#" className="nav-item">Resources</a>
          <a href="#" className="nav-item">About Us</a>
          <a href="#" className="nav-item">Login</a>
          <a href="#" className="try-free-btn">Try for free</a>
        </nav>

        <div className="mobile-menu-button" onClick={toggleMenu}>
          <img src={hamburger} alt="Menu" className="hamburger-icon" />
        </div>
        
        {/* Mobile slide menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="close-menu" onClick={closeMenu}>×</span>
          </div>
          <div className="mobile-menu-content">
            <a href="#" className="mobile-nav-item" onClick={closeMenu}>Refer & Earn</a>
            <a href="#" className="mobile-nav-item" onClick={closeMenu}>Resources</a>
            <a href="#" className="mobile-nav-item" onClick={closeMenu}>About Us</a>
            <a href="#" className="mobile-nav-item" onClick={closeMenu}>Login</a>
            <a href="#" className="mobile-nav-item" onClick={closeMenu}>Try for free</a>
            <button className="mobile-courses-dropdown">
              Courses <span className="dropdown-icon">▼</span>
            </button>
          </div>
        </div>
        {/* Overlay for mobile menu */}
        {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </header>
      
      {/* Tab Navigation */}
      <div className={`tab-nav ${isLoaded ? 'fade-in' : ''}`}>
        <a href="#" className="tab-item active">Refer</a>
        <a href="#" className="tab-item">Benefits</a>
        <a href="#" className="tab-item">FAQs</a>
        <a href="#" className="tab-item">Support</a>
      </div>
      
      {/* Hero Section */}
      <div className={`hero-section ${isLoaded ? 'slide-up' : ''}`}>
        <div className="money-icon top-left"></div>
        
        <div className="hero-content">
          <div className="people-image-container">
            <div className="people-image"></div>
          </div>
          
          <div className="hero-text">
            <h1>Let's Learn <br />& Earn</h1>
            <p>Get a chance to win <br />up-to <span className="blue-text">Rs. 15,000</span></p>
            <button className="refer-now-btn" onClick={openReferForm}>Refer Now</button>
          </div>
        </div>
        
        <div className="money-icon bottom-right"></div>
      </div>
      
      {/* Referral Process Section */}
      <div className={`referral-section ${isLoaded ? 'fade-in-delay' : ''}`}>
        <h2>How Do I Refer</h2>
        
        <div className="referral-steps">
          <img src={circles} alt="Referral Process Steps" className="circles-image desktop-only" />
          <img src={circles2} alt="Referral Process Steps" className="circles-image mobile-only" />
        </div>
        
        <button className="refer-now-btn bottom" onClick={openReferForm}>Refer Now</button>
      </div>
      
      {/* Benefits Section */}
      <div className={`benefits-section ${isLoaded ? 'fade-in-delay' : ''}`}>
        <h2 className="benefits-title">What Are The <span className="blue-text">Referral Benefits</span>?</h2>
        
        <div className="enrolled-toggle">
          <span>Enrolled</span>
          <div className="toggle-switch">
            <div className="toggle-slider active"></div>
          </div>
        </div>
        
        <div className="programs-table">
          <div className="sidebar">
            <div className="sidebar-item active">
              <span>ALL PROGRAMS</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>PRODUCT MANAGEMENT</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>STRATEGY & LEADERSHIP</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>BUSINESS MANAGEMENT</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>FINTECH</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>SENIOR MANAGEMENT</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>DATA SCIENCE</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>DIGITAL TRANSFORMATION</span>
              <span className="arrow">›</span>
            </div>
            <div className="sidebar-item">
              <span>BUSINESS ANALYTICS</span>
              <span className="arrow">›</span>
            </div>
          </div>
          
          <div className="table-content">
            <div className="table-header">
              <div className="table-col program-col">Programs</div>
              <div className="table-col">Referrer Bonus</div>
              <div className="table-col">Referee Bonus</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  Professional Certificate Program in Product Management
                </div>
              </div>
              <div className="table-col">₹ 7,000</div>
              <div className="table-col">₹ 9,000</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  PG Certificate Program in Strategic Product Management
                </div>
              </div>
              <div className="table-col">₹ 9,000</div>
              <div className="table-col">₹ 11,000</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  Executive Program in Data Driven Product Management
                </div>
              </div>
              <div className="table-col">₹ 10,000</div>
              <div className="table-col">₹ 10,000</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  Executive Program in Product Management and Digital Transformation
                </div>
              </div>
              <div className="table-col">₹ 10,000</div>
              <div className="table-col">₹ 10,000</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  Executive Program in Product Management
                </div>
              </div>
              <div className="table-col">₹ 10,000</div>
              <div className="table-col">₹ 10,000</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  Advanced Certification in Product Management
                </div>
              </div>
              <div className="table-col">₹ 10,000</div>
              <div className="table-col">₹ 10,000</div>
            </div>
            
            <div className="table-row">
              <div className="table-col program-col">
                <div className="program-icon">🎓</div>
                <div className="program-text">
                  Executive Program in Product Management and Project Management
                </div>
              </div>
              <div className="table-col">₹ 10,000</div>
              <div className="table-col">₹ 10,000</div>
            </div>
          </div>
        </div>
        
        <div className="show-more-container">
          <button className="show-more-btn">Show More</button>
        </div>
        
        <div className="refer-now-container">
          <button className="refer-now-btn" onClick={openReferForm}>Refer Now</button>
        </div>
      </div>
      
      {/* FAQ Section - Enhanced with Interactive Functionality */}
      <div className={`faq-section ${isLoaded ? 'fade-in-delay' : ''}`}>
        <h2 className="faq-title">Frequently Asked <span className="blue-text">Questions</span></h2>
        
        <div className="faq-container">
          <div className="faq-sidebar">
            <div 
              className={`faq-tab ${activeTab === 'eligibility' ? 'active' : ''}`}
              onClick={() => setActiveTab('eligibility')}
            >
              Eligibility
            </div>
            <div 
              className={`faq-tab ${activeTab === 'howToUse' ? 'active' : ''}`}
              onClick={() => setActiveTab('howToUse')}
            >
              How To Use?
            </div>
            <div 
              className={`faq-tab ${activeTab === 'termsConditions' ? 'active' : ''}`}
              onClick={() => setActiveTab('termsConditions')}
            >
              Terms & Conditions
            </div>
          </div>
          
          <div className="faq-content">
            {faqData[activeTab].map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <span className="faq-arrow">{expandedFaq === index ? '^' : 'v'}</span>
                </div>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact CTA Section */}
      <div className={`contact-cta ${isLoaded ? 'fade-in-delay' : ''}`}>
        <div className="contact-icon">
          <div className="headset-icon">🎧</div>
        </div>
        <div className="contact-content">
          <h3>Want to delve deeper into the program?</h3>
          <p>Share your details to receive expert insights from our program team!</p>
        </div>
        <button className="contact-btn">Get in touch ›</button>
      </div>
      
      {/* Added Footer Section */}
      <footer className={`footer ${isLoaded ? 'fade-in-delay' : ''}`}>
        <div className="footer-container">
          <div className="footer-section programs">
            <h3>Programs</h3>
            <div className="program-item">
              <span>Data Science & AI</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Product Management</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Business Analytics</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Digital Transformation</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Business Management</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Project Management</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Strategy & Leadership</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Senior Management</span>
              <span className="plus-icon">+</span>
            </div>
            <div className="program-item">
              <span>Fintech</span>
              <span className="plus-icon">+</span>
            </div>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Product Management Queries):pm@accredian.com</p>
            <p>Data Science Admission Helpline:+91 9079653292 (9 AM - 7 PM)</p>
            <p>Product Management Admission Helpline:+91 9625811095</p>
            <p>Enrolled Student Helpline: +91 7969322507</p>
            <p>Office Address: 4th Floor, 250, Phase IV Udyog Vihar, Sector 18, Gurugram, Haryana 122015</p>
            <h3 className="why-accredian">Why Accredian</h3>
            <h3 className="follow-us">Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="facebook-icon"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="linkedin-icon"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="twitter-icon"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="instagram-icon"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="youtube-icon"></i>
              </a>
            </div>
          </div>

          <div className="footer-section about">
            <h3>Accredian</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Admission Policy</a></li>
              <li><a href="#">Referral Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms Of Service</a></li>
              <li><a href="#">Master FAQs</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Accredian A Brand of FullStack Education Pvt Ltd. All Rights Reserved</p>
        </div>
      </footer>
      
      {/* Refer Form Component */}
      <Refer isOpen={referFormOpen} onClose={closeReferForm} />
    </div>
  );
}

export default App;