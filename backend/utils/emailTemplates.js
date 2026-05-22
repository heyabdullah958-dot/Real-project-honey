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

module.exports = {
  getAdminOrderEmail,
  getCustomerOrderEmail,
  getAdminContactEmail
};
