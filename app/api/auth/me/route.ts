import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json(null);
  return NextResponse.json({
    id: (session.user as any).id,
    name: session.user?.name,
    email: session.user?.email,
    avatar: session.user?.image,
    role: (session.user as any).role || 'user',
    isProfileComplete: (session.user as any).isProfileComplete,
  });
}
