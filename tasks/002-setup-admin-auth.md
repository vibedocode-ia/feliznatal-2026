# Task 002: Setup de Autenticação Segura para o GodAdmin

**Tipo:** setup  
**Camada:** api  
**Página relacionada:** `/admin/*`  
**Status:** ✅ Concluída  

## Descrição
Implementar o sistema de proteção e sessão do painel administrativo GodAdmin. Utilizar middleware Next.js para validação de cookie seguro HttpOnly assinado comparado à senha mestra (`ADMIN_PASSWORD`).

## Cenários
| Cenário | O que acontece | Resultado esperado |
|---|---|---|
| ✅ Happy Path | Login com senha mestra correta | Criação de cookie `admin_session` assinado via HMAC-SHA256 e acesso liberado a `/admin` |
| ⚠️ Edge Case | Administrador autenticado tenta acessar `/admin/login` | Middleware detecta sessão válida e redireciona direto para `/admin` |
| ❌ Erro | Tentativa de acesso a `/admin` sem autenticação ou com token expirado | Middleware intercepta e redireciona para `/admin/login` com parâmetro `from` |

## Arquivos Criados
- `src/lib/auth.ts`: Utilitários de criptografia nativa Web Crypto, geração e verificação de assinatura HMAC-SHA256, gerenciamento de cookies.
- `src/middleware.ts`: Middleware global Next.js protegendo rotas `/admin/*` e redirecionando usuários não autenticados.
- `src/app/api/admin/login/route.ts`: Endpoint POST seguro para conferência de senha mestra e emissão do cookie HttpOnly.
- `src/app/api/admin/logout/route.ts`: Endpoint POST seguro para revogação da sessão.

## Checklist de Conclusão
- [x] Middleware protegendo rotas `/admin/*` (exceto `/admin/login`).
- [x] Rota/Server Action de autenticação criando cookie assinado em caso de senha correta.
- [x] Redirecionamento automático de usuários não autorizados para `/admin/login`.
- [x] Rota/Server Action de logout limpando o cookie com redirecionamento.
