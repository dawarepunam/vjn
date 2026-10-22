import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Phone, 
  Wrench,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import styles from './serviceDetail.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CTASection from '@/components/CTASection/CTASection';
import { SERVICES_DATA, COMPANY_CONTACT } from '@/data/companyData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = SERVICES_DATA[resolvedParams.slug];
  if (!service) {
    return { title: 'Service Not Found' };
  }
  return {
    title: `${service.title} | M/s JNP Infra Eng Works`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = SERVICES_DATA[resolvedParams.slug];

  if (!service) {
    notFound();
  }

  const allServices = Object.values(SERVICES_DATA);

  return (
    <>
      {/* Detail Hero */}
      <section className={styles.detailHero}>
        <div className={styles.heroBackdrop} />
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumbs 
            items={[
              { label: 'Services', href: '/services' },
              { label: service.title }
            ]} 
          />
          <span className={styles.categoryTag}>{service.category}</span>
          <h1 className={styles.detailTitle}>{service.title}</h1>
          <p className={styles.detailDesc}>{service.shortDesc}</p>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <div className="container">
        <div className={styles.mainLayout}>
          <div className={styles.contentCol}>
            {/* Overview */}
            <div className={styles.sectionBlock}>
              <div className={styles.blockHeaderWrap}>
                <span className={styles.blockPill}>Executive Brief</span>
                <h2 className={styles.blockTitle}>Executive Overview &amp; Execution Scope</h2>
              </div>
              
              <div className={styles.overviewLeadBox}>
                <p className={styles.overviewLeadText}>{service.longDesc}</p>
              </div>
              
              <div className={styles.featuresCardGrid}>
                {service.features.map((feature) => (
                  <div key={feature} className={styles.featureItemCard}>
                    <div className={styles.featureIconWrap}>
                      <CheckCircle2 size={18} />
                    </div>
                    <span className={styles.featureItemText}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Sub-Capabilities Detailed Breakdown */}
            <div className={styles.sectionBlock}>
              <div className={styles.blockHeaderWrap}>
                <span className={styles.blockPill}>Execution Methods</span>
                <h2 className={styles.blockTitle}>Technical Work Categories &amp; Methods</h2>
                <p className={styles.blockSubtitle}>
                  Specialized techniques, certified machinery, and standardized execution protocols applied by JNP Infra across this domain.
                </p>
              </div>

              <div className={styles.subCapsList}>
                {service.subCapabilities.map((subCap, idx) => (
                  <div key={subCap.title} className={styles.subCapCard}>
                    <div className={styles.subCapHeader}>
                      <div className={styles.subCapNumber}>
                        0{idx + 1}
                      </div>
                      <div className={styles.subCapTitleWrap}>
                        <h3 className={styles.subCapTitle}>{subCap.title}</h3>
                        <span className={styles.subCapCategoryTag}>Standard Protocol</span>
                      </div>
                    </div>

                    <p className={styles.subCapText}>{subCap.description}</p>

                    {subCap.specifications && (
                      <div className={styles.specSection}>
                        <div className={styles.specList}>
                          {subCap.specifications.map((spec) => (
                            <span key={spec} className={styles.specBadge}>
                              <span className={styles.specCheck}>✓</span>
                              <span>{spec}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Brochure Highlight Badges */}
            <div className={styles.sectionBlock}>
              <div className={styles.blockHeaderWrap}>
                <span className={styles.blockPill}>Compliance &amp; Capabilities</span>
                <h2 className={styles.blockTitle}>Brochure-Verified Highlights</h2>
                <p className={styles.blockSubtitle}>
                  Certified capabilities, specialized tooling, and equipment capabilities directly reflected in JNP Infra engineering documentation.
                </p>
              </div>

              <div className={styles.brochureGrid}>
                {service.brochureHighlights.map((hl) => (
                  <div key={hl} className={styles.brochureHighlightCard}>
                    <div className={styles.brochureIconWrap}>
                      <Wrench size={16} />
                    </div>
                    <span className={styles.brochureText}>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebarCol}>
            {/* Other Services Navigation */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>All Service Areas</h3>
              <ul className={styles.servicesNavList}>
                {allServices.map((item) => {
                  const isActive = item.slug === service.slug;
                  return (
                    <li key={item.slug}>
                      <Link 
                        href={`/services/${item.slug}`} 
                        className={`${styles.servicesNavItem} ${isActive ? styles.activeNav : ''}`}
                      >
                        <span>{item.title}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Direct Project Consultation Box */}
            <div className={styles.quickContactBox}>
              <h3 className={styles.quickContactTitle}>Need Technical Guidance?</h3>
              <p className={styles.quickContactText}>
                Speak with our engineering directors regarding equipment mobilization, site surveys, and scope planning.
              </p>
              <a href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`} className={styles.contactBtn}>
                <Phone size={16} />
                <span>Call {COMPANY_CONTACT.owners[0].phones[0]}</span>
              </a>
              <Link 
                href="/contact" 
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  marginTop: 12, 
                  fontSize: '0.8125rem', 
                  color: '#CBD5E0', 
                  textDecoration: 'underline' 
                }}
              >
                Or submit an official project inquiry →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <CTASection 
        title={`Mobilize For Your Next ${service.title} Project`}
        subtitle="Engage with JNP Infra's certified machine operators and seasoned site management."
      />
    </>
  );
}
