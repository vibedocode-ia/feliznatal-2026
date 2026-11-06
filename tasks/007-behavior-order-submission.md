# Task 007: Comportamento de Criação e Submissão do Pedido

**Tipo:** behavior  
**Camada:** full-stack  
**Página relacionada:** `/` e `/pedido/[id]`  
**Status:** ✅ Concluída  

## Descrição
Implementar o fluxo completo de submissão do formulário do cliente via Server Action / Rota de API. Validar os dados de entrada com Zod, persistir o registro no banco PostgreSQL com status `aguardando_confirmacao` e redirecionar para a página do pedido.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Envio com dados válidos | Validação Zod, lote ativo aplicado no servidor, roteiro e prompt Veo 3 gerados, pedido gravado no Postgres e redirecionamento para `/pedido/[id]` |
| ⚠️ Edge Case | Criação automática da campanha base | O sistema detecta se a campanha `feliz-natal-2026` existe no banco e cria automaticamente se for a primeira execução |
| ❌ Erro | Falha de validação Zod (ex: telefone incompleto) | Retorno 400 com detalhes do campo inválido e mensagem amigável |

## Arquivos Criados / Modificados
- `src/app/api/orders/route.ts`: Endpoint POST validando via Zod, persistindo no banco e chamando IA e webhook.
- `src/components/OrderWizardForm.tsx`: Formulário interativo com máscara de telefone e feedback de loading.

## Checklist de Conclusão
- [x] Validação robusta de formulário no cliente e servidor (telefone WhatsApp, campos obrigatórios).
- [x] Gravação do pedido na tabela `orders` com associação ao lote ativo e preço fixado.
- [x] Redirecionamento automático e fluido para `/pedido/[id]`.
- [x] Carregamento dinâmico dos dados reais do pedido e geração do link `wa.me` na página `/pedido/[id]`.
