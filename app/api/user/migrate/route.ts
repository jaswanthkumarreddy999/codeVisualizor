import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/lib/models/Program';
import { Folder } from '@/lib/models/Folder';
import { auth } from '@/lib/auth';

// Migrate localStorage projects/folders to MongoDB
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;

  try {
    await connectDB();
    const { projects, folders } = await req.json();

    // Map old localStorage folder IDs to new MongoDB IDs
    const folderIdMap: Record<string, string> = {};

    // Insert folders (skip default NeetCode folders — they're already public)
    const defaultFolderIds = new Set([
      'basics','arrays','two-pointers','sliding-window','stack','binary-search',
      'linked-list','trees','tries','heap','backtracking','graphs','advanced-graphs',
      '1d-dp','2d-dp','greedy','intervals','math','bit-manipulation'
    ]);

    for (const f of (folders || [])) {
      if (defaultFolderIds.has(f.id)) continue; // skip default folders
      const created = await Folder.create({
        name: f.name,
        icon: f.icon || 'Folder',
        color: f.color || '#10b981',
        description: f.description || '',
        isPublic: false,
        ownerId: userId,
        order: f.order || 0,
      });
      folderIdMap[f.id] = created._id.toString();
    }

    // Insert programs (skip NeetCode seeded programs)
    let imported = 0;
    for (const p of (projects || [])) {
      if (p.id?.startsWith('nc150-')) continue; // skip seeded programs
      const newFolderId = p.folderId ? (folderIdMap[p.folderId] || null) : null;
      await Program.create({
        title: p.name,
        code: p.code || '',
        language: p.language || 'java',
        folderId: newFolderId,
        isPublic: false,
        ownerId: userId,
        visualizedVariables: p.visualizedVariables || [],
        ignoredPointers: p.ignoredPointers || {},
        visualizerPositions: p.positions || p.visualizerPositions || {},
        order: 0,
        updatedAt: new Date(p.updatedAt || p.lastModified || Date.now()),
      });
      imported++;
    }

    return NextResponse.json({ success: true, imported, folderIdMap });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
