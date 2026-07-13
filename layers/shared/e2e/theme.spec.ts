import { expect, test } from '@playwright/test'

test.describe('Tema', () => {
  test('alterna entre dark e light pelo botão de tema', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')

    await expect(html).toHaveClass(/dark/)

    await page.getByRole('button', { name: 'Mudar para modo claro' }).click()
    await expect(html).not.toHaveClass(/dark/)

    await page.getByRole('button', { name: 'Mudar para modo escuro' }).click()
    await expect(html).toHaveClass(/dark/)
  })
})
