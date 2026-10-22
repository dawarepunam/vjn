'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Droplets,
  Sun,
  Container,
  Layers
} from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const serviceCategories = [
    {
      title: 'Water Pipeline Infrastructure',
      slug: '/services/water-pipeline',
      desc: 'HDPE butt fusion, electrofusion, DI thrust blocks & jointing.',
      icon: Droplets,
      color: '#3B82F6'
    },
    {
      title: 'Solar Infrastructure',
      slug: '/services/solar-infrastructure',
      desc: 'DTH piling, MMS module installation, GI mesh & land leveling.',
      icon: Sun,
      color: '#F7931E'
    },
    {
      title: 'Water Storage Tanks',
      slug: '/services/water-tanks',
      desc: 'Zincalume, SMC Panel, FBEC, GLS/GFS & MS fabricated tanks.',
      icon: Container,
      color: '#10B981'
    },
    {
      title: 'Heavy Fabrication',
      slug: '/services/heavy-fabrication',
      desc: 'Bus shelters, railway bridges, warehouses & crash barriers.',
      icon: Layers,
      color: '#8B5CF6'
    }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Main Nav */}
      <div className={styles.navInner}>
        {/* Logo */}
        <Link href="/" className={styles.brandLink}>
          <Image
            src="/images/logo-trimmed.png"
            alt="M/s JNP Infra Eng Works"
            width={210}
            height={52}
            priority
            className={styles.headerLogoImg}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          {[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Projects', href: '/projects' },
            { name: 'Clients & Sectors', href: '/clients' },
            { name: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.activeNavLink : ''}`}
            >
              {link.name}
              {pathname === link.href && <span className={styles.activeUnderline} />}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            className={styles.dropdownWrapper}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/services"
              className={`${styles.navLink} ${styles.dropdownTrigger} ${pathname.startsWith('/services') ? styles.activeNavLink : ''}`}
              aria-expanded={servicesDropdownOpen}
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`${styles.chevron} ${servicesDropdownOpen ? styles.chevronOpen : ''}`}
              />
              {pathname.startsWith('/services') && <span className={styles.activeUnderline} />}
            </Link>

            {/* Premium Dropdown */}
            <div className={`${styles.dropdownMenu} ${servicesDropdownOpen ? styles.dropdownOpen : ''}`}>
              <div className={styles.dropdownArrow} />
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownHeaderLabel}>Our Services</span>
                <Link href="/services" className={styles.dropdownViewAll}>
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              <div className={styles.dropdownGrid}>
                {serviceCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link key={cat.slug} href={cat.slug} className={styles.dropdownItem}>
                      <div className={styles.dropdownItemIcon} style={{ '--icon-color': cat.color } as React.CSSProperties}>
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className={styles.dropdownItemBody}>
                        <span className={styles.dropdownItemTitle}>{cat.title}</span>
                        <span className={styles.dropdownItemDesc}>{cat.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Right: CTA + Mobile Toggle */}
        <div className={styles.navActions}>
          <button
            type="button"
            className={styles.quoteBtn}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-quote-slider-modal'));
              }
            }}
            aria-label="Get a Quote"
          >
            <span>Get a Quote</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.mobileOverlayVisible : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <div className={styles.mobileDrawerHeader}>
          <Link href="/" className={styles.brandLink} onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/images/logo-trimmed.png"
              alt="M/s JNP Infra Eng Works"
              width={150}
              height={38}
              className={styles.headerLogoImg}
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className={styles.mobileCloseBtn}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.mobileDrawerNav}>
          {[
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${pathname === link.href ? styles.mobileNavLinkActive : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Services Accordion */}
          <button
            type="button"
            className={`${styles.mobileNavLink} ${styles.mobileNavAccordion} ${pathname.startsWith('/services') ? styles.mobileNavLinkActive : ''}`}
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          >
            <span>Services</span>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${mobileServicesOpen ? styles.chevronOpen : ''}`}
            />
          </button>

          {mobileServicesOpen && (
            <div className={styles.mobileSubmenu}>
              <Link href="/services" className={styles.mobileSubmenuLink} onClick={() => setMobileMenuOpen(false)}>
                All Services Overview
              </Link>
              {serviceCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug}
                  className={styles.mobileSubmenuLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          {[
            { name: 'Projects', href: '/projects' },
            { name: 'Clients & Sectors', href: '/clients' },
            { name: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${pathname === link.href ? styles.mobileNavLinkActive : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <button
            type="button"
            className={styles.mobileQuoteBtn}
            onClick={() => {
              setMobileMenuOpen(false);
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-quote-slider-modal'));
              }
            }}
          >
            <span>Get a Quote</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
