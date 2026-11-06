'use client';

import React from 'react';
import { CheckCircle2, Clock, Film, Send } from 'lucide-react';

interface OrderStatusTimelineProps {
  status: string; // 'aguardando_confirmacao' | 'em_producao' | 'concluido' | 'cancelado'
}

export function OrderStatusTimeline({ status }: OrderStatusTimelineProps) {
  const steps = [
    {
      id: 'aguardando_confirmacao',
      title: 'Pedido Recebido',
      desc: 'Aguardando envio do comprovante Pix',
      icon: Clock,
    },
    {
      id: 'em_producao',
      title: 'Pagamento Confirmado',
      desc: 'Roteiro e prompt prontos para o Veo 3',
      icon: CheckCircle2,
    },
    {
      id: 'produzindo',
      title: 'Em Produção',
      desc: 'Renderização do vídeo cinematográfico',
      icon: Film,
    },
    {
      id: 'concluido',
      title: 'Vídeo Entregue',
      desc: 'Enviado em alta resolução no WhatsApp',
      icon: Send,
    },
  ];

  const getStepState = (index: number) => {
    if (status === 'concluido') return 'completed';
    if (status === 'em_producao') {
      if (index <= 2) return index === 2 ? 'current' : 'completed';
      return 'upcoming';
    }
    // aguardando_confirmacao
    if (index === 0) return 'current';
    return 'upcoming';
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
      <h3 className="text-lg font-bold text-white mb-6">Status da Produção</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const state = getStepState(idx);
          const Icon = step.icon;

          return (
            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                  state === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500'
                    : state === 'current'
                    ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-500 animate-pulse'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-white text-sm block mb-1">{step.title}</span>
              <span className="text-[11px] text-slate-400">{step.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
