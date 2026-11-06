import { formatCurrencyBRL } from './batches';

export interface OrderNotificationPayload {
  orderId: string;
  childName: string;
  childAge: number;
  parentName: string;
  parentWhatsapp: string;
  batchTier: number;
  pricePaid: number;
  veo3Prompt: string;
  generatedScript?: string;
}

export async function sendWhatsAppOrderNotification(
  payload: OrderNotificationPayload
): Promise<boolean> {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER || '5511999999999';

  const formattedPrice = formatCurrencyBRL(payload.pricePaid);
  const textMessage = `🎅 *NOVO PEDIDO RECEBIDO — FELIZ NATAL 2026* 🎄\n\n` +
    `• *Pedido:* #${payload.orderId.slice(0, 8)}\n` +
    `• *Criança:* ${payload.childName} (${payload.childAge} anos)\n` +
    `• *Responsável:* ${payload.parentName} (${payload.parentWhatsapp})\n` +
    `• *Lote Contratado:* Lote 0${payload.batchTier} — ${formattedPrice}\n\n` +
    `🎬 *PROMPT TÉCNICO VEO 3 (Pronto para copiar):*\n` +
    `\`\`\`\n${payload.veo3Prompt}\n\`\`\`\n\n` +
    `Acesse o painel para gerenciar: /admin`;

  // Se não houver webhook configurado ou se for valor placeholder, apenas logamos
  if (!webhookUrl || webhookUrl.includes('localhost') || webhookUrl.includes('100.87.66.97:3000')) {
    console.log('[Notification] Webhook não configurado para envio real. Log da notificação:\n', textMessage);
    return true;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: adminNumber,
        message: textMessage,
        orderId: payload.orderId,
      }),
    });

    if (!res.ok) {
      console.warn(`[Notification] Webhook retornou status ${res.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('[Notification] Falha ao disparar webhook de mensageria:', error);
    return false;
  }
}
