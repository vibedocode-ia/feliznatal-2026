# Task 003: Protótipo de UI da Landing Page

**Tipo:** ui-prototype  
**Camada:** frontend  
**Página relacionada:** `/`  
**Status:** ✅ Concluída  

## Descrição
Construir a interface visual completa e responsiva da Landing Page pública. Criar os componentes visuais sem lógica de negócio: Hero com prévia de vídeo, banner de contagem regressiva, tabela comparativa de lotes, vitrine de demonstrações, formulário de pedido e FAQ.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Usuário acessa `/` em qualquer dispositivo | Renderização suave e festiva com todos os componentes alinhados |
| ⚠️ Edge Case | Rolagem rápida ou clique no CTA do banner/hero | Rolagem suave direta até `#pedido-section` |
| ❌ Erro | Preenchimento incompleto de campos obrigatórios no form | Exibição de alerta visual indicando os dados faltantes |

## Arquivos Criados
- `src/components/HeroSection.tsx`: Seção principal com headline de impacto e player de amostra.
- `src/components/CountdownBatchBanner.tsx`: Barra sticky com contador regressivo em tempo real e badge de escassez.
- `src/components/BatchPricingTable.tsx`: Tabela comparativa dos 4 lotes com indicação visual do lote ativo.
- `src/components/VideoShowcaseGallery.tsx`: Vitrine com 3 estilos de mensagem natalina (Emocionante, Brincalhão, Clássico).
- `src/components/OrderWizardForm.tsx`: Formulário completo e responsivo para captura de dados da criança e responsável.
- `src/components/FaqAccordion.tsx`: Sanfona de dúvidas frequentes.
- `src/components/Footer.tsx`: Rodapé com termos, privacidade e link para o admin.
- `src/app/page.tsx`: Server Component montando a Landing Page com o lote atual injetado do servidor.

## Checklist de Conclusão
- [x] Componente `HeroSection` com headline, vídeo teaser e botão de rolagem CTA.
- [x] Componente `CountdownBatchBanner` e `BatchPricingTable` estilizados com Tailwind CSS.
- [x] Componente `VideoShowcaseGallery` com amostras visuais de vídeos de Natal.
- [x] Componente `OrderWizardForm` contendo todos os campos do responsável e da criança com design responsivo.
- [x] Componentes `FaqAccordion` e `Footer` renderizando perfeitamente no mobile e desktop.
