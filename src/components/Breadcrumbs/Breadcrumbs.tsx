import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <Link href="/" className={styles.crumbLink}>
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span className={styles.separator}><ChevronRight size={14} /></span>
            {isLast || !item.href ? (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className={styles.crumbLink}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
