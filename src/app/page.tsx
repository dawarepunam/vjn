import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HardHat, 
  Wrench, 
  Settings, 
  Compass, 
  Award, 
  ChevronRight,
  Sun,
  Droplets,
  Container,
  Factory
} from 'lucide-react';
import styles from './page.module.css';
import CTASection from '@/components/CTASection/CTASection';
import ClientSection from '@/components/ClientSection/ClientSection';
import ExecutionCapabilities from '@/components/ExecutionCapabilities/ExecutionCapabilities';
import ProcessTimeline from '@/components/ProcessTimeline/ProcessTimeline';
import OperationalCapability from '@/components/OperationalCapability/OperationalCapability';
import CompanyProfile from '@/components/CompanyProfile/CompanyProfile';
import { 
  COMPANY_CONTACT, 
  SERVICES_DATA, 
  CLIENTS_DATA, 
  EXECUTION_STEPS, 
  CAPABILITIES_DATA, 
  WORK_SHOWCASE_ITEMS,
  CERTIFICATIONS 
} from '@/data/companyData';

export default function HomePage() {
  const solarClients = CLIENTS_DATA.filter(c => c.category === 'Solar EPC');
  const waterClients = CLIENTS_DATA.filter(c => c.category === 'Water Infrastructure');

  return (
    <>
      {/* SECTION 1: HERO VIEWPORT */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <ShieldCheck size={16} />
            <span>Infrastructure Execution & EPC Support</span>
          </div>

          <h1 className={styles.heroHeading}>
            Engineering with Precision.{' '}
            <span className={styles.heroHeadingHighlight}>Execution with Responsibility.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            M/s JNP Infra Eng Works executes critical water pipeline networks, utility-scale solar piling, 
            industrial water storage tanks, and heavy structural engineering with unmatched field precision.
          </p>

          <div className={styles.heroCtaGroup}>
            <Link href="/services" className={styles.heroPrimaryBtn}>
              <span>Explore Our Services</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className={styles.heroSecondaryBtn}>
              <span>Contact Our Team</span>
            </Link>
          </div>

          <div className={styles.heroTrustRow}>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>HDPE Butt Fusion & DI Pipeline</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>DTH & Tractor Auger Piling</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>Zincalume & Panel Tanks</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>ISO 9001 / 14001 / 45001 Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPANY PROFILE — PREMIUM */}
      <CompanyProfile />

      {/* SECTION 3: CORE SERVICES PORTFOLIO */}
      <section className={`${styles.sectionContainer} ${styles.sectionAltBg}`}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Core Business Areas</span>
            <h2 className={styles.sectionTitle}>Engineered Solutions for National Infrastructure</h2>
            <p className={styles.sectionDescription}>
              From pressurized water distribution lines to renewable energy solar farms and industrial tanks, 
              we bring specialized technology and experienced execution to every site.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {/* Water Pipeline */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceCardImageWrapper}>
                <img 
                  src="/images/pipeline-hero.jpg" 
                  alt="Water Pipeline Infrastructure" 
                  className={styles.serviceCardImage}
                />
                <span className={styles.serviceCardBadge}>Pipeline Works</span>
              </div>
              <div className={styles.serviceCardBody}>
                <h3 className={styles.serviceCardTitle}>Water Pipeline Infrastructure</h3>
                <p className={styles.serviceCardText}>
                  Specialized HDPE Butt Fusion & Electrofusion jointing, DI pipe push-fit jointing, thrust blocks, and valve chambers.
                </p>
                <ul className={styles.serviceCardSubItems}>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> HDPE Butt Fusion Machine</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> DI Pipe Thrust Block Work</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> RCC / Block Chamber Work</li>
                </ul>
                <Link href="/services/water-pipeline" className={styles.serviceCardLink}>
                  <span>Explore Pipeline Works</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Solar Infrastructure */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceCardImageWrapper}>
                <img 
                  src="/images/solar-infra.jpg" 
                  alt="Solar Infrastructure" 
                  className={styles.serviceCardImage}
                />
                <span className={styles.serviceCardBadge}>Renewables</span>
              </div>
              <div className={styles.serviceCardBody}>
                <h3 className={styles.serviceCardTitle}>Solar Infrastructure</h3>
                <p className={styles.serviceCardText}>
                  Turnkey civil & mechanical solar execution: DTH rock piling, MMS module installation, GI mesh, and JCB land grading.
                </p>
                <ul className={styles.serviceCardSubItems}>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> DTH & Auger Piling</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> MMS Module Installation</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> Safety Boundary Mesh (GI)</li>
                </ul>
                <Link href="/services/solar-infrastructure" className={styles.serviceCardLink}>
                  <span>Explore Solar Works</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Water Storage Tanks */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceCardImageWrapper}>
                <img 
                  src="/images/water-tanks.jpg" 
                  alt="Water Storage Tanks" 
                  className={styles.serviceCardImage}
                />
                <span className={styles.serviceCardBadge}>Storage Systems</span>
              </div>
              <div className={styles.serviceCardBody}>
                <h3 className={styles.serviceCardTitle}>Water Storage Tanks</h3>
                <p className={styles.serviceCardText}>
                  Engineered installation of Zincalume, SMC Panel, FBEC, GLS/GFS, and mild steel fabricated liquid reservoirs.
                </p>
                <ul className={styles.serviceCardSubItems}>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> Zincalume Tanks</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> SMC Panel Tanks</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> GLS / GFS Glass Tanks</li>
                </ul>
                <Link href="/services/water-tanks" className={styles.serviceCardLink}>
                  <span>Explore Tank Solutions</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Heavy Fabrication */}
            <div className={styles.serviceCard}>
              <div className={styles.serviceCardImageWrapper}>
                <img 
                  src="/images/heavy-fab.jpg" 
                  alt="Heavy Fabrication" 
                  className={styles.serviceCardImage}
                />
                <span className={styles.serviceCardBadge}>Structural Steel</span>
              </div>
              <div className={styles.serviceCardBody}>
                <h3 className={styles.serviceCardTitle}>Heavy Fabrication</h3>
                <p className={styles.serviceCardText}>
                  Structural steel engineering for bus transit shelters, railway bridges, industrial warehouses, and highway crash barriers.
                </p>
                <ul className={styles.serviceCardSubItems}>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> Bus Shelters & Transit Hubs</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> Railway Bridges & Girders</li>
                  <li className={styles.serviceCardSubItem}><ChevronRight size={12} color="var(--color-accent)" /> Highway Crash Barriers</li>
                </ul>
                <Link href="/services/heavy-fabrication" className={styles.serviceCardLink}>
                  <span>Explore Fabrication</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OPERATIONAL CAPABILITIES (PREMIUM MODERN ENGINEERING UI) */}
      <OperationalCapability />

      {/* SECTION 5: SYSTEMATIC EXECUTION APPROACH (PREMIUM HORIZONTAL PROCESS TIMELINE) */}
      <ProcessTimeline />

      {/* SECTION 6: REPRESENTATIVE WORK SHOWCASE (WITH PREMIUM BI-DIRECTIONAL SCROLL ANIMATIONS) */}
      <ExecutionCapabilities items={WORK_SHOWCASE_ITEMS} />

      {/* SECTION 7: CLIENTS & CERTIFICATIONS — ULTRA-PREMIUM 3-3 GRID WITH REAL LOGOS & SMOOTH MARQUEE */}
      <ClientSection />

      {/* SECTION 8: CONTACT CTA */}
      <CTASection 
        title="Ready to Discuss Your Infrastructure Execution Requirements?"
        subtitle="Connect directly with our Managing Directors and Project Managers for technical discussions, site surveys, and equipment mobilization."
        buttonText="Get in Touch with JNP Infra"
      />
    </>
  );
}
