# Docker

O projeto utiliza uma imagem multi-stage. O estágio final contém somente a saída
standalone gerada pelo Nitro e executa a aplicação com um usuário sem privilégios de
root.

## Produção local

Para construir e iniciar a imagem de produção:

```bash
docker compose up --build
```

A aplicação fica disponível em `http://localhost:3000`. Por padrão, o front-end usa
as rotas `/api` fornecidas pelo próprio Nitro. Para consumir uma API externa, defina
`NUXT_PUBLIC_API_BASE` no ambiente do container com a origem completa da API.

Se a porta 3000 já estiver em uso, altere somente a porta publicada:

```bash
APP_PORT=3100 docker compose up --build
```

## Desenvolvimento

O ambiente de desenvolvimento é opt-in para que o comando padrão continue
representando a execução de produção:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

O código-fonte é montado no container e o servidor Nuxt mantém hot reload.

## Testes E2E

O profile `e2e` inicia a imagem de produção, aguarda o healthcheck e executa o
Playwright em um container separado:

```bash
docker compose --profile e2e up --build \
  --abort-on-container-exit \
  --exit-code-from e2e
```

O serviço E2E usa o alias interno `http://app.local:3000`. O sufixo evita que o
Chromium tente atualizar o hostname simples `app` para HTTPS. Dependências, arquivos
gerados pelo Nuxt e o cache do npm permanecem em volumes separados. O Playwright roda
com `CI=true`, usando o mesmo número de workers, retries e reporters do GitHub Actions.
