import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/lib/models/Program';
import { auth } from '@/lib/auth';

// Fork a public program into the user's personal workspace
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  try {
    await connectDB();
    const { programId, code, folderId } = await req.json();

    // Find the original public program
    const original = await Program.findOne({ _id: programId, isPublic: true }).lean();
    if (!original) return NextResponse.json({ error: 'Program not found' }, { status: 404 });

    const count = await Program.countDocuments({ ownerId: userId });
    const forked = await Program.create({
      title: `${original.title} (Fork)`,
      code: code || original.code, // use the user's edited code if provided
      language: original.language,
      folderId: folderId || null,
      isPublic: false,
      ownerId: userId,
      visualizedVariables: original.visualizedVariables,
      ignoredPointers: original.ignoredPointers,
      visualizerPositions: original.visualizerPositions,
      order: count,
    });
    return NextResponse.json(forked, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
