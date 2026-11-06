'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Como o vídeo é entregue e em qual formato?',
    answer: 'O vídeo é gerado em alta definição (MP4 1080p) e enviado diretamente no número de WhatsApp informado no formulário de pedido. Você recebe o arquivo de vídeo pronto para salvar, repassar para familiares e assistir na TV ou celular.',
  },
  {
    question: 'Qual é o prazo de entrega do vídeo?',
    answer: 'No Lote 1 e Lote 2, a entrega ocorre em até 24 a 48 horas após a confirmação. Nos lotes mais próximos do Natal (Lote 3 e 4), nossa equipe e a IA operam em regime de urgência para garantir que todos recebam antes da ceia natalina.',
  },
  {
    question: 'O Papai Noel realmente fala o nome e os detalhes do meu filho?',
    answer: 'Sim! Nosso sistema utiliza tecnologia de ponta em inteligência artificial cinematográfica (Google Veo 3) aliada a roteirização personalizada. O Papai Noel chama a criança pelo nome e apelido, cita exatamente a conquista do ano e o presente desejado.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Nesta fase do MVP, para máxima praticidade e segurança, o pagamento é feito via chave Pix após o envio do formulário. Você receberá a chave na tela de confirmação e um botão direto para enviar o comprovante no WhatsApp.',
  },
  {
    question: 'E se eu tiver mais de um filho?',
    answer: 'Recomendamos encomendar um vídeo individual para cada criança para que cada uma se sinta única e tenha a sua mensagem exclusiva. Ou, se preferir, pode colocar os dois nomes no campo "Nome da Criança" para que o Papai Noel fale com a duplinha!',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <span className="text-xs sm:text-sm font-bold text-christmas-lightgold uppercase tracking-wider bg-christmas-gold/10 px-3 py-1 rounded-full border border-christmas-gold/30 inline-flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tire Suas Dúvidas</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Tudo o que você precisa saber sobre a confecção e entrega do seu vídeo de Natal.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-christmas-lightgold transition-colors"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-christmas-gold shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
