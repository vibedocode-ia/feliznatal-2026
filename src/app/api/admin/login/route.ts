import { NextRequest, NextResponse } from 'next/server';
import { validateAdminPassword, createSessionToken, setSessionCookie } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return errorResponse('VALIDATION_ERROR', 'A senha mestra é obrigatória', 400);
    }

    if (!validateAdminPassword(password)) {
      return errorResponse('UNAUTHORIZED', 'Senha mestra incorreta', 401);
    }

    const token = await createSessionToken();
    const response = successResponse({ message: 'Autenticado com sucesso', redirect: '/admin' });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('[POST /api/admin/login] Erro:', error);
    return errorResponse('INTERNAL_ERROR', 'Falha ao processar autenticação', 500);
  }
}
