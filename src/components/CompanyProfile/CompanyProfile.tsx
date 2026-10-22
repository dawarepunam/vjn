'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Users,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Award
} from 'lucide-react';
import styles from './CompanyProfile.module.css';

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Stats ─── */
const STATS = [
  { value: 15, suffix: '+', label: 'Years Field Experience', icon: TrendingUp },
  { value: 200, suffix: '+', label: 'Projects Executed', icon: Award },
  { value: 50, suffix: '+', label: 'Machinery Assets', icon: Wrench },
  { value: 100, suffix: '%', label: 'Execution Responsibility', icon: ShieldCheck },
];

/* ─── Strengths ─── */
const STRENGTHS = [
  { icon: Cpu, label: 'Machine & Manual Work Capability' },
  { icon: Users, label: 'Skilled & Safety-Certified Crew' },
  { icon: Wrench, label: 'HDPE Pipe Jointing Expertise' },
  { icon: ShieldCheck, label: 'Site & Geological Adaptability' },
];

/* ─── Stat Card ─── */
function StatCard({ stat, started }: { stat: typeof STATS[0]; started: boolean }) {
  const count = useCounter(stat.value, 1800, started);
  const Icon = stat.icon;
  return (
    <div className={styles.statCard}>
      <div className={styles.statIconBox}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <div className={styles.statValue}>
        {count}{stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function CompanyProfile() {
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Ambient background elements */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={styles.inner}>

        {/* ── Top Label ── */}
        <div className={`${styles.topLabel} ${inView ? styles.fadeInUp : ''}`}>
          <span className={styles.labelDot} />
          <span>Company Profile</span>
        </div>

        {/* ── Main Grid: Left Text | Right Visual ── */}
        <div className={styles.mainGrid}>

          {/* LEFT: Content */}
          <div className={`${styles.contentCol} ${inView ? styles.slideInLeft : ''}`}>
            <h2 className={styles.heading}>
              High-Caliber Engineering<br />
              <span className={styles.headingAccent}>Backed by Modern Machinery Fleet</span>
            </h2>

            <blockquote className={styles.quote}>
              <span className={styles.quoteBar} />
              <p>"Quality Work Is Our Backbone." We undertake complex infrastructure works using a seamless combination of advanced machinery and skilled field manpower.</p>
            </blockquote>

            <p className={styles.body}>
              M/s JNP Infra Eng Works specializes in HDPE and Ductile Iron pipeline works, trenching, machine jointing, hydrostatic pressure testing, and associated civil works. From utility solar plant pile drilling to massive welded reservoirs, our project-oriented approach guarantees zero-defect site handover.
            </p>

            {/* Strengths grid */}
            <div className={styles.strengthGrid}>
              {STRENGTHS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`${styles.strengthItem} ${inView ? styles.fadeInUp : ''}`}
                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <div className={styles.strengthIcon}>
                      <Icon size={16} strokeWidth={2} />
                    </div>
                    <span>{s.label}</span>
                  </div>
                );
              })}
            </div>

            <Link href="/about" className={styles.cta}>
              <span>Read Full Company Profile</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* RIGHT: Image + Float Card */}
          <div className={`${styles.imageCol} ${inView ? styles.slideInRight : ''}`}>
            <div className={styles.imageWrapper}>
              {/* Decorative frame */}
              <div className={styles.imageFrame} />
              <div className={styles.imageInner}>
                <img
                  src="/images/machinery-work.jpg"
                  alt="JNP Infra Engineering and Pipeline Works"
                  className={styles.image}
                />
                {/* Overlay gradient */}
                <div className={styles.imageOverlay} />
              </div>

              {/* Float badge */}
              <div className={styles.floatBadge}>
                <CheckCircle2 size={18} className={styles.floatIcon} />
                <div>
                  <div className={styles.floatValue}>ISO Certified</div>
                  <div className={styles.floatSub}>9001 · 14001 · 45001</div>
                </div>
              </div>

              {/* Experience badge */}
              <div className={styles.expBadge}>
                <div className={styles.expNumber}>15+</div>
                <div className={styles.expLabel}>Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className={`${styles.statsRow} ${inView ? styles.fadeInUp : ''}`} style={{ animationDelay: '0.5s' }}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
