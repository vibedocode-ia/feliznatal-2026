# 🚀 Guia de Deploy no Coolify — Feliz Natal 2026

Este guia detalha o passo a passo para colocar a aplicação em produção no VPS Hostinger via Coolify.

---

## 1. Banco de Dados PostgreSQL

1. No painel do Coolify, crie um recurso do tipo **PostgreSQL** (se ainda não existir uma instância compartilhada).
2. Nome sugerido do banco: `feliznatal_db`.
3. Anote a URL interna/externa de conexão no formato:
   `postgresql://postgres:<sua-senha>@<host-ou-ip>:5432/feliznatal_db`

---

## 2. Aplicação Next.js

1. No Coolify, adicione uma **Nova Aplicação** conectada ao repositório Git deste projeto.
2. **Build Pack:** Selecione `Dockerfile` (ele utilizará o `Dockerfile` standalone de alta performance já incluso na raiz).
3. **Porta Exposta:** `3000`.

---

## 3. Variáveis de Ambiente no Coolify

Configure as seguintes variáveis na aba **Environment Variables**:

| Variável | Valor Recomendado / Descrição |
|---|---|
| `DATABASE_URL` | String de conexão com o PostgreSQL |
| `ADMIN_PASSWORD` | Senha mestra de acesso ao GodAdmin (`/admin`) |
| `ADMIN_SESSION_SECRET` | Chave aleatória segura de 32+ caracteres para assinatura do cookie |
| `GEMINI_API_KEY` | Chave da API do Google Gemini para síntese de roteiro e prompt |
| `WHATSAPP_WEBHOOK_URL` | Endpoint da SofIA / Evolution API para notificação interna |
| `ADMIN_WHATSAPP_NUMBER` | Número do Vanderson com DDI e DDD (ex: `5511999999999`) |
| `NEXT_PUBLIC_PIX_KEY` | Chave Pix divulgada para os clientes pagarem |
| `NEXT_PUBLIC_PIX_BENEFICIARY` | Nome do titular da chave Pix |

---

## 4. Migrations do Banco

As migrations automáticas são geradas pelo Drizzle Kit em `src/db/migrations/`.
Você pode executá-las localmente apontando para o banco de produção:
```bash
npm run db:push
```
Ou rodar dentro do container da aplicação.
