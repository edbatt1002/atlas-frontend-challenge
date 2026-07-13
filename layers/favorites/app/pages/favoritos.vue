<script setup lang="ts">
defineOptions({ name: 'FavoritesPage' })

usePageSeo({
  title: 'Favoritos',
  description: 'Acesse os profissionais que você marcou como favoritos.'
})
</script>

<template>
  <UContainer class="py-12 sm:py-16">
    <div class="mx-auto max-w-3xl">
      <div class="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
        Sua coleção
      </div>
      <h1 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Favoritos
      </h1>

      <div class="mt-8 flex flex-col items-center rounded-2xl border border-default bg-elevated px-5 py-14 text-center sm:px-8">
        <div class="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UIcon
            name="i-lucide-heart"
            class="size-7"
          />
        </div>
        <h2 class="mt-5 font-display text-xl font-bold text-ink">
          Nenhum favorito por enquanto
        </h2>
        <p class="mt-2 max-w-md text-sm leading-6 text-ink-muted">
          Busque no catálogo e marque os perfis que mais combinam com você para encontrá-los aqui depois.
        </p>
        <UButton
          to="/buscar"
          label="Buscar profissionais"
          icon="i-lucide-search"
          size="lg"
          class="mt-6 font-bold"
        />
      </div>
    </div>
  </UContainer>
</template>
