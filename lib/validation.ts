import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export const phoneSchema = z.string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')
  .min(10, 'Phone number must be at least 10 digits')
  .max(20, 'Phone number must be less than 20 characters');

// Course validation schemas
export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  longDescription: z.string().min(50, 'Long description must be at least 50 characters').max(2000, 'Long description must be less than 2000 characters'),
  category: z.enum(['HIPAA', 'OSHA', 'SOFTWARE_TRAINING', 'COMPLIANCE', 'SAFETY', 'CLINICAL']),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  duration: z.number().min(1, 'Duration must be at least 1 minute').max(1440, 'Duration must be less than 24 hours'),
  price: z.number().min(0, 'Price cannot be negative').max(10000, 'Price must be less than $10,000'),
  tags: z.string().max(200, 'Tags must be less than 200 characters'),
});

// User validation schemas
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  phoneNumber: phoneSchema.optional(),
  organizationName: z.string().max(100, 'Organization name must be less than 100 characters').optional(),
});

export const userUpdateSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phoneNumber: phoneSchema.optional(),
  organizationName: z.string().max(100, 'Organization name must be less than 100 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

// Quiz validation schemas
export const quizQuestionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters').max(500, 'Question must be less than 500 characters'),
  options: z.array(z.string().min(1, 'Option cannot be empty').max(200, 'Option must be less than 200 characters')).min(2, 'At least 2 options required').max(6, 'Maximum 6 options allowed'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  explanation: z.string().max(300, 'Explanation must be less than 300 characters').optional(),
  points: z.number().min(1, 'Points must be at least 1').max(10, 'Points must be less than 10').default(1),
});

export const quizSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(300, 'Description must be less than 300 characters').optional(),
  passingScore: z.number().min(50, 'Passing score must be at least 50%').max(100, 'Passing score must be 100% or less').default(70),
  timeLimit: z.number().min(5, 'Time limit must be at least 5 minutes').max(180, 'Time limit must be less than 3 hours').optional(),
  maxAttempts: z.number().min(1, 'Max attempts must be at least 1').max(10, 'Max attempts must be less than 10').default(3),
  questions: z.array(quizQuestionSchema).min(1, 'At least 1 question required').max(50, 'Maximum 50 questions allowed'),
});

// Input sanitization functions
export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
}

export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace invalid characters with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .toLowerCase();
}

// Rate limiting validation
export function validateRateLimit(attempts: number, maxAttempts: number, windowMs: number): boolean {
  return attempts <= maxAttempts;
}

// File upload validation
export const fileUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  mimetype: z.string().refine(
    (type) => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'].includes(type),
    'Invalid file type'
  ),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'), // 10MB limit
});

// Search validation
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
  filters: z.object({
    category: z.string().optional(),
    difficulty: z.string().optional(),
    priceRange: z.object({
      min: z.number().min(0).optional(),
      max: z.number().min(0).optional(),
    }).optional(),
  }).optional(),
  page: z.number().min(1).max(1000).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Validation helper functions
export function validateInput<T>(schema: z.ZodSchema<T>, input: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const data = schema.parse(input);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}

export function safeParse<T>(schema: z.ZodSchema<T>, input: unknown): T | null {
  try {
    return schema.parse(input);
  } catch {
    return null;
  }
}

// CSRF protection
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length > 0;
}
