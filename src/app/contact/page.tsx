'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import styles from './contact.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { COMPANY_CONTACT } from '@/data/companyData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceInterest: 'HDPE & DI Pipeline Works',
    location: '',
    budget: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      setFormStatus('error');
      setStatusMessage('Please fill in your name, contact phone, and project requirements.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.serviceInterest,
          location: (formData as any).location || '',
          budget: (formData as any).budget || '',
          message: formData.message
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(data.message || 'Thank you! Your requirements have been submitted.');
      } else {
        setFormStatus('error');
        setStatusMessage(data.message || 'Unable to submit. Please check your inputs.');
      }
    } catch (err) {
      setFormStatus('error');
      setStatusMessage('Error submitting form. Please call our technical management directly.');
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          <h1 className={styles.pageHeroTitle}>Contact Technical Management</h1>
          <p className={styles.pageHeroDesc}>
            Reach out directly to discuss site surveys, equipment leasing/deployment, 
            pipeline jointing works, solar DTH piling, or heavy structural steel fabrication.
          </p>
        </div>
      </section>

      {/* Main Contact Layout */}
      <div className="container">
        <div className={styles.contactLayout}>
          {/* Company Office & Direct Contacts Column */}
          <div className={styles.infoCol}>
            {/* Registered Office Card */}
            <div className={styles.officeCard}>
              <div className={styles.cardHeaderTop}>
                <div className={styles.officeIconBox}>
                  <MapPin size={24} />
                </div>
                <div>
                  <span className={styles.cardBadgePill}>Headquarters</span>
                  <h2 className={styles.officeTitle}>Registered Office</h2>
                </div>
              </div>

              <div className={styles.officeDivider} />

              <div className={styles.addressText}>
                <strong className={styles.companyNameHighlight}>{COMPANY_CONTACT.companyName}</strong>
                <p className={styles.companyAddressDesc}>{COMPANY_CONTACT.address}</p>
                
                <a 
                  href={COMPANY_CONTACT.googleMapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.mapBtn}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Managing Directors & Owners Section */}
            <div className={styles.ownersSection}>
              <div className={styles.ownersSectionHeader}>
                <span className={styles.cardBadgePill}>Leadership</span>
                <h3 className={styles.ownersHeading}>Managing Directors &amp; Owners</h3>
              </div>
              
              <div className={styles.ownersList}>
                {COMPANY_CONTACT.owners.map((owner) => (
                  <div key={owner.name} className={styles.ownerCard}>
                    <div className={styles.ownerTop}>
                      <div className={styles.ownerAvatar}>
                        {owner.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className={styles.ownerMeta}>
                        <div className={styles.ownerName}>{owner.name}</div>
                        <div className={styles.ownerRole}>{owner.designation}</div>
                      </div>
                    </div>
                    
                    <div className={styles.ownerDivider} />

                    <div className={styles.contactList}>
                      {owner.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} className={styles.contactLink}>
                          <div className={styles.contactIconWrap}>
                            <Phone size={13} />
                          </div>
                          <span className={styles.contactText}>{phone}</span>
                        </a>
                      ))}
                      {owner.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className={styles.contactLink}>
                          <div className={styles.contactIconWrap}>
                            <Mail size={13} />
                          </div>
                          <span className={styles.contactText} style={{ wordBreak: 'break-all' }}>{email}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.mobilizationCard}>
              <div className={styles.mobilizationIconWrap}>
                <ShieldCheck size={30} />
              </div>
              <div>
                <h4 className={styles.mobilizationTitle}>Fast-Track Mobilization</h4>
                <p className={styles.mobilizationDesc}>
                  Fleet readiness for hydraulic butt fusion rigs, tractor auger pilers, and earthmovers across Maharashtra and nationwide.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Us Form Column — Upgraded to Premium Layout matching modal form */}
          <div className={styles.formCol}>
            <h2 className={styles.formTitle}>Contact Us</h2>
            <p className={styles.formSubtitle}>
              Fill in your infrastructure requirements below. Our technical engineering team will review your specifications and contact you directly.
            </p>

            {formStatus === 'success' && (
              <div className={`${styles.alertBox} ${styles.alertSuccess}`}>
                <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                <span>{statusMessage}</span>
              </div>
            )}

            {formStatus === 'error' && (
              <div className={`${styles.alertBox} ${styles.alertError}`}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.enquiryForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g., Rajesh Sharma"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="e.g., EPC Infra Ltd"
                    className={styles.formInput}
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Mobile Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className={styles.formInput}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="rajesh@example.com"
                    className={styles.formInput}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="serviceInterest" className={styles.formLabel}>Project / Service Type *</label>
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    className={styles.formSelect}
                    value={formData.serviceInterest}
                    onChange={handleChange}
                  >
                    <option value="HDPE & DI Pipeline Works">HDPE &amp; DI Pipeline Works</option>
                    <option value="Solar Project Works">Solar Project Works (DTH Piling / MMS / Fencing)</option>
                    <option value="Water Storage Tanks">Water Storage Tanks (Zincalume / SMC / Panel / GLS)</option>
                    <option value="Heavy Fabrication">Heavy Fabrication (Bridges / Shelters / Warehouses)</option>
                    <option value="Irrigation Pipeline Projects">Irrigation Pipeline Projects</option>
                    <option value="Other Infrastructure Works">Other Infrastructure Works</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location" className={styles.formLabel}>Project Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g., Pune / Solapur / Gujarat"
                    className={styles.formInput}
                    value={formData.location || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="budget" className={styles.formLabel}>Estimated Project Budget (optional)</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  placeholder="e.g., ₹25 Lakhs / ₹1 Crore / Open for Tender"
                  className={styles.formInput}
                  value={formData.budget || ''}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Project Requirements / Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Briefly describe pipe diameter, trench length, MW capacity, or piling specs..."
                  className={styles.formTextarea}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? (
                  <span>Submitting Details...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Contact Us →</span>
                  </>
                )}
              </button>

              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textAlign: 'center', marginTop: 8 }}>
                Or call directly: <a href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{COMPANY_CONTACT.owners[0].phones[0]}</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
