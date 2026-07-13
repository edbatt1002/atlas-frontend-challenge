# CLAUDE.md — Regras do projeto onluxe

Guia obrigatório para qualquer agente/modelo trabalhando neste repositório.

## Comentários no código

- **Default: nenhum comentário.** Código deve se explicar por nomes e estrutura.
- **Antes de adicionar QUALQUER comentário:** explicar ao usuário o porquê e **obter aprovação explícita**. Só adicionar depois do OK.
- Não reintroduzir comentários já removidos.
- Não usar comentários `// Arrange` / `// Act` / `// Assert` — o padrão AAA aparece só pela estrutura (blocos separados por linha em branco).

## Princípios

- **Baixo acoplamento, alta coesão.** Isolar responsabilidades: lógica pura (mapeamentos, cálculos, regras) fica em funções **independentes de Vue/framework**, testáveis sem montar Nuxt. Composables/componentes são a camada reativa fina que apenas orquestra — o Vue é intrínseco a eles, então NÃO tente torná-los Vue-free; extraia o miolo puro e teste-o (ex.: `filtersToQuery`, `getNextProfessionalsPage`). Libs de terceiros atrás de seam/facade (dados = seam TanStack; carrossel = facade `Carousel` em `shared/ui`).

## Componentes (estrutura em pasta)

Cada componente vive numa **pasta com o próprio nome**, com até 4 arquivos:
- `NomeComponente/NomeComponente.vue` — template + lógica. Importa types, config e utils.
- `NomeComponente/types.ts` — tipos do componente (props, emits, e qualquer tipo referente a ele).
- `NomeComponente/config.ts` — valores fixos / constantes / config que só fazem sentido p/ ele (ex.: listas de opções, limites).
- `NomeComponente/utils.ts` *(opcional)* — lógica pura extraída do componente, testável no tier **node** sem montar Nuxt (ex.: `getCardPhotos`, `getSegmentState`, `getActiveIndexFromSlideChange`). Só criar quando há lógica genuinamente pura a isolar (ver Princípios → baixo acoplamento).

O `.vue` fica limpo, só template + fiação. Testes em `NomeComponente/__tests__/`.

**Componentes de apoio (skeleton, variantes) moram DENTRO do componente que ilustram/acompanham**, não soltos na raiz de `components/`. Ex.: `ProfessionalCard/Skeleton/Skeleton.vue`, não `ProfessionalCardSkeleton/ProfessionalCardSkeleton.vue`. Aproveita a mesma regra de nesting abaixo p/ o auto-import continuar gerando o nome esperado.

**Auto-import e nesting — cuidado:** Nuxt deduplica pasta+arquivo de mesmo nome (`NomeComponente/NomeComponente.vue` → `<NomeComponente>`) só quando essa pasta está **direto** dentro de `components/`. Cada nível de agrupamento acima disso vira **prefixo** no nome final: `components/layout/Header/Header.vue` → `<LayoutHeader>`; `components/ProfessionalCard/Skeleton/Skeleton.vue` → `<ProfessionalCardSkeleton>` (prefixo = todos os segmentos entre `components/` e a pasta final, exceto o próprio nome do arquivo/pasta deduplicado).

**Cuidado para não duplicar o prefixo:** se a pasta pai já representa o prefixo que você quer no nome final, **não repita esse prefixo no nome da subpasta**. Ex.: `components/ui/Carousel/Carousel.vue` → `<UiCarousel>` (certo — `ui` já vira `Ui`). Nomear a subpasta `UiCarousel` (`components/ui/UiCarousel/UiCarousel.vue`) gera `<UiUiCarousel>` (prefixo duplicado, bug real já cometido neste projeto).

