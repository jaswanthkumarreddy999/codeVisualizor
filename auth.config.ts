import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: 'admin-credentials',
      name: 'Admin Account',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
          return {
            id: 'admin-id-001',
            email: process.env.ADMIN_EMAIL,
            name: 'System Admin',
            role: 'admin' as const,
            isProfileComplete: true,
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    // Basic JWT callback that don't use DB
    // This allows middleware to see the session without Mongoose
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.isProfileComplete = (user as any).isProfileComplete ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).isProfileComplete = token.isProfileComplete;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
