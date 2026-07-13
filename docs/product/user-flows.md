# Fluxos de usuário

Como o usuário se comporta na tela pra atingir um objetivo — passo a passo, ligado às telas/rotas reais do app.

## Fluxo principal: descobrir e contatar um profissional

**Objetivo do usuário:** encontrar um profissional que atenda um critério (profissão, preço, avaliação, proximidade) e iniciar contato.

```mermaid
flowchart TD
    A["/ — Home"] -->|"clica 'Explorar' ou busca por região"| B["/buscar — Catálogo"]
    B -->|"digita busca e/ou abre filtros"| C["Sheet de filtros<br/>(profissão, status, preço, avaliação)"]
    C -->|"aplica filtro"| B
    B -->|"abre sheet de ordenação"| D["Sheet de ordenação<br/>(Destaques/Novidades/Próximos/Avaliação/Valor)"]
    D -->|"seleciona critério, fecha sozinho"| B
    B -->|"rola a lista"| E["scroll infinito carrega<br/>mais resultados automaticamente"]
    E --> B
    B -->|"clica no card ou no CTA do carrossel"| F["/{id}/{slug} — Perfil"]
    F -->|"navega pelas abas<br/>(Fotos e vídeos / Sobre mim / Avaliações)"| F
    F -->|"clica em WhatsApp ou Telegram"| G["Deep-link externo<br/>wa.me / t.me"]
```

**Pontos de decisão do usuário:**
- Confia na busca por texto (já sabe o que quer) → vai direto pro campo de busca.
- Não sabe exatamente o que quer → usa filtros/ordenação pra reduzir opções.
- Quer algo perto → usa "Próximos de mim" (geolocalização) em vez de digitar região.

**O que garante que o usuário não trava:**
- Scroll infinito elimina o passo de "clicar em carregar mais" — a barreira de continuar explorando é zero.
- Filtro e busca ficam sempre visíveis (toolbar sticky), mesmo rolando a lista — o usuário nunca precisa voltar ao topo pra ajustar o critério.
- Contato é 1 clique direto pro app externo (WhatsApp/Telegram) — sem formulário intermediário, sem cadastro.

## Fluxo secundário: explorar a galeria de um profissional

**Objetivo do usuário:** ver mais fotos/vídeos de um profissional específico antes de decidir.

```mermaid
flowchart TD
    A["Perfil — aba 'Fotos e vídeos'"] -->|"clica numa foto ou em<br/>'Ver toda a galeria'"| B["Lightbox em tela cheia"]
    B -->|"alterna Grade ↔ Feed"| B
    B -->|"filtra Todas / Fotos / Vídeos"| B
    B -->|"rola o feed (scroll-snap)"| B
    B -->|"fecha (X ou backdrop)"| A
```

**Por que grade e feed, não só um formato:** grade favorece varredura rápida (quero ver tudo de uma vez); feed favorece imersão (quero olhar uma foto de cada vez, tela cheia). O usuário escolhe conforme a intenção do momento.

## Fluxo de recuperação de erro: link de perfil inválido

**Objetivo do usuário:** entender o que aconteceu quando um link (compartilhado ou digitado errado) não corresponde a nenhum profissional real.

```mermaid
flowchart TD
    A["Usuário acessa /{id-inexistente}/{slug}"] --> B{"id existe no catálogo?"}
    B -->|"não"| C["Estado 404 tratado:<br/>'Profissional não encontrado'"]
    B -->|"sim, mas slug errado"| D["Perfil renderiza normalmente<br/>(slug é só cosmético/SEO, id é a chave real)"]
```

O slug no fim da URL nunca é validado — só o `id` importa pra buscar o profissional certo. Isso significa que um link com nome desatualizado (profissional trocou de nome) continua funcionando, só com a URL "desatualizada" na aparência.

## Navegação persistente (mobile)

A barra inferior (Explorar `/` · Buscar `/buscar` · Favoritos `/favoritos` · Chat) fica fixa em toda a navegação, exceto dentro do perfil de um profissional — lá ela dá lugar à barra fixa de contato (preço + CTA), porque nesse contexto a ação prioritária do usuário deixa de ser "trocar de área do app" e passa a ser "agir sobre este profissional".
