import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Folder } from '@/lib/models/Folder';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  try {
    await connectDB();
    const folders = await Folder.find({ ownerId: userId }).sort({ order: 1 }).lean();
    return NextResponse.json(folders);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  try {
    await connectDB();
    const body = await req.json();
    const count = await Folder.countDocuments({ ownerId: userId });
    const folder = await Folder.create({ ...body, ownerId: userId, isPublic: false, order: count });
    return NextResponse.json(folder, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
