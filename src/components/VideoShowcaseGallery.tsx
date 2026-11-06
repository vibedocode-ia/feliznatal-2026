'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Smile, Star, Heart } from 'lucide-react';

export function VideoShowcaseGallery() {
  const [activeTab, setActiveTab] = useState<'emocionante' | 'brincalhao' | 'classico'>('emocionante');

  const samples = {
    emocionante: {
      title: 'Emocionante & Conquistas',
      description: 'Ideal para celebrar o esforço da criança: quem começou na escola, aprendeu a andar de bicicleta ou foi um irmãozinho dedicado.',
      image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=800&q=80',
      quote: '"Clara, o Papai Noel viu como você se esforçou nos estudos e ajudou a mamãe com o Theo. Estou muito orgulhoso de você!"',
      badge: 'Mais Escolhido pelos Pais',
    },
    brincalhao: {
      title: 'Brincalhão & Travessuras do Polo Norte',
      description: 'Um vídeo cheio de energia e gargalhadas, onde os duendes quase derrubam os brinquedos e as renas aprontam.',
      image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=800&q=80',
      quote: '"Ho! Ho! Ho! Lorenzo! Rodolfo, a rena, quase comeu a sua cartinha pensando que era cenoura! Mas eu salvei a tempo!"',
      badge: 'Favorito dos Menores (3 a 7 anos)',
    },
    classico: {
      title: 'Clássico & Tradicional',
      description: 'A atmosfera aconchegante da lareira, a grande poltrona vermelha e o Papai Noel lendo o Livro Dourado das Crianças.',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
      quote: '"Minha querida Sofia, seu nome brilha com letras douradas no meu Grande Livro do Natal. Continue espalhando essa bondade."',
      badge: 'Tradição Familiar',
    },
  };

  const current = samples[activeTab];

  return (
    <section className="py-16 md:py-24 bg-slate-950/50 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-bold text-christmas-gold uppercase tracking-wider bg-christmas-gold/10 px-3 py-1 rounded-full border border-christmas-gold/30">
            Estilos de Vídeo Disponíveis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            Escolha o Tom da Mensagem do Papai Noel
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Cada vídeo é gerado sob medida pela IA Veo 3 com iluminação cinematográfica, dublagem acolhedora em português e o clima do Polo Norte.
          </p>
        </div>

        {/* Abas de Estilo */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('emocionante')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'emocionante'
                ? 'bg-christmas-red text-white shadow-lg shadow-red-950/50 border border-christmas-gold/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Emocionante & Conquistas</span>
          </button>
          <button
            onClick={() => setActiveTab('brincalhao')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'brincalhao'
                ? 'bg-christmas-red text-white shadow-lg shadow-red-950/50 border border-christmas-gold/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Brincalhão & Polo Norte</span>
          </button>
          <button
            onClick={() => setActiveTab('classico')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'classico'
                ? 'bg-christmas-red text-white shadow-lg shadow-red-950/50 border border-christmas-gold/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Clássico & Acolhedor</span>
          </button>
        </div>

        {/* Card do Estilo Ativo */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-video md:aspect-auto h-64 md:h-full bg-slate-950 group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-christmas-red/90 text-white flex items-center justify-center shadow-lg border border-christmas-gold/50">
                <Play className="w-6 h-6 ml-0.5 fill-white" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-christmas-gold/20 text-christmas-lightgold border border-christmas-gold/40 mb-3">
                {current.badge}
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">{current.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {current.description}
              </p>
              <div className="p-4 rounded-xl bg-slate-950/70 border-l-4 border-christmas-gold text-slate-200 italic text-sm">
                {current.quote}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Duração: ~45 a 60 segundos</span>
              <span className="text-emerald-400 font-semibold">Qualidade 1080p HD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
