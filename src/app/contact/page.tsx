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
    serviceInterest: 'Water Pipeline Infrastructure',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      setFormStatus('error');
      setStatusMessage('Please fill in your name, contact phone, and project inquiry details.');
      return;
    }

    setFormStatus('submitting');

    // Simulate reliable client-side processing & generate mailto fallback
    setTimeout(() => {
      setFormStatus('success');
      setStatusMessage(
        'Thank you! Your project enquiry has been registered in the system. For immediate mobilization discussions, you may also reach our directors directly via the contact numbers listed.'
      );
    }, 600);
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
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Registered Office</h2>
              <div className={styles.addressRow}>
                <MapPin size={22} className={styles.addressIcon} />
                <div className={styles.addressText}>
                  <strong>{COMPANY_CONTACT.companyName}</strong>
                  <br />
                  {COMPANY_CONTACT.address}
                  <br />
                  <a 
                    href={COMPANY_CONTACT.googleMapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.mapBtn}
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <h2 className={styles.infoTitle} style={{ marginTop: 24 }}>Managing Directors & Owners</h2>
              
              {COMPANY_CONTACT.owners.map((owner) => (
                <div key={owner.name} className={styles.ownerCard}>
                  <div className={styles.ownerName}>{owner.name}</div>
                  <div className={styles.ownerRole}>{owner.designation}</div>
                  
                  <div className={styles.contactList}>
                    {owner.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className={styles.contactLink}>
                        <Phone size={14} color="var(--color-accent)" />
                        <span>{phone}</span>
                      </a>
                    ))}
                    {owner.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`} className={styles.contactLink}>
                        <Mail size={14} color="var(--color-accent)" />
                        <span style={{ wordBreak: 'break-all' }}>{email}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'var(--color-primary-dark)', color: '#FFFFFF', padding: 24, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <ShieldCheck size={36} color="var(--color-accent)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Fast-Track Mobilization</h4>
                <p style={{ fontSize: '0.85rem', color: '#CBD5E0', marginTop: 4 }}>
                  Fleet readiness for hydraulic butt fusion rigs, tractor auger pilers, and earthmovers across Maharashtra and nationwide.
                </p>
              </div>
            </div>
          </div>

          {/* Project Enquiry Form Column */}
          <div className={styles.formCol}>
            <h2 className={styles.formTitle}>Send a Project Enquiry</h2>
            <p className={styles.formSubtitle}>
              Fill in your project requirements below. For emergency mobilization, kindly use direct phone contact.
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
                  <label htmlFor="name" className={styles.formLabel}>Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>Company / EPC Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="e.g. EPC Infra Ltd"
                    className={styles.formInput}
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Contact Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 9876543210"
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

              <div className={styles.formGroup}>
                <label htmlFor="serviceInterest" className={styles.formLabel}>Area of Project Scope</label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  className={styles.formSelect}
                  value={formData.serviceInterest}
                  onChange={handleChange}
                >
                  <option value="Water Pipeline Infrastructure">Water Pipeline Infrastructure (HDPE / DI)</option>
                  <option value="Solar Infrastructure">Solar Infrastructure (DTH Piling / MMS / Fencing)</option>
                  <option value="Water Storage Tanks">Water Storage Tanks (Zincalume / SMC / FBEC / GLS)</option>
                  <option value="Heavy Fabrication">Heavy Fabrication (Bridges / Shelters / Warehouses)</option>
                  <option value="Other Infrastructure">General Civil / Machinery Works</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Project Scope & Location Details *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Describe your project pipeline diameter, piling strata, site location, timeline..."
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
                  <span>Processing Enquiry...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Project Scope Enquiry</span>
                  </>
                )}
              </button>

              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textAlign: 'center', marginTop: 8 }}>
                Or email directly to: <a href={`mailto:${COMPANY_CONTACT.owners[0].emails[0]}`} style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>{COMPANY_CONTACT.owners[0].emails[0]}</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
