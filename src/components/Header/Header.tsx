'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import styles from './Header.module.css';
import { COMPANY_CONTACT } from '@/data/companyData';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact', href: '/contact' },
  ];

  const serviceCategories = [
    {
      title: 'Water Pipeline Infrastructure',
      slug: '/services/water-pipeline',
      desc: 'HDPE butt fusion, electrofusion, DI thrust blocks, and jointing works.'
    },
    {
      title: 'Solar Infrastructure',
      slug: '/services/solar-infrastructure',
      desc: 'DTH piling, MMS module installation, GI mesh, and land leveling.'
    },
    {
      title: 'Water Storage Tanks',
      slug: '/services/water-tanks',
      desc: 'Zincalume, SMC Panel, FBEC, GLS/GFS, and MS fabricated reservoirs.'
    },
    {
      title: 'Heavy Fabrication',
      slug: '/services/heavy-fabrication',
      desc: 'Bus shelters, railway bridges, industrial warehouses, and crash barriers.'
    }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Top Bar for Engineering Credibility */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContent}`}>
          <div className={styles.topBarLeft}>
            <a href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`} className={styles.topBarLink}>
              <Phone size={13} />
              <span>{COMPANY_CONTACT.owners[0].phones[0]}</span>
            </a>
            <a href={`mailto:${COMPANY_CONTACT.owners[0].emails[0]}`} className={styles.topBarLink}>
              <Mail size={13} />
              <span>{COMPANY_CONTACT.owners[0].emails[0]}</span>
            </a>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.certBadge}>
              <ShieldCheck size={13} style={{ display: 'inline', marginRight: 4 }} />
              <span>ISO 9001:2015 | 14001:2015 | 45001:2018 Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="container">
        <div className={styles.navContainer}>
          {/* Brand Logo Lockup */}
          <Link href="/" className={styles.brandLink}>
            <div className={styles.logoMark}>JNP</div>
            <div className={styles.brandText}>
              <span className={styles.companyTitle}>JNP INFRA ENG WORKS</span>
              <span className={styles.companySubtitle}>Engineering & Infrastructure Execution</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <Link 
              href="/" 
              className={`${styles.navLink} ${pathname === '/' ? styles.activeNavLink : ''}`}
            >
              Home
            </Link>

            <Link 
              href="/about" 
              className={`${styles.navLink} ${pathname === '/about' ? styles.activeNavLink : ''}`}
            >
              About
            </Link>

            {/* Dropdown for Services */}
            <div 
              className={styles.dropdownWrapper}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`${styles.dropdownTrigger} ${pathname.startsWith('/services') ? styles.activeNavLink : ''}`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown size={14} />
              </Link>

              <div className={`${styles.dropdownMenu} ${servicesDropdownOpen ? styles.dropdownOpen : ''}`}>
                <Link href="/services" className={styles.dropdownItem} style={{ borderBottom: '1px solid var(--color-border)', marginBottom: 4 }}>
                  <span className={styles.dropdownItemTitle}>All Engineering Services</span>
                  <span className={styles.dropdownItemDesc}>Explore our comprehensive execution portfolio</span>
                </Link>
                {serviceCategories.map((cat) => (
                  <Link key={cat.slug} href={cat.slug} className={styles.dropdownItem}>
                    <span className={styles.dropdownItemTitle}>{cat.title}</span>
                    <span className={styles.dropdownItemDesc}>{cat.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/projects" 
              className={`${styles.navLink} ${pathname === '/projects' ? styles.activeNavLink : ''}`}
            >
              Projects
            </Link>

            <Link 
              href="/clients" 
              className={`${styles.navLink} ${pathname === '/clients' ? styles.activeNavLink : ''}`}
            >
              Clients & Sectors
            </Link>

            <Link 
              href="/contact" 
              className={`${styles.navLink} ${pathname === '/contact' ? styles.activeNavLink : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className={styles.navActions}>
            <Link href="/contact" className={styles.quoteBtn}>
              <span>Get in Touch</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              type="button" 
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.mobileOverlayVisible : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <div className={styles.mobileDrawerHeader}>
          <div className={styles.brandLink}>
            <div className={styles.logoMark}>JNP</div>
            <div className={styles.brandText}>
              <span className={styles.companyTitle} style={{ fontSize: '1rem' }}>JNP INFRA ENG</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ padding: 4 }}
          >
            <X size={22} />
          </button>
        </div>

        <div className={styles.mobileDrawerNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>

          <div>
            <div 
              className={styles.mobileNavLink}
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              style={{ cursor: 'pointer' }}
            >
              <span>Services</span>
              <ChevronDown size={16} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            {mobileServicesOpen && (
              <div className={styles.mobileSubmenu}>
                <Link href="/services" className={styles.mobileSubmenuLink} onClick={() => setMobileMenuOpen(false)}>
                  All Services Overview
                </Link>
                {serviceCategories.map((cat) => (
                  <Link key={cat.slug} href={cat.slug} className={styles.mobileSubmenuLink} onClick={() => setMobileMenuOpen(false)}>
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/projects" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Projects / Showcase
          </Link>
          <Link href="/clients" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Clients & Sectors
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Contact Us
          </Link>
        </div>

        <div className={styles.mobileDrawerFooter}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            <strong>Direct Execution Inquiries:</strong>
          </p>
          <a href={`tel:${COMPANY_CONTACT.owners[0].phones[0]}`} className={styles.topBarLink} style={{ color: 'var(--color-primary)' }}>
            <Phone size={14} color="var(--color-accent)" />
            <span>{COMPANY_CONTACT.owners[0].phones[0]}</span>
          </a>
          <a href={`mailto:${COMPANY_CONTACT.owners[0].emails[0]}`} className={styles.topBarLink} style={{ color: 'var(--color-primary)' }}>
            <Mail size={14} color="var(--color-accent)" />
            <span style={{ wordBreak: 'break-all' }}>{COMPANY_CONTACT.owners[0].emails[0]}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
