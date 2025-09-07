import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationToken } from '@/lib/tokens';
import * as Sentry from '@sentry/nextjs';

const RegisterSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  organizationName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = RegisterSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        password: hashedPassword,
        organizationName: validatedData.organizationName,
        role: 'STUDENT',
        status: 'PENDING_VERIFICATION',
      },
    });
    
    // Generate verification token
    const token = await generateVerificationToken(user.email);
    
    // Send verification email
    try {
      await sendVerificationEmail(user.email, token);
    } catch (emailError) {
      console.error('[Register] Email sending failed:', emailError);
      // Don't fail registration if email fails
    }
    
    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTER',
        entityType: 'USER',
        entityId: user.id,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    });
    
    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Welcome to LicensorFlow!',
        message: 'Your account has been created. Please verify your email to get started.',
        type: 'INFO',
      },
    });
    
    return NextResponse.json({
      message: 'User created successfully',
      userId: user.id,
    });
  } catch (error) {
    console.error('[Register] Error:', error);
    Sentry.captureException(error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
