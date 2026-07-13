# Invalidação do cache de perfis profissionais

## Contexto

O perfil profissional é uma página pública com valor para SEO, compartilhamento por
WhatsApp ou Telegram e acesso direto por URL. Ao mesmo tempo, seus dados podem mudar:
descrição, preço, disponibilidade, foto de capa e galeria são exemplos de conteúdo
atualizado pelo profissional.

Por isso, a página não deve ser gerada apenas durante o build com `prerender`. Nesse
modelo, uma alteração permaneceria invisível até um novo build e deploy. A estratégia
mais adequada para uma aplicação real é **SSR com cache e invalidação explícita após
uma atualização**.

## Estratégia proposta

As páginas de perfil continuam renderizadas no servidor e podem usar SWR por um
período curto como mecanismo de segurança:

```ts
export default defineNuxtConfig({
  routeRules: {
    '/:id/:slug': { swr: 300 }
  }
})
```

O HTML completo continua disponível na primeira resposta, preservando SEO e
experiência inicial. O cache reduz renderizações e consultas repetidas, enquanto o
TTL de cinco minutos limita por quanto tempo uma entrada poderia permanecer antiga
se a invalidação ativa falhasse.

O fluxo ideal de atualização seria:

1. O profissional envia uma alteração para a API de escrita.
2. O backend valida e persiste os novos dados.
3. Após a persistência ser confirmada, o backend invalida:
   - o cache da API ou consulta do profissional;
   - o HTML cacheado das URLs associadas ao perfil;
   - recursos derivados, como thumbnails, quando uma imagem foi substituída.
4. A próxima requisição renderiza o perfil com os dados atualizados e recria o cache.

A invalidação deve ocorrer somente depois de uma gravação bem-sucedida. Invalidar
antes da persistência pode recriar o cache com os dados antigos durante uma condição
de corrida.

## Rotas e chaves

A URL atual contém o identificador e o slug do nome:

```text
/{id}/{slug}
```

O identificador deve ser a chave canônica do dado. Como uma mudança de nome também
pode mudar o slug, o backend precisa conhecer a URL anterior para invalidá-la ou
redirecioná-la para a URL canônica atual.

Também pode ser necessário invalidar superfícies que apresentam um resumo do perfil:

- página do próprio profissional;
- catálogo e resultados de busca;
- profissionais em destaque na página inicial;
- contagens ou agrupamentos, caso a profissão ou localização tenha mudado.

Uma abordagem prática é publicar um evento de domínio, por exemplo
`professional.updated`, contendo o identificador e os campos alterados. Consumidores
podem invalidar somente os caches afetados, evitando limpar todo o catálogo.

## TanStack Query e cache do servidor

O TanStack Query continua responsável pelo estado e pelo cache das consultas usadas
para renderizar a interface. Ele não substitui o cache do HTML mantido pelo Nitro,
CDN ou plataforma de hospedagem.

São camadas distintas:

- **TanStack Query:** dados da consulta durante SSR e navegação no cliente;
- **Nitro/CDN:** resposta HTTP ou HTML da rota;
- **serviço de imagens:** thumbnails e transformações da galeria.

Após uma edição feita na própria aplicação, o cliente também deve invalidar as queries
relacionadas, como `['professional', id]` e as listagens afetadas. Isso atualiza a
sessão atual, mas não elimina a necessidade de invalidar o cache HTTP compartilhado.

## Dependência da plataforma

O mecanismo concreto de purge varia conforme o ambiente de deploy. Pode ser uma API
do CDN, uma função da plataforma, um armazenamento de cache do Nitro ou um serviço
externo. Essa integração deve ficar no servidor e não pode ser exposta diretamente ao
navegador.

O endpoint ou consumidor responsável pela invalidação precisa ser autenticado e deve
aceitar apenas eventos confiáveis. Caso contrário, terceiros poderiam causar
invalidações repetidas e aumentar o custo da aplicação.

## Escopo deste protótipo

O projeto atual apresenta dados simulados e oferece somente leitura. Não existe fluxo
de cadastro ou atualização de profissionais, persistência real nem evento de domínio
que possa iniciar a invalidação. Portanto, implementar agora um endpoint de purge
seria código sem consumidor e dependente de uma plataforma de deploy ainda não
definida.

Neste estágio, a decisão fica documentada. Quando uma API real de escrita for
adicionada, a implementação deve incluir:

1. cache SWR para a rota de perfil;
2. invalidação das queries da sessão após a mutação;
3. invalidação do HTML e das APIs afetadas após persistência;
4. invalidação ou versionamento das imagens alteradas;
5. testes que confirmem que uma atualização deixa de servir conteúdo antigo.

Até esse fluxo existir, o SSR dinâmico atual mantém o perfil atualizado a cada
requisição e é a alternativa mais correta para o escopo do desafio.
