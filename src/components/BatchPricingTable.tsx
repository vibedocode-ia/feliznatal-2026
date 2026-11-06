'use client';

import React from 'react';
import { Check, Sparkles, AlertCircle } from 'lucide-react';
import { CAMPAIGN_BATCHES, BatchConfig, formatCurrencyBRL } from '@/lib/batches';

interface BatchPricingTableProps {
  currentTier: number;
  onSelectBatch?: (tier: number) => void;
}

export function BatchPricingTable({ currentTier, onSelectBatch }: BatchPricingTableProps) {
  const scrollToForm = (tier: number) => {
    if (onSelectBatch) onSelectBatch(tier);
    const element = document.getElementById('pedido-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-christmas-lightgold uppercase tracking-wider bg-christmas-gold/10 px-3 py-1 rounded-full border border-christmas-gold/30">
            Escassez Programada & Lotes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            Tabela Progressiva de Lotes de Natal
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Como cada vídeo personalizado exige renderização em IA de alta potência (Google Veo 3) e supervisão humana, as vagas são limitadas por período. Quanto antes você pedir, maior o desconto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPAIGN_BATCHES.map((batch) => {
            const isCurrent = batch.tier === currentTier;
            const isPast = batch.tier < currentTier;

            return (
              <div
                key={batch.tier}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-slate-900 to-red-950/60 border-2 border-christmas-gold shadow-2xl shadow-red-950/60 ring-2 ring-christmas-gold/20 scale-105 z-20'
                    : isPast
                    ? 'bg-slate-950/40 border border-slate-800 opacity-60'
                    : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-christmas-gold to-yellow-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Lote Vigente</span>
                  </div>
                )}

                {isPast && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold text-xs uppercase">
                    Esgotado
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Lote 0{batch.tier}
                    </span>
                    {batch.discountPercent > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                        -{batch.discountPercent}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{batch.label}</h3>

                  <div className="mb-4">
                    <span className="text-xs text-slate-400 line-through block">
                      De {formatCurrencyBRL(batch.originalPrice)}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">
                        {formatCurrencyBRL(batch.price)}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 mb-6">
                    <span className="block font-semibold text-christmas-lightgold mb-1">
                      {batch.urgencyBadge}
                    </span>
                    <span className="text-slate-400 block text-[11px]">
                      Vigência: {new Date(batch.startDate).toLocaleDateString('pt-BR')} até{' '}
                      {new Date(batch.endDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Roteiro personalizado pelo Papai Noel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Vídeo cinematográfico via Google Veo 3</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Envio direto no WhatsApp em MP4</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => scrollToForm(batch.tier)}
                  disabled={isPast}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-christmas-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-950/40'
                      : isPast
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isCurrent ? 'Garantir Esse Desconto' : isPast ? 'Lote Encerrado' : 'Aguardar Abertura'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
