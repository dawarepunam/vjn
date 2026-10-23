'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar, Building2, Activity, ShieldCheck } from 'lucide-react';
import styles from './MetricCounterStrip.module.css';

interface MetricItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const METRICS: MetricItem[] = [
  {
    id: 'exp',
    target: 10,
    suffix: '+',
    label: 'Years in Engineering',
    sublabel: 'Turnkey Site Leadership',
    icon: <Calendar size={24} />,
  },
  {
    id: 'clients',
    target: 20,
    suffix: '+',
    label: 'Tier-1 EPC Clients',
    sublabel: 'L&T, Tata, Sterling, Adani',
    icon: <Building2 size={24} />,
  },
  {
    id: 'km',
    target: 150,
    suffix: '+ km',
    label: 'Pipelines Butt Jointed',
    sublabel: 'HDPE & DI Pressure Networks',
    icon: <Activity size={24} />,
  },
  {
    id: 'iso',
    target: 100,
    suffix: '%',
    label: 'Safety & ISO Compliance',
    sublabel: 'ISO 9001 / 14001 / 45001',
    icon: <ShieldCheck size={24} />,
  },
];

export default function MetricCounterStrip() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate numbers smoothly over 1600ms
          const duration = 1600;
          const frameRate = 30;
          const totalFrames = Math.round(duration / (1000 / frameRate));
          let currentFrame = 0;

          const timer = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              METRICS.map((m) => Math.round(m.target * easedProgress))
            );

            if (currentFrame >= totalFrames) {
              clearInterval(timer);
              setCounts(METRICS.map((m) => m.target));
            }
          }, 1000 / frameRate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className={styles.metricsSection} aria-label="Key Execution Metrics">
      <div className={styles.metricsWrapper}>
        <div className={styles.metricsGrid}>
          {METRICS.map((metric, idx) => (
            <div key={metric.id} className={styles.metricCard}>
              <div className={styles.iconBox}>
                {metric.icon}
              </div>
              <div className={styles.metricContent}>
                <div className={styles.metricValueRow}>
                  <span className={styles.metricValue}>{counts[idx]}</span>
                  <span className={styles.metricSuffix}>{metric.suffix}</span>
                </div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricSublabel}>{metric.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
