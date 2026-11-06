'use client';

import React, { useState } from 'react';
import { Copy, Check, QrCode, AlertCircle } from 'lucide-react';
import { formatCurrencyBRL } from '@/lib/batches';

interface PixManualPaymentBoxProps {
  amountCentavos: number;
  pixKey?: string;
  pixBeneficiary?: string;
}

export function PixManualPaymentBox({
  amountCentavos,
  pixKey = process.env.NEXT_PUBLIC_PIX_KEY || 'pix@feliznatal.com.br',
  pixBeneficiary = process.env.NEXT_PUBLIC_PIX_BENEFICIARY || 'Vanderson Oliveira',
}: PixManualPaymentBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-christmas-gold/40 p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <QrCode className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Pagamento via Pix Manual</h3>
          <p className="text-xs text-slate-400">Transfira o valor exato para liberação imediata</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block">Valor a Pagar:</span>
          <span className="text-3xl font-black text-white">{formatCurrencyBRL(amountCentavos)}</span>
        </div>
        <div className="text-right sm:text-right">
          <span className="text-xs text-slate-400 block">Beneficiário:</span>
          <span className="text-sm font-semibold text-christmas-lightgold">{pixBeneficiary}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Chave Pix (Copia e Cola):
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={pixKey}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm font-mono focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-christmas-gold hover:bg-yellow-400 text-slate-950'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Chave</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Importante:</strong> Após realizar o Pix no aplicativo do seu banco, clique no botão verde abaixo para enviar o comprovante via WhatsApp. Nossa equipe confirmará o pagamento e colocará seu vídeo na esteira de produção!
        </p>
      </div>
    </div>
  );
}
