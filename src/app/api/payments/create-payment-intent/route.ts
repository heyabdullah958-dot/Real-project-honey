import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-05-27.dahlia',
    })
  : null;

export async function POST(req: Request) {
  try {
    if (!stripe) {
      console.error('Stripe API key is missing');
      return NextResponse.json({ success: false, message: 'Configuration error' }, { status: 500 });
    }
    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json({ success: false, message: 'Missing amount' }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Stripe API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
