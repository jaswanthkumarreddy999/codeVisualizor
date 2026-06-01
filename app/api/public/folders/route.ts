import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Folder } from '@/lib/models/Folder';
import { auth } from '@/lib/auth';

// GET — list all public folders (anyone)
export async function GET() {
  try {
    await connectDB();
    const folders = await Folder.find({ isPublic: true }).sort({ order: 1 }).lean();
    return NextResponse.json(folders);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST — create public folder (admin only)
export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    await connectDB();
    const body = await req.json();
    const folder = await Folder.create({ ...body, isPublic: true, ownerId: null });
    return NextResponse.json(folder, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
