# Estratégia de geração e entrega de imagens

## Contexto

O catálogo apresenta centenas de profissionais e depende fortemente das imagens para
a experiência de descoberta. As fotografias influenciam o Largest Contentful Paint
(LCP), a estabilidade do layout, a percepção de qualidade e a previsibilidade das
auditorias executadas no CI.

Durante o desenvolvimento, o projeto utilizou imagens remotas do Picsum transformadas
em runtime pelo provider IPX do Nuxt Image. Esse fluxo era adequado como placeholder
inicial, mas adicionava várias etapas ao caminho crítico:

```text
Navegador
  → servidor Nuxt /_ipx
  → origem remota Picsum
  → download do original
  → redimensionamento e codificação
  → resposta transformada
```

Além da latência externa, as auditorias com cache frio repetiam parte desse trabalho.
Isso tornava o resultado sensível à rede e ao tempo de transformação, fatores que não
representam a qualidade do front-end que está sendo avaliado.

## Decisão

O protótipo utiliza um conjunto próprio de pessoas fictícias, geradas por IA e
versionadas no repositório. As imagens são redimensionadas e codificadas em WebP antes
do build. A aplicação entrega o arquivo final diretamente, sem transformação IPX em
runtime.

```text
Imagem sintética original
  → seleção e revisão visual
  → crop nas dimensões da interface
  → WebP pré-gerado
  → public/images/professionals
  → CDN da plataforma de deploy
  → navegador
```

Essa escolha não pressupõe que arquivos locais sejam sempre superiores a URLs
externas. Em produção, as imagens normalmente seriam armazenadas em object storage e
distribuídas por um CDN de mídia. Os assets estáticos deste protótipo simulam o estado
final desse pipeline: variantes pequenas, previsíveis e prontas para entrega.

Ao publicar o projeto em uma plataforma como Vercel, Netlify ou Cloudflare Pages, os
arquivos públicos podem ser distribuídos pela infraestrutura de CDN da própria
plataforma, embora continuem referenciados por caminhos relativos na aplicação.

## Por que não usar um catálogo remoto gratuito

Serviços de placeholder não oferecem simultaneamente estabilidade, performance e
controle de uso da imagem. Também seria inadequado associar a fotografia de uma pessoa
real a um perfil fictício em um catálogo de contexto adulto.

O conjunto sintético permite:

- representar somente pessoas adultas e fictícias;
- manter uma direção sensual e sofisticada sem conteúdo explícito;
- controlar diversidade, enquadramento e coerência visual;
- evitar associação indevida de pessoas reais ao serviço;
- executar o projeto e os testes sem depender de terceiros;
- reproduzir as mesmas métricas no desenvolvimento, no CI e na apresentação;
- documentar claramente o uso de IA na entrega.

## Organização dos assets

Cada identidade possui seu próprio diretório. Todas as imagens de uma galeria devem
representar a mesma pessoa; não é permitido alternar identidades dentro de um perfil.

```text
public/images/professionals/
  profile-001/
    cover.webp
    photo-01.webp
    photo-02.webp
    photo-03.webp
  profile-002/
    cover.webp
    photo-01.webp
    photo-02.webp
    photo-03.webp
```

Dimensões iniciais:

| Uso | Dimensão | Formato |
| --- | --- | --- |
| Card e galeria | 640 × 800 | WebP |
| Capa do perfil | 1200 × 400 | WebP |

O pool inicial deve conter aproximadamente 24–36 identidades, com predominância de
mulheres e presença de homens e pessoas trans. Cada identidade deve possuir duas ou
três fotografias realmente distintas, com rosto, cabelo e características consistentes.

Os 500 registros simulados reutilizam esse pool deterministicamente. A paginação deve
distribuir as identidades para evitar repetições adjacentes sempre que possível.

## Integração com Nuxt Image

O projeto mantém o componente `NuxtImg` para declarar dimensões, prioridade,
carregamento e comportamento de erro. Como os arquivos já estão otimizados, o provider
global é `none`:

```ts
export default defineNuxtConfig({
  image: {
    provider: 'none'
  }
})
```

Exemplo:

```vue
<NuxtImg
  src="/images/professionals/profile-001/photo-01.webp"
  width="640"
  height="800"
  loading="lazy"
  decoding="async"
  densities="1"
  alt="Nome do profissional - foto 1"
/>
```

O atributo `densities="1"` evita criar entradas duplicadas em `srcset` enquanto cada
imagem possuir apenas uma variante pré-gerada. Se o projeto adotar variantes reais de
320 e 640 pixels, deve ser criado um provider estático capaz de mapear cada largura ao
arquivo correspondente; não se deve anunciar um `srcset` responsivo que entregue o
mesmo arquivo em todas as opções.

## Swiper e LCP

O primeiro card renderiza uma imagem estática no SSR. O Swiper pode preparar sua
estrutura no cliente, mas suas imagens somente são montadas após interação real. Isso
evita que uma imagem interna do carrossel substitua o candidato LCP sem ação da pessoa
usuária.

Após `pointerdown`, hover ou foco:

1. as imagens do Swiper são montadas;
2. a imagem SSR permanece visível enquanto o primeiro slide carrega;
3. o carrossel assume a apresentação sem piscar;
4. drag, teclado e botões continuam usando a transição nativa do Swiper.

## Resultado do piloto

O teste inicial com quatro identidades locais apresentou:

| Métrica | Antes | Piloto local |
| --- | ---: | ---: |
| Performance Lighthouse | aproximadamente 81 | 86 |
| LCP da busca | aproximadamente 3,96 s | 3,31 s |
| Build do servidor | aproximadamente 56 MB | 12,3 MB |
| URLs `/_ipx` no HTML | presentes | nenhuma |

Os números são resultados de laboratório e podem variar entre execuções. O ganho mais
importante é arquitetural: o carregamento das imagens deixou de depender de origem e
transformação remotas. O relatório final ainda indicou atraso de renderização como o
principal componente do LCP, direcionando as próximas otimizações para fontes, CSS e
JavaScript crítico.

## Limites do piloto

As três imagens atuais de cada identidade são enquadramentos derivados de uma única
geração. Elas servem para validar o pipeline, o layout e a performance, mas não devem
ser tratadas como galeria definitiva.

Na versão final:

- cada identidade deve possuir fotos distintas e coerentes entre si;
- toda imagem deve passar por revisão visual antes de entrar no repositório;
- não deve haver nudez, ato sexual ou conteúdo explícito;
- metadados desnecessários devem ser removidos;
- os arquivos devem ser comprimidos antes do commit;
- o README deve declarar que IA foi utilizada para gerar assets fictícios.

## Evolução para produção

Em uma aplicação real, o mesmo contrato visual poderia ser atendido por ImageKit,
Cloudinary ou outro serviço de mídia:

```text
Upload autenticado
  → armazenamento do original
  → moderação
  → processamento assíncrono
  → variantes WebP/AVIF
  → CDN
  → URLs versionadas retornadas pela API
```

A migração futura deve trocar o provider e as URLs, preservando os componentes e as
dimensões esperadas pela interface. Imagens privadas, moderação, remoção e invalidação
de CDN pertencem ao backend e ficam fora do escopo deste protótipo.
