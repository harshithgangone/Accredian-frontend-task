import React, { useState, useEffect } from 'react';
import './Refer.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL =  'https://web-production-2e829.up.railway.app';

const Refer = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    friendName: '',
    friendEmail: '',
    friendPhone: '',
    program: 'Product Management'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close form with escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    
    if (!formData.yourName) errors.yourName = 'Your name is required';
    if (!formData.yourEmail) errors.yourEmail = 'Your email is required';
    else if (!emailRegex.test(formData.yourEmail)) errors.yourEmail = 'Please enter a valid email';
    
    if (!formData.yourPhone) errors.yourPhone = 'Your phone number is required';
    else if (!phoneRegex.test(formData.yourPhone)) errors.yourPhone = 'Please enter a valid 10-digit phone number';
    
    if (!formData.friendName) errors.friendName = 'Friend\'s name is required';
    if (!formData.friendEmail) errors.friendEmail = 'Friend\'s email is required';
    else if (!emailRegex.test(formData.friendEmail)) errors.friendEmail = 'Please enter a valid email';
    
    if (!formData.friendPhone) errors.friendPhone = 'Friend\'s phone number is required';
    else if (!phoneRegex.test(formData.friendPhone)) errors.friendPhone = 'Please enter a valid 10-digit phone number';
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch(`${API_URL}/api/referrals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          toast.success('Referral submitted successfully!');
          
          // Reset form after 3 seconds
          setTimeout(() => {
            onClose();
            setIsSubmitted(false);
            setFormData({
              yourName: '',
              yourEmail: '',
              yourPhone: '',
              friendName: '',
              friendEmail: '',
              friendPhone: '',
              program: 'Product Management'
            });
          }, 3000);
        } else {
          setIsSubmitting(false);
          
          // Handle validation errors from server
          if (data.errors) {
            const serverErrors = {};
            data.errors.forEach(err => {
              const field = err.path.replace(/([A-Z])/g, '_$1').toLowerCase();
              serverErrors[field] = err.msg;
            });
            setFormErrors(serverErrors);
            toast.error('Please fix the errors in the form');
          } else {
            toast.error(data.message || 'An error occurred. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
        toast.error('Network error. Please check your connection and try again.');
      }
    } else {
      setFormErrors(errors);
      toast.error('Please fix the errors in the form');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="refer-overlay">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="refer-modal">
        <div className="refer-modal-content">
          <button className="refer-close-btn" onClick={onClose}>&times;</button>
          
          {isSubmitted ? (
            <div className="refer-success">
              <div className="refer-success-icon">✓</div>
              <h2>Referral Submitted!</h2>
              <p>We've received your referral and will contact your friend soon.</p>
              <p>You will receive your reward once they enroll in a program.</p>
              <p>We've sent confirmation emails to both you and your friend.</p>
            </div>
          ) : (
            <>
              <div className="refer-header">
                <h2>Refer a Friend</h2>
                <p>Fill out the form below to refer your friend and earn rewards!</p>
              </div>
              
              <form onSubmit={handleSubmit} className="refer-form">
                <div className="refer-form-section">
                  <h3>Your Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="yourName">Your Name</label>
                    <input
                      type="text"
                      id="yourName"
                      name="yourName"
                      value={formData.yourName}
                      onChange={handleChange}
                      className={formErrors.yourName ? 'error' : ''}
                    />
                    {formErrors.yourName && <span className="error-text">{formErrors.yourName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="yourEmail">Your Email</label>
                    <input
                      type="email"
                      id="yourEmail"
                      name="yourEmail"
                      value={formData.yourEmail}
                      onChange={handleChange}
                      className={formErrors.yourEmail ? 'error' : ''}
                    />
                    {formErrors.yourEmail && <span className="error-text">{formErrors.yourEmail}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="yourPhone">Your Phone Number</label>
                    <input
                      type="tel"
                      id="yourPhone"
                      name="yourPhone"
                      value={formData.yourPhone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className={formErrors.yourPhone ? 'error' : ''}
                    />
                    {formErrors.yourPhone && <span className="error-text">{formErrors.yourPhone}</span>}
                  </div>
                </div>
                
                <div className="refer-form-section">
                  <h3>Friend's Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="friendName">Friend's Name</label>
                    <input
                      type="text"
                      id="friendName"
                      name="friendName"
                      value={formData.friendName}
                      onChange={handleChange}
                      className={formErrors.friendName ? 'error' : ''}
                    />
                    {formErrors.friendName && <span className="error-text">{formErrors.friendName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="friendEmail">Friend's Email</label>
                    <input
                      type="email"
                      id="friendEmail"
                      name="friendEmail"
                      value={formData.friendEmail}
                      onChange={handleChange}
                      className={formErrors.friendEmail ? 'error' : ''}
                    />
                    {formErrors.friendEmail && <span className="error-text">{formErrors.friendEmail}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="friendPhone">Friend's Phone Number</label>
                    <input
                      type="tel"
                      id="friendPhone"
                      name="friendPhone"
                      value={formData.friendPhone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className={formErrors.friendPhone ? 'error' : ''}
                    />
                    {formErrors.friendPhone && <span className="error-text">{formErrors.friendPhone}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="program">Program You're Referring</label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                  >
                    <option value="Product Management">Professional Certificate Program in Product Management</option>
                    <option value="Strategic Product Management">PG Certificate Program in Strategic Product Management</option>
                    <option value="Data Driven Product Management">Executive Program in Data Driven Product Management</option>
                    <option value="Digital Transformation">Executive Program in Product Management and Digital Transformation</option>
                    <option value="Executive Program">Executive Program in Product Management</option>
                  </select>
                </div>
                
                <div className="refer-form-footer">
                  <button 
                    type="submit" 
                    className={`refer-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Refer;