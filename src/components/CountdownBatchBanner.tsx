'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Zap, Flame } from 'lucide-react';
import { BatchConfig, formatCurrencyBRL } from '@/lib/batches';

interface CountdownBatchBannerProps {
  currentBatch: BatchConfig;
  onCtaClick?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownBatchBanner({ currentBatch, onCtaClick }: CountdownBatchBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(currentBatch.endDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [currentBatch.endDate]);

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
    <div className="bg-gradient-to-r from-christmas-darkred via-red-900 to-slate-900 border-y border-christmas-gold/30 shadow-lg py-4 px-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info do Lote */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-christmas-gold/20 items-center justify-center border border-christmas-gold/40 text-christmas-gold">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-base sm:text-lg">
                {currentBatch.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                {currentBatch.discountPercent}% OFF
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              De <span className="line-through text-slate-400">{formatCurrencyBRL(currentBatch.originalPrice)}</span> por apenas{' '}
              <span className="text-christmas-lightgold font-bold text-base sm:text-lg">
                {formatCurrencyBRL(currentBatch.price)}
              </span>
            </p>
          </div>
        </div>

        {/* Cronômetro Regressivo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mr-1 sm:mr-2">
            <Clock className="w-4 h-4 text-christmas-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>Encerra em:</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="bg-slate-950/80 border border-slate-700/60 rounded-lg px-2 sm:px-3 py-1 text-center min-w-[42px] sm:min-w-[50px]">
              <span className="font-mono text-sm sm:text-lg font-extrabold text-white">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase">Dias</span>
            </div>
            <span className="text-christmas-gold font-bold">:</span>

            <div className="bg-slate-950/80 border border-slate-700/60 rounded-lg px-2 sm:px-3 py-1 text-center min-w-[42px] sm:min-w-[50px]">
              <span className="font-mono text-sm sm:text-lg font-extrabold text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase">Horas</span>
            </div>
            <span className="text-christmas-gold font-bold">:</span>

            <div className="bg-slate-950/80 border border-slate-700/60 rounded-lg px-2 sm:px-3 py-1 text-center min-w-[42px] sm:min-w-[50px]">
              <span className="font-mono text-sm sm:text-lg font-extrabold text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase">Min</span>
            </div>
            <span className="text-christmas-gold font-bold">:</span>

            <div className="bg-slate-950/80 border border-slate-700/60 rounded-lg px-2 sm:px-3 py-1 text-center min-w-[42px] sm:min-w-[50px]">
              <span className="font-mono text-sm sm:text-lg font-extrabold text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase">Seg</span>
            </div>
          </div>
        </div>

        {/* Botão de Ação Rápida */}
        <button
          onClick={scrollToForm}
          className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm rounded-lg shadow-md hover:shadow-yellow-500/30 transition-all flex items-center justify-center gap-1.5"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Aproveitar Este Lote</span>
        </button>
      </div>
    </div>
  );
}
