# Spec: Feliz Natal 2026 (Plataforma de Vídeos Personalizados)

> Plataforma web de alta conversão para criação e encomenda de vídeos natalinos hiperpersonalizados gerados via IA (Google Veo 3), com precificação dinâmica por lotes promocionais de escassez, notificação integrada à equipe e painel GodAdmin simplificado para controle de produção e entrega via WhatsApp.

---

## Visão Geral
- **Tipo:** Web Application (Next.js Fullstack MVP 2026)
- **Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Drizzle ORM, PostgreSQL (hospedado no Coolify VPS)
- **Usuários:**
  1. *Pais / Responsáveis (Clientes):* Acessam a Landing Page, visualizam amostras, conhecem a tabela de lotes e preenchem o formulário detalhado da criança.
  2. *GodAdmin (Vanderson / Operador):* Acessa a área restrita para gerenciar pedidos, copiar prompts gerados para o Veo 3, atualizar status e contatar clientes via WhatsApp.
- **MVP:** Landing page com precificação dinâmica por lotes -> Formulário de pedido -> Persistência em PostgreSQL -> Geração automática de roteiro + prompt Veo 3 por LLM -> Notificação da equipe via WhatsApp/SofIA -> Painel GodAdmin prático para gestão e entrega manual.

---

## Páginas

### 1. Landing Page Pública (Home)
**Rota:** `/`  
**Descrição:** Página inicial com foco em conversão e emoção, demonstrando os vídeos com o Papai Noel, exibindo contador de escassez por lotes e capturando os dados completos para a geração do vídeo.

#### Componentes
| Componente | Descrição |
|---|---|
| `HeroSection` | Headline emotiva, vídeo de amostra em destaque do Papai Noel e botão CTA de rolagem até o formulário. |
| `CountdownBatchBanner` | Barra de destaque fixa/topo exibindo o lote atual vigente, valor promocional (ex: Lote 1 - R$ 30,00), porcentagem de desconto e contador regressivo até o próximo lote. |
| `BatchPricingTable` | Tabela visual comparativa com os 4 lotes (Lote 1: R$ 30 / Lote 2: R$ 50 / Lote 3: R$ 70 / Lote 4: R$ 100), datas limites e badge dinâmico de "Lote Vigente". |
| `VideoShowcaseGallery` | Carrossel ou grade de prévias de vídeos com diferentes personalizações e tons narrativos. |
| `OrderWizardForm` | Formulário interativo e responsivo para coleta de dados do responsável e da criança com validação em tempo real. |
| `FaqAccordion` | Sanfona com dúvidas frequentes (tempo de entrega, envio por WhatsApp, formato MP4, garantia de refação). |
| `Footer` | Links institucionais, avisos legais de privacidade e botão de suporte direto no WhatsApp. |

#### Comportamentos
| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B1 | Acessa a Landing Page | Servidor identifica a data/hora atual e renderiza o lote correto (Lote 1 a 4), preço correspondente e cronômetro regressivo. | Happy Path |
| B2 | Preenche todos os campos obrigatórios e clica em "Garantir Vídeo do Papai Noel" | Sistema valida os campos, persiste o pedido no PostgreSQL como `aguardando_confirmacao`, dispara a geração do roteiro e prompt Veo 3 em background, e redireciona para `/pedido/[id]`. | Happy Path |
| B3 | Cronômetro do lote expira durante a sessão | Sistema atualiza o banner visualmente informando o encerramento do lote anterior e atualiza o preço para o próximo lote. | Edge Case |
| B4 | Informa número de WhatsApp com formato inválido ou dados incompletos | Sistema bloqueia o envio, sinaliza os campos com erro em vermelho e exibe mensagem de orientação. | Erro |
| B5 | Perda de conexão durante o envio do formulário | Sistema retém os dados preenchidos no estado da página e exibe toast de erro com botão "Tentar Novamente". | Erro |

---

### 2. Página de Confirmação & Status do Pedido
**Rota:** `/pedido/[id]`  
**Descrição:** Tela onde o cliente visualiza o resumo do seu pedido, as instruções de pagamento Pix manual da equipe e o botão direto para confirmar via WhatsApp.

#### Componentes
| Componente | Descrição |
|---|---|
| `OrderSummaryCard` | Cartão com resumo do pedido: ID do pedido, nome da criança, estilo escolhido e valor exato do lote contratado. |
| `PixManualPaymentBox` | Chave Pix (chave aleatória / telefone / CNPJ) com botão "Copiar Chave Pix" e aviso para anexar o comprovante na confirmação. |
| `WhatsAppConfirmationButton` | Botão verde de destaque abrindo conversa no WhatsApp com a mensagem pronta contendo o ID do pedido e nome da criança. |
| `OrderStatusTimeline` | Linha do tempo visual dos 4 estados: 1. Pedido Recebido -> 2. Pagamento Confirmado -> 3. Produzindo Vídeo -> 4. Vídeo Entregue. |

#### Comportamentos
| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B6 | Clica em "Copiar Chave Pix" | Sistema copia a chave Pix para a área de transferência do dispositivo e exibe notificação visual de sucesso. | Happy Path |
| B7 | Clica no botão "Confirmar Pedido no WhatsApp" | Sistema abre o WhatsApp com link `wa.me` pré-formatado: *"Olá! Realizei o pedido #[id] para [Nome da Criança] no valor de R$ [Valor]. Segue meu comprovante de pagamento."* | Happy Path |
| B8 | Acessa URL de pedido inexistente ou com UUID inválido | Sistema exibe página amigável de pedido não encontrado com link para retornar à Home. | Edge Case |

---

### 3. Página de Login GodAdmin
**Rota:** `/admin/login`  
**Descrição:** Tela minimalista e prática para autenticação da equipe administrativa com senha mestra.

