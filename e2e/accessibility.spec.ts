import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
const staticRoutes = ['/', '/buscar', '/favoritos', '/termos', '/privacidade', '/suporte']

async function expectAccessible(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(wcagTags)
    .analyze()

  expect(results.violations.map(violation => ({
    id: violation.id,
    nodes: violation.nodes.map(node => ({
      target: node.target.join(' '),
      summary: node.failureSummary
    }))
  }))).toEqual([])
}

test.describe('Acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
  })

  for (const route of staticRoutes) {
    test(`${route} não possui violações WCAG A ou AA detectáveis`, async ({ page }) => {
      await page.goto(route)

      await expectAccessible(page)
    })
  }

  test('drawer de região não possui violações detectáveis', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Todo o Brasil' }).click()
    await expect(page.getByRole('heading', { name: 'Em qual região?' })).toBeVisible()

    await expectAccessible(page)
  })

  test('drawer de filtros não possui violações detectáveis', async ({ page }) => {
    await page.goto('/buscar')
    await page.getByRole('button', { name: 'Filtros' }).click()
    await expect(page.getByRole('heading', { name: 'Filtros' })).toBeVisible()

    await expectAccessible(page)
  })

  test('perfil e lightbox não possuem violações detectáveis', async ({ page }) => {
    await page.goto('/buscar')
    await page.locator('article').first().locator('a').last().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await expectAccessible(page)

    await page.getByRole('button', { name: 'Ver toda a galeria' }).click()
    await expect(page.getByText('Galeria', { exact: true })).toBeVisible()

    await expectAccessible(page)
  })

  test('página de erro não possui violações detectáveis', async ({ page }) => {
    await page.goto('/rota-que-nao-existe')
    await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()

    await expectAccessible(page)
  })
})
