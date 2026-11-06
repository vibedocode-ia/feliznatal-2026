export interface BatchConfig {
  tier: 1 | 2 | 3 | 4;
  name: string;
  startDate: string; // ISO
  endDate: string; // ISO
  price: number; // Em centavos (ex: 3000 = R$ 30,00)
  originalPrice: number; // 10000
  discountPercent: number;
  label: string;
  urgencyBadge: string;
}

export const CAMPAIGN_BATCHES: BatchConfig[] = [
  {
    tier: 1,
    name: 'Lote 1 — Black Friday Antecipada',
    startDate: '2026-11-10T00:00:00-03:00',
    endDate: '2026-11-20T23:59:59-03:00',
    price: 3000,
    originalPrice: 10000,
    discountPercent: 70,
    label: 'Black Friday Antecipada',
    urgencyBadge: '70% DE DESCONTO — Maior economia do ano',
  },
  {
    tier: 2,
    name: 'Lote 2 — Abertura Oficial de Natal',
    startDate: '2026-11-21T00:00:00-03:00',
    endDate: '2026-12-10T23:59:59-03:00',
    price: 5000,
    originalPrice: 10000,
    discountPercent: 50,
    label: 'Abertura de Natal',
    urgencyBadge: '50% DE DESCONTO — Vagas Limitadas',
  },
  {
    tier: 3,
    name: 'Lote 3 — Reta Final',
    startDate: '2026-12-11T00:00:00-03:00',
    endDate: '2026-12-20T23:59:59-03:00',
    price: 7000,
    originalPrice: 10000,
    discountPercent: 30,
    label: 'Reta Final',
    urgencyBadge: '30% DE DESCONTO — Produção Acelerada',
  },
  {
    tier: 4,
    name: 'Lote 4 — Última Hora',
    startDate: '2026-12-21T00:00:00-03:00',
    endDate: '2026-12-26T23:59:59-03:00',
    price: 10000,
    originalPrice: 10000,
    discountPercent: 0,
    label: 'Última Hora',
    urgencyBadge: 'Preço Integral — Fila Prioritária de Entrega',
  },
];

export function getCurrentBatch(referenceDate: Date = new Date()): BatchConfig {
  const nowMs = referenceDate.getTime();

  for (const batch of CAMPAIGN_BATCHES) {
    const startMs = new Date(batch.startDate).getTime();
    const endMs = new Date(batch.endDate).getTime();

    if (nowMs >= startMs && nowMs <= endMs) {
      return batch;
    }
  }

  // Se for antes do início do Lote 1, vigora a pré-venda do Lote 1
  const firstBatch = CAMPAIGN_BATCHES[0];
  if (nowMs < new Date(firstBatch.startDate).getTime()) {
    return firstBatch;
  }

  // Se ultrapassou o Lote 4, mantém o último lote
  return CAMPAIGN_BATCHES[CAMPAIGN_BATCHES.length - 1];
}

export function formatCurrencyBRL(centavos: number): string {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
