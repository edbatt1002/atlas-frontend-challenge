import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', heading: 'Encontre quem combina com você' },
  { path: '/buscar', heading: 'Encontre quem combina com você' },
  { path: '/favoritos', heading: 'Favoritos' },
  { path: '/termos', heading: 'Termos de uso' },
  { path: '/privacidade', heading: 'Privacidade' },
  { path: '/suporte', heading: 'Como podemos ajudar?' }
]

test.describe('Navegação global', () => {
  for (const route of routes) {
    test(`${route.path} responde sem erros de console`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') consoleErrors.push(message.text())
      })

      const response = await page.goto(route.path)

      expect(response?.ok()).toBe(true)
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
      expect(consoleErrors).toEqual([])
    })
  }

  test('não oferece navegação interna para chat', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('a[href="/chat"]')).toHaveCount(0)
  })
})
