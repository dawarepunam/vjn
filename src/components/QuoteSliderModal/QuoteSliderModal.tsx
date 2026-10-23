'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import styles from './QuoteSliderModal.module.css';
import { COMPANY_CONTACT } from '@/data/companyData';
import DetailedEnquiryModal, { SlideContextData } from '../DetailedEnquiryModal/DetailedEnquiryModal';

interface ProjectQuoteSlide {
  id: string;
  category: string;
  title: string;
  quoteTitle: string;
  quoteEstimate: string;
  scopeSummary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  layout: 'image-left' | 'image-right';
}

const PROJECT_QUOTES: ProjectQuoteSlide[] = [
  {
    id: 'water-pipeline',
    category: 'Water Pipeline Works',
    title: 'High-Density Polyethylene & DI Transmission Lines',
    quoteTitle: 'Turnkey Pipeline Butt Fusion & Jointing Rate',
    quoteEstimate: '₹450 – ₹1,850 / meter',
    scopeSummary: 'Comprehensive execution covering automatic hydraulic butt welding (up to 1200mm), Tyton gasket push-fit jointing for DI pipes, RCC thrust block cast-in-situ, and bar pressure hydrostatic testing.',
    highlights: [
      'Automated data-logged hydraulic butt fusion joints',
      'Engineered M25 concrete thrust blocks at all pipeline bends',
      'Leak-free hydrostatic pressure testing pre-handover'
    ],
    image: '/images/pipeline-hero.jpg',
    imageAlt: 'HDPE Butt Fusion & DI Pipeline Execution by JNP Infra',
    layout: 'image-left' // Slide 1: Image on Left, Quote on Right
  },
  {
    id: 'solar-infrastructure',
    category: 'Solar EPC Infrastructure',
    title: 'Utility Solar Foundations, MMS Assembly & Fencing',
    quoteTitle: 'Solar Piling & Mechanical Execution Quote',
    quoteEstimate: '₹220 – ₹580 / pile point',
    scopeSummary: 'Specialized hard-strata DTH rock drilling, tractor auger boring, high-precision MMS structure torque tightening, ICR electrical plinths, and GI perimeter security boundary mesh.',
    highlights: [
      'Dual fleet of DTH tractor rigs & auger drilling machines',
      'Trained crew for rapid multi-megawatt module mounting',
      'Anti-sag hot-dip galvanized boundary security mesh'
    ],
    image: '/images/solar-infra.jpg',
    imageAlt: 'Solar DTH Piling & MMS Installation by JNP Infra',
    layout: 'image-right' // Slide 2: Quote on Left, Image on Right
  },
  {
    id: 'water-storage-tanks',
    category: 'Liquid Reservoir Storage',
    title: 'Zincalume, SMC Panel & Bolted Tank Installation',
    quoteTitle: 'Industrial Bolted Storage Tank Erection',
    quoteEstimate: '₹1.80 – ₹4.50 / liter stored',
    scopeSummary: 'Precision erection of high-capacity Zincalume steel reservoirs with food-grade multi-layer internal membrane liners, SMC modular panel tanks, and glass-fused-to-steel industrial storage.',
    highlights: [
      'Capacities from 50,000 to 50,00,000+ liters',
      'Zero-leakage warranty with food-grade liner certification',
      'Complete civil ring beam foundation & nozzle integration'
    ],
    image: '/images/water-tanks.jpg',
    imageAlt: 'Zincalume & Panel Water Storage Reservoir by JNP Infra',
    layout: 'image-left' // Slide 3: Image on Left, Quote on Right
  },
  {
    id: 'heavy-fabrication',
    category: 'Heavy Structural Fabrication',
    title: 'Bus Transit Shelters, Railway Girders & Crash Barriers',
    quoteTitle: 'Structural Steel Engineering & Erection',
    quoteEstimate: '₹85 – ₹160 / kg fabricated',
    scopeSummary: 'Certified structural fabrication, robotic CNC cutting, MIG/MAG welding, highway W-beam crash barriers, industrial shed trusses, and urban transport infrastructure shelters.',
    highlights: [
      'Hot-dip galvanizing and industrial polyurethane epoxy finish',
      'Ultrasonic flaw detection & weld quality inspection',
      'Fast-track on-site assembly with certified crane operators'
    ],
    image: '/images/heavy-fab.jpg',
    imageAlt: 'Heavy Structural Steel Fabrication & Transit Shelters',
    layout: 'image-right' // Slide 4: Quote on Left, Image on Right
  }
];