Usar o nome errado **falha silenciosamente**: sem componente resolvido, sem warning visível em prod, a tag só é renderizada literal (lowercase) no HTML. **Sempre conferir o SSR real** (`curl localhost:3000/rota | grep`) depois de criar, mover ou renomear um componente aninhado — typecheck/lint/test não pegam esse erro. Depois de mover/renomear uma pasta de componente, rodar `rm -rf .nuxt && npm run postinstall` antes de testar — o registro de auto-import fica em cache e não se atualiza sozinho.

**Lógica pura só sobe p/ `layers/shared/app/utils/*.ts` quando há um segundo consumidor REAL** (não hipotético) fora do componente-dono — convenção de auto-import do Nuxt (como `composables/`), disponível globalmente sem import explícito. **Antes de promover, `grep` os usos reais** — não promova preventivamente "pra caso alguém mais precise depois"; isso já causou 1 erro real neste projeto (`getPrevCarouselIndex`/`getNextCarouselIndex` promovidos p/ `shared/app/utils/carousel.ts` achando que `ProfessionalCard` também usaria, mas um refactor posterior deixou o facade `Carousel` como único consumidor — teve que voltar pra `Carousel/utils.ts`). Se só 1 componente usa, a lógica fica na pasta dele (`utils.ts` local). Não faça um componente de `professionals` importar (relativo, cross-layer) um `utils.ts` de dentro da pasta privada de um componente do `shared` — isso vaza um detalhe de implementação através da fronteira do layer; se o caso genuinamente pede compartilhamento, promova pra `shared/app/utils/`.

## Componentização — separação de responsabilidades e reutilização

Regra permanente para QUALQUER tela/feature nova. Antes de escrever um `.vue`, decompor a UI em componentes coesos — **não** despejar uma página inteira num único arquivo gigante.

- **Um componente = uma responsabilidade.** Cada bloco visual/semântico distinto (header, seção "Sobre", grade de galeria, barra de CTA, card de avaliação, chip de característica) é seu próprio componente com nome próprio. Se um `.vue` passa de ~150 linhas de template ou mistura vários blocos independentes, quebrar. A **página** (`pages/*.vue`) é só **orquestração**: busca dados via composable, trata estados (loading/erro/404) e compõe os componentes filhos — sem markup de detalhe.
- **Extrair para reutilizar, não duplicar.** Antes de criar markup, `grep` se um componente equivalente já existe (ex.: estrela de rating, badge online, chip verified, avatar, bloco de valores). Se o mesmo padrão aparece em 2+ lugares (ex.: badge "online" no card E no perfil; avatar no perfil E na home), extrair p/ **um** componente reutilizável no layer certo (`shared` se cross-feature; senão dentro da feature). **Só extrair no 2º uso real** (mesma regra de promoção de lógica pura acima) — não criar abstração especulativa no 1º uso.
- **Onde mora o componente reutilizável:** primitivo genérico sem domínio (avatar, star-rating, badge, chip) → `layers/shared/app/components/ui/`. Peça específica do domínio profissionais usada por 2+ telas da feature (ex.: `ProfessionalContactButtons`, `ProfessionalGalleryGrid`) → dentro do layer `professionals`, na raiz de `components/` da feature. Sub-bloco usado só por 1 componente-pai → **aninhado** dentro da pasta dele (ex.: `ProfessionalProfile/GallerySection/`), seguindo a regra de nesting/prefixo acima.
- **Props pra dentro, eventos pra fora.** Componente filho recebe dados por props e comunica intenção por `emit` — não busca dado próprio nem muta estado global direto (salvo composable de estado compartilhado explícito, ex.: `useHeaderVisibility`). Mantém o filho testável em isolamento (montar com props, assertar render + `emitted()`).
- **Componentes "burros" (quando possível): sem fetch de dados de servidor.** Chamar `useServerQuery`/`useServerInfiniteQuery` (ou qualquer composable que envolva `$fetch`/API) é responsabilidade da **página**, não do componente. A página busca os dados (via composable) e passa pronto por props; o componente só renderiza. Objetivo: componente testável com props estáticas (sem mock de rede/composable), reutilizável em qualquer contexto (SSR, storybook futuro, outra página) sem acoplar a uma chamada de API específica. Composables de **estado compartilhado de UI** (`useHeaderVisibility`, `useBottomNavVisibility`) não entram nessa regra — não são fetch de servidor. "Quando possível" reconhece exceções pragmáticas já existentes no projeto (ex.: `ProfessionalsCatalog` busca sua própria página via `useProfessionals` pelo scroll infinito) — não é retroativo automático, mas é o padrão para componentes novos ou refatorados.
- **NuxtUI primeiro** (regra de Design abaixo): antes de construir um bloco do zero, checar se um primitivo do NuxtUI já resolve — só então criar componente Tailwind próprio.

