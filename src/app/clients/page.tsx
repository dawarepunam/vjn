import type { Metadata } from 'next';
import { Sun, Droplets, ShieldCheck } from 'lucide-react';
import styles from './clients.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CTASection from '@/components/CTASection/CTASection';
import ClientShowcase from '@/components/ClientShowcase/ClientShowcase';
import { CERTIFICATIONS } from '@/data/companyData';
import { CLIENT_DETAILS } from '@/data/clientDetails';

export const metadata: Metadata = {
  title: 'Clients & Sectors | M/s JNP Infra Eng Works',
  description: 'Major Solar EPC and Water Infrastructure clients where JNP Infra provides pipeline, piling and infrastructure execution capability.',
};

export default function ClientsPage() {
  const solarClients = CLIENT_DETAILS.filter((c) => c.category === 'Solar EPC');
  const waterClients = CLIENT_DETAILS.filter((c) => c.category === 'Water Infrastructure');

  return (
    <>
      {/* Page Hero — unchanged */}
      <section className={styles.pageHero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Clients & Sectors' }]} />
          <h1 className={styles.pageHeroTitle}>Clients &amp; Industry Sectors</h1>
          <p className={styles.pageHeroDesc}>
            Collaborating with leading EPC contractors and public infrastructure authorities across India
            to execute critical renewable energy and water distribution contracts.
          </p>
        </div>
      </section>

      {/* Main Clients Grid Section */}
      <section className={styles.clientsSection}>
        <div className="container">

          {/* Solar EPC Clients */}
          <div className={styles.sectorBlock}>
            <div className={styles.sectorHeader}>
              <div className={styles.sectorHeaderLeft}>
                <div className={styles.sectorIconBox}>
                  <Sun size={26} />
                </div>
                <div>
                  <h2 className={styles.sectorTitle}>Solar EPC Clients</h2>
                  <p className={styles.sectorSubtitle}>
                    Piling, MMS installation, fencing, ICR and civil execution for leading solar EPC companies.
                  </p>
                </div>
              </div>
              <span className={styles.clientCountBadge}>
                {solarClients.length} clients
              </span>
            </div>

            <ClientShowcase
              clients={solarClients}
              categoryIcon={<Sun size={16} />}
              categoryLabel="Solar EPC"
            />
          </div>

          {/* Water Infrastructure Clients */}
          <div className={styles.sectorBlock}>
            <div className={styles.sectorHeader}>
              <div className={styles.sectorHeaderLeft}>
                <div className={styles.sectorIconBox} style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Droplets size={26} />
                </div>
                <div>
                  <h2 className={styles.sectorTitle}>Water Infrastructure Clients</h2>
                  <p className={styles.sectorSubtitle}>
                    HDPE &amp; DI pipeline laying, jointing, hydro testing and chamber works for major infrastructure players.
                  </p>
                </div>
              </div>
              <span className={styles.clientCountBadge} style={{ color: 'var(--color-secondary)', backgroundColor: 'rgba(0, 119, 182, 0.1)' }}>
                {waterClients.length} clients
              </span>
            </div>

            <ClientShowcase
              clients={waterClients}
              categoryIcon={<Droplets size={16} />}
              categoryLabel="Water Infrastructure"
            />
          </div>

        </div>
      </section>

      {/* Certification & Quality Standards — unchanged */}
      <section className={styles.certSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px auto' }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Verified Quality Benchmarks
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: 8 }}>
              Standardized Quality, Safety &amp; Environment
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: 10 }}>
              Adherence to international standards ensuring site compliance and worker welfare.
            </p>
          </div>

          <div className={styles.certGrid}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.code} className={styles.certItemCard}>
                <div className={styles.certItemHeader}>
                  <ShieldCheck size={24} color="var(--color-accent)" />
                  <span className={styles.certItemCode}>{cert.code}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 8 }}>
                  {cert.title}
                </h3>
                <p className={styles.certItemDesc}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
