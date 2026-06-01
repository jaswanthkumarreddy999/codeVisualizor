import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return new NextResponse('Unauthorized', { status: 401 });

  const data = await req.json();

  try {
    await connectDB();
    await User.updateOne(
      { email: session.user.email },
      {
        name: data.name,
        age: parseInt(data.age),
        institution: data.institution,
        major: data.major,
        bio: data.bio,
        isProfileComplete: true,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
