import crypto from 'crypto';
import { prisma } from './prisma';

export async function generateVerificationToken(email: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
      userId: user?.id,
    },
  });
  
  return token;
}

export async function generatePasswordResetToken(userId: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  
  // Invalidate any existing tokens
  await prisma.passwordResetToken.updateMany({
    where: {
      userId,
      used: false,
      expires: {
        gt: new Date(),
      },
    },
    data: {
      used: true,
    },
  });
  
  await prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expires,
    },
  });
  
  return token;
}

export async function verifyPasswordResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });
  
  if (!resetToken) {
    throw new Error('Invalid token');
  }
  
  if (resetToken.expires < new Date()) {
    throw new Error('Token expired');
  }
  
  if (resetToken.used) {
    throw new Error('Token already used');
  }
  
  return resetToken;
}

export async function verifyEmailToken(token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  
  if (!verificationToken) {
    throw new Error('Invalid token');
  }
  
  if (verificationToken.expires < new Date()) {
    throw new Error('Token expired');
  }
  
  return verificationToken;
}

export async function markPasswordResetTokenAsUsed(token: string) {
  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  });
}

export async function deleteVerificationToken(token: string) {
  await prisma.verificationToken.delete({
    where: { token },
  });
}

export function generateTwoFactorSecret() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateTwoFactorToken() {
  // Generate a 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
}
