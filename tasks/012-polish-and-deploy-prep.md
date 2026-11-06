# Task 012: Polimento Visual, Hardening e Preparação de Deploy no Coolify

**Tipo:** polish  
**Camada:** full-stack  
**Página relacionada:** Todas  
**Status:** ✅ Concluída  

## Descrição
Realizar refinamento visual final com foco em responsividade mobile, auditoria de performance e acessibilidade, configuração de `Dockerfile` standalone de produção otimizado para o Coolify VPS e documentação de variáveis de ambiente.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Build do container Docker no Coolify | Container Alpine enxuto rodando `node server.js` consumindo < 150MB de RAM |
| ⚠️ Edge Case | Configuração de variáveis de produção no Coolify | Guia claro documentando cada segredo e parâmetro em `DEPLOY_COOLIFY.md` |
| ❌ Erro | Arquivos pesados ou sensíveis no build Docker | `.dockerignore` bloqueia `node_modules`, `.git`, `.env.local`, `.agents` |

## Arquivos Criados / Modificados
- `Dockerfile`: Multi-stage build otimizado com Alpine Linux e Node 20 para o Coolify.
- `.dockerignore`: Lista de exclusão de artefatos desnecessários no build do container.
- `DEPLOY_COOLIFY.md`: Manual passo a passo para configuração de Postgres e app no VPS.

## Checklist de Conclusão
- [x] Revisão visual mobile-first garantindo 60fps e experiência fluida no WhatsApp Webview e Safari/Chrome mobile.
- [x] Hardening de segurança (middleware de auth, sanitização de inputs Zod e sem secrets no frontend).
- [x] `Dockerfile` e configuração de build standalone do Next.js prontos para deploy no Coolify.
- [x] Documento de variáveis de produção conferido e testado.
