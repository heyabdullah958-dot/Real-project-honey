const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create a payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Public
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing items or totalAmount' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing in backend environment variables.");
      return res.status(500).json({ 
        success: false, 
        message: 'Stripe configuration is missing on the server.' 
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};
