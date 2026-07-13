import { expect, test } from '@playwright/test'

test.describe('Home', () => {
  test('mostra a landing e leva ao catálogo', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await page.getByRole('link', { name: 'Buscar profissionais' }).first().click()
    await expect(page).toHaveURL(/\/buscar/)
  })
})
