# Arquitetura do Sistema — Feliz Natal 2026

## 1. Visão Geral & Filosofia
- **Padrão VibeDoCode:**
  - **Fat Server:** Toda validação (Zod), regras de precificação de lotes, gravação em banco, geração de prompts de IA (Google Veo 3) e disparo de webhooks (WhatsApp/SofIA) ocorrem estritamente no servidor (Server Actions e Rotas de API).
  - **Thin Client:** Componentes React no App Router renderizam interfaces puras com Tailwind CSS, capturam eventos e delegam mutações para o servidor sem expor queries, segredos ou lógica de precificação.
  - **Zero Duplicação:** Componentes e utilitários globais centralizados em `@/components/` e `@/lib/`.

## 2. Stack Tecnológica
- **Framework:** Next.js 14+ (App Router) com TypeScript
- **Estilização:** Tailwind CSS v3/v4
- **ORM & Banco:** Drizzle ORM com PostgreSQL (pg/postgres.js)
- **Validação de Schemas:** Zod
- **Infraestrutura:** Docker containerizado, standalone build para Coolify VPS

## 3. Diretórios Padrão
```
src/
├── app/                  # Next.js App Router (páginas e layouts)
│   ├── api/              # API Routes (auth, webhooks)
│   ├── pedido/[id]/      # Página de acompanhamento do pedido
│   ├── admin/            # Painel administrativo
│   │   ├── login/        # Login com senha mestra
│   │   └── page.tsx      # Dashboard de pedidos
│   ├── layout.tsx
│   └── page.tsx          # Landing Page principal
├── components/           # Componentes UI reutilizáveis (Hero, Countdown, Forms, Tables, Modals)
├── db/                   # Drizzle ORM (schema, connection, migrations)
│   ├── schema/           # Tabelas (campaigns.ts, orders.ts)
│   ├── index.ts          # Instância do banco Drizzle
│   └── migrations/       # SQL migrations
├── lib/                  # Helpers do servidor (batches, auth, ai, response, notifications)
└── types/                # Definições globais de TypeScript
```

## 4. Segurança & Variáveis de Ambiente
- `DATABASE_URL`: String de conexão segura PostgreSQL
- `ADMIN_PASSWORD`: Senha mestra para login do GodAdmin
- `ADMIN_SESSION_SECRET`: Chave secreta para assinatura dos cookies de sessão
- `GEMINI_API_KEY`: Chave da API do Google Gemini para síntese de roteiros e prompts Veo 3
- `WHATSAPP_WEBHOOK_URL`: Endpoint de mensageria da SofIA / Evolution API
- `NEXT_PUBLIC_PIX_KEY`: Chave Pix exibida ao cliente para confirmação manual
