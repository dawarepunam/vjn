import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      company, 
      phone, 
      email, 
      serviceType, 
      location, 
      budget, 
      message 
    } = body;

    // Validate required fields
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Valid mobile number is required.' },
        { status: 400 }
      );
    }

    // Basic mobile validation (at least 7 to 15 digits)
    const phoneClean = phone.replace(/[\s\-\+\(\)]/g, '');
    if (!/^\d{7,15}$/.test(phoneClean)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // Optional email validation
    if (email && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { success: false, message: 'Please enter a valid email address.' },
          { status: 400 }
        );
      }
    }

    if (!serviceType || typeof serviceType !== 'string' || serviceType.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please select a service / project type.' },
        { status: 400 }
      );
    }

    const leadRecord = {
      id: `LEAD-${Date.now()}`,
      fullName: fullName.trim(),
      company: (company || '').trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      serviceType: serviceType.trim(),
      location: (location || '').trim(),
      budget: (budget || '').trim(),
      message: (message || '').trim(),
      timestamp: new Date().toISOString(),
      status: 'NEW_ENQUIRY'
    };

    console.log('[ENQUIRY RECEIVED]', JSON.stringify(leadRecord, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: 'Your project quotation request has been successfully registered. Our engineering management will contact you shortly.',
        leadId: leadRecord.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ENQUIRY ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing your request. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
