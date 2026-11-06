import { NextRequest } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthed = await isAuthenticated();
    if (!isAuthed) {
      return errorResponse('UNAUTHORIZED', 'Acesso restrito ao GodAdmin', 401);
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['aguardando_confirmacao', 'em_producao', 'concluido', 'cancelado'];
    if (!status || !validStatuses.includes(status)) {
      return errorResponse('VALIDATION_ERROR', 'Status inválido informado', 400);
    }

    const [updatedOrder] = await db
      .update(orders)
      .set({
        status,
        updated_at: new Date(),
      })
      .where(eq(orders.id, id))
      .returning();

    if (!updatedOrder) {
      return errorResponse('NOT_FOUND', 'Pedido não encontrado', 404);
    }

    return successResponse({ order: updatedOrder });
  } catch (error) {
    console.error('[PATCH /api/orders/[id]/status] Erro:', error);
    return errorResponse('INTERNAL_ERROR', 'Falha ao atualizar status', 500);
  }
}
