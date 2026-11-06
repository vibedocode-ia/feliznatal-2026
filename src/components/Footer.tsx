'use client';

import React from 'react';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-christmas-red flex items-center justify-center text-white font-black text-base shadow-md">
            🎅
          </div>
          <div>
            <span className="font-bold text-white text-base block">Feliz Natal 2026</span>
            <span className="text-slate-400 text-xs">Vídeos personalizados do Papai Noel via Veo 3</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Privacidade & Dados Protegidos</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-4 h-4 text-christmas-gold" />
            <span>Google Veo 3 Cinema AI</span>
          </div>
          <Link
            href="/admin/login"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Acesso Restrito
          </Link>
        </div>

        <div className="text-center md:text-right">
          <p>© {currentYear} Feliz Natal 2026. Todos os direitos reservados.</p>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center justify-center md:justify-end gap-1">
            Feito com <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para transformar memórias de infância.
          </p>
        </div>
      </div>
    </footer>
  );
}
