'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Wrench, 
  Cpu, 
  UserCheck, 
  ShieldCheck, 
  Truck, 
  Compass,
  CheckCircle2,
  type LucideIcon
} from 'lucide-react';
import styles from './OperationalCapability.module.css';
import { CAPABILITIES_DATA } from '@/data/companyData';

interface CapabilityItem {
  title: string;
  desc: string;
  tag: string;
  icon: LucideIcon;
  highlights: string[];
}

export default function OperationalCapability() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const enrichedCapabilities: CapabilityItem[] = useMemo(() => [
    {
      ...CAPABILITIES_DATA[0],
      tag: 'Engineering Precision',
      icon: Cpu,
      highlights: ['Piping Hydrodynamics', 'Structural Loads', 'Solar MMS Geometry']
    },
    {
      ...CAPABILITIES_DATA[1],
      tag: 'Field Synergy',
      icon: Wrench,
      highlights: ['High-Tonnage Machinery', 'Artisan Technicians', 'Complex Terrains']
    },
    {
      ...CAPABILITIES_DATA[2],
      tag: 'Certified Crew',
      icon: UserCheck,
      highlights: ['Butt Fusion Certified', 'DTH Rig Operators', 'Safety Protocols']
    },
    {
      ...CAPABILITIES_DATA[3],
      tag: 'Quality Standard',
      icon: ShieldCheck,
      highlights: ['Zero-Tolerance Joints', 'Material Testing', 'Audit-Ready Logs']
    },
    {
      ...CAPABILITIES_DATA[4],
      tag: 'Mechanized Fleet',
      icon: Truck,
      highlights: ['Automated Fusion Rigs', 'JCB & Hitachi Fleets', 'Tractor Auger Pilers']
    },
    {
      ...CAPABILITIES_DATA[5],
      tag: 'Adaptive Execution',
      icon: Compass,
      highlights: ['Rocky Basalt Strata', 'Black Cotton Soils', 'Urban Congested Zones']
    }
  ], []);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.capabilitySection} ${isVisible ? styles.sectionRevealed : ''}`}
      id="operational-capability"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              EXECUTION STRENGTHS
            </span>
          </div>

          <h2 className={styles.heading}>
            Built on Solid{' '}
            <span className={styles.headingAccent}>Operational Capability</span>
          </h2>

          <div className={styles.accentLine} aria-hidden="true" />

          <p className={styles.subtitle}>
            Our core strengths lie in our <strong>verified machinery assets</strong>, 
            <strong> certified machine operators</strong>, and <strong>adaptive operational engineering</strong> 
            across India&apos;s most demanding infrastructure landscapes.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className={styles.grid}>
          {enrichedCapabilities.map((cap, index) => {
            const Icon = cap.icon;
            const stepNum = String(index + 1).padStart(2, '0');
            return (
              <div 
                key={cap.title} 
                className={styles.card}
                style={{
                  animationDelay: `${120 + index * 90}ms`,
                  transitionDelay: `${index * 60}ms`
                }}
              >
                {/* Background Watermark Number */}
                <span className={styles.watermarkNumber} aria-hidden="true">{stepNum}</span>

                {/* Subtle Card Ambient Glow on Hover */}
                <div className={styles.cardGlow} aria-hidden="true" />

                {/* Top Row: Icon + Step/Tag */}
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    <Icon className={styles.icon} size={24} strokeWidth={2} />
                  </div>
                  <div className={styles.tagWrapper}>
                    <span className={styles.stepBadge}>CAPABILITY {stepNum}</span>
                    <span className={styles.cardTag}>{cap.tag}</span>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className={styles.cardTitle}>{cap.title}</h3>

                {/* Card Description */}
                <p className={styles.cardDesc}>{cap.desc}</p>

                {/* Bottom Key Capabilities / Badges */}
                <div className={styles.highlightsContainer}>
                  {cap.highlights.map((item) => (
                    <span key={item} className={styles.highlightBadge}>
                      <CheckCircle2 size={13} className={styles.highlightIcon} />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Subtle Card Accent Bar */}
                <div className={styles.cardBottomBar} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
