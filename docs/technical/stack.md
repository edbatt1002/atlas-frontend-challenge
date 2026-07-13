# Stack técnica

O que é usado, como é usado e por que foi escolhido — por camada.

## Framework: Nuxt 4

**O que:** Nuxt 4, `srcDir=app/`, SSR universal via Nitro.
**Como:** projeto organizado em Nuxt Layers (`layers/`), cada domínio isolado com seu próprio `app/` (components, composables, pages) e `server/api/*` (rotas mock). Ver `docs/architecture/layers.md`.
**Por quê:** SSR real é requisito de produto — o deep-link do perfil precisa renderizar no servidor pra SEO e pra pré-visualização correta quando compartilhado (WhatsApp, Telegram). Nuxt dá isso de graça, mais auto-import de composables/componentes (menos boilerplate de import) e file-based routing.

## UI: NuxtUI 4 + Tailwind v4

**O que:** NuxtUI como base de componentes (temável via Reka UI por baixo), Tailwind v4 pra tokens/utility classes.
**Como:** tokens de design (`@theme` em `layers/shared/app/assets/css/main.css`) mapeados pros CSS vars que o NuxtUI consome (`--ui-primary`, etc.). Onde o NuxtUI não cobre um padrão específico do domínio (badge online sobre foto, price tag, rating star), componente Tailwind próprio.
**Por quê:** regra do projeto é "NuxtUI primeiro" — antes de construir algo do zero, auditar se um primitivo do NuxtUI resolve (`UDrawer`, `UChip`, `UTabs`, `USlider`, `URadioGroup` foram adotados assim, substituindo código hand-rolled). Ganho real: acessibilidade e gestos (touch/mouse) de graça, menos CSS/JS pra manter.

## Dados: Faker + rotas Nitro (não é mock de rede)

**O que:** `@faker-js/faker` (seed fixa, determinístico) + `@mswjs/data` pra gerar e consultar 600 perfis fictícios em memória.
**Como:** cada layer expõe rotas Nitro reais (`server/api/*.get.ts`) que leem desse repositório em memória. Não tem interceptação de rede (nem MSW nem service worker) rodando em dev/build/produção — a rota responde de verdade, só que os dados por trás são sintéticos.
**Por quê:** simula uma API real sem precisar de backend. MSW (`mocks/handlers.ts`) ainda existe, mas só é usado nos testes (tier-node do Vitest) pra interceptar o `$fetch` sem subir servidor.

## Data-fetching: TanStack Query atrás de um seam

**O que:** `@tanstack/vue-query` pra cache/estado de requisição client+SSR.
**Como:** nunca importado direto em página/componente — sempre via `useServerQuery`/`useServerInfiniteQuery` (contrato próprio, definido em `layers/shared`).
**Por quê:** trocar de lib de data-fetching no futuro não deveria exigir tocar em componente nenhum. O seam isola a decisão de biblioteca do resto do app.

## Carrossel: Swiper atrás de facade

**O que:** `swiper` (API `swiper/vue`).
**Como:** isolado dentro de `layers/shared/app/components/ui/Carousel/` — consumidores usam `<UiCarousel>`/`<UiCarouselSlide>`, nunca importam `swiper` direto.
**Por quê:** mesma lógica do seam de dados, aplicada a UI de terceiro.

## Virtualização: TanStack Virtual

**O que:** `@tanstack/vue-virtual`, windowing por linha (não por item).
**Como:** o catálogo tem scroll infinito puro sobre 600 perfis; sem virtualização, cada card monta um `Swiper` próprio — centenas de instâncias simultâneas no DOM depois de várias páginas carregadas. Renderiza normal (sem virtualização) no SSR pra não perder LCP/SEO, troca pra versão virtualizada só depois de montar no client.
**Por quê:** trade-off aceito conscientemente — perfil (4-12 fotos) não precisa disso e não usa; catálogo (600 itens, scroll infinito sem paginação) é o caso real onde compensa.

## Testes: Vitest (2 tiers) + Playwright

**O que:** Vitest via `@nuxt/test-utils` em 2 tiers (`*.test.ts` node-tier, `*.nuxt.test.ts` nuxt-tier), Playwright pra e2e (incl. auditoria de acessibilidade via `@axe-core/playwright`).
**Como:** padrão AAA por estrutura (sem rótulo em comentário). Detalhe completo em `docs/technical/testing-strategy.md`.
**Por quê:** cobertura de lógica pura sem o custo de montar Nuxt (tier node, rápido) + cobertura de comportamento reativo real onde precisa (tier nuxt) + e2e validando o fluxo ponta a ponta contra o build real, não contra mock de componente.

## Imagens: `@nuxt/image` sem transformação em runtime

**O que:** `@nuxt/image` com `provider: 'none'`.
**Como:** fotos locais (`public/images/professionals/pilot-NN/`) já saem pré-geradas em WebP no tamanho certo. `NuxtImg` continua em uso pelos outros benefícios (`width`/`height` explícitos contra CLS, `loading`/`fetchpriority`, `sizes` calculado por componente).
**Por quê:** testamos processamento via IPX (resize/reencode on-the-fly) e revertemos — deploy do servidor caiu de ~56MB pra ~12MB, LCP melhorou, sem perda de qualidade visual (as imagens já nascem otimizadas). Detalhe completo em `docs/architecture/image-delivery.md`.

## Qualidade: ESLint + eslint-plugin-boundaries

**O que:** ESLint (flat config via `@nuxt/eslint`) + `eslint-plugin-boundaries` v7.
**Como:** regra `boundaries/dependencies` impede import cross-feature (`professionals` não pode importar de `institutional`, por exemplo) — só `shared` é importável por qualquer feature.
**Por quê:** o projeto é um modular monolith; sem essa trava, a separação por layer vira só uma convenção de pasta que qualquer PR pode furar sem ninguém notar. O lint falha o build se isso acontecer.

## Deploy local: Docker

**O que:** `Dockerfile` multi-stage (deps → build → runtime standalone do Nitro) + `docker-compose.yml`/`docker-compose.dev.yml`.
**Como:** ver `docs/docker.md`.
**Por quê:** paridade entre ambiente local e o que rodaria em produção, sem depender de Node instalado na máquina de quem for rodar/avaliar o projeto.
