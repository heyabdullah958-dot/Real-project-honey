import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getAdminOrderEmail, getCustomerOrderEmail } from '@/lib/email-templates';

// Prevent build-time crash if API key is missing
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: Request) {
  try {
    if (!resend) {
      console.error('Resend API key is missing');
      return NextResponse.json({ success: false, message: 'Configuration error' }, { status: 500 });
    }
    const body = await req.json();
    const { fullName, whatsapp, email, city, address, items, totalAmount, orderNote = "" } = body;

    if (!fullName || !whatsapp || !city || !address || !items || !totalAmount) {
      return NextResponse.json({ success: false, message: 'Missing required order fields' }, { status: 400 });
    }

    // Generate Order ID
    const orderId = `AN-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderData = {
      orderId,
      fullName,
      whatsapp,
      email,
      city,
      address,
      items,
      totalAmount,
      orderNote
    };

    // 1. Send Email to Admin
    console.log('Attempting to send admin email to:', process.env.ADMIN_EMAIL || 'abdullahhere958@gmail.com');
    const adminRes = await resend.emails.send({
      from: 'Amazing Natures <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'abdullahhere958@gmail.com',
      subject: `🍯 New COD Order ${orderId} — ${fullName}`,
      html: getAdminOrderEmail(orderData),
    });
    console.log('Admin email response:', adminRes);

    // 2. Send Email to Customer (if email provided)
    if (email) {
      console.log('Attempting to send customer email to:', email);
      const customerRes = await resend.emails.send({
        from: 'Amazing Natures <onboarding@resend.dev>',
        to: email,
        subject: `Your Amazing Natures order is confirmed! (${orderId})`,
        html: getCustomerOrderEmail(orderData),
      });
      console.log('Customer email response:', customerRes);
    }

    return NextResponse.json({ 
      success: true, 
      orderId,
      message: 'Order placed successfully' 
    });

  } catch (error: any) {
    console.error('Order API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to place order' },
      { status: 500 }
    );
  }
}
