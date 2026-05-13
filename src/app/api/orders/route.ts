import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getAdminOrderEmail, getCustomerOrderEmail } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, whatsapp, email, city, address, items, totalAmount, orderNote } = body;

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
    await resend.emails.send({
      from: 'Amazing Natures <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'zeeshan.ahmed2691@gmail.com',
      subject: `🍯 New COD Order ${orderId} — ${fullName}`,
      html: getAdminOrderEmail(orderData),
    });

    // 2. Send Email to Customer (if email provided)
    if (email) {
      await resend.emails.send({
        from: 'Amazing Natures <onboarding@resend.dev>',
        to: email,
        subject: `Your Amazing Natures order is confirmed! (${orderId})`,
        html: getCustomerOrderEmail(orderData),
      });
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
