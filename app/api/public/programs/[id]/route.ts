import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/lib/models/Program';
import { auth } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const program = await Program.findOne({ _id: id, isPublic: true }).lean();
    if (!program) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(program);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    await connectDB();
    const body = await req.json();
    const program = await Program.findOneAndUpdate(
      { _id: id, isPublic: true },
      { ...body, updatedAt: new Date() },
      { new: true }
    );
    if (!program) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(program);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    await connectDB();
    await Program.deleteOne({ _id: id, isPublic: true });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
