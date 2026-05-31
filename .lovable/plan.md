Criar landing page de página única para o músico Renato Alves Acústico com design clean e paleta baseada na logo (fundo escuro, acentos laranja/dourado).

**Estrutura:**

1. **Header/Hero** — Logo centralizada no topo com fundo escuro

2. **Seção Vídeos** — Grid 2x2 com 4 embeds do YouTube (placeholders estilizados com ícone de play, que carregam o embed ao clicar para evitar carregamento pesco na página)
   - https://www.youtube.com/watch?v=FOPq1gI7ByU
   - https://www.youtube.com/watch?v=vvlak9jRG-s
   - https://www.youtube.com/shorts/sVn8KeRTTsc
   - https://www.youtube.com/shorts/ha07Xzf2GrE

3. **Seção Fotos** — Grid 2x2 com as 4 fotos enviadas, com leve efeito de hover

4. **Seção Contato** — Ícones de WhatsApp (link wa.me/5548991677275) e Instagram (logo SVG clicável, abre em nova aba para https://www.instagram.com/renatoacustico/)

**Técnico:**
- Copiar imagens para `public/images/`
- Atualizar `src/styles.css` com tokens da paleta da logo (fundo escuro, acento dourado/laranja)
- Atualizar `src/routes/index.tsx` com a landing page completa
- Adicionar meta tags apropriados no head