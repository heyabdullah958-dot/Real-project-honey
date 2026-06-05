const getAdminOrderEmail = (order) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #F5EDD4; padding: 40px; border: 1px solid #D4930A;">
    <h1 style="color: #D4930A; border-bottom: 1px solid #D4930A; padding-bottom: 20px;">🍯 New COD Order</h1>
    <p><strong>Order ID:</strong> ${order.orderId}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    
    <h2 style="color: #D4930A;">Customer Details</h2>
    <p><strong>Name:</strong> ${order.fullName}</p>
    <p><strong>WhatsApp:</strong> ${order.whatsapp}</p>
    <p><strong>Email:</strong> ${order.email || 'N/A'}</p>
    <p><strong>City:</strong> ${order.city}</p>
    <p><strong>Address:</strong> ${order.address}</p>
    <p><strong>Order Note:</strong> ${order.orderNote || 'N/A'}</p>

    <h2 style="color: #D4930A;">Items Ordered</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${order.items.map((item) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 147, 10, 0.2);">${item.name} x ${item.quantity}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 147, 10, 0.2); text-align: right;">$${item.price * item.quantity}</td>
        </tr>
      `).join('')}
      <tr>
        <td style="padding: 20px 0; font-weight: bold; font-size: 20px;">TOTAL (COD)</td>
        <td style="padding: 20px 0; font-weight: bold; font-size: 20px; text-align: right; color: #D4930A;">$${order.totalAmount}</td>
      </tr>
    </table>
    
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #D4930A; font-size: 12px; opacity: 0.7;">
      Sent from Amazing Natures Website
    </div>
  </div>
`;

const getCustomerOrderEmail = (order) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #faf4e8; color: #1e1508; padding: 40px; border-radius: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #D4930A; margin: 0;">Order Confirmed!</h1>
      <p style="margin-top: 10px;">Thank you for choosing Amazing Natures</p>
    </div>
    
    <p>Hi ${order.fullName},</p>
    <p>We've received your order <strong>${order.orderId}</strong>. We will contact you on WhatsApp (<strong>${order.whatsapp}</strong>) to confirm delivery.</p>

    <div style="background: white; padding: 20px; border-radius: 15px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Order Summary</h3>
      ${order.items.map((item) => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
          <span>${item.name} x ${item.quantity}</span>
          <span>$${item.price * item.quantity}</span>
        </div>
      `).join('')}
      <div style="border-top: 1px solid #eee; margin-top: 15px; padding-top: 15px; font-weight: bold; display: flex; justify-content: space-between;">
        <span>Amount to Pay (COD)</span>
        <span style="color: #D4930A;">$${order.totalAmount}</span>
      </div>
    </div>

    <p style="font-size: 14px; line-height: 1.6;">
      <strong>Delivery Address:</strong><br/>
      ${order.address}, ${order.city}
    </p>

    <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #888;">
      Amazing Natures Australia — Pure Australian Gold
    </div>
  </div>
`;

const getAdminContactEmail = (data) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #F5EDD4; padding: 40px; border: 1px solid #D4930A;">
    <h1 style="color: #D4930A; border-bottom: 1px solid #D4930A; padding-bottom: 20px;">📩 New Contact Inquiry</h1>
    <p><strong>From:</strong> ${data.name} (${data.email})</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; line-height: 1.6;">
      ${data.message}
    </div>
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #D4930A; font-size: 12px; opacity: 0.7;">
      Sent from Amazing Natures Contact Form
    </div>
  </div>
`;

const getStatusUpdateEmail = (order, status) => {
  let title = '';
  let emoji = '';
  let message = '';
  let color = '#D4930A'; // Brand amber

  switch (status) {
    case 'confirmed':
      title = 'Order Confirmed';
      emoji = '🍯';
      message = `Great news! We have confirmed your order. Our team is now preparing your pure Australian Manuka honey package. We will contact you on WhatsApp (<strong>${order.whatsapp}</strong>) to coordinate delivery.`;
      color = '#D4930A';
      break;
    case 'shipped':
      title = 'Order Dispatched';
      emoji = '🚚';
      message = `Your order has been shipped and is on its way to you! It will be delivered via Cash on Delivery. Please keep the exact amount ready for the courier.`;
      color = '#6366f1'; // Premium indigo
      break;
    case 'delivered':
      title = 'Order Delivered';
      emoji = '🎉';
      message = `Your order has been successfully delivered! We hope you enjoy the premium quality of Amazing Natures Manuka honey. Thank you for shopping with us!`;
      color = '#10b981'; // Premium emerald
      break;
    case 'cancelled':
      title = 'Order Cancelled';
      emoji = '❌';
      message = `We regret to inform you that your order has been cancelled. If you believe this was in error, please reply to this email or contact us via WhatsApp (<strong>${order.whatsapp}</strong>).`;
      color = '#ef4444'; // Red
      break;
    case 'pending':
    default:
      title = 'Order Received';
      emoji = '⏳';
      message = `We have received your order. It is currently pending review. We will reach out to you shortly to confirm the details.`;
      color = '#d97706'; // Amber-600
      break;
  }

  const itemsListHtml = order.items.map((item) => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-family: sans-serif; color: #3d2f1b;">
      <span>${item.name} x ${item.quantity}</span>
      <span style="font-weight: bold;">$${item.price * item.quantity}</span>
    </div>
  `).join('');

  const html = `
    <div style="font-family: 'Outfit', 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #faf4e8; color: #1e1508; padding: 40px; border-radius: 20px; border: 1px solid rgba(212, 147, 10, 0.2);">
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid ${color}; padding-bottom: 20px;">
        <span style="font-size: 40px; display: block; margin-bottom: 10px;">${emoji}</span>
        <h1 style="color: ${color}; margin: 0; font-size: 28px; font-weight: 700;">${title}</h1>
        <p style="margin-top: 5px; font-size: 14px; text-transform: uppercase; tracking-wider; font-weight: 600; color: #6b583e;">Amazing Natures Australia</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #1e1508;">Hi ${order.fullName},</p>
      <p style="font-size: 15px; line-height: 1.6; color: #3d2f1b;">${message}</p>
      <p style="font-size: 14px; color: #6b583e; background: rgba(212, 147, 10, 0.05); padding: 12px; border-radius: 8px; border-left: 3px solid ${color};">
        <strong>Order Reference:</strong> ${order.orderId}
      </p>

      <div style="background: white; padding: 20px; border-radius: 15px; margin: 25px 0; border: 1px solid rgba(212, 147, 10, 0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
        <h3 style="margin-top: 0; color: #1e1508; font-size: 16px; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
        ${itemsListHtml}
        <div style="border-top: 1px solid #eee; margin-top: 15px; padding-top: 15px; font-weight: bold; display: flex; justify-content: space-between; font-size: 16px;">
          <span>Total (Cash on Delivery)</span>
          <span style="color: #D4930A;">$${order.totalAmount} AUD</span>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.6); padding: 15px; border-radius: 12px; margin: 20px 0; font-size: 14px; border: 1px solid rgba(212, 147, 10, 0.05);">
        <strong style="color: #1e1508; display: block; margin-bottom: 5px;">📍 Delivery Details:</strong>
        <span style="color: #3d2f1b; line-height: 1.5;">${order.address}, ${order.city}</span>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #3d2f1b;">
        If you have any questions or need to make changes, please contact us on WhatsApp at <strong>${order.whatsapp}</strong> or reply to this email.
      </p>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(212, 147, 10, 0.1); font-size: 12px; color: #888;">
        <strong>Amazing Natures Australia</strong> — Pure Australian Gold<br/>
        Sydney, NSW, Australia
      </div>
    </div>
  `;

  return {
    subject: `[Amazing Natures] ${emoji} ${title} — Order ${order.orderId}`,
    html
  };
};

module.exports = {
  getAdminOrderEmail,
  getCustomerOrderEmail,
  getAdminContactEmail,
  getStatusUpdateEmail
};

