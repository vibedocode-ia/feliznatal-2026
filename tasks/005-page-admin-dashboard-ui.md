# Task 005: Protótipo de UI do Painel GodAdmin e Login

**Tipo:** ui-prototype  
**Camada:** frontend  
**Página relacionada:** `/admin` e `/admin/login`  
**Status:** ✅ Concluída  

## Descrição
Construir as telas visuais de login e do dashboard administrativo GodAdmin. Desenvolver o formulário de login com senha mestra, a barra superior de métricas, abas de filtro por status, tabela de pedidos e modal para exibição do roteiro e prompt Veo 3.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Admin autenticado acessa `/admin` | Dashboard completo com métricas, tabela e ações de status/prompt |
| ⚠️ Edge Case | Clique em "Ver Prompt Veo 3" | Modal abre com a ficha da criança, roteiro e prompt cinematográfico com cópia em 1 clique |
| ❌ Erro | Falha ao autenticar em `/admin/login` | Mensagem clara de senha inválida |

## Arquivos Criados
- `src/app/admin/login/page.tsx`: Tela de login com senha mestra e feedback visual de erro.
- `src/components/admin/PromptVeo3Modal.tsx`: Modal detalhado com roteiro em português e prompt técnico em inglês para o Veo 3 com botões de cópia e regeneração.
- `src/components/admin/AdminDashboardClient.tsx`: Painel interativo com métricas de pedidos, filtros de busca, alteração de status e disparos de WhatsApp.
- `src/app/admin/page.tsx`: Server Component carregando os pedidos do banco de dados em ordem cronológica.

## Checklist de Conclusão
- [x] Tela de login `/admin/login` com formulário de senha mestra.
- [x] Header do GodAdmin com contadores de status e métricas operacionais.
- [x] Tabela de pedidos com colunas de dados, badges de status e botões de ação rápida.
- [x] Modal de detalhes do pedido estilizado para visualização do roteiro e prompt com botão de cópia.
