import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Admin users fetch error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