export default function QuoteSliderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDetailedEnquiryOpen, setIsDetailedEnquiryOpen] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenDetailedEnquiry = () => {
    setIsDetailedEnquiryOpen(true);
  };

  const handleCloseDetailedEnquiry = () => {
    setIsDetailedEnquiryOpen(false);
  };

  // Automatic trigger on EVERY hard refresh / newly opened site after 3.5 seconds
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    const handleCustomTrigger = () => {
      openModal();
    };

    window.addEventListener('open-quote-slider-modal', handleCustomTrigger);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-quote-slider-modal', handleCustomTrigger);
    };
  }, [openModal]);

  // Lock body scroll & escape listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal();
      if (e.key === 'ArrowRight' && isOpen) nextSlide();
      if (e.key === 'ArrowLeft' && isOpen) prevSlide();
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, closeModal]);

  // Next / Prev slide handlers
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      // If we reached the last slide (index 3 of 4), auto-close the modal
      if (prev >= PROJECT_QUOTES.length - 1) {
        setIsOpen(false);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + PROJECT_QUOTES.length) % PROJECT_QUOTES.length);
  }, []);

  // Faster 1.8s transition; auto-closes after all 4 slides complete
  // IMPORTANT: When Detailed Enquiry Modal is open, PAUSE slider completely. When closed, RESUME!
  useEffect(() => {
    if (!isOpen || isPaused || isDetailedEnquiryOpen) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 1800); // Fast & crisp 1.8 seconds transition

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isOpen, isPaused, isDetailedEnquiryOpen, nextSlide]);

  const current = PROJECT_QUOTES[currentSlideIndex];
  const isImageLeft = current.layout === 'image-left';

  return (
    <>
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-heading"
        >
      <div 
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Close Button */}
        <button 
          type="button" 
          className={styles.closeBtn}
          onClick={closeModal}
          aria-label="Close quote modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Strip */}
        <div className={styles.modalHeaderStrip}>
          <div className={styles.headerLeftBadge}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>M/s JNP Infra Eng Works — Official Quotation Reference</span>
          </div>
          <div className={styles.sliderCounter}>
            <span>{currentSlideIndex + 1}</span> / {PROJECT_QUOTES.length}
          </div>
        </div>

        {/* ── DYNAMIC ALTERNATING SLIDER CONTAINER ── */}
        <div className={styles.sliderStage}>
          <div 
            key={current.id} 
            className={`${styles.slideCard} ${isImageLeft ? styles.layoutImageLeft : styles.layoutImageRight}`}
          >
            {/* IMAGE COMPONENT */}
            <div className={styles.slideImageSide}>
              <img 
                src={current.image} 
                alt={current.imageAlt} 
                className={styles.projectImage}
              />
              <div className={styles.imageOverlayTag}>
                <ShieldCheck size={14} />
                <span>{current.category}</span>
              </div>
            </div>

            {/* QUOTE COMPONENT */}
            <div className={styles.slideQuoteSide}>
              <div className={styles.categoryBadge}>{current.category}</div>
              
              <h2 id="quote-modal-heading" className={styles.projectTitle}>
                {current.title}
              </h2>

              {/* Highlighted Quote Price Box */}
              <div className={styles.quotePriceCard}>
                <div className={styles.quotePriceTitle}>{current.quoteTitle}</div>
                <div className={styles.quotePriceAmount}>{current.quoteEstimate}</div>
                <span className={styles.quoteDisclaimer}>* Rates adjust according to site strata, pipe diameter &amp; logistics</span>
              </div>

              <p className={styles.scopeSummary}>
                {current.scopeSummary}
              </p>

              {/* Execution highlights */}
              <ul className={styles.highlightsList}>
                {current.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Call to action within the quote side */}
              <div className={styles.quoteActionRow}>
                <button 
                  type="button"
                  className={styles.requestQuoteBtn}
                  onClick={handleOpenDetailedEnquiry}
                  id="open-detailed-enquiry-btn"
                >
                  <span>Request Custom Project Proposal</span>
                  <ArrowRight size={16} />
                </button>

                <a 
                  href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`}
                  className={styles.callDirectorBtn}
                  title="Call Technical Director directly"
                >
                  <PhoneCall size={16} />
                  <span>Call {COMPANY_CONTACT.owners[0].phones[0]}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── CONTROLS & PAGINATION STRIP ── */}
        <div className={styles.modalControlsStrip}>
          <div className={styles.navigationArrows}>
            <button 
              type="button" 
              className={styles.navArrowBtn} 
              onClick={prevSlide}
              aria-label="Previous quote"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button" 
              className={styles.navArrowBtn} 
              onClick={nextSlide}
              aria-label="Next quote"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dotsTrack}>
            {PROJECT_QUOTES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.dotItem} ${idx === currentSlideIndex ? styles.dotActive : ''}`}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Jump to quote ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
    )}

    {/* Dynamic Detailed Enquiry Modal renders independently so it NEVER disappears */}
    <DetailedEnquiryModal 
      isOpen={isDetailedEnquiryOpen}
      onClose={handleCloseDetailedEnquiry}
      slideData={{
        id: current.id,
        category: current.category,
        title: current.title,
        quoteTitle: current.quoteTitle,
        quoteEstimate: current.quoteEstimate,
        scopeSummary: current.scopeSummary
      }}
    />
    </>
  );
}
