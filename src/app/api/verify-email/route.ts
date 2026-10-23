import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory OTP storage with timestamp (in production, use Redis or DB)
type OtpRecord = {
  otp: string;
  expiresAt: number;
  attempts: number;
};

// Global in-memory map across invocations in single node
const otpStore = new Map<string, OtpRecord>();

// Helper to create transport
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null; // SMTP not yet configured in env
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// 1) SEND OTP
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'send'; // 'send' or 'verify'
    const email = (body.email || '').trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid official email address.' },
        { status: 400 }
      );
    }

    if (action === 'send') {
      // Generate 4-digit secure OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpStore.set(email, {
        otp,
        expiresAt,
        attempts: 0,
      });

      const transporter = getTransporter();
      let sentViaEmail = false;

      if (transporter) {
        try {
          await transporter.sendMail({
            from: `"JNP Infra Eng Works" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `${otp} is your Verification Code - JNP Infra Eng Works`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h2 style="color: #0B192C; margin: 0; font-size: 22px;">M/s JNP Infra Eng Works</h2>
                  <p style="color: #F59E0B; margin: 4px 0 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase;">Engineering with Precision. Execution with Responsibility.</p>
                </div>
                <div style="background: #f8fafc; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 20px; border: 1px solid #f1f5f9;">
                  <p style="color: #475569; margin: 0 0 10px 0; font-size: 14px;">Your One-Time Access Verification Code is:</p>
                  <div style="font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #0B192C; padding: 10px 0;">${otp}</div>
                  <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0 0;">Valid for 10 minutes. Please do not share this code.</p>
                </div>
                <p style="color: #64748b; font-size: 13px; line-height: 1.55; margin: 0 0 16px 0;">
                  Thank you for visiting JNP Infra Eng Works. Once verified, you will have immediate access to project quotation rates, equipment specifications, and turnkey engineering portfolios.
                </p>
                <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 11px; color: #94a3b8; text-align: center;">
                  M/s JNP Infra Eng Works · Pune, Maharashtra · www.jnpinfraworks.com
                </div>
              </div>
            `,
          });
          sentViaEmail = true;
        } catch (emailErr) {
          console.error('[SMTP Send Error]', emailErr);
        }
      }

      console.log(`[OTP Generated] Email: ${email} | Code: ${otp} | Sent via SMTP: ${sentViaEmail}`);

      return NextResponse.json({
        success: true,
        message: sentViaEmail 
          ? `Verification code has been dispatched to ${email}.`
          : `Verification code generated.`,
        email,
      });
    }

    if (action === 'verify') {
      const code = (body.code || '').trim();
      if (!code) {
        return NextResponse.json(
          { success: false, message: 'Please enter the 4-digit code.' },
          { status: 400 }
        );
      }

      const record = otpStore.get(email);
      if (!record) {
        return NextResponse.json(
          { success: false, message: 'No active code found for this email. Please click "Resend Code".' },
          { status: 400 }
        );
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        return NextResponse.json(
          { success: false, message: 'The verification code has expired. Please request a new one.' },
          { status: 400 }
        );
      }

      if (record.otp !== code) {
        record.attempts += 1;
        if (record.attempts >= 5) {
          otpStore.delete(email);
          return NextResponse.json(
            { success: false, message: 'Too many incorrect attempts. Please request a new code.' },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { success: false, message: 'Invalid verification code. Please check your email inbox.' },
          { status: 400 }
        );
      }

      // Successful verification
      otpStore.delete(email);
      return NextResponse.json({
        success: true,
        message: 'Email verified successfully.',
        verifiedEmail: email,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid request action.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[OTP Route Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
