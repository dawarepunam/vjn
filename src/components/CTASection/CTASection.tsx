import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import styles from './CTASection.module.css';
import { COMPANY_CONTACT } from '@/data/companyData';

interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function CTASection({
  title = "Partner with JNP Infra for Flawless Project Execution",
  subtitle = "Discuss your pipeline jointing, utility solar piling, or heavy structural fabrication requirements directly with our technical management.",
  buttonText = "Request a Consultation"
}: CTAProps) {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContainer}>
          <span className={styles.ctaBadge}>Quality Work Is Our Backbone</span>
          <h2 className={styles.ctaHeading}>{title}</h2>
          <p className={styles.ctaSubtitle}>{subtitle}</p>
          <div className={styles.ctaBtnGroup}>
            <Link href="/contact" className={styles.primaryCta}>
              <span>{buttonText}</span>
              <ArrowRight size={16} />
            </Link>
            <a href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`} className={styles.secondaryCta}>
              <PhoneCall size={16} />
              <span>Call Technical Office: {COMPANY_CONTACT.owners[0].phones[0]}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
