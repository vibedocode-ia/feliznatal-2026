import { NextResponse } from 'next/server';
import { getCurrentBatch, CAMPAIGN_BATCHES } from '@/lib/batches';
import { successResponse } from '@/lib/response';

export const dynamic = 'force-dynamic';

export async function GET() {
  const currentBatch = getCurrentBatch();
  return successResponse({
    currentBatch,
    allBatches: CAMPAIGN_BATCHES,
    serverTime: new Date().toISOString(),
  });
}
