const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

const sendEmail = async ({ to, subject, html }) => {
  if (!resend) {
    console.error('❌ Resend API key is missing. Email skipped.');
    return { success: false, error: 'Resend API key missing' };
  }

  try {
    const response = await resend.emails.send({
      from: 'Amazing Natures <onboarding@resend.dev>',
      to,
      subject,
      html
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ Resend Error:', error);
    return { success: false, error };
  }
};

module.exports = sendEmail;
