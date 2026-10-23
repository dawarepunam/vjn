'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowRight, ChevronRight, Briefcase, Info, Camera, MapPin } from 'lucide-react';
import styles from './ClientShowcase.module.css';
import { ClientDetailData } from '@/data/clientDetails';

interface Props {
  clients: ClientDetailData[];
  categoryIcon: React.ReactNode;
  categoryLabel: string;
}

export default function ClientShowcase({ clients, categoryIcon, categoryLabel }: Props) {
  const [activeClient, setActiveClient] = useState<ClientDetailData | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstCardRef = useRef<HTMLButtonElement | null>(null);

  // Lock body & HTML scroll when panel open to remove main window scrollbar
  useEffect(() => {
    if (activeClient) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // Move focus to close button for keyboard users
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [activeClient]);

  // Escape key closes panel
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeClient) closePanel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeClient]);

  const closePanel = useCallback(() => {
    setActiveClient(null);
  }, []);

  // Handle anchor link / hash navigation
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = clients.find((c) => c.id === hash);
        if (found) {
          setActiveClient(found);
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [clients]);

  return (
    <div>
      {/* ── Client Card Grid ─────────────────────────────────── */}
      <div className={styles.clientGrid} role="list">
        {clients.map((client, idx) => (
          <button
            key={client.id}
            id={client.id}
            role="listitem"
            className={`${styles.clientCard} ${activeClient?.id === client.id ? styles.active : ''}`}
            onClick={() => setActiveClient(client)}
            aria-label={`View details for ${client.name}`}
            aria-expanded={activeClient?.id === client.id}
            aria-haspopup="dialog"
            ref={idx === 0 ? firstCardRef : undefined}
          >
            {/* Logo container or neutral fallback */}
            <div className={styles.cardLogoWrap}>
              {client.logoUrl ? (
                <img
                  src={client.logoUrl}
                  alt={`${client.name} logo`}
                  className={styles.cardLogoImg}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={styles.cardLogoUnavailable}
                style={{ display: client.logoUrl ? 'none' : 'flex' }}
                title="Official logo asset pending verification"
              >
                <span className={styles.unavailableText}>{client.logoMark || client.shortName}</span>
              </div>
            </div>

            <div className={styles.cardMetaWrap}>
              <div className={styles.cardName}>{client.shortName}</div>
              <div className={styles.cardBadgeRow}>
                <span className={styles.cardBadge}>{client.badge}</span>
                <span className={styles.cardActionHint}>
                  View Details <ChevronRight size={13} className={styles.cardArrow} aria-hidden="true" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Backdrop Overlay ─────────────────────────────────── */}
      <div
        className={`${styles.overlay} ${activeClient ? styles.overlayVisible : ''}`}
        onClick={closePanel}
        aria-hidden="true"
      />

      {/* ── Side Panel ───────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeClient ? `${activeClient.name} details` : 'Client details'}
        className={`${styles.panel} ${activeClient ? styles.panelOpen : ''}`}
      >
        {activeClient && (
          <div className={styles.panelInner}>
            {/* Premium Header */}
            <div className={styles.panelHeader}>
              <div className={styles.panelHeaderTop}>
                <div className={styles.panelLogoCard}>
                  {activeClient.logoUrl ? (
                    <img
                      src={activeClient.logoUrl}
                      alt={`${activeClient.name} logo`}
                      className={styles.panelLogoBig}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={styles.panelLogoUnavailableBig}
                    style={{ display: activeClient.logoUrl ? 'none' : 'flex' }}
                  >
                    <span>Logo</span>
                  </div>
                </div>

                <button
                  ref={closeBtnRef}
                  className={styles.closeBtn}
                  onClick={closePanel}
                  aria-label="Close client details panel"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={styles.panelHeaderContent}>
                <div className={styles.panelBadgeRow}>
                  <span
                    className={styles.panelCategoryBadge}
                    style={{
                      background: activeClient.category === 'Solar EPC'
                        ? 'linear-gradient(135deg, rgba(224, 122, 43, 0.15) 0%, rgba(224, 122, 43, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(0, 119, 182, 0.15) 0%, rgba(0, 119, 182, 0.05) 100%)',
                      color: activeClient.category === 'Solar EPC'
                        ? 'var(--color-accent)'
                        : 'var(--color-secondary)',
                      borderColor: activeClient.category === 'Solar EPC'
                        ? 'rgba(224, 122, 43, 0.3)'
                        : 'rgba(0, 119, 182, 0.3)'
                    }}
                  >
                    <span className={styles.badgePulseDot} style={{
                      backgroundColor: activeClient.category === 'Solar EPC'
                        ? 'var(--color-accent)'
                        : 'var(--color-secondary)'
                    }} />
                    {activeClient.category}
                  </span>

                  <span className={styles.panelSubBadge}>
                    {activeClient.badge}
                  </span>
                </div>

                <h3 className={styles.panelClientName}>{activeClient.name}</h3>
                <div className={styles.panelClientSector}>{activeClient.sector}</div>
              </div>
            </div>

            {/* Scrollable body */}
            <div className={styles.panelBody}>
              {/* Company Overview Block */}
              <div className={styles.panelBlock}>
                <div className={styles.panelBlockHeader}>
                  <div className={styles.panelBlockIconBox}>
                    <Info size={16} />
                  </div>
                  <div>
                    <h4 className={styles.panelBlockTitle}>Company Overview</h4>
                    <span className={styles.panelBlockSubtitle}>Industry Profile &amp; Scale</span>
                  </div>
                </div>
                <p className={styles.panelOverviewText}>{activeClient.overview}</p>
              </div>

              {/* Relevant JNP Services */}
              <div className={styles.panelBlock}>
                <div className={styles.panelBlockHeader}>
                  <div className={styles.panelBlockIconBox} style={{ background: 'rgba(224, 122, 43, 0.12)', color: 'var(--color-accent)' }}>
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <h4 className={styles.panelBlockTitle}>Execution Capabilities for this Sector</h4>
                    <span className={styles.panelBlockSubtitle}>Specialized Works Handled by JNP Infra</span>
                  </div>
                </div>
                <ul className={styles.servicesList} aria-label="Relevant JNP services">
                  {activeClient.relevantJNPServices.map((svc) => (
                    <li key={svc} className={styles.servicesItem}>
                      <div className={styles.servicesCheckIcon}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className={styles.servicesItemText}>{svc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Executed Works Image Gallery */}
              {activeClient.executedWorks && activeClient.executedWorks.length > 0 && (
                <div className={styles.panelBlock}>
                  <div className={styles.panelBlockHeader}>
                    <div className={styles.panelBlockIconBox} style={{ background: 'rgba(10, 37, 64, 0.1)', color: 'var(--color-primary)' }}>
                      <Camera size={16} />
                    </div>
                    <div>
                      <h4 className={styles.panelBlockTitle}>Executed Works</h4>
                      <span className={styles.panelBlockSubtitle}>Photographic record of JNP field execution</span>
                    </div>
                  </div>
                  <div className={styles.worksGallery}>
                    {activeClient.executedWorks.map((work, i) => (
                      <div key={i} className={styles.workCard}>
                        <div className={styles.workImgWrap}>
                          <img
                            src={work.image}
                            alt={work.title}
                            className={styles.workImg}
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div className={styles.workImgFallback}>
                            <Camera size={24} />
                          </div>
                          <span className={styles.workTag}>{work.tag}</span>
                        </div>
                        <div className={styles.workInfo}>
                          <div className={styles.workTitle}>{work.title}</div>
                          <div className={styles.workScope}>{work.scope}</div>
                          {work.location && (
                            <div className={styles.workLocation}>
                              <MapPin size={11} />
                              {work.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Record Note */}
              <div className={styles.projectNote}>
                <div className={styles.projectNoteHeader}>
                  <span className={styles.projectNotePill}>Project Record</span>
                </div>
                <p className={styles.projectNoteText}>
                  {activeClient.projectNote}
                </p>
              </div>
            </div>

            {/* Sticky CTA footer */}
            <div className={styles.panelFooter}>
              <Link
                href="/contact"
                className={styles.panelCtaBtn}
                onClick={closePanel}
              >
                <span>Discuss a Similar Project</span>
                <div className={styles.panelCtaIcon}>
                  <ArrowRight size={16} />
                </div>
              </Link>
              <div className={styles.panelFooterHint}>
                ⚡ Fast response from JNP engineering technical team
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
