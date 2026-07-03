import { NextResponse } from 'next/server';
import { rebuildIndex } from '@/lib/rag/indexer';

export async function POST() {
  try {
    const workspaceRoot = process.cwd();
    const result = await rebuildIndex(workspaceRoot);
    return NextResponse.json({
      success: true,
      message: 'Index successfully rebuilt',
      ...result
    });
  } catch (error: any) {
    console.error('Indexing failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred during indexing'
    }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
