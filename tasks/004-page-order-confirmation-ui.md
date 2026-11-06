# Task 004: Protótipo de UI da Página de Confirmação do Pedido

**Tipo:** ui-prototype  
**Camada:** frontend  
**Página relacionada:** `/pedido/[id]`  
**Status:** ✅ Concluída  

## Descrição
Desenvolver a interface visual da página de confirmação e status do pedido. Apresentar o resumo dos dados cadastrados, instruções de pagamento Pix manual da equipe, timeline dos 4 status e botão de ação direta para o WhatsApp.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Cliente acessa `/pedido/[id]` de pedido válido | Visualização do resumo, box Pix com botão de copiar e botão WhatsApp pré-preenchido |
| ⚠️ Edge Case | ID inexistente ou corrompido na URL | Página amigável de pedido não encontrado com link para a home |
| ❌ Erro | Falha na conexão com banco | Tratamento gracioso sem quebrar a aplicação |

## Arquivos Criados
- `src/components/PixManualPaymentBox.tsx`: Componente de pagamento manual com chave Pix, cópia em 1 clique e feedback de sucesso.
- `src/components/OrderStatusTimeline.tsx`: Linha do tempo visual dos 4 estágios da produção.
- `src/components/WhatsAppConfirmationButton.tsx`: Botão de disparo para WhatsApp com mensagem pré-formatada.
- `src/app/pedido/[id]/page.tsx`: Server Component que busca os dados reais do pedido e renderiza a tela.

## Checklist de Conclusão
- [x] Componente `OrderSummaryCard` exibindo dados do pedido e valor contratado.
- [x] Componente `PixManualPaymentBox` com chave Pix e botão de copiar.
- [x] Componente `OrderStatusTimeline` indicando visualmente o estágio atual do pedido.
- [x] Botão de destaque do WhatsApp estilizado e pronto para receber o link dinâmico.
