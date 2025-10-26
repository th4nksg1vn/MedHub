// Lightweight email sender supporting SMTP (nodemailer) and SendGrid (API) as fallbacks.
// Env variables supported:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL
// SENDGRID_API_KEY

type SendResult = { success: boolean; info?: any };

export async function sendInviteEmail(to: string, subject: string, htmlBody: string, textBody?: string): Promise<SendResult> {
  // Try SMTP via nodemailer first if SMTP vars provided (user requested nodemailer)
  const host = process.env.SMTP_HOST;
  if (host) {
    try {
      // dynamic import so nodemailer is optional
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: (process.env.SMTP_SECURE || 'false') === 'true',
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' }
          : undefined,
      });
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'solomonafoh@gmail.com',
        to,
        subject,
        text: textBody,
        html: htmlBody,
      });
      return { success: true, info };
    } catch (e) {
      // don't return yet; try SendGrid as fallback
      console.error('SMTP failed, will attempt SendGrid if configured', e);
      var smtpErr = e;
    }
  }

  // Try SendGrid as fallback
  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      const payload = {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.FROM_EMAIL || 'no-reply@example.com' },
        subject,
        content: [
          { type: 'text/plain', value: textBody || '' },
          { type: 'text/html', value: htmlBody },
        ],
      };
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${sendgridKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        return { success: false, info: { status: res.status, body: text } };
      }
      return { success: true, info: { provider: 'sendgrid' } };
    } catch (e) {
      console.error('SendGrid send failed', e);
      return { success: false, info: e || smtpErr };
    }
  }

  // No provider configured - log and return token in dev.
  console.warn('No email provider configured (SMTP_HOST or SENDGRID_API_KEY).');
  return { success: false, info: 'no-provider' };
}

export default { sendInviteEmail };
