<template>
  <div class="relative bg-gradient-to-b from-bg-raised/25 to-transparent px-4 py-14 text-center sm:px-6">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

    <h2 class="font-display text-2xl font-extrabold text-ink">
      Pronto pra começar?
    </h2>
    <p class="mt-2 text-sm text-ink-muted">
      Milhares de perfis verificados esperando por você.
    </p>
    <UButton
      to="/buscar"
      color="primary"
      size="lg"
      label="Buscar profissionais"
      class="mt-5 font-extrabold"
    />
    <p class="mt-6 text-xs text-ink-faint">
      Conteúdo restrito a maiores de 18 anos
    </p>
  </div>
</template>
