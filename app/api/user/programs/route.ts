import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/lib/models/Program';
import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get('folderId');
  const targetUserId = searchParams.get('userId');
  const isAdmin = (session.user as any).role === 'admin';

  try {
    await connectDB();
    
    // Determine effective userId (admins can impersonate/view others)
    const effectiveUserId = (isAdmin && targetUserId) ? targetUserId : userId;
    
    const query: any = { ownerId: effectiveUserId };
    if (folderId) query.folderId = folderId;
    
    const programs = await Program.find(query).sort({ order: 1, updatedAt: -1 }).lean();
    return NextResponse.json(programs);
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
    const count = await Program.countDocuments({ ownerId: userId, folderId: body.folderId || null });
    const program = await Program.create({
      ...body,
      ownerId: userId,
      isPublic: false,
      order: count,
      updatedAt: new Date(),
    });
    return NextResponse.json(program, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
