'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight, 
  Wrench, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import styles from './projects.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import CTASection from '@/components/CTASection/CTASection';
import { WORK_SHOWCASE_ITEMS, ProjectWorkItem } from '@/data/companyData';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filterCategories = [
    { label: 'All Capabilities', value: 'all' },
    { label: 'Water Pipeline Works', value: 'water-pipeline' },
    { label: 'Solar Infrastructure', value: 'solar-infrastructure' },
    { label: 'Water Storage Tanks', value: 'water-tanks' },
    { label: 'Heavy Fabrication', value: 'heavy-fabrication' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? WORK_SHOWCASE_ITEMS
    : WORK_SHOWCASE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Projects & Work Showcase' }]} />
          <h1 className={styles.pageHeroTitle}>Capabilities & Work Showcase</h1>
          <p className={styles.pageHeroDesc}>
            Explore our machine-driven infrastructure capabilities across pipeline jointing, 
            renewable solar piling, bolted tank assembly, and heavy structural engineering.
          </p>
        </div>
      </section>

      {/* Main Showcase Section */}
      <section className={styles.showcaseSection}>
        <div className="container">
          {/* Note distinguishing capability illustrations */}
          <div style={{ backgroundColor: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Layers size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <strong>Execution Scope Overview:</strong> The items below demonstrate our verified machine and manual execution capabilities as outlined in our corporate brochure.
            </span>
          </div>

          {/* Interactive Filter Bar */}
          <div className={styles.filterBar}>
            {filterCategories.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`${styles.filterBtn} ${selectedCategory === filter.value ? styles.activeFilter : ''}`}
                onClick={() => setSelectedCategory(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className={styles.projectsGrid}>
            {filteredItems.map((item) => (
              <div key={item.id} className={styles.projectCard}>
                <div className={styles.projectImageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.projectImage} />
                  <span className={styles.categoryBadge}>{item.categoryLabel}</span>
                </div>

                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{item.title}</h3>
                  <p className={styles.projectDesc}>{item.description}</p>

                  {/* Technical Scope Breakdown */}
                  <div className={styles.scopeBox}>
                    <div className={styles.scopeHeader}>Scope of Execution:</div>
                    <ul className={styles.scopeList}>
                      {item.scopeOfWork.map((scope) => (
                        <li key={scope} className={styles.scopeItem}>
                          <CheckCircle2 size={12} color="var(--color-accent)" />
                          <span>{scope}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Machinery Fleet Deployed */}
                  <div style={{ marginBottom: 8, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    Machinery & Rigs:
                  </div>
                  <div className={styles.machineryPills}>
                    {item.machineryUsed.map((m) => (
                      <span key={m} className={styles.machineryPill}>
                        ⚙ {m}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.disclaimerBadge}>{item.badge}</span>
                    <Link href={`/services/${item.category}`} className={styles.learnMoreLink}>
                      <span>Explore Service</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>No capabilities found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection 
        title="Have a Specific Project Scope to Review?"
        subtitle="Our technical team is ready to evaluate your engineering drawings, site topography, and machinery requirements."
        buttonText="Discuss Project Scope"
      />
    </>
  );
}
