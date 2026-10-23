'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Phone, Mail, ArrowRight, Briefcase, Star, Building2, User, Globe } from 'lucide-react';
import styles from './TeamShowcase.module.css';

/* ── Partner Data ────────────────────────────────────────────── */
export interface PartnerData {
  id: string;
  initials: string;
  name: string;
  photo?: string;       // Image path e.g. /images/nitin-pawar.jpg
  role: string;         // e.g. "Partner"
  rolePill: string;
  designation: string;  // full designation
  bio: string;
  phone: string;
  email: string;
  expertise: string[];
  stats: { value: string; label: string }[];
  focus: string;
  socialLinks?: {
    linkedin?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
  };
}

const PARTNERS: PartnerData[] = [
  {
    id: 'nitin-pawar',
    initials: 'NP',
    name: 'Nitin Pawar',
    photo: '/images/nitin-pawar.jpg',
    role: 'Partner',
    rolePill: 'Partner',
    designation: 'Partner & Managing Director — JNP Infra Eng Works',
    bio: 'Nitin Pawar leads business operations, machinery fleet management, and client contracts at JNP Infra Eng Works. With over 10 years of site leadership across HDPE and DI pipeline projects and solar EPC contracts, he ensures execution quality and client delivery assurance.',
    phone: '+91 77220 35000',
    email: 'pawarnitin@jnpinfraworks.com',
    expertise: [
      'HDPE & DI Pipeline Execution',
      'Solar EPC Project Management',
      'Heavy Machinery Operations',
      'Site Safety & Quality Control',
      'Client Relations & Contracts',
      'Water Infrastructure Works',
    ],
    stats: [
      { value: '10+', label: 'Years\nExperience' },
      { value: '20+', label: 'Major\nClients' },
      { value: 'ISO', label: '9001 / 14001\n45001' },
    ],
    focus: 'Overall project execution, machinery fleet management, and client delivery assurance across all JNP Infra contracts.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/nitin-pawar-jnp/',
      whatsapp: 'https://wa.me/917722035000?text=Hello%20Nitin%20Sir%2C%20connecting%20via%20JNP%20Infra%20website',
      instagram: 'https://www.instagram.com/jnpinfraengworks/',
      facebook: 'https://www.facebook.com/jnpinfraengworks',
    },
  },
  {
    id: 'sukaram-jamadar',
    initials: 'SJ',
    name: 'Sukaram Jamadar',
    photo: '/images/sukaram-jamadar.png',
    role: 'Partner',
    rolePill: 'Partner',
    designation: 'Partner & Project Manager — JNP Infra Eng Works',
    bio: 'Sukaram Jamadar leads on-ground engineering coordination, technical planning, and systematic site execution at JNP Infra Eng Works. He oversees complete lifecycle delivery from mobilization and machine jointing to testing, backfilling, and final client sign-off.',
    phone: '+91 72182 58475',
    email: 'sukaram@jnpinfraworks.com',
    expertise: [
      'Project Planning & Scheduling',
      'On-site Technical Coordination',
      'Pipeline Jointing & Testing',
      'Solar Foundation Piling',
      'Team Leadership & Training',
      'ISO Compliance & Reporting',
    ],
    stats: [
      { value: '10+', label: 'Years\nExperience' },
      { value: '50+', label: 'Projects\nDelivered' },
      { value: '3', label: 'ISO\nCertifications' },
    ],
    focus: 'End-to-end project management, technical site coordination, and compliance assurance for water pipeline and solar EPC contracts.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/jnp-infra-eng-works/',
      whatsapp: 'https://wa.me/917218258475?text=Hello%20Sukaram%20Sir%2C%20connecting%20via%20JNP%20Infra%20website',
      instagram: 'https://www.instagram.com/jnpinfraengworks/',
      facebook: 'https://www.facebook.com/jnpinfraengworks',
    },
  },
];

