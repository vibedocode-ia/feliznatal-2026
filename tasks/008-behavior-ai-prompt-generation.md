# Task 008: Comportamento de Geração de Roteiro e Prompt Veo 3 via IA

**Tipo:** behavior  
**Camada:** api  
**Página relacionada:** N/A  
**Status:** ✅ Concluída  

## Descrição
Criar o serviço de backend que conecta à LLM para gerar o roteiro emotivo do Papai Noel em português e o prompt técnico cinematográfico em inglês otimizado para o Google Veo 3 a partir dos dados fornecidos no pedido.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Chamada com Gemini API Key configurada | Roteiro em português de 45-60s e prompt em inglês cinematográfico 1080p anamorphic para Veo 3 |
| ⚠️ Edge Case | Falha na conexão ou API indisponível | Fallback inteligente com templates literários de alto impacto baseados no estilo escolhido (emocionante, brincalhão, clássico) |
| ❌ Erro | Parâmetros narrativos em branco | Preenchimento automático com termos afetuosos padrão |

## Arquivos Criados / Modificados
- `src/lib/ai.ts`: Módulo de geração de IA com integração Google Gemini e fallback robusto de contingência.

## Checklist de Conclusão
- [x] Prompt template refinado e testado para gerar roteiro em português acolhedor e personalizado.
- [x] Metaprompt técnico estruturado para gerar especificações cinematográficas em inglês para o Google Veo 3.
- [x] Persistência de `generated_script` e `veo3_prompt` na tabela `orders`.
- [x] Tratamento de falhas transitórias com gravação de status seguro para reprocessamento.
