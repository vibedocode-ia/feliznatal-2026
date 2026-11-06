import { NextRequest } from 'next/server';
import { removeSessionCookie } from '@/lib/auth';
import { successResponse } from '@/lib/response';

export async function POST(request: NextRequest) {
  const response = successResponse({ message: 'Sessão encerrada' });
  removeSessionCookie(response);
  return response;
}
