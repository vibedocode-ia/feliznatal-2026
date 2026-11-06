# Task 006: Comportamento de Precificação Dinâmica por Lotes

**Tipo:** behavior  
**Camada:** api  
**Página relacionada:** `/`  
**Status:** ✅ Concluída  

## Descrição
Implementar a regra de negócio do servidor que determina o lote vigente com base no calendário de datas oficiais (Lote 1: R$ 30 até Lote 4: R$ 100). Alimentar o banner regressivo e garantir que o preço seja validado no Fat Server.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Requisição identifica data atual | Retorno exato do lote vigente, valor promocional e timestamp final para contagem regressiva |
| ⚠️ Edge Case | Data anterior à abertura do lote 1 ou posterior ao lote 4 | Fallback seguro para pré-venda do lote 1 ou valor integral do lote 4 |
| ❌ Erro | Tentativa de adulteração de preço na requisição | Fat Server ignora qualquer valor do frontend e impõe o preço do lote vigente |

## Arquivos Criados / Modificados
- `src/lib/batches.ts`: Funções de domínio com o calendário oficial dos 4 lotes (Lote 1 Black Friday até Lote 4 Última Hora), cálculo de tempo restante e formatação BRL.
- `src/app/api/batch/route.ts`: Endpoint GET para sincronização do relógio do servidor com o banner do frontend.
- `src/components/CountdownBatchBanner.tsx`: Cronômetro regressivo com atualização segundo a segundo.

## Checklist de Conclusão
- [x] Função utilitária no servidor calculando o lote atual, preço, desconto e timestamp final do lote.
- [x] Banner de contagem regressiva exibindo o tempo restante em tempo real na Landing Page.
- [x] Tabela de preços marcando dinamicamente o lote ativo como selecionado.
- [x] Validação server-side que impede adulteração de preços submetidos pelo cliente.