## Boas práticas JS

- **Nunca** iniciar objeto vazio e ir adicionando chaves. Definir o **shape completo na construção** (ex.: object literal com spreads condicionais `...(cond ? { k: v } : {})`), não `const o = {}; o.k = v`.
- **Não importar APIs do Vue** (`ref`, `computed`, `reactive`, `watch`, `toValue`, lifecycle) nem os tipos (`Ref`, `MaybeRefOrGetter`, …) de `'vue'` — o Nuxt auto-importa valores **e** tipos. Só importar de terceiros que não são auto-import (ex.: `@tanstack/vue-query`, `ofetch`, `swiper`). Fontes via `@nuxt/fonts` (não usar `@import` de Google Fonts no CSS).
- **Não importar utilitários do Vitest** (`describe`, `it`, `expect`, `vi`, `beforeAll`, `afterEach`, …) de `'vitest'` em arquivos `*.test.ts`/`*.nuxt.test.ts` — `test.globals: true` (`vitest.config.ts`) + `types: ['vitest/globals']` (`nuxt.config.ts` → `typescript.tsConfig`) os tornam globais, com tipos. **Exceção:** módulos helper de teste que não são o próprio arquivo `*.test.ts` (ex.: `mocks/testServer.ts`) continuam com import explícito — não dependem do runner injetar globals no processo que os carrega.

## Testes

- Padrão **AAA** por estrutura (ver regra de comentários acima).
- **Não testar** mocks, handlers e factory do MSW — não são core.
- Testar: lógica pura, services/API client, composables, componentes.
- **UM arquivo de teste por arquivo-fonte** (nomeado como o fonte). Se o fonte exporta lógica pura **e** algo que precisa de Nuxt (composable reativo, componente), o **único** arquivo é `*.nuxt.test.ts` e contém **ambos** — os `describe` das funções puras (ex.: `filtersToQuery`, `getNextProfessionalsPage`, `buildProfessionalSeoTitle`, `shouldShowHeader`) ficam junto do `describe` do composable no mesmo arquivo. **Não** criar um `.test.ts` só pra parte pura de um fonte que também tem composable — isso vira 2 arquivos pro mesmo fonte (dois lugares pra manter, sem ganho). As puras rodam no tier-nuxt junto (custo desprezível). Fonte **puro de verdade** (utils, services, helpers sem nada de Nuxt) → 1 arquivo `*.test.ts` no tier-node.
- Dois tiers via `@nuxt/test-utils` (o **sufixo escolhe o tier**, não a natureza do teste):
  - `*.test.ts` → tier **node** (fonte puro; integração MSW só intercepta aqui).
  - `*.nuxt.test.ts` → tier **nuxt** (`mountSuspended`, auto-import/NuxtUI, composables reativos — e as puras do mesmo fonte junto).
