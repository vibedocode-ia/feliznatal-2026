# Task 001: Setup do Projeto e Banco de Dados PostgreSQL

**Tipo:** setup  
**Camada:** database  
**Status:** ✅ Concluída  

## Descrição
Inicializar a aplicação fullstack Next.js com App Router, TypeScript e Tailwind CSS. Configurar o Drizzle ORM com conexão ao PostgreSQL (Coolify VPS) e declarar os schemas das tabelas `campaigns` e `orders`.

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Instalação de dependências e setup do Drizzle | Projeto Next.js compila com TypeScript e Drizzle migrations são geradas sem erros |
| ⚠️ Edge Case | Ausência temporária de DATABASE_URL em build local | O client Drizzle inicializa com fallback sem quebrar build estático |
| ❌ Erro | Variável de ambiente ausente em runtime | Mensagem clara indicando falta de DATABASE_URL |

## Arquivos Criados
- `package.json`: Dependências Next.js 14, Drizzle ORM, Tailwind, Postgres, Zod, Lucide.
- `tsconfig.json`: TypeScript com paths `@/*`.
- `next.config.mjs`: Configuração standalone para Coolify.
- `tailwind.config.ts` e `postcss.config.js`: Estilização natalina e layout responsivo.
- `drizzle.config.ts`: Configuração do Drizzle Kit.
- `src/db/schema/campaigns.ts`: Tabela `campaigns`.
- `src/db/schema/orders.ts`: Tabela `orders`.
- `src/db/schema/index.ts`: Export consolidado.
- `src/db/index.ts`: Singleton client do Drizzle.
- `src/db/migrations/0000_tranquil_starfox.sql`: Migration SQL gerada.

## Checklist de Conclusão
- [x] Next.js instalado e configurado
- [x] Drizzle ORM conectado e configurado
- [x] Schemas de `campaigns` e `orders` criados
- [x] Migrations geradas
