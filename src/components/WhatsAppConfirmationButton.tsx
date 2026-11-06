'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { formatCurrencyBRL } from '@/lib/batches';

interface WhatsAppConfirmationButtonProps {
  orderId: string;
  childName: string;
  pricePaidCentavos: number;
  adminWhatsapp?: string;
}

export function WhatsAppConfirmationButton({
  orderId,
  childName,
  pricePaidCentavos,
  adminWhatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '5511999999999',
}: WhatsAppConfirmationButtonProps) {
  const cleanPhone = adminWhatsapp.replace(/\D/g, '');
  const message = `Olá! Acabei de fazer o pedido #${orderId.slice(0, 8)} do vídeo de Natal para *${childName}* no valor de *${formatCurrencyBRL(
    pricePaidCentavos
  )}*. Segue o meu comprovante de pagamento via Pix! 🎅🎄`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-center"
    >
      <MessageSquare className="w-6 h-6 fill-white" />
      <span>Confirmar Pagamento e Enviar Comprovante no WhatsApp</span>
    </a>
  );
}
