'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Film,
  Sparkles,
  LogOut,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import type { Order } from '@/db/schema';
import { formatCurrencyBRL } from '@/lib/batches';
import { PromptVeo3Modal } from './PromptVeo3Modal';

interface AdminDashboardClientProps {
  initialOrders: Order[];
}

export function AdminDashboardClient({ initialOrders }: AdminDashboardClientProps) {
  const router = useRouter();
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Métricas
  const totalOrders = ordersList.length;
  const pendingOrders = ordersList.filter((o) => o.status === 'aguardando_confirmacao').length;
  const inProductionOrders = ordersList.filter((o) => o.status === 'em_producao').length;
  const completedOrders = ordersList.filter((o) => o.status === 'concluido').length;
  const totalRevenue = ordersList.reduce((acc, o) => acc + o.price_paid, 0);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Falha ao atualizar status');

      setOrdersList((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar status do pedido');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRegeneratePrompt = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/regenerate-prompt`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message || 'Falha na regeneração');

      const updated = data.data.order as Order;
      setOrdersList((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      setSelectedOrder(updated);
      alert('Prompt regenerado com sucesso pela IA!');
    } catch (err: unknown) {
      console.error(err);
      alert('Erro ao regenerar prompt com IA');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const filteredOrders = ordersList.filter((order) => {
    const matchesStatus = filterStatus === 'todos' || order.status === filterStatus;
    const matchesSearch =
      order.child_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.parent_whatsapp.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header do GodAdmin */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎅</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Painel GodAdmin — Natal 2026
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Supervisão de pedidos, cópia direta do prompt Veo 3 e entrega via WhatsApp
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.refresh()}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Recarregar Pedidos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/50 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </header>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total de Pedidos</span>
            <span className="text-2xl font-black text-white">{totalOrders}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-amber-400 block mb-1">Aguardando Confirmação</span>
            <span className="text-2xl font-black text-amber-400">{pendingOrders}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-blue-400 block mb-1">Em Produção (Veo 3)</span>
            <span className="text-2xl font-black text-blue-400">{inProductionOrders}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-emerald-400 block mb-1">Concluídos / Entregues</span>
            <span className="text-2xl font-black text-emerald-400">{completedOrders}</span>
          </div>

          <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-christmas-darkred to-slate-900 border border-christmas-gold/40">
            <span className="text-xs text-christmas-lightgold block mb-1 font-bold">Faturamento</span>
            <span className="text-2xl font-black text-white">{formatCurrencyBRL(totalRevenue)}</span>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'aguardando_confirmacao', label: 'Aguardando Pix' },
              { id: 'em_producao', label: 'Em Produção' },
              { id: 'concluido', label: 'Concluídos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterStatus === tab.id
                    ? 'bg-christmas-red text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por criança, WhatsApp ou ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-christmas-gold"
            />
          </div>
        </div>

        {/* Tabela de Pedidos */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">Data/ID</th>
                  <th className="p-4">Criança / Idade</th>
                  <th className="p-4">Responsável / WhatsApp</th>
                  <th className="p-4">Lote / Valor</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Ações Operacionais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Nenhum pedido encontrado para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const cleanPhone = order.parent_whatsapp.replace(/\D/g, '');
                    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Olá ${order.parent_name}! Aqui é da equipe do Feliz Natal 2026 sobre o vídeo de ${order.child_name}.`
                    )}`;

                    return (
                      <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-slate-300 block">
                            #{order.id.slice(0, 8)}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {new Date(order.created_at).toLocaleString('pt-BR')}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="font-bold text-white block">{order.child_name}</span>
                          <span className="text-[11px] text-slate-400">
                            {order.child_age} anos • {order.style}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="text-white block">{order.parent_name}</span>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline text-[11px] flex items-center gap-1 mt-0.5"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{order.parent_whatsapp}</span>
                          </a>
                        </td>

                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px] uppercase block w-fit mb-0.5">
                            Lote {order.batch_tier}
                          </span>
                          <span className="font-bold text-white">
                            {formatCurrencyBRL(order.price_paid)}
                          </span>
                        </td>

                        <td className="p-4">
                          <select
                            disabled={updatingId === order.id}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                              order.status === 'aguardando_confirmacao'
                                ? 'bg-amber-950/60 text-amber-300 border-amber-600/50'
                                : order.status === 'em_producao'
                                ? 'bg-blue-950/60 text-blue-300 border-blue-600/50'
                                : order.status === 'concluido'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            <option value="aguardando_confirmacao">Aguardando Pix</option>
                            <option value="em_producao">Em Produção (Veo 3)</option>
                            <option value="concluido">Concluído / Entregue</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 rounded-lg bg-christmas-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                            >
                              <Film className="w-3.5 h-3.5 fill-slate-950" />
                              <span>Ver Prompt Veo 3</span>
                            </button>

                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                              title="Chamar no WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4 fill-white" />
                            </a>

                            <a
                              href={`/pedido/${order.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                              title="Ver página do cliente"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal do Prompt Veo 3 */}
      <PromptVeo3Modal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onRegeneratePrompt={handleRegeneratePrompt}
      />
    </div>
  );
}
