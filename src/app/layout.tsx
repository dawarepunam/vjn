import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import EnquiryModal from '@/components/EnquiryModal/EnquiryModal';
import QuoteSliderModal from '@/components/QuoteSliderModal/QuoteSliderModal';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'M/s JNP Infra Eng Works | Engineering with Precision. Execution with Responsibility.',
  description: 'Specialized infrastructure contractor executing HDPE butt fusion, DI pipelines, solar DTH piling, water storage tanks, and heavy structural steel fabrication across India.',
  keywords: [
    'JNP Infra Eng Works',
    'HDPE Butt Fusion Machine',
    'HDPE Electro Fusion Machine',
    'DI Pipe Thrust Block Work',
    'DTH Piling',
    'MMS Module Installation',
    'Solar Infrastructure',
    'Water Storage Tanks',
    'Zincalume Tanks',
    'Heavy Fabrication',
    'Infrastructure Contractor Pune Maharashtra'
  ],
  authors: [{ name: 'JNP Infra Eng Works' }],
  openGraph: {
    title: 'M/s JNP Infra Eng Works | Engineering with Precision. Execution with Responsibility.',
    description: 'Specialized infrastructure contractor executing HDPE butt fusion, DI pipelines, solar DTH piling, water storage tanks, and heavy structural steel fabrication.',
    siteName: 'JNP Infra Eng Works',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <EnquiryModal />
        <QuoteSliderModal />
      </body>
    </html>
  );
}
