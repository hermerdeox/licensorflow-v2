import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface User {
    role: string;
    emailVerified: Date | null;
  }
  
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      role: string;
      emailVerified: Date | null;
    };
  }
}

declare module 'next-auth' {
  interface JWT {
    id: string;
    role: string;
    emailVerified: Date | null;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
