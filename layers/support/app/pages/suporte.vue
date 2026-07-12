<script setup lang="ts">
usePageSeo({
  title: 'Suporte',
  description: 'Encontre orientações para navegar e entrar em contato com profissionais na onluxe.'
})
</script>

<template>
  <UContainer class="py-12 sm:py-16">
    <div class="mx-auto max-w-3xl">
      <div class="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
        Ajuda
      </div>
      <h1 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Como podemos ajudar?
      </h1>
      <p class="mt-3 text-sm leading-6 text-ink-muted sm:text-base">
        Consulte as orientações para encontrar profissionais e utilizar os canais de contato disponíveis.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <section class="rounded-2xl border border-default bg-elevated p-5 sm:p-6">
          <UIcon
            name="i-lucide-search"
            class="size-6 text-primary"
          />
          <h2 class="mt-4 font-display text-lg font-bold text-ink">
            Encontrar um profissional
          </h2>
          <p class="mt-2 text-sm leading-6 text-ink-muted">
            Use a busca e os filtros do catálogo para comparar perfis, valores, avaliações e localização.
          </p>
        </section>

        <section class="rounded-2xl border border-default bg-elevated p-5 sm:p-6">
          <UIcon
            name="i-lucide-message-circle"
            class="size-6 text-primary"
          />
          <h2 class="mt-4 font-display text-lg font-bold text-ink">
            Falar com um profissional
          </h2>
          <p class="mt-2 text-sm leading-6 text-ink-muted">
            Abra o perfil desejado e escolha WhatsApp ou Telegram. A conversa acontece diretamente na plataforma selecionada.
          </p>
        </section>
      </div>

      <UButton
        to="/buscar"
        label="Explorar profissionais"
        icon="i-lucide-search"
        size="lg"
        class="mt-6 font-bold"
      />
    </div>
  </UContainer>
</template>
