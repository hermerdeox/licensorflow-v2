'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  
  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send reset email');
      }
      
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      console.error('[ForgotPassword] Error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 pt-16">
        <div className="w-full max-w-md space-y-8 p-8 text-center bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div>
            <h2 className="text-3xl font-bold text-white">Check Your Email</h2>
            <p className="mt-4 text-gray-400">
              We've sent a password reset link to your email address.
              Please check your inbox and follow the instructions.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="inline-block text-blue-400 hover:text-blue-300 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 pt-16">
      <div className="w-full max-w-md space-y-8 p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Forgot Password?</h2>
          <p className="mt-2 text-gray-400">
            Enter your email and we'll send you a reset link
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 placeholder-gray-400"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
