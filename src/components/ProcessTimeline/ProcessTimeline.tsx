'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Compass, 
  HardHat, 
  Gauge, 
  ClipboardCheck, 
  CheckCheck,
  Sparkles
} from 'lucide-react';
import styles from './ProcessTimeline.module.css';
import { EXECUTION_STEPS } from '@/data/companyData';

interface Props {
  badgeTitle?: string;
  heading?: string;
  subheading?: string;
}

export default function ProcessTimeline({
  badgeTitle = 'Our 5-Step Methodology',
  heading = 'Plan → Execute → Test → Inspect → Complete',
  subheading = 'Every infrastructure contract at JNP Infra follows our disciplined multi-stage execution framework to ensure timely and zero-tolerance delivery.'
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const lastScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  // Map each stage to professional outline Lucide React icons
  const stages = useMemo(() => {
    const iconMap: Record<string, React.ReactNode> = {
      '01': <Compass size={32} className={styles.stageIcon} strokeWidth={1.75} />,
      '02': <HardHat size={32} className={styles.stageIcon} strokeWidth={1.75} />,
      '03': <Gauge size={32} className={styles.stageIcon} strokeWidth={1.75} />,
      '04': <ClipboardCheck size={32} className={styles.stageIcon} strokeWidth={1.75} />,
      '05': <CheckCheck size={32} className={styles.stageIcon} strokeWidth={1.75} />
    };

    return EXECUTION_STEPS.map((step) => ({
      ...step,
      icon: iconMap[step.step] || <Compass size={32} />
    }));
  }, []);

  // Track scroll direction for true bi-directional behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      // Scroll-linked progress update across the 5 steps when in viewport
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Progress percentage through the section
        const progress = Math.min(
          Math.max((windowHeight - rect.top) / (windowHeight + rect.height * 0.7), 0),
          1
        );

        if (progress > 0.85) setActiveStep(5);
        else if (progress > 0.65) setActiveStep(4);
        else if (progress > 0.45) setActiveStep(3);
        else if (progress > 0.25) setActiveStep(2);
        else if (progress > 0.05) setActiveStep(1);
        else setActiveStep(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to reveal / hide cleanly
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: [0, 0.15, 0.5],
        rootMargin: '-20px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Progress width calculation for connected line: 0% to 100%
  // 5 steps: step 1 = 0%, step 2 = 25%, step 3 = 50%, step 4 = 75%, step 5 = 100%
  const progressPercentage = isInView ? Math.max((activeStep - 1) / 4 * 100, 0) : 0;

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.timelineSection} ${isInView ? styles.inView : styles.outOfView}`}
      id="process-timeline"
    >
      {/* Ambient glow effects */}
      <div className={styles.ambientGlowCenter} />
      <div className={styles.ambientGlowOrange} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header with Staggered Fade Upward */}
        <div className={styles.sectionHeader}>
          <div className={styles.badgeWrapper}>
            <span className={styles.sectionBadge}>
              <Sparkles size={14} className={styles.badgeSparkle} />
              {badgeTitle}
            </span>
          </div>

          <h2 className={styles.sectionTitle}>
            {heading.includes('→') ? (
              <>
                <span className={styles.titleWord}>Plan</span>
                <span className={styles.titleArrow}>→</span>
                <span className={styles.titleWord}>Execute</span>
                <span className={styles.titleArrow}>→</span>
                <span className={styles.titleWord}>Test</span>
                <span className={styles.titleArrow}>→</span>
                <span className={styles.titleWord}>Inspect</span>
                <span className={styles.titleArrow}>→</span>
                <span className={styles.titleWordHighlight}>Complete</span>
              </>
            ) : (
              heading
            )}
          </h2>

          <p className={styles.sectionDescription}>
            {subheading}
          </p>
        </div>

        {/* ── PREMIUM HORIZONTAL TIMELINE LAYOUT ── */}
        <div className={styles.horizontalTimelineWrapper}>
          
          {/* Continuous Connecting Line Behind Nodes */}
          <div className={styles.connectingLineBackdrop}>
            {/* Active Orange Animated Progress Fill */}
            <div 
              className={styles.activeProgressLine} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* 5 Stages Aligned Along the Horizontal Axis */}
          <div className={styles.stagesTrack}>
            {stages.map((stage, idx) => {
              const stepNum = parseInt(stage.step, 10);
              const isActive = isInView && stepNum <= activeStep;
              const isCurrent = isInView && stepNum === activeStep;
              const isFinal = stepNum === 5;

              return (
                <div
                  key={stage.step}
                  className={`
                    ${styles.stageNode} 
                    ${isActive ? styles.nodeActive : ''} 
                    ${isCurrent ? styles.nodeCurrent : ''}
                    ${isFinal ? styles.nodeFinal : ''}
                  `}
                  style={{ animationDelay: `${idx * 130}ms` }}
                  onMouseEnter={() => setActiveStep(stepNum)}
                  tabIndex={0}
                  role="group"
                  aria-label={`Step ${stage.step}: ${stage.title}`}
                >
                  {/* Top Step Number Badge */}
                  <div className={styles.stepNumberRow}>
                    <span className={styles.stepNumberText}>{stage.step}</span>
                    <span className={styles.stepPhaseTag}>PHASE</span>
                  </div>

                  {/* Icon Anchor Orb on the Timeline Axis */}
                  <div className={styles.iconOrbWrapper}>
                    <div className={styles.iconOrbRing}>
                      <div className={styles.iconOrbCore}>
                        {stage.icon}
                      </div>
                    </div>
                    {/* Glowing pulse indicator for current step */}
                    {isCurrent && <div className={styles.pulseRing} />}
                  </div>

                  {/* Step Title & Subtitle */}
                  <div className={styles.stageContent}>
                    <h3 className={styles.stageTitle}>
                      {stage.title}
                    </h3>
                    
                    <div className={styles.stageSubtitle}>
                      {stage.subtitle}
                    </div>

                    <p className={styles.stageDescription}>
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile Horizontal Scroll Indicator Prompt */}
        <div className={styles.mobileScrollPrompt}>
          <span>← Swipe horizontally to explore all 5 stages →</span>
        </div>

      </div>
    </section>
  );
}
