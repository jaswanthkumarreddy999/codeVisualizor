import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();

    const state = mongoose.connection.readyState;
    const stateMap: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    return NextResponse.json({
      status: 'ok',
      db: stateMap[state] || 'unknown',
      dbName: mongoose.connection.db?.databaseName || null,
      timestamp: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        status: 'error',
        db: 'failed',
        error: e.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
