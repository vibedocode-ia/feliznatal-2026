# Task 010: Comportamento de Gestão de Pedidos no GodAdmin

**Tipo:** behavior  
**Camada:** full-stack  
**Página relacionada:** `/admin`  
**Status:** ✅ Concluída  

## Descrição
Conectar a interface do GodAdmin ao banco de dados: carregar listagem em tempo real, aplicar filtros de status e busca, permitir atualização rápida de status do pedido e ação de regeneração manual do prompt se necessário.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Mudança de status no seletor | Banco atualizado via PATCH `/api/orders/[id]/status` com sincronização instantânea de estado |
| ⚠️ Edge Case | Clique em "Regenerar com IA" no modal | Endpoint `/api/orders/[id]/regenerate-prompt` re-executa a síntese de IA e atualiza o prompt |
| ❌ Erro | Usuário deslogado tenta mutação | Retorno 401 Unauthorized bloqueando a ação |

## Arquivos Criados / Modificados
- `src/app/api/orders/[id]/status/route.ts`: Endpoint PATCH protegido para atualização de status.
- `src/app/api/orders/[id]/regenerate-prompt/route.ts`: Endpoint POST protegido para reprocessar o prompt de IA.
- `src/components/admin/AdminDashboardClient.tsx`: Interface interativa com filtros, busca e chamadas aos endpoints.

## Checklist de Conclusão
- [x] Consulta otimizada listando pedidos com ordenação cronológica decrescente.
- [x] Filtro funcional por status (`Todos`, `Aguardando Confirmação`, `Em Produção`, `Concluído`).
- [x] Ação de atualização de status com mutação reativa.
- [x] Ação funcional de "Copiar Prompt Veo 3" com feedback visual (Toast) e botão de regeneração de prompt.
