# Estratégia de testes

## Padrão AAA

Todo teste segue Arrange-Act-Assert **por estrutura** (blocos separados por linha em branco), sem rótulo em comentário (`// Arrange`, `// Act`, `// Assert`). A estrutura já comunica a intenção; comentário redundante só teria que ser mantido em sincronia com o código, sem ganho real de clareza.

## Dois tiers, escolhidos pelo sufixo do arquivo

O sufixo decide o tier — **não** a natureza do teste (pura vs reativa):

| Sufixo | Tier | Quando usar |
|---|---|---|
| `*.test.ts` | **node** | Fonte puro de verdade: utils, services, helpers sem nada de Nuxt. Também onde a integração MSW intercepta (só roda aqui). |
| `*.nuxt.test.ts` | **nuxt** | `mountSuspended`, auto-import/NuxtUI, composables reativos. Se o mesmo arquivo-fonte também exporta lógica pura, os `describe` dela ficam **junto** nesse mesmo arquivo — custo de rodar no tier nuxt é desprezível, e evita 2 arquivos de teste pro mesmo fonte. |

Regra fixa: **um arquivo de teste por arquivo-fonte**, nomeado como o fonte.

## O que testar

Lógica pura, services/API client, composables, componentes. **Não** testar mocks/handlers/factory do MSW — não são core da aplicação, testar isso é testar a ferramenta de mock, não o produto.

## Integração de dados mockados em teste

`setupMockApi()` (de `~~/mocks/testServer`) sobe o MSW server, cuida do lifecycle (`beforeAll`/`afterEach`/`afterAll`) e faz stub do `$fetch` — retorna o `server` pra quem precisar de `server.use(...)` num teste específico (simular erro/404). Fonte dos handlers: `mocks/handlers.ts` (raiz), único lugar que precisa mudar quando um domínio novo ganha rota mock.

Fora do teste (dev/build/produção), esse mesmo comportamento vem de rotas Nitro reais (`server/api/*.get.ts`) — MSW não intercepta nada ali. Ver `docs/technical/stack.md`.

## E2E (Playwright)

Sobe o **build real** (`node .output/server/index.mjs`) e testa contra ele — não contra `npm run dev`. Cobre 3 fluxos (catálogo, home, perfil) mais uma auditoria de acessibilidade (`@axe-core/playwright`, tags WCAG 2.1 A/AA) que varre todas as rotas estáticas do app, e uma verificação de navegação (cada rota responde sem erro de console).

`e2e/` na raiz do projeto é pra specs que varrem múltiplos layers de uma vez (acessibilidade, navegação, página de erro global). Cada layer tem seu próprio `e2e/` pros fluxos que pertencem só a ele (`layers/professionals/e2e/` cobre catálogo/home/perfil; `layers/shared/e2e/` cobre o toggle de tema).

## Gotchas reais encontrados no caminho

Esses não são regra genérica de Vue/Nuxt — foram descobertos rodando o projeto de verdade, vale registrar pra não repetir a investigação:

- **Overlay do NuxtUI (`UDrawer`, `UModal`, ...) precisa de `<UApp>` real como ancestral no teste.** Esses componentes fazem `Teleport` pra um alvo injetado por `<UApp>`; sem ele, o Teleport não renderiza nada, **silenciosamente** (sem erro, só texto vazio). Import explícito (`import UApp from '@nuxt/ui/components/App.vue'`), não `resolveComponent('UApp')` — auto-import é transformação em compile-time, invisível pro `resolveComponent` em runtime.
- **`mockNuxtImport('useRuntimeConfig', ...)` fica por-arquivo**, nunca em setup global — quebra o boot do Nuxt no tier nuxt, e o tier node não tem app Nuxt pra alcançar de qualquer forma.
- **Stub de Web API do browser já capturada por referência** (ex.: `navigator.geolocation`, quando VueUse já importou o módulo): `vi.stubGlobal('navigator', {...})` troca o binding global mas não afeta quem já guardou a referência antiga. `Object.defineProperty(navigator, 'geolocation', { value: ..., configurable: true })` muta o objeto existente, visível por qualquer referência já capturada. happy-dom também pode ter a propriedade presente mas `null` — `"x" in navigator` dá `true` mesmo sem suporte real, não confiar só nisso.

## Cobertura

`@vitest/coverage-v8`, script `npm run test:coverage`. Sobe no CI (job `quality`, artifact `coverage-report`). Composables de framework-glue puro (adapters do TanStack, plugin de boot) ficam com cobertura menor de propósito — ROI baixo pra testar binding de biblioteca de terceiro que já é exercitado indiretamente pelos testes de service/composable que o usam.
