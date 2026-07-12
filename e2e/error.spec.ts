import { expect, test } from '@playwright/test'

test.describe('Página de erro', () => {
  test('mostra a página de não encontrado para uma rota inexistente', async ({ page }) => {
    await page.goto('/rota-que-nao-existe')

    await expect(page.getByText('Página não encontrada')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Voltar ao início' })).toBeVisible()
  })

  test('volta para a home ao clicar em voltar ao início', async ({ page }) => {
    await page.goto('/rota-que-nao-existe')

    await page.getByRole('link', { name: 'Voltar ao início' }).click()

    await expect(page).toHaveURL('/')
  })
})
