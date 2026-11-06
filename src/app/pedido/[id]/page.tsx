import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle, Heart, Gift, Trophy } from 'lucide-react';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PixManualPaymentBox } from '@/components/PixManualPaymentBox';
import { OrderStatusTimeline } from '@/components/OrderStatusTimeline';
import { WhatsAppConfirmationButton } from '@/components/WhatsAppConfirmationButton';
import { Footer } from '@/components/Footer';
import { formatCurrencyBRL } from '@/lib/batches';

export const dynamic = 'force-dynamic';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = params;

  let order = null;

  try {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    if (result.length > 0) {
      order = result[0];
    }
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
  }

  if (!order) {
    return (
      <main className="min-h-screen flex flex-col justify-between p-6">
        <div className="max-w-xl mx-auto my-auto text-center bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Pedido Não Encontrado</h1>
          <p className="text-slate-400 text-sm mb-6">
            Não conseguimos localizar um pedido com o identificador fornecido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-christmas-red hover:bg-red-700 text-white font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a Página Inicial</span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Topo de Sucesso */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-christmas-lightgold uppercase tracking-wider bg-christmas-gold/10 px-3 py-1 rounded-full border border-christmas-gold/30">
            Pedido Realizado com Sucesso
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
            Quase Pronto para a Magia Acontecer!
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            O pedido para o vídeo de <strong className="text-white">{order.child_name}</strong> foi registrado no nosso sistema.
          </p>
        </div>

        <div className="space-y-6">
          {/* Timeline de Produção */}
          <OrderStatusTimeline status={order.status} />

          {/* Resumo do Pedido */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">
              Resumo da Mensagem
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Criança:</span>
                <span className="text-white font-semibold">{order.child_name} ({order.child_age} anos)</span>
                {order.child_nickname && (
                  <span className="text-slate-400 text-xs block">Chamada de: "{order.child_nickname}"</span>
                )}
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Responsável / WhatsApp:</span>
                <span className="text-white font-semibold">{order.parent_name}</span>
                <span className="text-slate-400 text-xs block">{order.parent_whatsapp}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Presente dos Sonhos:</span>
                <span className="text-white font-medium">{order.dream_gift}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Conquista Celebrada:</span>
                <span className="text-white font-medium">{order.achievement}</span>
              </div>
            </div>
          </div>

          {/* Box de Pagamento Pix */}
          {order.status === 'aguardando_confirmacao' && (
            <PixManualPaymentBox amountCentavos={order.price_paid} />
          )}

          {/* Botão de Envio de Comprovante no WhatsApp */}
          <WhatsAppConfirmationButton
            orderId={order.id}
            childName={order.child_name}
            pricePaidCentavos={order.price_paid}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
