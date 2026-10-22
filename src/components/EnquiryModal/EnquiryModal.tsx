'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  Send, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  Building2,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import styles from './EnquiryModal.module.css';
import { COMPANY_CONTACT } from '@/data/companyData';

const SERVICE_OPTIONS = [
  'HDPE & DI Pipeline Works',
  'Solar Project Works',
  'Water Storage Tanks',
  'Heavy Fabrication',
  'Irrigation Pipeline Projects',
  'Other Infrastructure Works'
];

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggeredAutomatically, setHasTriggeredAutomatically] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    serviceType: 'HDPE & DI Pipeline Works',
    location: '',
    budget: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close Modal Handler
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Open Modal Handler
  const openModal = useCallback(() => {
    setIsOpen(true);
    setFormStatus('idle');
    setStatusMessage('');
  }, []);

  // Only opens when explicitly dispatched via custom event
  useEffect(() => {
    const handleGlobalTrigger = () => openModal();
    window.addEventListener('open-enquiry-modal', handleGlobalTrigger);

    return () => {
      window.removeEventListener('open-enquiry-modal', handleGlobalTrigger);
    };
  }, [openModal]);

  // Only opens when explicitly requested (e.g. custom button triggers)
  // Automatic refresh timer removed as requested

  // Body Scroll Lock & Escape Key Handler
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  // Form Field Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormStatus('error');
      setStatusMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
      setFormStatus('error');
      setStatusMessage('Please enter a valid mobile number (e.g., 9876543210).');
      return;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setFormStatus('error');
        setStatusMessage('Please enter a valid email address.');
        return;
      }
    }

    setFormStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(data.message || 'Quotation request submitted successfully!');
        // Reset form
        setFormData({
          fullName: '',
          company: '',
          phone: '',
          email: '',
          serviceType: 'HDPE & DI Pipeline Works',
          location: '',
          budget: '',
          message: ''
        });
      } else {
        setFormStatus('error');
        setStatusMessage(data.message || 'Unable to submit enquiry. Please check your details.');
      }
    } catch (err) {
      console.error('Submission failed', err);
      setFormStatus('error');
      setStatusMessage('Connection error. Please call our team directly.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div 
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={closeModal}
          aria-label="Close quote enquiry popup"
        >
          <X size={20} />
        </button>

        <div className={styles.modalContentGrid}>
          
          {/* Left Column: Brand & Trust Information */}
          <div className={styles.leftCol}>
            <div className={styles.leftTop}>
              <div className={styles.badgeWrap}>
                <Sparkles size={14} className={styles.badgeIcon} />
                <span>Contact Technical Team</span>
              </div>

              <h2 id="enquiry-modal-title" className={styles.modalHeading}>
                Contact <span className={styles.headingHighlight}>Us</span>
              </h2>

              <p className={styles.modalSubtitle}>
                Tell us about your infrastructure requirements. Our team will connect with you to discuss 
                the right execution plan and quotation.
              </p>

              {/* Engineering Highlights */}
              <div className={styles.trustList}>
                <div className={styles.trustItem}>
                  <CheckCircle2 size={16} className={styles.trustCheck} />
                  <span>Immediate machine mobilization &amp; technical surveying</span>
                </div>
                <div className={styles.trustItem}>
                  <CheckCircle2 size={16} className={styles.trustCheck} />
                  <span>Direct consultation with Managing Directors</span>
                </div>
                <div className={styles.trustItem}>
                  <CheckCircle2 size={16} className={styles.trustCheck} />
                  <span>Zero-defect execution standard (ISO 9001 / 14001 / 45001)</span>
                </div>
              </div>
            </div>

            {/* Direct Phone Assistance Banner */}
            <div className={styles.directPhoneCard}>
              <div className={styles.phoneIconBox}>
                <PhoneCall size={20} />
              </div>
              <div>
                <span className={styles.phoneLabel}>Need Immediate Assistance?</span>
                <a 
                  href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`}
                  className={styles.phoneNumber}
                >
                  {COMPANY_CONTACT.owners[0].phones[0]}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className={styles.rightCol}>
            {formStatus === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIconBox}>
                  <CheckCircle2 size={44} />
                </div>
                <h3 className={styles.successTitle}>Request Submitted Successfully</h3>
                <p className={styles.successDesc}>{statusMessage}</p>
                <div className={styles.successActions}>
                  <a 
                    href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`}
                    className={styles.successCallBtn}
                  >
                    <PhoneCall size={16} />
                    <span>Call Managing Director</span>
                  </a>
                  <button
                    type="button"
                    className={styles.successCloseBtn}
                    onClick={closeModal}
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.enquiryForm} noValidate>
                
                {formStatus === 'error' && (
                  <div className={styles.errorAlert} role="alert">
                    <AlertCircle size={16} />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Row 1: Name & Company */}
                <div className={styles.formRow2}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modal-fullName" className={styles.label}>
                      Full Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="modal-fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g., Rajesh Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-company" className={styles.label}>
                      Company / Organization
                    </label>
                    <input
                      id="modal-company"
                      name="company"
                      type="text"
                      placeholder="e.g., Solar EPC Ltd"
                      value={formData.company}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Email */}
                <div className={styles.formRow2}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modal-phone" className={styles.label}>
                      Mobile Number <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      name="email"
                      type="email"
                      placeholder="rajesh@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Row 3: Service Type & Project Location */}
                <div className={styles.formRow2}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modal-serviceType" className={styles.label}>
                      Project / Service Type <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                      id="modal-serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      {SERVICE_OPTIONS.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="modal-location" className={styles.label}>
                      Project Location
                    </label>
                    <input
                      id="modal-location"
                      name="location"
                      type="text"
                      placeholder="e.g., Pune / Solapur / Gujarat"
                      value={formData.location}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Row 4: Estimated Budget (Optional) */}
                <div className={styles.formGroup}>
                  <label htmlFor="modal-budget" className={styles.label}>
                    Estimated Project Budget <span className={styles.optionalNote}>(optional)</span>
                  </label>
                  <input
                    id="modal-budget"
                    name="budget"
                    type="text"
                    placeholder="e.g., ₹25 Lakhs / ₹1 Crore / Open for Tender"
                    value={formData.budget}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                {/* Row 5: Message / Technical Requirements */}
                <div className={styles.formGroup}>
                  <label htmlFor="modal-message" className={styles.label}>
                    Project Requirements / Message
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={3}
                    placeholder="Briefly describe pipe diameter, trench length, MW capacity, or piling specs..."
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                </div>

                {/* Actions Button Group */}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={styles.submitBtn}
                  >
                    <span>
                      {formStatus === 'submitting' ? 'Submitting Details...' : 'Contact Us →'}
                    </span>
                  </button>

                  <a 
                    href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`}
                    className={styles.callAltBtn}
                  >
                    <PhoneCall size={16} />
                    <span>Call Our Team</span>
                  </a>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
