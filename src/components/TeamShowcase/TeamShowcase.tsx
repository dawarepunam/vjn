'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Phone, Mail, ArrowRight, Briefcase, Star, Building2, User } from 'lucide-react';
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
