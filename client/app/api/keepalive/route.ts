import { NextResponse } from 'next/server';

// This endpoint is called by Render's cron job every 10 minutes
// to keep the Spring Boot backend awake (prevents free tier sleep)
export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://codevisualizor-api-v2.onrender.com';
    const res = await fetch(`${backendUrl}/api/public/folders`, {
      method: 'GET',
      signal: AbortSignal.timeout(30000),
    });
    return NextResponse.json({ 
      status: 'ok', 
      backend: res.ok ? 'awake' : 'error',
      timestamp: new Date().toISOString() 
    });
  } catch (e: any) {
    return NextResponse.json({ status: 'error', message: e.message }, { status: 500 });
  }
}
