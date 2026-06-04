
## Objetivo

Converter o projeto de **TanStack Start (SSR rodando em Cloudflare Workers)** para um **SPA estático Vite + React**, gerando uma pasta `dist/` com `index.html`, para deploy gratuito no Netlify com seu domínio `renatoalvesacustico.com.br`.

## Por que o Netlify falha hoje

O build atual gera um servidor Worker, não arquivos estáticos. Não há `index.html` — por isso o preview do Netlify cai em 404. SPA estático resolve isso.

## Impacto

- **Mantém**: visual, conteúdo do site, popup das fotos, faixa #333, botões aumentados, cores — toda a UI que já está em `src/routes/index.tsx`.
- **Perde**: SSR e meta tags renderizadas no servidor (SEO server-side). Pra um site institucional simples com 1 página, o impacto prático é mínimo — meta tags vão pro `index.html` estático.
- **Custo**: nenhum. Netlify gratuito + seu domínio.

## Passos

### 1. Trocar o stack
- Remover dependências: `@tanstack/react-start`, `@tanstack/react-router`, `@lovable.dev/vite-tanstack-config`, `nitro`, e correlatas de servidor.
- Adicionar: `react-router-dom` (apenas se precisarmos de mais rotas no futuro — por enquanto o site é 1 página, então fica opcional).
- Manter: React 19, Tailwind v4, shadcn, framer-motion, todas as libs de UI já usadas.

### 2. Substituir arquivos de bootstrap
- **Criar** `index.html` na raiz (entrada do Vite) com meta tags, favicon e `<div id="root">`.
- **Criar** `src/main.tsx` com `createRoot(...).render(<App />)`.
- **Criar** `src/App.tsx` que renderiza o conteúdo atual de `src/routes/index.tsx`.
- **Reescrever** `vite.config.ts` para Vite + React puro (`@vitejs/plugin-react`, Tailwind v4 plugin, alias `@`).

### 3. Remover infraestrutura SSR
- Deletar: `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routeTree.gen.ts`, `src/routes/api/`, `src/routes/README.md`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `src/lib/config.server.ts`, `src/lib/api/`.
- Mover conteúdo visual de `src/routes/index.tsx` para `src/App.tsx` antes de deletar.

### 4. Ajustes de assets e imports
- Imagens (`src/assets/poster_*.jpg`, `video_*.mp4`) continuam funcionando via `import x from "@/assets/..."` no Vite puro.
- Garantir que nenhum componente importa de `@tanstack/react-router` (Link, useNavigate, etc.). Como o site é 1 página, provavelmente não há nenhum — verifico durante a implementação.

### 5. Configurar Netlify
- Manter `public/_redirects` com `/* /index.html 200` (correto para SPA agora).
- Criar `netlify.toml`:
  ```toml
  [build]
    command = "bun run build"
    publish = "dist"
  ```

### 6. Validar
- Rodar build local, confirmar que `dist/index.html` é gerado.
- Conferir preview no sandbox: site abre, popup das fotos funciona, faixa #333 e botões maiores intactos.
- Após você fazer push pro GitHub, Netlify vai detectar `netlify.toml` e fazer deploy correto.

## Observações técnicas

- **Server functions**: o arquivo `src/lib/api/example.functions.ts` e infra associada serão removidos. Não havia chamadas server-side reais no site (apenas exemplo).
- **Lovable Cloud**: continua funcionando se você ativar mais tarde (Supabase no client direto, sem precisar de SSR).
- **Roteamento futuro**: se um dia quiser páginas `/sobre`, `/contato`, etc., adicionamos `react-router-dom` — o `_redirects` já está pronto pra isso.

## Resultado esperado

Após implementar e você fazer push pro GitHub:
1. Netlify roda `bun run build` → gera `dist/index.html` + assets.
2. Preview do Netlify abre o site normalmente, sem 404.
3. Você conecta `renatoalvesacustico.com.br` no painel do Netlify (gratuito).
