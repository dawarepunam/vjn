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

      {/* SECTION 2: COMPANY INTRODUCTION */}
      <section className={styles.sectionContainer}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introContent}>
              <span className={styles.sectionBadge}>Company Profile</span>
              <h2 className={styles.sectionTitle}>
                High-Caliber Engineering Backed by Modern Machinery Fleet
              </h2>
              <div className={styles.introHighlight}>
                “Quality Work Is Our Backbone.” We undertake complex infrastructure works using a seamless combination of advanced machinery and skilled field manpower.
              </div>
              <p className={styles.introParagraph}>
                M/s JNP Infra Eng Works specializes in HDPE and Ductile Iron (DI) pipeline works, trenching, machine jointing, 
                hydrostatic pressure testing, and associated civil works. From utility solar plant pile drilling to massive welded reservoirs, 
                our project-oriented approach guarantees zero-defect site handover.
              </p>

              <div className={styles.introKeyList}>
                <div className={styles.introKeyItem}>
                  <CheckCircle2 size={16} color="var(--color-accent)" />
                  <span>Machine & Manual Work Capability</span>
                </div>
                <div className={styles.introKeyItem}>
                  <CheckCircle2 size={16} color="var(--color-accent)" />
                  <span>Site & Geological Adaptability</span>
                </div>
                <div className={styles.introKeyItem}>
                  <CheckCircle2 size={16} color="var(--color-accent)" />
                  <span>HDPE Pipe Jointing Expertise</span>
                </div>
                <div className={styles.introKeyItem}>
                  <CheckCircle2 size={16} color="var(--color-accent)" />
                  <span>Skilled & Safety-Certified Crew</span>
                </div>
              </div>

              <div>
                <Link href="/about" className={styles.serviceCardLink} style={{ fontSize: '1rem', marginTop: 8 }}>
                  <span>Read Full Company Profile</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.introImageCol}>
              <div className={styles.introImageCard}>
                <img 
                  src="/images/machinery-work.jpg" 
                  alt="JNP Infra Engineering and Pipeline Works" 
                />
              </div>
              <div className={styles.introFloatBadge}>
                <div className={styles.introFloatNumber}>100%</div>
                <div className={styles.introFloatText}>Execution with Responsibility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* SECTION 4: CAPABILITIES GRID */}
      <section className={styles.sectionContainer}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Execution Strengths</span>
            <h2 className={styles.sectionTitle}>Built on Solid Operational Capability</h2>
            <p className={styles.sectionDescription}>
              Our strengths lie in our verified machinery assets, certified machine operators, and adaptive site engineering.
            </p>
          </div>

          <div className={styles.capsGrid}>
            {CAPABILITIES_DATA.map((cap) => (
              <div key={cap.title} className={styles.capsCard}>
                <div className={styles.capsIconBox}>
                  <Wrench size={22} />
                </div>
                <h3 className={styles.capsTitle}>{cap.title}</h3>
                <p className={styles.capsDesc}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SYSTEMATIC EXECUTION APPROACH */}
      <section className={styles.approachSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge} style={{ color: '#FDBA74' }}>Our 5-Step Methodology</span>
            <h2 className={styles.sectionTitle} style={{ color: '#FFFFFF' }}>
              Plan → Execute → Test → Inspect → Complete
            </h2>
            <p className={styles.sectionDescription} style={{ color: '#CBD5E0' }}>
              Every infrastructure contract at JNP Infra follows our disciplined multi-stage execution framework to ensure timely and zero-tolerance delivery.
            </p>
          </div>

          <div className={styles.timelineGrid}>
            {EXECUTION_STEPS.map((step) => (
              <div key={step.step} className={styles.timelineCard}>
                <div className={styles.stepNumber}>{step.step}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <div className={styles.stepSubtitle}>{step.subtitle}</div>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: REPRESENTATIVE WORK SHOWCASE */}
      <section className={styles.sectionContainer}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Work Showcase</span>
            <h2 className={styles.sectionTitle}>Representative Execution Capabilities</h2>
            <p className={styles.sectionDescription}>
              An overview of our mechanical and civil capability across water pipeline networks, solar installations, and steel fabrications.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {WORK_SHOWCASE_ITEMS.slice(0, 4).map((work) => (
              <div key={work.id} className={styles.serviceCard}>
                <div className={styles.serviceCardImageWrapper}>
                  <img src={work.image} alt={work.title} className={styles.serviceCardImage} />
                  <span className={styles.serviceCardBadge}>{work.categoryLabel}</span>
                </div>
                <div className={styles.serviceCardBody}>
                  <h3 className={styles.serviceCardTitle} style={{ fontSize: '1.05rem' }}>{work.title}</h3>
                  <p className={styles.serviceCardText}>{work.description}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: 'auto', marginBottom: 12 }}>
                    {work.badge}
                  </div>
                  <Link href="/projects" className={styles.serviceCardLink}>
                    <span>View Technical Scope</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/projects" className={styles.heroPrimaryBtn}>
              <span>Explore All Work Categories & Machinery</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: CLIENTS & CERTIFICATIONS (ACCURATE TO BROCHURE) */}
      <section className={styles.clientSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Industry Collaboration</span>
            <h2 className={styles.sectionTitle}>Leading Solar EPC & Water Infrastructure Clients</h2>
            <p className={styles.sectionDescription}>
              Key industry leaders and EPC contractors where our capabilities and machinery support national infrastructure goals.
            </p>
          </div>

          <div className={styles.clientGroupGrid}>
            {/* Solar EPC */}
            <div className={styles.clientBlock}>
              <div className={styles.clientBlockHeader}>
                <Sun size={20} color="var(--color-accent)" />
                <h3 className={styles.clientBlockTitle}>Solar EPC Clients</h3>
              </div>
              <div className={styles.logoPills}>
                {solarClients.map(c => (
                  <div key={c.name} className={styles.clientPill}>
                    <span className={styles.clientDot} />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Infrastructure */}
            <div className={styles.clientBlock}>
              <div className={styles.clientBlockHeader}>
                <Droplets size={20} color="var(--color-primary)" />
                <h3 className={styles.clientBlockTitle}>Water Infrastructure Clients</h3>
              </div>
              <div className={styles.logoPills}>
                {waterClients.map(c => (
                  <div key={c.name} className={styles.clientPill}>
                    <span className={styles.clientDot} />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Banner */}
          <div style={{ marginTop: 40, padding: '24px 28px', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <ShieldCheck size={32} color="var(--color-accent)" />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)' }}>Standardized Quality & Safety Protocols</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Operating in full accordance with ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 management benchmarks.
                </p>
              </div>
            </div>
            <Link href="/clients" className={styles.serviceCardLink}>
              <span>View Client Details</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT CTA */}
      <CTASection 
        title="Ready to Discuss Your Infrastructure Execution Requirements?"
        subtitle="Connect directly with our Managing Directors and Project Managers for technical discussions, site surveys, and equipment mobilization."
        buttonText="Get in Touch with JNP Infra"
      />
    </>
  );
}