- Integração MSW (tier-node): usar `setupMockApi()` de `~~/mocks/testServer` (server + lifecycle + stub `$fetch`, retorna server p/ `server.use`). Fonte de handlers: `mocks/handlers.ts`.
- `mockNuxtImport('useRuntimeConfig', ...)` fica **por-arquivo** nos testes tier-node — não pode ir p/ setup global (quebra o boot do Nuxt no tier-nuxt) e `$test`/`environmentOptions` não alcança o tier-node (sem app Nuxt → `[nuxt] instance unavailable`). Config Nuxt (`$test`) só serve p/ testes que bootam o Nuxt (tier-nuxt).
- **Stubar propriedade de Web API do browser em teste** (ex.: `navigator.geolocation`): usar `Object.defineProperty(navigator, 'x', { value: ..., configurable: true })`, **não** `vi.stubGlobal('navigator', {...})`. Se a lib (ex. VueUse) já capturou uma referência ao objeto `navigator` no momento do import do módulo, `vi.stubGlobal` troca a *binding* global mas não afeta quem já guardou a referência antiga — `Object.defineProperty` muta a propriedade no mesmo objeto, visível por qualquer referência existente. Cuidado extra: happy-dom pode ter propriedades de Web API **presentes mas `null`** (`"x" in navigator` dá `true` mesmo sem suporte real) — não confiar só em `in`/`typeof`; testar o comportamento real.
- **Testar componente que usa overlay do NuxtUI (`UDrawer`, `UModal`, `USlideover`, `UPopover`...):** precisa de **`<UApp>` real como ancestral** — esses componentes fazem `Teleport` p/ um alvo injetado por `<UApp>` (`portalTargetInjectionKey`); sem ele, `Teleport :to="undefined"` não renderiza nada, silenciosamente (texto vazio, sem erro). Importar `UApp` explicitamente (`import UApp from '@nuxt/ui/components/App.vue'`) — **não** `resolveComponent('UApp')`, que só resolve componentes registrados em runtime; auto-import do Nuxt é transformação em *compile-time*, invisível pro `resolveComponent`. Resto do handling de conteúdo teleportado (`DOMWrapper(document.body)`, `findComponent()` pra `emitted()`, `attachTo`+`unmount` no `afterEach`) é o padrão genérico — ver skill `vue-testing-best-practices`.

## Dados / fetch

- **Seam neutro** no layer `shared`: `useServerQuery` / `useServerInfiniteQuery`. Pages/composables **não** importam lib de dados direto.
- Adapter: **só TanStack Query** (native removido; sem flag `dataAdapter`).
- **Sem builders manuais de query:** passar o objeto de params direto ao `$fetch`/`useApi` (`query: params`) — ofetch já descarta `undefined` e serializa number. O composable de filtros monta `params` só com valores ativos (omite vazios) p/ queryKey limpa.
- `useApi` retorna `{ data, error }` (Go-style). Services lançam no erro.
- **Vocabulário da API = `snake_case` + inglês.** Query params/keys que trafegam na request pro backend (`ProfessionalListParams`, valores de `ProfessionalSort`, etc.) usam `snake_case` inglês (`min_price`, `max_price`, `min_rating`, `sort=featured|newest|nearest|rating|price`). Escopo: só o que vira **wire format** (params de request). Estado interno de composable/componente (`ProfessionalFilterState`, models de UI) continua `camelCase` idiomático — a tradução acontece no ponto de saída (ex.: `filtersToQuery`). Labels de UI continuam em português (design). Rota Nuxt (`router.replace`) espelha os mesmos nomes da query da API — ler e escrever com a **mesma chave**.
- **Rota com `routeRules: { swr: N }` (hoje só `/`) cacheia o HTML renderizado em disco** (`.nuxt/cache`), não em memória — sobrevive a restart do `npm run dev`. Sintoma: editar um componente usado nessa rota (ex. `HomeHero`, `BottomCta`) e não ver a mudança mesmo após reiniciar o dev server, confirmado via `curl` direto (HTML idêntico ao pré-edit mesmo em processo novo). **Fix definitivo:** `swr` só é aplicado em `process.env.NODE_ENV === 'production'` (`nuxt.config.ts`) — dev nunca cacheia, prod mantém o `swr` de 24h. **Cuidado:** `import.meta.dev` **não funciona** dentro de `nuxt.config.ts` (roda fora do pipeline de transformação do Nuxt, resolve `undefined`/falsy sempre) — só é confiável dentro de código de app (componentes/composables/plugins); pra lógica condicional no próprio `nuxt.config.ts`, usar `process.env.NODE_ENV`.

