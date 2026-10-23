'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, Lock } from 'lucide-react';
import styles from './EmailVerificationModal.module.css';

const SESSION_STORAGE_KEY = 'jnp_infra_email_verified';

export default function EmailVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [demoCode, setDemoCode] = useState<string | null>(null);

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Check on mount if session is already verified
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const isVerified = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!isVerified) {
        // Show immediately after short 600ms entrance
        const t = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(t);
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const emailClean = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailClean || !emailRegex.test(emailClean)) {
      setErrorMsg('कृपया वैध ईमेल पत्ता प्रविष्ट करा (Valid Email Address).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email: emailClean, fullName }),
      });
      const data = await res.json();

      if (data.success) {
        setStep('otp');
        if (data.demoOtp) {
          setDemoCode(data.demoOtp);
        }
        setTimeout(() => otpInputRefs[0].current?.focus(), 150);
      } else {
        setErrorMsg(data.message || 'Error sending code.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    const newOtp = [...otp];

    if (!cleaned) {
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Single digit input
    newOtp[index] = cleaned[cleaned.length - 1];
    setOtp(newOtp);

    // Auto advance
    if (index < 3 && cleaned) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const code = otp.join('');
    if (code.length !== 4) {
      setErrorMsg('कृपया ४-अंकी व्हेरिफिकेशन कोड प्रविष्ट करा.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email: email.trim().toLowerCase(), code }),
      });
      const data = await res.json();

      if (data.success) {
        // Mark session verified
        try {
          sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        } catch {
          // ignore
        }

        setStep('success');

        // After success animation, close verification modal and trigger QuoteSliderModal
        setTimeout(() => {
          setIsOpen(false);
          // Trigger the quotes modal immediately
          window.dispatchEvent(new CustomEvent('open-quote-slider-modal'));
        }, 1200);
      } else {
        setErrorMsg(data.message || 'अवैध कोड! कृपया तपासा.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="verify-modal-title">
      <div className={styles.modalCard}>
        <div className={styles.glowBar} />

        <div className={styles.contentWrapper}>
          {step !== 'success' && (
            <div className={styles.badgeRow}>
              <div className={styles.securityBadge}>
                <Lock size={12} />
                <span>Client Verification</span>
              </div>
              <div className={styles.stepIndicator}>
                Step {step === 'email' ? '1 of 2' : '2 of 2'}
              </div>
            </div>
          )}

          {/* STEP 1: ENTER EMAIL */}
          {step === 'email' && (
            <>
              <h3 id="verify-modal-title" className={styles.title}>
                स्वागत आहे! <span>M/s JNP Infra</span>
              </h3>
              <p className={styles.subtitle}>
                प्रोजेक्ट कोट्स, दर आणि इंजिनिअरिंग कंत्राट तपशील पाहण्यासाठी कृपया आपला ईमेल व्हेरिफाय करा.
              </p>

              {errorMsg && (
                <div className={styles.errorBanner}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSendOtp} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    <span>आपले नाव / कंपनी नाव (Full Name)</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g. Rahul Patil / Infra Tech Pvt Ltd"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    <span>अधिकृत ईमेल (Business / Personal Email) *</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <div className={styles.inputIcon}>
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      className={styles.input}
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.primaryBtn}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>कोड पाठवत आहे...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Verification Code</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* STEP 2: ENTER OTP */}
          {step === 'otp' && (
            <>
              <h3 id="verify-modal-title" className={styles.title}>
                Enter <span>4-Digit OTP</span>
              </h3>
              <p className={styles.subtitle}>
                व्हेरिफिकेशन कोड <strong>{email}</strong> वर पाठवला आहे.
              </p>

              {demoCode && (
                <div className={styles.demoBanner}>
                  <span>Access Code:</span>
                  <span className={styles.demoCode}>{demoCode}</span>
                </div>
              )}

              {errorMsg && (
                <div className={styles.errorBanner} style={{ marginBottom: 14 }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className={styles.form}>
                <div className={styles.otpRow}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpInputRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={styles.otpDigit}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 4}
                  className={styles.primaryBtn}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>तपासत आहे...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Verify &amp; Continue</span>
                    </>
                  )}
                </button>

                <div className={styles.footerLinks}>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setOtp(['', '', '', '']);
                      setErrorMsg('');
                    }}
                    className={styles.textBtn}
                  >
                    ← चेंज ईमेल (Change Email)
                  </button>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className={styles.textBtn}
                  >
                    कोड पुन्हा पाठवा (Resend)
                  </button>
                </div>
              </form>
            </>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === 'success' && (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={38} />
              </div>
              <h3 className={styles.successTitle}>ईमेल व्हेरिफाय झाले!</h3>
              <p className={styles.successText}>
                धन्यवाद! आता तुम्ही JNP Infra चे प्रोजेक्ट कोट्स आणि अंदाजपत्रक थेट पाहू शकता.
              </p>
              <div className={styles.nextLoading}>
                <RefreshCw size={16} className="animate-spin" />
                <span>Loading Project Quotes...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
