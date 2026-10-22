'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sun, 
  Droplets, 
  Building2 
} from 'lucide-react';
import styles from './ClientSection.module.css';
import { CLIENT_DETAILS, ClientDetailData } from '@/data/clientDetails';

export default function ClientSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'solar' | 'water'>('all');

  const solarClients = CLIENT_DETAILS.filter((c) => c.category === 'Solar EPC');
  const waterClients = CLIENT_DETAILS.filter((c) => c.category === 'Water Infrastructure');

  // Filter clients based on selected category control
  const filteredClients = 
    activeTab === 'solar' ? solarClients :
    activeTab === 'water' ? waterClients :
    CLIENT_DETAILS;

  // Distribute filtered clients into 3 balanced vertical columns
  const col1: ClientDetailData[] = [];
  const col2: ClientDetailData[] = [];
  const col3: ClientDetailData[] = [];

  filteredClients.forEach((client, index) => {
    if (index % 3 === 0) col1.push(client);
    else if (index % 3 === 1) col2.push(client);
    else col3.push(client);
  });

  // Duplicate each column array to create an infinite seamless loop without jumps or gaps
  const track1 = [...col1, ...col1];
  const track2 = [...col2, ...col2];
  const track3 = [...col3, ...col3];

  return (
    <section className={styles.clientSection} id="clients-section">
      {/* Ambient background glows matching dark navy & orange theme */}
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowOrange} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            Industry Collaboration
          </span>

          <h2 className={styles.sectionTitle}>
            Leading <span className={styles.highlightSolar}>Solar EPC</span> &amp;{' '}
            <span className={styles.highlightWater}>Water Infrastructure</span> Clients
          </h2>

          <p className={styles.sectionDescription}>
            Trusted execution partner for India&apos;s apex engineering conglomerates, public sector undertakings,
            and utility-scale renewable &amp; water pipeline contractors.
          </p>

          {/* Existing Client & Sector Category Filter Controls */}
          <div className={styles.filterBar}>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeTab === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <Building2 size={15} />
              <span>All Clients ({CLIENT_DETAILS.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.filterBtn} ${activeTab === 'solar' ? styles.filterBtnActiveSolar : ''}`}
              onClick={() => setActiveTab('solar')}
            >
              <Sun size={15} />
              <span>Solar EPC ({solarClients.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.filterBtn} ${activeTab === 'water' ? styles.filterBtnActiveWater : ''}`}
              onClick={() => setActiveTab('water')}
            >
              <Droplets size={15} />
              <span>Water Infrastructure ({waterClients.length})</span>
            </button>
          </div>
        </div>

        {/* ── CLEAN LOGO SHOWCASE WITH VERTICAL AUTO-SCROLLING ── */}
        <div className={styles.showcaseViewport}>
          {/* Top & Bottom gradient mask for smooth fade in/out */}
          <div className={styles.topFadeMask} />
          <div className={styles.bottomFadeMask} />

          <div className={styles.columnsContainer}>
            
            {/* Column 1 - Smooth downward vertical scroll */}
            <div className={styles.scrollColumn}>
              <div className={`${styles.scrollTrack} ${styles.trackDown1}`}>
                {track1.map((client, idx) => (
                  <Link
                    key={`${client.id}-col1-${idx}`}
                    href={`/clients#${client.id}`}
                    className={styles.logoItem}
                    title={`View ${client.name} in Clients and Sectors`}
                  >
                    <div className={styles.logoImageWrap}>
                      {client.logoUrl ? (
                        <img
                          src={client.logoUrl}
                          alt={`${client.name} logo`}
                          className={styles.realLogoImg}
                          loading="lazy"
                        />
                      ) : (
                        <span className={styles.logoMarkText}>{client.logoMark}</span>
                      )}
                    </div>
                    <span className={styles.logoLabel}>{client.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 - Smooth downward vertical scroll (staggered speed/offset) */}
            <div className={styles.scrollColumn}>
              <div className={`${styles.scrollTrack} ${styles.trackDown2}`}>
                {track2.map((client, idx) => (
                  <Link
                    key={`${client.id}-col2-${idx}`}
                    href={`/clients#${client.id}`}
                    className={styles.logoItem}
                    title={`View ${client.name} in Clients and Sectors`}
                  >
                    <div className={styles.logoImageWrap}>
                      {client.logoUrl ? (
                        <img
                          src={client.logoUrl}
                          alt={`${client.name} logo`}
                          className={styles.realLogoImg}
                          loading="lazy"
                        />
                      ) : (
                        <span className={styles.logoMarkText}>{client.logoMark}</span>
                      )}
                    </div>
                    <span className={styles.logoLabel}>{client.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 - Smooth downward vertical scroll */}
            <div className={`${styles.scrollColumn} ${styles.hideOnMobileCol}`}>
              <div className={`${styles.scrollTrack} ${styles.trackDown3}`}>
                {track3.map((client, idx) => (
                  <Link
                    key={`${client.id}-col3-${idx}`}
                    href={`/clients#${client.id}`}
                    className={styles.logoItem}
                    title={`View ${client.name} in Clients and Sectors`}
                  >
                    <div className={styles.logoImageWrap}>
                      {client.logoUrl ? (
                        <img
                          src={client.logoUrl}
                          alt={`${client.name} logo`}
                          className={styles.realLogoImg}
                          loading="lazy"
                        />
                      ) : (
                        <span className={styles.logoMarkText}>{client.logoMark}</span>
                      )}
                    </div>
                    <span className={styles.logoLabel}>{client.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