## Arquitetura (Nuxt Layers, modular monolith)

- Nuxt 4, `srcDir=app/`. Cada layer: código em `layers/<x>/app/`; `mock/` na raiz do layer.
- Ordem `extends`: `shared` (fundação) → features. Novo domínio = novo `layers/<domínio>/` + append.
- **E2E (Playwright) na raiz de cada layer** (`layers/<x>/e2e/*.spec.ts`), mesmo padrão do `mock/` — testa páginas/fluxos daquele layer (`layers/professionals/e2e/` cobre catálogo/home/perfil; `layers/shared/e2e/` cobre componentes cross-cutting como o toggle de tema no Header). **`e2e/` na raiz do projeto fica pro que varre múltiplos layers de uma vez** (`accessibility.spec.ts`/`navigation.spec.ts` percorrem todas as rotas do app; `error.spec.ts` cobre a página de erro global, que não pertence a layer nenhum). `playwright.config.ts` usa `testMatch: ['e2e/**/*.spec.ts', 'layers/*/e2e/**/*.spec.ts']` (não dá pra usar só `testDir`, precisa varrer as duas fontes). `vitest.config.ts` exclui ambos os globs (senão o vitest tenta rodar `.spec.ts` como teste unit).
- **eslint-boundaries v7** (`boundaries/dependencies`): `shared`→`shared`, `feature`→`shared`. Sem feature→feature. Elements: `shared` antes de `feature` (ordem importa na classificação).
- **Dados servidos por rotas Nitro reais** (`server/api/*.get.ts` em cada layer), lendo direto do repositório gerado por Faker — sem interceptação de rede em dev/build/produção. MSW (`mocks/handlers.ts`, fonte única na raiz) entra só nos testes (tier-node, via `setupMockApi()`), interceptando sobre esse mesmo repositório. Novo domínio = 1 edição em `mocks/handlers.ts` + suas rotas `server/api/*`.

## Fluxo de trabalho

- **Nunca commitar.** Commits só pelo usuário, como `edbatt1002`. Deixar mudanças no working tree.
- Parar em cada gate de etapa p/ revisão do usuário; não avançar sem ordem explícita.
- A cada etapa: escrever testes do que foi criado/alterado.
- Verificação antes de parar: `npm run lint` + `npm run typecheck` + `npm run test` verdes; `npm run build` real quando mexer em MSW/Nitro/plugins de servidor.

## Design

- Tokens/UI seguem `design/catalogo-profissionais/`. **NuxtUI** mantido (temável; primitivos acessíveis). Cards/pills/chips específicos do domínio = componentes Tailwind próprios.
- **Antes de construir algo do zero, verificar se o NuxtUI já resolve** — auditar de verdade (`find`/`grep -l` nos componentes instalados em `node_modules/@nuxt/ui`, ler o `.vue`/`.d.ts` real), não supor pelo nome. Exemplos já usados: `UChip` (badge posicionado sobre outro elemento — substituiu um badge `absolute` custom), `UDrawer` (bottom-sheet com drag-to-close nativo via vaul-vue — substituiu backdrop+transition+handle hand-rolled). Ganho real: menos CSS/JS pra manter, a11y e gestos (touch+mouse) de graça.
- Paginação: **scroll infinito puro** (IntersectionObserver), sem botão "Carregar mais".
- **Scroll-spy / observar o que está visível durante o scroll:** usar `useIntersectionObserver` (com `root` apontando pro container scrollável e `rootMargin` negativo pra estreitar a "linha de leitura"), não cálculo manual de `offsetTop`/`scrollTop`. Puro CSS não cobre isso de forma cross-browser (só `animation-timeline: view()`, suporte limitado). Mesmo padrão já usado no infinite-scroll do catálogo.
- **Lógica de direção de scroll (mostrar/esconder algo conforme rola pra cima/baixo) precisa de histerese** — sem isso, micro-deltas de scroll (trackpad, inércia) fazem o estado oscilar a cada frame, causando "tremor" visual (o elemento reflow repetidamente). Usar `throttle` no `useScroll` + uma **dead-zone** mínima de pixels antes de aceitar uma mudança de direção (não confiar em comparar só o sinal do delta cru frame a frame).

