import Link from 'next/link';
import { Phone, Mail, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';
import { COMPANY_CONTACT } from '@/data/companyData';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Company Branding Column */}
          <div className={styles.brandCol}>
            <div className={styles.footerLogo}>
              <div className={styles.logoIcon}>JNP</div>
              <span className={styles.footerBrandName}>JNP INFRA ENG WORKS</span>
            </div>
            <p className={styles.tagline}>{COMPANY_CONTACT.tagline}</p>
            <p className={styles.brandDesc}>
              A specialized infrastructure execution company delivering high-standard HDPE & DI pipelines, 
              utility-scale solar piling, industrial water storage tanks, and structural heavy fabrication across India.
            </p>
            <div className={styles.isoTags}>
              <span className={styles.isoTag}><ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />ISO 9001:2015</span>
              <span className={styles.isoTag}><ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />ISO 14001:2015</span>
              <span className={styles.isoTag}><ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />ISO 45001:2018</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.footerLink}>
                  <ChevronRight size={14} /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  <ChevronRight size={14} /> About JNP Infra
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles.footerLink}>
                  <ChevronRight size={14} /> All Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  <ChevronRight size={14} /> Capabilities & Projects
                </Link>
              </li>
              <li>
                <Link href="/clients" className={styles.footerLink}>
                  <ChevronRight size={14} /> EPC Clients & Sectors
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  <ChevronRight size={14} /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className={styles.colTitle}>Specializations</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/services/water-pipeline" className={styles.footerLink}>
                  <ChevronRight size={14} /> Water Pipeline Works
                </Link>
              </li>
              <li>
                <Link href="/services/solar-infrastructure" className={styles.footerLink}>
                  <ChevronRight size={14} /> Solar Infrastructure & Piling
                </Link>
              </li>
              <li>
                <Link href="/services/water-tanks" className={styles.footerLink}>
                  <ChevronRight size={14} /> Water Storage Tanks
                </Link>
              </li>
              <li>
                <Link href="/services/heavy-fabrication" className={styles.footerLink}>
                  <ChevronRight size={14} /> Heavy Fabrication & Bridges
                </Link>
              </li>
              <li>
                <Link href="/services/water-pipeline" className={styles.footerLink}>
                  <ChevronRight size={14} /> HDPE Butt Fusion Jointing
                </Link>
              </li>
              <li>
                <Link href="/services/solar-infrastructure" className={styles.footerLink}>
                  <ChevronRight size={14} /> DTH & Tractor Auger Piling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Column */}
          <div className={styles.contactBlock}>
            <h4 className={styles.colTitle}>Registered Office</h4>
            
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactItemIcon} />
              <span>
                {COMPANY_CONTACT.address}
              </span>
            </div>

            {COMPANY_CONTACT.owners.map((owner) => (
              <div key={owner.name} className={styles.ownerRow}>
                <div className={styles.ownerName}>{owner.name}</div>
                <div className={styles.ownerRole}>{owner.designation}</div>
                <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {owner.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                      <Phone size={11} color="var(--color-accent)" /> {phone}
                    </a>
                  ))}
                  {owner.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', wordBreak: 'break-all' }}>
                      <Mail size={11} color="var(--color-accent)" /> {email}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            © 2026 M/s JNP Infra Eng Works. All rights reserved.
          </div>
          <div className={styles.bottomBackbone}>
            “{COMPANY_CONTACT.subTagline}”
          </div>
        </div>
      </div>
    </footer>
  );
}
