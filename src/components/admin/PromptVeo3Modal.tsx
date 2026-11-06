'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, RefreshCw, Film, MessageSquare } from 'lucide-react';
import type { Order } from '@/db/schema';

interface PromptVeo3ModalProps {
  order: Order | null;
  onClose: () => void;
  onRegeneratePrompt?: (orderId: string) => Promise<void>;
}

export function PromptVeo3Modal({ order, onClose, onRegeneratePrompt }: PromptVeo3ModalProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  if (!order) return null;

  const handleCopyPrompt = () => {
    if (order.veo3_prompt) {
      navigator.clipboard.writeText(order.veo3_prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 3000);
    }
  };

  const handleCopyScript = () => {
    if (order.generated_script) {
      navigator.clipboard.writeText(order.generated_script);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 3000);
    }
  };

  const handleRegenerate = async () => {
    if (onRegeneratePrompt) {
      setRegenerating(true);
      try {
        await onRegeneratePrompt(order.id);
      } finally {
        setRegenerating(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 max-w-3xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-christmas-gold/20 text-christmas-gold border border-christmas-gold/40 flex items-center justify-center">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Pedido de {order.child_name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                #{order.id.slice(0, 8)}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Responsável: {order.parent_name} • WhatsApp: {order.parent_whatsapp}
            </p>
          </div>
        </div>

        {/* Ficha da Criança */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-6">
          <div>
            <span className="text-slate-400 block">Idade:</span>
            <span className="text-white font-semibold">{order.child_age} anos</span>
          </div>
          <div>
            <span className="text-slate-400 block">Apelido:</span>
            <span className="text-white font-semibold">{order.child_nickname || 'Nenhum'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Estilo:</span>
            <span className="text-christmas-lightgold font-semibold uppercase">{order.style}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Presente:</span>
            <span className="text-white font-semibold truncate block" title={order.dream_gift}>
              {order.dream_gift}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-4 border-t border-slate-900 pt-2">
            <span className="text-slate-400 block">Conquista do Ano:</span>
            <span className="text-slate-200">{order.achievement}</span>
          </div>
        </div>

        {/* Prompt Veo 3 em destaque */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-christmas-lightgold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-christmas-gold" />
                <span>Prompt Técnico Veo 3 (Cinematographic English)</span>
              </label>
              <div className="flex items-center gap-2">
                {onRegeneratePrompt && (
                  <button
                    onClick={handleRegenerate}
                    disabled={regenerating}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${regenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerar com IA</span>
                  </button>
                )}
                <button
                  onClick={handleCopyPrompt}
                  className={`px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                    copiedPrompt
                      ? 'bg-emerald-600 text-white'
                      : 'bg-christmas-gold hover:bg-yellow-400 text-slate-950 shadow-md'
                  }`}
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Prompt Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt Veo 3</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              rows={5}
              value={order.veo3_prompt || 'Prompt em processamento ou aguardando geração...'}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none"
            />
          </div>

          {/* Roteiro Falado em Português */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-rose-400" />
                <span>Roteiro Emotivo do Papai Noel (Português)</span>
              </label>
              <button
                onClick={handleCopyScript}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar Roteiro</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={4}
              value={order.generated_script || 'Roteiro em processamento...'}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
