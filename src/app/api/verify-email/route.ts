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
        { success: false, message: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा (Please enter a valid email).' },
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
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #0B192C; margin: 0; font-size: 22px;">M/s JNP Infra Eng Works</h2>
                  <p style="color: #F59E0B; margin: 4px 0 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase;">Engineering with Precision</p>
                </div>
                <div style="background: #f8fafc; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 20px;">
                  <p style="color: #475569; margin: 0 0 10px 0; font-size: 14px;">Your One-Time Access Verification Code is:</p>
                  <div style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #0B192C; padding: 8px 0;">${otp}</div>
                  <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0 0;">Valid for 10 minutes. Please do not share this code with anyone.</p>
                </div>
                <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
                  Thank you for visiting JNP Infra Eng Works. Once verified, you will have complete access to project quotation estimates and engineering portfolios.
                </p>
              </div>
            `,
          });
          sentViaEmail = true;
        } catch (emailErr) {
          console.error('[SMTP Send Error]', emailErr);
          // Don't fail the user flow if SMTP credentials fail; fallback will provide dev code
        }
      }

      console.log(`[OTP Generated] Email: ${email} | Code: ${otp} | Sent via SMTP: ${sentViaEmail}`);

      return NextResponse.json({
        success: true,
        message: sentViaEmail 
          ? `व्हेरिफिकेशन कोड ${email} वर पाठवला आहे.`
          : `व्हेरिफिकेशन कोड तयार केला आहे.`,
        email,
        // In local development or if SMTP not yet bound, deliver otp in response so testing is smooth
        demoOtp: !sentViaEmail ? otp : undefined,
      });
    }

    if (action === 'verify') {
      const code = (body.code || '').trim();
      if (!code) {
        return NextResponse.json(
          { success: false, message: 'कृपया ४-अंकी व्हेरिफिकेशन कोड टाका.' },
          { status: 400 }
        );
      }

      const record = otpStore.get(email);
      if (!record) {
        return NextResponse.json(
          { success: false, message: 'कोणताही कोड सापडला नाही. कृपया पुन्हा "Resend Code" वर क्लिक करा.' },
          { status: 400 }
        );
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        return NextResponse.json(
          { success: false, message: 'हा कोड कालबाह्य (Expired) झाला आहे. कृपया नवीन कोड मागवा.' },
          { status: 400 }
        );
      }

      if (record.otp !== code) {
        record.attempts += 1;
        if (record.attempts >= 5) {
          otpStore.delete(email);
          return NextResponse.json(
            { success: false, message: 'खूप वेळा चुकीचा कोड टाकला आहे. कृपया नवीन कोड मागवा.' },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { success: false, message: 'अवैध कोड! कृपया योग्य ४-अंकी कोड तपासा.' },
          { status: 400 }
        );
      }

      // Successful verification
      otpStore.delete(email);
      return NextResponse.json({
        success: true,
        message: 'ईमेल व्हेरिफिकेशन यशस्वी झाले!',
        verifiedEmail: email,
      });
    }

    return NextResponse.json(
      { success: false, message: 'अवैध विनंती (Invalid action).' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[OTP Route Error]', error);
    return NextResponse.json(
      { success: false, message: 'सर्व्हर एरर. कृपया पुन्हा प्रयत्न करा.' },
      { status: 500 }
    );
  }
}
