import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';

let resend: Resend | null = null;

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@licensorflow.com';

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const client = getResendClient();
    
    if (!client) {
      console.warn('[Email] Resend API key not configured, skipping email send');
      return { id: 'mock-email-id' };
    }
    
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text,
    });
    
    return result;
  } catch (error) {
    console.error('[Email] Error sending email:', error);
    Sentry.captureException(error, {
      extra: { to, subject },
    });
    throw error;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;
  
  return sendEmail({
    to: email,
    subject: 'Verify your email address - LicensorFlow',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">LicensorFlow</h1>
        </div>
        <div style="padding: 40px 20px; background: #f7f7f7;">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for signing up! Please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            If you didn't create an account, you can safely ignore this email.
          </p>
          <p style="color: #999; font-size: 14px;">
            This link will expire in 24 hours.
          </p>
        </div>
        <div style="padding: 20px; background: #333; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 LicensorFlow. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `Verify your email: ${verifyUrl}`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  
  return sendEmail({
    to: email,
    subject: 'Reset your password - LicensorFlow',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">LicensorFlow</h1>
        </div>
        <div style="padding: 40px 20px; background: #f7f7f7;">
          <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #666; line-height: 1.6;">
            You requested to reset your password. Click the button below to set a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color: #999; font-size: 14px;">
            This link will expire in 1 hour.
          </p>
        </div>
        <div style="padding: 20px; background: #333; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 LicensorFlow. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `Reset your password: ${resetUrl}`,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to LicensorFlow!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">LicensorFlow</h1>
        </div>
        <div style="padding: 40px 20px; background: #f7f7f7;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">
            We're excited to have you on board. Here's what you can do next:
          </p>
          <ul style="color: #666; line-height: 1.8;">
            <li>Browse our compliance courses</li>
            <li>Set up your learning profile</li>
            <li>Track your certifications</li>
            <li>Manage your licenses</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Go to Dashboard
            </a>
          </div>
          <p style="color: #999; font-size: 14px;">
            If you have any questions, feel free to reach out to our support team.
          </p>
        </div>
        <div style="padding: 20px; background: #333; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 LicensorFlow. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendCourseEnrollmentEmail(email: string, courseName: string) {
  return sendEmail({
    to: email,
    subject: `Enrolled in ${courseName} - LicensorFlow`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">LicensorFlow</h1>
        </div>
        <div style="padding: 40px 20px; background: #f7f7f7;">
          <h2 style="color: #333; margin-bottom: 20px;">Course Enrollment Confirmed!</h2>
          <p style="color: #666; line-height: 1.6;">
            You've been successfully enrolled in:
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin: 0;">${courseName}</h3>
          </div>
          <p style="color: #666; line-height: 1.6;">
            You can start learning immediately from your dashboard.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard/courses" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Start Learning
            </a>
          </div>
        </div>
        <div style="padding: 20px; background: #333; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 LicensorFlow. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendCertificateEmail(email: string, courseName: string, certificateUrl: string) {
  return sendEmail({
    to: email,
    subject: `Certificate Earned: ${courseName} - LicensorFlow`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">LicensorFlow</h1>
        </div>
        <div style="padding: 40px 20px; background: #f7f7f7;">
          <h2 style="color: #333; margin-bottom: 20px;">🎉 Congratulations!</h2>
          <p style="color: #666; line-height: 1.6;">
            You've successfully completed:
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin: 0;">${courseName}</h3>
          </div>
          <p style="color: #666; line-height: 1.6;">
            Your certificate is ready for download.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${certificateUrl}" style="display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Download Certificate
            </a>
          </div>
          <p style="color: #999; font-size: 14px;">
            You can also access your certificate anytime from your dashboard.
          </p>
        </div>
        <div style="padding: 20px; background: #333; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 LicensorFlow. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}
