import { NextResponse } from 'next/server';

// In-memory OTP storage with timestamp
type OtpRecord = {
  otp: string;
  expiresAt: number;
  attempts: number;
};

const otpStore = new Map<string, OtpRecord>();

// 1) SEND OTP — no email, just return OTP in response
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'send';
    const email = (body.email || '').trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (action === 'send') {
      // Generate 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpStore.set(email, { otp, expiresAt, attempts: 0 });

      console.log(`[OTP Generated] Email: ${email} | Code: ${otp}`);

      // Return OTP directly in response (no email sending)
      return NextResponse.json({
        success: true,
        message: 'Verification code generated successfully.',
        otp, // send OTP back to frontend to display
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
          { success: false, message: 'No active code found. Please request a new one.' },
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
          { success: false, message: 'Invalid verification code. Please check the code shown on screen.' },
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