export default function TeamShowcase() {
  const [activePartner, setActivePartner] = useState<PartnerData | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body & HTML scroll lock — completely removes the main browser window scrollbar
  useEffect(() => {
    if (activePartner) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 60);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => { 
      document.documentElement.style.overflow = '';
      document.body.style.overflow = ''; 
    };
  }, [activePartner]);

  // Escape key handler
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePartner) closePanel();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [activePartner]);

  const closePanel = useCallback(() => setActivePartner(null), []);

  return (
    <section className={styles.teamSection} id="leadership">
      <div className="container">

        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>
            OUR PARTNERS
          </div>
          <h2 className={styles.sectionTitle}>
            Meet the <span className={styles.accent}>Partners</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Hands-on leadership that stays close to every site. Click on a partner to work with, fully profile.
          </p>
        </div>

        {/* Partner Cards Grid - Exact Dark Glass with Gold Borders */}
        <div className={styles.partnersGrid} role="list">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              role="listitem"
              className={styles.partnerCard}
              onClick={() => setActivePartner(partner)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePartner(partner); } }}
              aria-label={`View profile for ${partner.name}`}
            >
              {/* Top Row: Avatar + Name + Partner Tag */}
              <div className={styles.cardHeader}>
                <div className={styles.cardAvatar}>
                  {partner.photo ? (
                    <img 
                      src={partner.photo} 
                      alt={partner.name} 
                      className={styles.cardAvatarImg} 
                      onError={(e) => {
                        // Fallback to initials if image file not yet present
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector(`.${styles.cardAvatarInitials}`) as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span 
                    className={styles.cardAvatarInitials} 
                    style={{ display: partner.photo ? 'none' : 'flex' }}
                  >
                    {partner.initials}
                  </span>
                </div>
                <div className={styles.cardIdentity}>
                  <h3 className={styles.cardName}>{partner.name}</h3>
                  <span className={styles.cardRole}>{partner.role}</span>
                </div>
              </div>

              {/* Contact Info Rows */}
              <div className={styles.cardContactList}>
                <a 
                  href={`tel:${partner.phone.replace(/\s/g, '')}`} 
                  className={styles.cardContactItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.cardContactIcon}>
                    <Phone size={13} />
                  </div>
                  <span>{partner.phone}</span>
                </a>
                <a 
                  href={`mailto:${partner.email}`} 
                  className={styles.cardContactItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.cardContactIcon}>
                    <Mail size={13} />
                  </div>
                  <span>{partner.email}</span>
                </a>
              </div>

              {/* View Profile Link */}
              <div className={styles.cardCta}>
                <span className={styles.cardCtaText}>View Profile →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Backdrop ─────────────────────────────────────────── */}
      <div
        className={`${styles.overlay} ${activePartner ? styles.overlayVisible : ''}`}
        onClick={closePanel}
        aria-hidden="true"
      />

      {/* ── Detail Side Panel ─────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={activePartner ? `${activePartner.name} profile` : 'Partner profile'}
        className={`${styles.panel} ${activePartner ? styles.panelOpen : ''}`}
      >
        {activePartner && (
          <div className={styles.panelInner}>

            {/* Clean Executive Header — Dedicated Photo Card + Clear Identity */}
            <div className={styles.executiveHeaderClean}>
              {/* Top row with close button */}
              <div className={styles.cleanHeaderTop}>
                <span className={styles.panelRoleBadge}>
                  <span className={styles.panelRoleDot} />
                  {activePartner.rolePill || activePartner.role}
                </span>
                <button
                  ref={closeBtnRef}
                  className={styles.panelCloseBtnClean}
                  onClick={closePanel}
                  aria-label="Close partner profile panel"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Executive Identity Row: Photo on Left, Details on Right */}
              <div className={styles.executiveIdentityRow}>
                <div className={styles.executivePhotoFrame}>
                  {activePartner.photo ? (
                    <img 
                      src={activePartner.photo} 
                      alt={activePartner.name} 
                      className={styles.executivePhotoImg}
                    />
                  ) : (
                    <div className={styles.executivePhotoFallback}>
                      <span>{activePartner.initials}</span>
                    </div>
                  )}
                </div>

                <div className={styles.executiveDetailsCol}>
                  <h3 className={styles.executiveName}>{activePartner.name}</h3>
                  <div className={styles.executiveDesignation}>{activePartner.designation}</div>
                  <div className={styles.executiveQuickBadges}>
                    <span className={styles.quickBadge}>Leadership</span>
                    <span className={styles.quickBadge}>Verified Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className={styles.panelBody}>

              {/* Stats row */}
              <div className={styles.statsRow}>
                {activePartner.stats.map((stat) => (
                  <div key={stat.label} className={styles.statItem}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel} style={{ whiteSpace: 'pre-line' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* About / Bio block */}
              <div className={styles.infoBlock}>
                <div className={styles.infoBlockHeader}>
                  <div className={styles.infoBlockIcon}>
                    <User size={17} />
                  </div>
                  <div>
                    <h4 className={styles.infoBlockTitle}>About {activePartner.name}</h4>
                    <span className={styles.infoBlockSubtitle}>Leadership Profile</span>
                  </div>
                </div>
                <p className={styles.bioText}>{activePartner.bio}</p>
              </div>

              {/* Key Focus */}
              <div className={styles.infoBlock}>
                <div className={styles.infoBlockHeader}>
                  <div className={styles.infoBlockIcon} style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#D97706' }}>
                    <Building2 size={17} />
                  </div>
                  <div>
                    <h4 className={styles.infoBlockTitle}>Primary Responsibility</h4>
                    <span className={styles.infoBlockSubtitle}>Core Operational Focus</span>
                  </div>
                </div>
                <p className={styles.bioText}>{activePartner.focus}</p>
              </div>

              {/* Expertise Tags */}
              <div className={styles.infoBlock}>
                <div className={styles.infoBlockHeader}>
                  <div className={styles.infoBlockIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
                    <Briefcase size={17} />
                  </div>
                  <div>
                    <h4 className={styles.infoBlockTitle}>Areas of Expertise</h4>
                    <span className={styles.infoBlockSubtitle}>Technical &amp; Operational Skills</span>
                  </div>
                </div>
                <div className={styles.tagsList}>
                  {activePartner.expertise.map((skill) => (
                    <span key={skill} className={styles.tag}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Direct Contact block */}
              <div className={styles.infoBlock}>
                <div className={styles.infoBlockHeader}>
                  <div className={styles.infoBlockIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706' }}>
                    <Phone size={17} />
                  </div>
                  <div>
                    <h4 className={styles.infoBlockTitle}>Direct Contact</h4>
                    <span className={styles.infoBlockSubtitle}>Reach out directly</span>
                  </div>
                </div>
                <div className={styles.contactList}>
                  <a
                    href={`tel:${activePartner.phone.replace(/\s/g, '')}`}
                    className={styles.contactRow}
                  >
                    <div className={styles.contactRowIcon}>📞</div>
                    <div className={styles.contactRowText}>
                       <span className={styles.contactRowLabel}>Phone</span>
                      <span className={styles.contactRowValue}>{activePartner.phone}</span>
                    </div>
                  </a>
                  <a
                    href={`mailto:${activePartner.email}`}
                    className={styles.contactRow}
                  >
                    <div className={styles.contactRowIcon}>✉️</div>
                    <div className={styles.contactRowText}>
                      <span className={styles.contactRowLabel}>Email</span>
                      <span className={styles.contactRowValue}>{activePartner.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              {activePartner.socialLinks && (
                <div className={styles.infoBlock}>
                  <div className={styles.infoBlockHeader}>
                    <div className={styles.infoBlockIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#2563EB' }}>
                      <Globe size={17} />
                    </div>
                    <div>
                      <h4 className={styles.infoBlockTitle}>Connect on Social</h4>
                      <span className={styles.infoBlockSubtitle}>Follow &amp; message directly</span>
                    </div>
                  </div>
                  <div className={styles.socialLinksRow}>
                    {activePartner.socialLinks.linkedin && (
                      <a
                        href={activePartner.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialBtn} ${styles.socialLinkedIn}`}
                        aria-label="LinkedIn Profile"
                        title="LinkedIn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {activePartner.socialLinks.whatsapp && (
                      <a
                        href={activePartner.socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialBtn} ${styles.socialWhatsApp}`}
                        aria-label="Chat on WhatsApp"
                        title="WhatsApp"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    )}
                    {activePartner.socialLinks.instagram && (
                      <a
                        href={activePartner.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialBtn} ${styles.socialInstagram}`}
                        aria-label="Instagram Profile"
                        title="Instagram"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>Instagram</span>
                      </a>
                    )}
                    {activePartner.socialLinks.facebook && (
                      <a
                        href={activePartner.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialBtn} ${styles.socialFacebook}`}
                        aria-label="Facebook Page"
                        title="Facebook"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Sticky Footer CTAs */}
            <div className={styles.panelFooter}>
              <a
                href={`tel:${activePartner.phone.replace(/\s/g, '')}`}
                className={styles.panelCallBtn}
              >
                <Phone size={16} />
                <span>Call {activePartner.name.split(' ')[0]}</span>
              </a>
              <a
                href={`mailto:${activePartner.email}`}
                className={styles.panelEmailBtn}
              >
                <Mail size={15} />
                <span>Send Email</span>
              </a>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
