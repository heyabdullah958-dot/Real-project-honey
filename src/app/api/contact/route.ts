import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getAdminContactEmail } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Send Email to Admin
    await resend.emails.send({
      from: 'Amazing Natures <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'zeeshan.ahmed2691@gmail.com',
      subject: `📩 Contact Inquiry: ${subject}`,
      html: getAdminContactEmail({ name, email, subject, message }),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
