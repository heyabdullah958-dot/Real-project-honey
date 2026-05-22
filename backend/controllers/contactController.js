const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const { getAdminContactEmail } = require('../utils/emailTemplates');

// @desc    Create a new contact inquiry
// @route   POST /api/contact
// @access  Public
exports.create = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    // Save inquiry to database
    const inquiry = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // Send email alert to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'Zeeshan.ahmed2691@gmail.com';
    console.log(`Sending admin email for contact inquiry to: ${adminEmail}`);
    await sendEmail({
      to: adminEmail,
      subject: `📩 Contact Inquiry: ${subject}`,
      html: getAdminContactEmail({ name, email, subject, message })
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Private (Admin)
exports.getAll = async (req, res, next) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark inquiry as read
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
exports.markAsRead = async (req, res, next) => {
  try {
    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry marked as read.',
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};
