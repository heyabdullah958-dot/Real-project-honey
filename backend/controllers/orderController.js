const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const { getAdminOrderEmail, getCustomerOrderEmail, getStatusUpdateEmail } = require('../utils/emailTemplates');

// @desc    Create new COD order
// @route   POST /api/orders
// @access  Public
exports.create = async (req, res, next) => {
  try {
    const { fullName, whatsapp, email, city, address, items, totalAmount, orderNote, paymentId, paymentStatus } = req.body;

    if (!fullName || !whatsapp || !city || !address || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required order fields.' });
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
      orderNote: orderNote || '',
      paymentMethod: 'stripe',
      paymentId,
      paymentStatus: paymentStatus || 'pending'
    };

    // Save to database
    const order = await Order.create(orderData);

    let emailSent = false;

    // Send Email to Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'Zeeshan.ahmed2691@gmail.com';
    console.log(`Sending admin email notification to: ${adminEmail}`);
    const adminRes = await sendEmail({
      to: adminEmail,
      subject: `🍯 New COD Order ${orderId} — ${fullName}`,
      html: getAdminOrderEmail(orderData)
    });

    if (adminRes.success) {
      emailSent = true;
    }

    // Send Email to Customer (if provided)
    if (email) {
      console.log(`Sending customer email confirmation to: ${email}`);
      await sendEmail({
        to: email,
        subject: `Your Amazing Natures order is confirmed! (${orderId})`,
        html: getCustomerOrderEmail(orderData)
      });
    }

    if (emailSent) {
      order.emailSent = true;
      await order.save();
    }

    res.status(201).json({
      success: true,
      orderId,
      message: 'Order placed successfully.'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by orderId
// @route   GET /api/orders/:orderId
// @access  Private (Admin)
exports.getById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:orderId
// @access  Private (Admin)
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Send status update email if customer provided an email address
    let emailSent = false;
    if (order.email) {
      try {
        console.log(`Sending status update (${status}) email to: ${order.email}`);
        const emailTemplate = getStatusUpdateEmail(order, status);
        const emailRes = await sendEmail({
          to: order.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html
        });
        emailSent = emailRes.success;
      } catch (emailErr) {
        console.error('❌ Failed to send status email:', emailErr);
      }
    } else {
      console.log(`No email for order ${order.orderId}, skipping status update notification.`);
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      emailSent,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
