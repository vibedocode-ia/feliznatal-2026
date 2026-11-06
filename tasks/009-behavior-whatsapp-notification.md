# Task 009: Comportamento de Notificação Interna via WhatsApp/SofIA

**Tipo:** behavior  
**Camada:** api  
**Página relacionada:** N/A  
**Status:** ✅ Concluída  

## Descrição
Implementar o serviço de notificação assíncrona que dispara mensagem via webhook HTTP para a instância da SofIA / Evolution API no VPS, avisando a equipe e o Vanderson sobre o novo pedido recebido com o prompt pronto para copiar.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Pedido registrado | Mensagem formatada enviada ao webhook WhatsApp com dados e prompt pronto |
| ⚠️ Edge Case | Webhook indisponível ou rede oscilando | O log captura o evento com segurança e a jornada do usuário NÃO é interrompida |

## Arquivos Criados / Modificados
- `src/lib/notifications.ts`: Utilitário de formatação e disparo HTTP para a SofIA / WhatsApp.

## Checklist de Conclusão
- [x] Integração HTTP resiliente com webhook de mensageria da SofIA/Evolution API.
- [x] Mensagem formatada enviando dados do cliente, lote, valor e o prompt do Veo 3 pronto para copiar.
- [x] Execução com tratamento de erro sem travar ou interromper a jornada do cliente caso o webhook oscile.
