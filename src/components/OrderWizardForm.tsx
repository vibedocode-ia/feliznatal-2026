'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Send, Gift, Trophy, Heart, MessageSquare, AlertCircle } from 'lucide-react';
import { BatchConfig, formatCurrencyBRL } from '@/lib/batches';

interface OrderWizardFormProps {
  currentBatch: BatchConfig;
  campaignId?: string;
}

export function OrderWizardForm({ currentBatch, campaignId }: OrderWizardFormProps) {
  const router = useRouter();

  const [parentName, setParentName] = useState('');
  const [parentWhatsapp, setParentWhatsapp] = useState('');
  const [childName, setChildName] = useState('');
  const [childNickname, setChildNickname] = useState('');
  const [childAge, setChildAge] = useState('5');
  const [style, setStyle] = useState('emocionante');
  const [dreamGift, setDreamGift] = useState('');
  const [achievement, setAchievement] = useState('');
  const [familySignature, setFamilySignature] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Máscara amigável de WhatsApp
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setParentWhatsapp(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validação de UX no cliente
    if (!parentName.trim() || !parentWhatsapp.trim() || !childName.trim() || !dreamGift.trim() || !achievement.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios marcados com *.');
      return;
    }

    const cleanPhone = parentWhatsapp.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          parentWhatsapp: cleanPhone,
          childName,
          childNickname: childNickname || childName.split(' ')[0],
          childAge: parseInt(childAge, 10),
          style,
          dreamGift,
          achievement,
          familySignature: familySignature || 'Com muito amor da sua família',
          customNotes,
          campaignId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || 'Falha ao processar pedido. Tente novamente.');
      }

      // Redireciona para a página de confirmação do pedido
      router.push(`/pedido/${data.data.id}`);
    } catch (err: unknown) {
      console.error('Erro ao submeter pedido:', err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Ocorreu um erro inesperado ao salvar o pedido. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pedido-section" className="py-16 md:py-24 relative max-w-4xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-slate-900 border-2 border-christmas-gold/40 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Detalhe de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-christmas-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-christmas-red/20 border border-christmas-red/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-christmas-gold" />
            <span>Formulário Oficial de Natal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Personalize a Mensagem do Papai Noel
          </h2>
          <p className="text-slate-300 text-sm">
            Preencha os detalhes abaixo com carinho. A nossa IA utilizará cada informação para compor um roteiro emocionante e ultra-personalizado.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Dados do Responsável */}
          <div>
            <h3 className="text-lg font-bold text-christmas-lightgold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>1. Seus Dados (Responsável)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Ex: Mariana Silva"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Seu WhatsApp (onde receberá o vídeo) *
                </label>
                <input
                  type="tel"
                  required
                  value={parentWhatsapp}
                  onChange={handleWhatsappChange}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                />
              </div>
            </div>
          </div>

          {/* 2. Dados da Criança */}
          <div>
            <h3 className="text-lg font-bold text-christmas-lightgold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>2. Sobre a Criança</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome da Criança *
                </label>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Ex: Bernardo da Silva"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Idade *
                </label>
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-christmas-gold text-sm"
                >
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((age) => (
                    <option key={age} value={age}>
                      {age} {age === 1 ? 'ano' : 'anos'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Apelido Carinhoso (como o Papai Noel deve chamar)
                </label>
                <input
                  type="text"
                  value={childNickname}
                  onChange={(e) => setChildNickname(e.target.value)}
                  placeholder="Ex: Bê, Campeão, Princesa, Lolo"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                />
              </div>
            </div>
          </div>

          {/* 3. Personalização da Narrativa */}
          <div>
            <h3 className="text-lg font-bold text-christmas-lightgold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Trophy className="w-4 h-4 text-christmas-gold" />
              <span>3. Detalhes Mágicos do Roteiro</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Estilo da Mensagem do Papai Noel *
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-christmas-gold text-sm"
                >
                  <option value="emocionante">Emocionante & Conquistas (Reconhece o crescimento e esforços)</option>
                  <option value="brincalhao">Brincalhão & Travessuras no Polo Norte (Divertido com duendes e renas)</option>
                  <option value="classico">Clássico & Acolhedor (Lareira e o Livro das Boas Ações)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-red-400" />
                  <span>Presente dos Sonhos (ou o que a criança pediu de Natal) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={dreamGift}
                  onChange={(e) => setDreamGift(e.target.value)}
                  placeholder="Ex: Uma bicicleta vermelha, Patinete, Boneca da Frozen, Lego de dinossauro"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Maior Conquista do Ano (para o Papai Noel parabenizar) *</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  placeholder="Ex: Aprendeu a ler e escrever, começou a dormir no próprio quarto sem medo, foi muito carinhoso com os avós..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Assinatura da Família no Vídeo
                  </label>
                  <input
                    type="text"
                    value={familySignature}
                    onChange={(e) => setFamilySignature(e.target.value)}
                    placeholder="Ex: Com amor, Mamãe, Papai e Vovó"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Observação Secreta para o Papai Noel (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Ex: O cachorrinho da família se chama Pipoca"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-christmas-gold text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido & Lote Ativo */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-christmas-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-christmas-lightgold block">
                {currentBatch.name}
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Desconto promocional aplicado automaticamente.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">
                {formatCurrencyBRL(currentBatch.originalPrice)}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrencyBRL(currentBatch.price)}
              </span>
            </div>
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-christmas-red via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-extrabold text-lg rounded-xl shadow-xl shadow-red-950/60 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Enviando e Gerando Roteiro...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Garantir Vídeo de Natal por {formatCurrencyBRL(currentBatch.price)}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
