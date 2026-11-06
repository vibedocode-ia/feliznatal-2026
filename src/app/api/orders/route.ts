import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { campaigns, orders } from '@/db/schema';
import { getCurrentBatch } from '@/lib/batches';
import { generateSantaScriptAndVeo3Prompt } from '@/lib/ai';
import { sendWhatsAppOrderNotification } from '@/lib/notifications';
import { successResponse, errorResponse } from '@/lib/response';
import { eq } from 'drizzle-orm';

const orderSchema = z.object({
  parentName: z.string().min(2, 'O nome do responsável é obrigatório'),
  parentWhatsapp: z.string().min(10, 'WhatsApp deve conter DDD e número'),
  childName: z.string().min(2, 'O nome da criança é obrigatório'),
  childNickname: z.string().optional(),
  childAge: z.number().int().min(1).max(18),
  style: z.enum(['emocionante', 'brincalhao', 'classico']).default('emocionante'),
  dreamGift: z.string().min(2, 'O presente dos sonhos é obrigatório'),
  achievement: z.string().min(2, 'A conquista do ano é obrigatória'),
  familySignature: z.string().optional(),
  customNotes: z.string().optional(),
  campaignId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        'VALIDATION_ERROR',
        validation.error.errors[0]?.message || 'Dados inválidos no formulário',
        400,
        validation.error.errors
      );
    }

    const data = validation.data;
    const currentBatch = getCurrentBatch();

    // 1. Garante que uma campanha ativa exista no banco
    let targetCampaignId = data.campaignId;
    if (!targetCampaignId) {
      const existingCampaign = await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.slug, 'feliz-natal-2026'))
        .limit(1);

      if (existingCampaign.length > 0) {
        targetCampaignId = existingCampaign[0].id;
      } else {
        const [newCampaign] = await db
          .insert(campaigns)
          .values({
            slug: 'feliz-natal-2026',
            title: 'Campanha Oficial de Natal 2026',
            character_name: 'Papai Noel',
            active: true,
          })
          .returning({ id: campaigns.id });
        targetCampaignId = newCampaign.id;
      }
    }

    // 2. Geração do Roteiro e do Prompt Veo 3 com IA
    const aiContent = await generateSantaScriptAndVeo3Prompt({
      childName: data.childName,
      childNickname: data.childNickname,
      childAge: data.childAge,
      style: data.style,
      dreamGift: data.dreamGift,
      achievement: data.achievement,
      familySignature: data.familySignature,
      customNotes: data.customNotes,
    });

    // 3. Persistência do Pedido no PostgreSQL com preço validado no Fat Server
    const [insertedOrder] = await db
      .insert(orders)
      .values({
        campaign_id: targetCampaignId,
        parent_name: data.parentName,
        parent_whatsapp: data.parentWhatsapp,
        child_name: data.childName,
        child_nickname: data.childNickname || null,
        child_age: data.childAge,
        style: data.style,
        dream_gift: data.dreamGift,
        achievement: data.achievement,
        family_signature: data.familySignature || null,
        custom_notes: data.customNotes || null,
        price_paid: currentBatch.price, // Preço fixado no servidor
        batch_tier: currentBatch.tier,
        generated_script: aiContent.script,
        veo3_prompt: aiContent.veo3Prompt,
        status: 'aguardando_confirmacao',
      })
      .returning();

    // 4. Disparo da notificação para WhatsApp / SofIA (Não bloqueia o usuário)
    sendWhatsAppOrderNotification({
      orderId: insertedOrder.id,
      childName: insertedOrder.child_name,
      childAge: insertedOrder.child_age,
      parentName: insertedOrder.parent_name,
      parentWhatsapp: insertedOrder.parent_whatsapp,
      batchTier: insertedOrder.batch_tier,
      pricePaid: insertedOrder.price_paid,
      veo3Prompt: insertedOrder.veo3_prompt || '',
      generatedScript: insertedOrder.generated_script || '',
    }).catch((err) => console.warn('[Notification Error]', err));

    return successResponse(
      {
        id: insertedOrder.id,
        message: 'Pedido registrado com sucesso',
      },
      201
    );
  } catch (error) {
    console.error('[POST /api/orders] Erro inesperado:', error);
    return errorResponse('INTERNAL_ERROR', 'Falha ao processar e salvar pedido', 500);
  }
}
