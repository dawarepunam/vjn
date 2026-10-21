import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  Droplets,
  Sun,
  HardHat,
  Award,
  Clock,
  ThumbsUp,
  ShieldAlert,
  Cog,
  Layers,
  BarChart3,
  Phone
} from 'lucide-react';
import styles from './about.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CTASection from '@/components/CTASection/CTASection';
import TeamShowcase from '@/components/TeamShowcase/TeamShowcase';
import { 
  COMPANY_CONTACT, 
  EXECUTION_STEPS, 
  CERTIFICATIONS 
} from '@/data/companyData';

export const metadata: Metadata = {
  title: 'About Us | M/s JNP Infra Eng Works',
  description: 'Learn about JNP Infra Eng Works: trusted construction and infrastructure partner specializing in HDPE and Ductile Iron (DI) pipelines, solar DTH piling, tanks, and structural fabrication.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── Premium Hero with Background Image Overlay ────────────── */}
      <section className={styles.pageHero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroTopBadge}>
              <span className={styles.heroTopBadgeDot} />
              TRUSTED CONSTRUCTION PARTNER
            </div>

            <h1 className={styles.pageHeroTitle}>
              About JNP Infra<br />
              <span className={styles.accent}>Eng Works</span>
            </h1>

            <p className={styles.pageHeroDesc}>
              Engineering with Precision, Execution with Responsibility — Built on unwavering 
              integrity, quality, and teamwork. We deliver reliable infrastructure solutions that shape a better tomorrow.
            </p>

            {/* Hero Quick Stats Row */}
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>10+</span>
                <span className={styles.heroStatLabel}>Years of Experience</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>20+</span>
                <span className={styles.heroStatLabel}>Major Projects</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>3</span>
                <span className={styles.heroStatLabel}>Trusted Clients</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>50+</span>
                <span className={styles.heroStatLabel}>Skilled Engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Introduction (Who We Are) ───────────────────────── */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            {/* Left: Text Content */}
            <div className={styles.aboutTextCol}>
              <div className={styles.sectionPill}>
                WHO WE ARE
              </div>

              <h2 className={styles.aboutMainTitle}>
                Quality Work Is <span className={styles.accent}>Our Backbone.</span>
              </h2>

              <p className={styles.aboutParagraph}>
                At JNP Infra Eng Works, we bring together a dedicated team of professionals and modern construction practices to deliver high-quality, safe, and sustainable infrastructure. Our focus is on timely execution, client satisfaction, and long-term value.
              </p>
              <p className={styles.aboutParagraph}>
                We specialize in residential, commercial, and industrial construction, with a commitment to innovation, transparency, and excellence in every project we undertake.
              </p>

              {/* 4 Feature Badges */}
              <div className={styles.featureBadgesGrid}>
                <div className={styles.featureBadge}>
                  <div className={styles.featureBadgeIcon}><Award size={18} /></div>
                  <span className={styles.featureBadgeText}>Quality Construction</span>
                </div>
                <div className={styles.featureBadge}>
                  <div className={styles.featureBadgeIcon}><Clock size={18} /></div>
                  <span className={styles.featureBadgeText}>On-Time Delivery</span>
                </div>
                <div className={styles.featureBadge}>
                  <div className={styles.featureBadgeIcon}><ThumbsUp size={18} /></div>
                  <span className={styles.featureBadgeText}>Client Satisfaction</span>
                </div>
                <div className={styles.featureBadge}>
                  <div className={styles.featureBadgeIcon}><ShieldAlert size={18} /></div>
                  <span className={styles.featureBadgeText}>Safety First</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={styles.aboutCtaRow}>
                <Link href="/services" className={styles.primaryCtaAbout}>
                  Explore Our Services
                  <ArrowRight size={16} />
                </Link>
                <Link href="/projects" className={styles.secondaryCtaAbout}>
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right: Construction Image with Floating Badges */}
            <div className={styles.aboutVisualCol}>
              <div className={styles.aboutImgBox}>
                <img 
                  src="/images/machinery-work.jpg" 
                  alt="Quality Work Is Our Backbone - JNP Infra Eng Works" 
                />
              </div>

              {/* Top-Right Badge: Completed 50+ Projects */}
              <div className={styles.floatCardTopRight}>
                <div className={styles.floatCardTopRightSub}>Completed</div>
                <div className={styles.floatCardTopRightMain}>50+ <span>Projects</span></div>
              </div>

              {/* Bottom-Left Badge: 50+ Happy Clients */}
              <div className={styles.floatCardBottomLeft}>
                <div className={styles.floatCardBottomIcon}>
                  👥
                </div>
                <div>
                  <div className={styles.floatCardBottomVal}>50+</div>
                  <div className={styles.floatCardBottomLab}>Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the Partners (Dark Navy Section with Gold Border Cards) ─── */}
      <TeamShowcase />

      {/* ── Technical & Operational Capabilities ─────────────────── */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.sectionPill}>
              OUR CAPABILITIES
            </div>
            <h2 className={styles.sectionTitle}>
              Technical &amp; Operational Capabilities
            </h2>
            <p className={styles.sectionDesc}>
              A clear set of well-structured capabilities to ensure smooth execution, quality delivery, and long-term client satisfaction.
            </p>
          </div>

          <div className={styles.capabilitiesGrid}>
            <div className={styles.capCard}>
              <div className={styles.capIconBox}>
                <Cog size={22} />
              </div>
              <div className={styles.capNumber}>01.</div>
              <h3 className={styles.capTitle}>Technical Execution Capability</h3>
              <p className={styles.capDesc}>
                Expert planning, skilled workforce, and modern technology for precision and quality.
              </p>
            </div>

            <div className={styles.capCard}>
              <div className={styles.capIconBox}>
                <Layers size={22} />
              </div>
              <div className={styles.capNumber}>02.</div>
              <h3 className={styles.capTitle}>Match &amp; Material Sourcing</h3>
              <p className={styles.capDesc}>
                Reliable sourcing of materials and machinery to ensure on-time and cost-effective project delivery.
              </p>
            </div>

            <div className={styles.capCard}>
              <div className={styles.capIconBox}>
                <ShieldCheck size={22} />
              </div>
              <div className={styles.capNumber}>03.</div>
              <h3 className={styles.capTitle}>Safe &amp; Certified Workforce</h3>
              <p className={styles.capDesc}>
                Trained and certified workforce with a strong focus on safety, compliance, and quality.
              </p>
            </div>

            <div className={styles.capCard}>
              <div className={styles.capIconBox}>
                <BarChart3 size={22} />
              </div>
              <div className={styles.capNumber}>04.</div>
              <h3 className={styles.capTitle}>Project Management Excellence</h3>
              <p className={styles.capDesc}>
                Streamlined processes, real-time monitoring, and proactive communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5-Stage Execution Framework (Horizontal Cards Timeline) ──── */}
      <section className={styles.methodologySection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.sectionPill}>
              OUR PROCESS
            </div>
            <h2 className={styles.sectionTitle}>
              Our 5-Stage Execution Framework
            </h2>
            <p className={styles.sectionDesc}>
              Every step, driven by planning, precision, and accountability — from foundation to finish.
            </p>
          </div>

          <div className={styles.stepsTimeline}>
            {EXECUTION_STEPS.map((step) => (
              <div key={step.step} className={styles.stepCardRow}>
                <div className={styles.stepNumberBadge}>{step.step}</div>
                <div className={styles.stepCardBody}>
                  <div className={styles.stepCardHeader}>
                    <h3 className={styles.stepCardTitle}>{step.title}</h3>
                    <span className={styles.stepCardSubtitle}>{step.subtitle}</span>
                  </div>
                  <p className={styles.stepCardDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Standards Compliance (Dark Section) ────────────────────── */}
      <section className={styles.certSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.sectionPillDark}>
              OUR STANDARDS
            </div>
            <h2 className={styles.sectionTitleDark}>
              Integrated Management<br />System Standards
            </h2>
            <p className={styles.sectionDescDark}>
              JNP Infra Eng Works follows international and industry-recognized standards to ensure quality, safety, and operational excellence.
            </p>
          </div>

          <div className={styles.certGrid}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.code} className={styles.certCard}>
                <div className={styles.certIcon}>
                  <ShieldCheck size={28} />
                </div>
                <div className={styles.certCode}>{cert.code}</div>
                <div className={styles.certTitle}>{cert.title}</div>
                <p className={styles.certDesc}>{cert.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.certFooter}>
            <span className={styles.certFooterBadge}>
              <ShieldCheck size={16} />
              Our commitment to quality, safety and sustainability drives everything we do.
            </span>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ─────────────────────────────────────── */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaBannerCard}>
            <div className={styles.ctaBannerContent}>
              <span className={styles.ctaBannerPill}>LET'S WORK TOGETHER</span>
              <h2 className={styles.ctaBannerTitle}>
                Partner with JNP Infra for<br />Flawless Project Execution
              </h2>
              <p className={styles.ctaBannerDesc}>
                Discuss your project, get expert advice, and discover how we can bring your vision to life — with trust, transparency, and excellence.
              </p>
              <div className={styles.ctaBannerButtons}>
                <Link href="/contact" className={styles.ctaBtnPrimary}>
                  Request a Consultation →
                </Link>
                <a href={`tel:${COMPANY_CONTACT.owners[1].phones[0]}`} className={styles.ctaBtnSecondary}>
                  <Phone size={16} />
                  Call {COMPANY_CONTACT.owners[1].phones[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
