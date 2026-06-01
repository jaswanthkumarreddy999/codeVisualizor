import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/lib/models/Program';
import { auth } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const programs = await Program.find({ folderId: id, isPublic: true }).sort({ order: 1 }).lean();
    return NextResponse.json(programs);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    await connectDB();
    const body = await req.json();
    const count = await Program.countDocuments({ folderId: id, isPublic: true });
    const program = await Program.create({ ...body, folderId: id, isPublic: true, ownerId: null, order: count });
    return NextResponse.json(program, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
