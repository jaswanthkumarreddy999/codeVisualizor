import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Folder } from '@/lib/models/Folder';
import { Program } from '@/lib/models/Program';
import { auth } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  try {
    await connectDB();
    const body = await req.json();
    const folder = await Folder.findOneAndUpdate({ _id: id, ownerId: userId }, body, { new: true });
    if (!folder) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(folder);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  try {
    await connectDB();
    await Folder.deleteOne({ _id: id, ownerId: userId });
    await Program.updateMany({ folderId: id, ownerId: userId }, { folderId: null });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
