import { expect, test } from '@playwright/test'

test.describe('Perfil', () => {
  test('renderiza o perfil com deep-link de contato', async ({ page }) => {
    await page.goto('/buscar')
    await page.locator('article').first().locator('a').last().click()

    await expect(page).toHaveURL(/\/[0-9a-f-]{36}\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('a[href*="wa.me"], a[href*="t.me"]').first()).toBeVisible()
  })

  test('mostra o estado de não encontrado para um id inexistente', async ({ page }) => {
    await page.goto('/does-not-exist/x')

    await expect(page.getByText('Profissional não encontrado')).toBeVisible()
  })
})