#### Componentes
| Componente | Descrição |
|---|---|
| `AdminLoginForm` | Formulário compacto com campo de Senha Mestra e botão "Acessar Painel". |
| `SecurityBadge` | Identificação visual de acesso restrito e seguro. |

#### Comportamentos
| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B9 | Digita a senha mestra correta e clica em Entrar | Sistema cria cookie seguro HttpOnly (`admin_session`) e redireciona imediatamente para `/admin`. | Happy Path |
| B10 | Digita senha incorreta | Sistema rejeita o acesso e exibe mensagem clara de credencial inválida. | Erro |
| B11 | Usuário já autenticado acessa `/admin/login` | Middleware detecta a sessão ativa e redireciona direto para `/admin`. | Edge Case |

---

### 4. Painel GodAdmin (Dashboard de Pedidos)
**Rota:** `/admin`  
**Descrição:** Central operacional onde o administrador visualiza os pedidos recebidos, inspeciona o roteiro/prompt do Veo 3 gerado por IA, altera status e contata o cliente no WhatsApp.

#### Componentes
| Componente | Descrição |
|---|---|
| `AdminHeader` | Barra superior com métricas consolidadas (Total de Pedidos, Aguardando Confirmação, Em Produção, Concluídos, Faturamento Estimado) e botão de Logout. |
| `OrderFilterBar` | Abas de filtro rápido por status (`Todos`, `Aguardando Confirmação`, `Em Produção`, `Concluído`) e campo de busca por nome ou WhatsApp. |
| `OrdersTable` | Tabela detalhada listando: Data/Hora, ID, Nome do Responsável, WhatsApp, Criança, Lote, Preço, Status e Ações Rápidas. |
| `PromptVeo3Modal` | Modal de detalhes do pedido exibindo: dados da criança, roteiro emotivo em português e o Prompt Veo 3 técnico em inglês com botão de destaque "Copiar Prompt Veo 3". |
| `StatusSelector` | Dropdown na linha do pedido para transição rápida de status (`aguardando_confirmacao`, `em_producao`, `concluido`, `cancelado`). |
| `WhatsAppDirectButton` | Botão que abre a conversa com o cliente no WhatsApp com mensagem de suporte ou entrega do vídeo pronto. |

#### Comportamentos
| ID | Ação do Usuário | Resposta do Sistema | Cenário |
|---|---|---|---|
| B12 | Clica em "Ver Prompt Veo 3" em um pedido | Sistema abre modal com todas as informações narrativas e o prompt técnico formatado para o Veo 3. | Happy Path |
| B13 | Clica no botão "Copiar Prompt Veo 3" dentro do modal | Prompt técnico completo é copiado para o clipboard com toast de confirmação. | Happy Path |
| B14 | Altera o status do pedido no dropdown (ex: para "Em Produção") | O backend atualiza o status no PostgreSQL e a listagem reflete a alteração instantaneamente sem recarregar a página. | Happy Path |
| B15 | Clica em "WhatsApp do Cliente" | Abre o WhatsApp Web com link direto para o número do responsável. | Happy Path |
| B16 | Usuário não autenticado tenta acessar `/admin` | Middleware de segurança bloqueia o acesso e redireciona para `/admin/login`. | Edge Case |
| B17 | Falha transitória na API da LLM na criação do pedido | O pedido é salvo normalmente com flag `prompt_pendente`, e o painel exibe um botão "Gerar Prompt Agora" para acionamento sob demanda. | Erro |

---

## Regras Globais & Arquitetura

1. **Precificação Dinâmica Baseada em Data (Fat Server):**
   - O cálculo do lote ativo é realizado exclusivamente no servidor com base no relógio oficial (Horário de Brasília):
     - **Lote 1 (10 a 20 de Novembro):** R$ 30,00 (70% OFF)
     - **Lote 2 (21 de Novembro a 10 de Dezembro):** R$ 50,00 (50% OFF)
     - **Lote 3 (11 a 20 de Dezembro):** R$ 70,00 (30% OFF)
     - **Lote 4 (21 a 26 de Dezembro):** R$ 100,00 (Preço Cheio)
   - O preço gravado no banco é imutável para aquele pedido específico, baseado no lote vigente no instante da submissão.

2. **Fluxo Financeiro & Operacional Prático (Fase MVP):**
   - Pagamento inicial manual via Pix (chave fornecida na tela de confirmação).
   - O cliente clica no link do WhatsApp e envia o comprovante para a equipe.
   - O GodAdmin confere o Pix e avança o pedido para "Em Produção".

3. **Geração de Prompt Veo 3 & Notificação SofIA:**
   - Na submissão do pedido, uma Server Action / rota de API chama o provedor de IA com um metaprompt calibrado para:
     a) Roteiro falado pelo Papai Noel (em português, acolhedor, citando apelido, presentes e conquistas).
     b) Prompt cinematográfico em inglês estruturado para o Google Veo 3 (estilo realista, iluminação de cinema, enquadramento e detalhes do Papai Noel).
   - O sistema dispara notificação interna via HTTP para o webhook do WhatsApp/SofIA com o resumo e o prompt gerado. Caso o webhook oscile, o prompt já estará salvo com segurança no banco de dados.

4. **Autenticação GodAdmin Prática:**
   - Proteção de rotas `/admin/*` via Middleware Next.js com validação de cookie assinado contra `ADMIN_PASSWORD` definida no `.env`.
   - Sem dependência de serviços externos de autenticação no MVP.

5. **Privacidade & Conformidade:**
   - Os dados de menores coletados são estritamente os necessários para a personalização artística do vídeo natalino e permanecem isolados na base de dados do cliente no PostgreSQL.
