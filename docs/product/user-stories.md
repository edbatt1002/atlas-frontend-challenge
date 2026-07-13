# User stories

Formato: **Como** [quem] **quero** [ação] **para** [objetivo]. Agrupado por área da aplicação. Cobre só o que está implementado — não é backlog de features futuras.

## Descoberta (home)

- Como visitante, quero ver uma landing com proposta de valor clara e uma busca em destaque, para decidir rapidamente se quero continuar navegando.
- Como visitante, quero ver categorias/profissões em destaque na home, para descobrir opções sem precisar formular uma busca específica.
- Como visitante, quero ver um recorte de profissionais em destaque (featured) na home, para ter um primeiro contato com a qualidade/variedade do catálogo antes de ir pra listagem completa.

## Catálogo (`/buscar`)

- Como visitante, quero buscar por nome ou profissão em um campo de texto, para encontrar rapidamente quem eu já tenho em mente.
- Como visitante, quero rolar a lista continuamente (scroll infinito) sem clicar em "carregar mais", para não perder o fluxo de navegação enquanto exploro.
- Como visitante, quero filtrar por profissão, faixa de preço, avaliação mínima e status online, para reduzir a lista a quem realmente atende meu critério.
- Como visitante, quero ordenar o catálogo (Destaques, Novidades, Próximos de mim, Avaliações, Valor Online), para priorizar o que importa mais pra mim no momento (preço vs. proximidade vs. reputação).
- Como visitante, quero buscar profissionais próximos usando minha localização, para encontrar opções na minha região sem digitar cidade/bairro manualmente.
- Como visitante, quero que meus filtros fiquem refletidos na URL, para poder compartilhar ou voltar a uma busca específica sem refazer os passos.
- Como visitante, quero navegar entre as fotos de um profissional direto no card do catálogo (carrossel), para ter uma ideia melhor antes de abrir o perfil completo.

## Perfil (`/{id}/{slug}`)

- Como visitante, quero ver o perfil completo de um profissional (capa, avatar, nome, verificação, status online), para confirmar identidade/credibilidade antes de prosseguir.
- Como visitante, quero navegar entre seções do perfil (Fotos e vídeos, Sobre mim, Avaliações) por abas, para ir direto à informação que me interessa sem rolar a página inteira.
- Como visitante, quero abrir a galeria em tela cheia com opção de grade ou feed, e filtrar por fotos ou vídeos, para explorar o conteúdo visual no meu ritmo e formato preferido.
- Como visitante, quero ver as características do profissional (idade, altura, etnia, etc.) organizadas de forma clara, para avaliar compatibilidade rapidamente.
- Como visitante, quero ver os valores em formato de tiers (1 hora / 2 horas / pernoite), para entender o custo sem precisar perguntar.
- Como visitante, quero ler avaliações de outros usuários, para ter um sinal de confiança de terceiros antes de decidir.
- Como visitante, quero contatar o profissional direto por WhatsApp ou Telegram com um clique, para não precisar copiar/colar número ou usuário manualmente.
- Como visitante, quero acessar um resumo fixo (preço + botão de contato) mesmo rolando a página no celular, para não precisar voltar ao topo pra agir.
- Como visitante, quero receber uma mensagem clara de "não encontrado" se o link do perfil for inválido, para entender o que aconteceu em vez de ver uma tela quebrada.

## Navegação global

- Como visitante, quero uma barra de navegação inferior fixa no mobile (Explorar / Buscar / Favoritos / Chat), para trocar de área principal do app com um toque.
- Como visitante, quero favoritar um profissional a partir do card ou do perfil, para sinalizar interesse mesmo que ainda não haja persistência entre sessões.
- Como visitante, quero acessar Termos de uso, Privacidade e Suporte a partir de qualquer página, para tirar dúvidas legais/operacionais sem precisar procurar.
- Como visitante, quero alternar entre tema claro e escuro, para usar o app confortavelmente em diferentes condições de luz/preferência pessoal.

## Fora do escopo atual (documentado, não implementado)

- Como profissional, quero criar/editar meu próprio perfil — não existe fluxo de cadastro; todo o catálogo é dado mockado.
- Como visitante, quero que meus favoritos persistam entre sessões — hoje é só estado visual, sem persistência (ver `docs/architecture/professional-profile-cache-invalidation.md` para o raciocínio equivalente sobre dados dinâmicos).
- Como visitante, quero conversar via chat dentro do app — o item "Chat" da navegação é placeholder; contato real acontece via deep-link externo (WhatsApp/Telegram).
