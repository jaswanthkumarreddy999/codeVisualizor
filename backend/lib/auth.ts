import NextAuth from 'next-auth';
import { connectDB } from './mongodb';
import { User } from './models/User';
import { authConfig } from '@/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  debug: true,
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'admin-credentials') return true;
      if (account?.provider === 'google') {
        try {
          await connectDB();
          const existing = await User.findOne({ googleId: account.providerAccountId });
          if (existing) {
            await User.updateOne({ _id: existing._id }, { lastLoginAt: new Date() });
          } else {
            await User.create({
              googleId: account.providerAccountId,
              email: user.email!,
              name: user.name!,
              avatar: user.image || '',
              role: 'user',
              isProfileComplete: false,
            });
          }
          return true;
        } catch (e) {
          console.error('signIn error:', e);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, account, user, trigger, session }) {
      // 1. Handle initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.isProfileComplete = (user as any).isProfileComplete ?? false;
      }

      // Store googleId in token for future DB lookups if it's a google account
      if (account?.provider === 'google' && account.providerAccountId) {
        token.googleId = account.providerAccountId;
      }

      // 2. Handle session updates (e.g. from the client after onboarding)
      if (trigger === 'update' && session?.isProfileComplete !== undefined) {
        token.isProfileComplete = session.isProfileComplete;
      }

      // 3. Add DB-dependent logic (Only in Node runtime, not Edge)
      const isEdge = process.env.NEXT_RUNTIME === 'edge';
      
      if (!isEdge && (trigger === 'update' || (account?.provider === 'google' && account.providerAccountId))) {
        const googleId = (token as any).googleId;
        if (googleId) {
          try {
            await connectDB();
            const dbUser = await User.findOne({ googleId });
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.role = dbUser.role;
              token.isProfileComplete = dbUser.isProfileComplete;
            }
          } catch (e) {
            console.error('JWT DB error:', e);
          }
        }
      }
      return token;
    },
  },
});
