# PRD — Plataforma de Vídeos Personalizados (MVP: Feliz Natal 2026)

## 1. Visão Geral do Produto
- **Nome Inicial:** Feliz Natal 2026 (Expansível para Vídeos Personalizados Multitema: Aniversários, Heróis, Personagens infantis).
- **Domínio:** 
- **Infraestrutura:** VPS gerenciada via Coolify (independente de outros hubs).
- **Stack Tecnológica:** Next.js (App Router), TypeScript, Tailwind CSS, Drizzle ORM, PostgreSQL.

---

## 2. Estratégia Comercial & Precificação Dinâmica
- **Preço Cheio:** R$ 100,00
- **Lote 1 (10 a 20 de Novembro - Black Friday Antecipada):** 70% de desconto → **R$ 30,00**
- **Lote 2 (21 de Novembro a 10 de Dezembro - Black Friday / Abertura de Natal):** 50% de desconto → **R$ 50,00**
- **Lote 3 (11 a 20 de Dezembro - Reta Final):** 30% de desconto → **R$ 70,00**
- **Lote 4 (21 a 26 de Dezembro - Última Hora):** Valor Integral → **R$ 100,00**

A Landing Page calcula e exibe automaticamente o lote vigente com contador regressivo e badge de escassez.

---

## 3. Jornada do Usuário & Fluxo Operacional
1. **Landing Page:** Demonstrações em vídeo, tabela de lotes e formulário de pedido com dados da criança e responsável.
2. **Processamento do Pedido:** Salva no PostgreSQL e chama LLM para gerar roteiro emotivo + prompt técnico para Veo 3.
3. **Notificação GodAdmin:** A SofIA notifica Vanderson no WhatsApp com o prompt do Veo 3 pronto para copiar.
4. **Painel Admin:** Interface para gestão de pedidos, visualização do prompt Veo 3 e atualização de status.
5. **Produção e Entrega:** Geração no Veo 3 supervisionada e envio manual direto ao cliente pelo WhatsApp.

---

## 4. Modelagem de Dados (PostgreSQL / Drizzle)
- : id, slug, title, character_name, active, config (jsonb), created_at.
- : id, campaign_id, parent_name, parent_whatsapp, child_name, child_nickname, child_age, style, dream_gift, achievement, family_signature, custom_notes, price_paid, batch_tier, generated_script, veo3_prompt, status, created_at, updated_at.

---

## 5. Próximos Passos de Implementação
1. Inicialização do projeto Next.js + Tailwind + Drizzle.
2. Configuração do schema e banco no Coolify.
3. Criação da Landing Page com os lotes dinâmicos de Black Friday/Natal.
4. Implementação da API de geração de roteiro + prompt Veo 3.
5. Criação do Painel Administrativo GodAdmin.
