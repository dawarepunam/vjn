import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import styles from './services.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CTASection from '@/components/CTASection/CTASection';
import { SERVICES_DATA } from '@/data/companyData';

export const metadata: Metadata = {
  title: 'Engineering Services | M/s JNP Infra Eng Works',
  description: 'Explore specialized infrastructure execution services: Water Pipelines, Solar Foundations, Industrial Water Tanks, and Heavy Fabrication.',
};

export default function ServicesPage() {
  const services = Object.values(SERVICES_DATA);

  return (
    <>
      {/* Services Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <h1 className={styles.pageHeroTitle}>Engineering & Execution Services</h1>
          <p className={styles.pageHeroDesc}>
            Comprehensive contracting solutions backed by modern hydraulic equipment, certified field technicians, 
            and rigorous quality compliance across India.
          </p>
        </div>
      </section>

      {/* Services Listing */}
      <section className={styles.servicesListSection}>
        <div className="container">
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={service.id} className={styles.serviceBigCard}>
                <div className={styles.serviceCardMedia}>
                  <img src={service.heroImage} alt={service.title} />
                  <span className={styles.serviceCategoryBadge}>{service.category}</span>
                </div>
                <div className={styles.serviceCardContent}>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.serviceDesc}>{service.longDesc}</p>

                  <div className={styles.highlightsList}>
                    {service.brochureHighlights.slice(0, 6).map((item) => (
                      <div key={item} className={styles.highlightItem}>
                        <CheckCircle2 size={16} color="var(--color-accent)" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/services/${service.slug}`} className={styles.viewDetailBtn}>
                    <span>View Technical Scope & Capabilities</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
