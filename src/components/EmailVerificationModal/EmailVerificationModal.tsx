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
  const [generatedOtp, setGeneratedOtp] = useState('');

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
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const emailClean = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailClean || !emailRegex.test(emailClean)) {
      setErrorMsg('Please enter a valid business or personal email address.');
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
        setGeneratedOtp(data.otp || '');
        setStep('otp');
        setTimeout(() => otpInputRefs[0].current?.focus(), 150);
      } else {
        setErrorMsg(data.message || 'Unable to generate verification code. Please try again.');
      }
    } catch {
      setErrorMsg('Network connectivity issue. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
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

    // Auto advance to next input
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
      setErrorMsg('Please enter the complete 4-digit verification code.');
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
          // Trigger the project quotes modal immediately
          window.dispatchEvent(new CustomEvent('open-quote-slider-modal'));
        }, 1200);
      } else {
        setErrorMsg(data.message || 'Invalid code. Please check the code sent to your email.');
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
                <span>Verified Client Access</span>
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
                Welcome to <span>JNP Infra Eng Works</span>
              </h3>
              <p className={styles.subtitle}>
                Please verify your email address to unlock official project quotation estimates, rate sheets, and engineering portfolio.
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
                    <span>Your Name / Company Name</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g. Rajesh Kumar / Larsen &amp; Toubro"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    <span>Official Email Address *</span>
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
                      <span>Sending Verification Code...</span>
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
                Enter <span>4-Digit Verification Code</span>
              </h3>
              <p className={styles.subtitle}>
                Your one-time verification code for <strong>{email}</strong>:
              </p>
              {generatedOtp && (
                <div style={{
                  background: 'linear-gradient(135deg, #0B192C 0%, #1a2d4a 100%)',
                  border: '1.5px solid #F59E0B',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 0 24px rgba(245,158,11,0.15)'
                }}>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Verification Code</p>
                  <div style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '12px', color: '#F59E0B', fontFamily: 'monospace' }}>
                    {generatedOtp}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '11px', margin: '6px 0 0 0' }}>Valid for 10 minutes · Enter this code below</p>
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
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Verify &amp; Unlock Quotes</span>
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
                    ← Change Email
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={loading}
                    className={styles.textBtn}
                  >
                    Resend Code
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
              <h3 className={styles.successTitle}>Email Verified Successfully!</h3>
              <p className={styles.successText}>
                Welcome aboard. Loading JNP Infra Eng Works project quotation rates...
              </p>
              <div className={styles.nextLoading}>
                <RefreshCw size={16} className="animate-spin" />
                <span>Opening Project Estimates...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
