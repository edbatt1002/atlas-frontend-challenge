<script setup lang="ts">
usePageSeo({
  title: 'Privacidade',
  description: 'Entenda como a onluxe trata privacidade e dados durante a navegação.'
})
</script>

<template>
  <UContainer class="py-12 sm:py-16">
    <div class="mx-auto max-w-3xl">
      <div class="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400">
        Institucional
      </div>
      <h1 class="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Privacidade
      </h1>
      <p class="mt-3 text-sm leading-6 text-ink-muted sm:text-base">
        Privacidade faz parte da experiência. Esta página resume como os dados são considerados neste protótipo.
      </p>

      <div class="mt-8 space-y-4">
        <section class="rounded-2xl border border-default bg-elevated p-5 sm:p-6">
          <h2 class="font-display text-lg font-bold text-ink">
            Dados do catálogo
          </h2>
          <p class="mt-2 text-sm leading-6 text-ink-muted">
            Os perfis apresentados são dados demonstrativos criados para representar a experiência do produto e não correspondem a pessoas reais.
          </p>
        </section>

        <section class="rounded-2xl border border-default bg-elevated p-5 sm:p-6">
          <h2 class="font-display text-lg font-bold text-ink">
            Localização
          </h2>
          <p class="mt-2 text-sm leading-6 text-ink-muted">
            A localização do dispositivo só é solicitada após uma ação explícita e depende da sua autorização no navegador.
          </p>
        </section>

        <section class="rounded-2xl border border-default bg-elevated p-5 sm:p-6">
          <h2 class="font-display text-lg font-bold text-ink">
            Plataformas externas
          </h2>
          <p class="mt-2 text-sm leading-6 text-ink-muted">
            Ao escolher WhatsApp ou Telegram, você será direcionado para serviços externos, sujeitos às políticas de privacidade dessas plataformas.
          </p>
        </section>
      </div>
    </div>
  </UContainer>
</template>
