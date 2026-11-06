import { NextRequest } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';
import { generateSantaScriptAndVeo3Prompt } from '@/lib/ai';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthed = await isAuthenticated();
    if (!isAuthed) {
      return errorResponse('UNAUTHORIZED', 'Acesso restrito ao GodAdmin', 401);
    }

    const { id } = params;
    const [existingOrder] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);

    if (!existingOrder) {
      return errorResponse('NOT_FOUND', 'Pedido não encontrado', 404);
    }

    const newAiContent = await generateSantaScriptAndVeo3Prompt({
      childName: existingOrder.child_name,
      childNickname: existingOrder.child_nickname || undefined,
      childAge: existingOrder.child_age,
      style: existingOrder.style,
      dreamGift: existingOrder.dream_gift,
      achievement: existingOrder.achievement,
      familySignature: existingOrder.family_signature || undefined,
      customNotes: existingOrder.custom_notes || undefined,
    });

    const [updatedOrder] = await db
      .update(orders)
      .set({
        generated_script: newAiContent.script,
        veo3_prompt: newAiContent.veo3Prompt,
        updated_at: new Date(),
      })
      .where(eq(orders.id, id))
      .returning();

    return successResponse({ order: updatedOrder });
  } catch (error) {
    console.error('[POST /api/orders/[id]/regenerate-prompt] Erro:', error);
    return errorResponse('INTERNAL_ERROR', 'Falha ao regenerar prompt com IA', 500);
  }
}
