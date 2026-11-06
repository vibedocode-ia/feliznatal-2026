'use client';

import React from 'react';
import { Sparkles, Play, ArrowDown, ShieldCheck, Heart } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const scrollToForm = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const element = document.getElementById('pedido-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Luz ambiente natalina */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-christmas-red/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[350px] h-[250px] bg-christmas-gold/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-christmas-red/20 border border-christmas-gold/40 text-christmas-lightgold text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-christmas-gold animate-pulse" />
            <span>Exclusivo Natal 2026 • Inteligência Cinematográfica Veo 3</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            O Papai Noel Tem Uma Mensagem{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-christmas-gold via-amber-200 to-yellow-400">
              Mágica e Inesquecível
            </span>{' '}
            Para o Seu Filho
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Surpreenda a sua criança com um vídeo ultra-realista onde o bom velhinho a chama pelo apelido,
            comemora as suas maiores conquistas do ano e fala diretamente do Polo Norte sobre o presente dos sonhos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-christmas-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-900/40 hover:shadow-red-800/60 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Garantir Meu Vídeo de Natal</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="#amostras"
              className="w-full sm:w-auto px-6 py-4 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 font-semibold text-base rounded-xl border border-slate-700/60 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-christmas-gold" />
              <span>Ver Amostras em Vídeo</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vídeo em Alta Resolução (HD/MP4)</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Entrega Direta no WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-christmas-gold" />
              <span>Roteiro 100% Personalizado</span>
            </div>
          </div>
        </div>

        {/* Player Mockup / Moldura Mágica do Vídeo */}
        <div id="amostras" className="max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-christmas-gold/40 shadow-2xl shadow-black/80 bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800 group">
            <img
              src="https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80"
              alt="Papai Noel falando no Polo Norte"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-christmas-red/90 text-white flex items-center justify-center shadow-2xl shadow-red-950 border-2 border-christmas-gold/60 mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
              <p className="text-white font-bold text-lg sm:text-xl drop-shadow-md">
                "Ho! Ho! Ho! Lucas, soube que você foi muito corajoso ao aprender a nadar este ano!"
              </p>
              <span className="text-xs sm:text-sm text-christmas-lightgold mt-2 font-medium">
                Clique para ver a magia de um vídeo exemplo gerado via Veo 3
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