## Layout / CSS

- **Esconder um elemento `sticky`/fixo pra "liberar espaço" pro próximo elemento sticky ocupar:** usar colapso de `max-height` (`overflow-hidden` + `transition-[max-height]`), **não** `transform: translate`. Transform desloca visualmente mas mantém o espaço reservado no fluxo do layout — o próximo `sticky top-0` da sequência não "sobe". Max-height 0 remove o espaço de verdade. Usado no header do site (recolhe no scroll do catálogo) pra a toolbar do catálogo ocupar o lugar dele.

## Acessibilidade / HTML

- **Nunca envolver um card/bloco inteiro (com controles internos) num único `<a>`/`<button>`** (nesting de elemento interativo — ver skill `accessibility`). Em vez disso: `<NuxtLink>`/`<button>` pontuais e independentes (irmãos, não pai-filho) cobrindo cada affordance real (ex.: card com carrossel = `<NuxtLink>` só no CTA e no bloco de texto; controles do carrossel = `<button>` de verdade, siblings). **Verificar sempre parseando o HTML SSR real** (`curl localhost:3000/rota | grep`, não só visualmente) — confirmando 0 `<button>`/`<a>` dentro de outro `<a>`.
- Controles de navegação/ação (prev/next, favoritar, etc.) são **sempre `<button type="button">`**, nunca `div[role=button]` — só usar o fallback ARIA quando a reestruturação do HTML pra evitar nesting for genuinamente inviável (situação rara; questionar antes de aceitar).

## Imagens / performance

- **Foto real de profissional → sempre `<NuxtImg>`, nunca `<img>` cru.** `@nuxt/image` com `provider: 'none'` — as imagens locais (`public/images/professionals/pilot-NN/`) já saem pré-geradas em WebP no tamanho certo; não tem transformação em runtime (testamos via IPX e revertemos: só adicionava latência sem ganho, ver `docs/architecture/image-delivery.md`). `NuxtImg` continua valendo pelos outros benefícios: `width`/`height` explícitos (evita CLS), `loading`/`fetchpriority`, `densities`. **Logos SVG locais (Header/Footer) ficam de fora** — `<img>` cru continua correto ali.
- **`sizes` reflete o layout real, não um chute:** grid do card = `sm:100vw md:50vw lg:33vw xl:25vw` (1→4 colunas); grid de galeria (3 col) = `33vw`/`25vw` fixo; capa/feed full-bleed = `100vw`. Errar o `sizes` faz o browser baixar uma variante maior que o necessário — sempre calcular a partir do grid real do componente, não copiar um valor genérico.
- **Carrossel/galeria: carregar sob demanda.** Só a 1ª imagem (a visível) carrega no mount; as demais só quando o usuário navegar até elas (ex.: `Set<number>` de índices já visitados). Reduz payload inicial de cards com múltiplas fotos.
- **Prioridade de imagem acima da dobra** (`loading="eager"` + `fetchpriority="high"` na 1ª imagem visível, `lazy` no resto — padrão coberto por `perf-web-optimization`/`core-web-vitals`): aplicado nas primeiras N linhas da grid, viabilizado pelo SSR (tag já existe no HTML inicial pro preload scanner pegar).
