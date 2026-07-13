import { expect, test } from '@playwright/test'

test.describe('Catálogo', () => {
  test('lista profissionais e reflete a busca por endereço na URL', async ({ page }) => {
    await page.goto('/buscar')

    await expect(page.locator('article').first()).toBeVisible()

    await page.getByRole('button', { name: 'Buscar por endereço' }).click()
    await page.getByRole('button', { name: 'São Paulo · SP' }).click()
    await expect(page).toHaveURL(/state=SP/)
  })

  test('abre o painel de filtros e aplica uma profissão', async ({ page }) => {
    await page.goto('/buscar')

    await page.getByRole('button', { name: 'Filtros' }).click()
    await page.getByRole('button', { name: 'Modelo', exact: true }).click()

    await expect(page).toHaveURL(/profession=modelo/)
  })

  test('navega para o perfil ao clicar num card', async ({ page }) => {
    await page.goto('/buscar')

    await page.locator('article').first().locator('a').last().click()

    await expect(page).toHaveURL(/\/[0-9a-f-]{36}\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('troca de foto ao clicar no botão de próximo slide do card', async ({ page }) => {
    await page.goto('/buscar')

    const firstCard = page.locator('article').first()
    await firstCard.getByRole('button', { name: 'Próximo slide' }).click()

    await expect(firstCard.locator('.swiper-slide-active')).toHaveAttribute('aria-label', /^2 \//)
  })
})
