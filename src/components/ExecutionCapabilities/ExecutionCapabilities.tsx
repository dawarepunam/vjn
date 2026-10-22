'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import styles from './ExecutionCapabilities.module.css';
import { ProjectWorkItem } from '@/data/companyData';

interface Props {
  items: ProjectWorkItem[];
}

export default function ExecutionCapabilities({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const lastScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  // Track scroll direction for true bi-directional animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to detect when section enters / leaves viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Trigger when 15% is visible, and reverse when scrolled completely out
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            // When leaving the viewport, trigger reverse animation
            setIsInView(false);
          }
        });
      },
      {
        threshold: [0, 0.15, 0.5],
        rootMargin: '-30px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Class helper based on in-view status and direction
  const animationStateClass = isInView
    ? styles.inView
    : scrollDirection === 'up'
    ? styles.exitUp
    : styles.exitDown;

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.executionSection} ${animationStateClass}`} 
      id="execution-capabilities-section"
    >
      <div className="container">
        
        {/* Section Header: Heading & Subtitle Animated Sequentially */}
        <div className={styles.sectionHeader}>
          <div className={styles.badgeWrapper}>
            <span className={styles.sectionBadge}>
              <Layers size={14} className={styles.badgeIcon} />
              Work Showcase
            </span>
          </div>

          <h2 className={styles.sectionTitle}>
            Representative <span className={styles.titleHighlight}>Execution Capabilities</span>
          </h2>

          <p className={styles.sectionDescription}>
            An overview of our mechanical and civil capability across water pipeline networks, 
            solar installations, and heavy steel fabrications.
          </p>
        </div>

        {/* 4-Card Equal Grid with Alternating Outside Directions */}
        <div className={styles.cardsGrid}>
          {items.slice(0, 4).map((work, index) => {
            // Alternating direction assignment:
            // Card 0: From Left
            // Card 1: From Center-Up / Subtle Top
            // Card 2: From Center-Up / Staggered
            // Card 3: From Right
            const directionClass =
              index === 0
                ? styles.enterFromLeft
                : index === 3
                ? styles.enterFromRight
                : index === 1
                ? styles.enterFromTopLeft
                : styles.enterFromTopRight;

            // Stagger delay calculation: 120ms stagger
            const staggerDelay = `${index * 120}ms`;

            return (
              <div
                key={work.id}
                className={`${styles.capabilityCard} ${directionClass}`}
                style={{ transitionDelay: staggerDelay }}
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <div className={styles.imageFrame}>
                  <img
                    src={work.image}
                    alt={work.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <span className={styles.categoryBadge}>
                    {work.categoryLabel}
                  </span>
                  <div className={styles.imageGlowOverlay} />
                </div>

                {/* Card Body with Equal Proportions & Strict Line Clamps */}
                <div className={styles.cardBody}>
                  {/* Two-Line Maximum Height Title */}
                  <h3 className={styles.cardTitle} title={work.title}>
                    {work.title}
                  </h3>

                  {/* Three-Line Clamped Description */}
                  <p className={styles.cardDescription} title={work.description}>
                    {work.description}
                  </p>

                  {/* Badge & Bottom-Pinned Link */}
                  <div className={styles.cardFooter}>
                    <div className={styles.verifiedBadge}>
                      <ShieldCheck size={13} className={styles.shieldIcon} />
                      <span>{work.badge}</span>
                    </div>

                    <Link href="/projects" className={styles.ctaLink}>
                      <span>View Technical Scope</span>
                      <ArrowRight size={14} className={styles.ctaArrow} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className={styles.bottomCtaRow}>
          <Link href="/projects" className={styles.exploreAllBtn}>
            <span>Explore All Work Categories &amp; Machinery</span>
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
