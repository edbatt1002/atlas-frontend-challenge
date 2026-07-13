import { expect, test } from '@playwright/test'

test.describe('Perfil', () => {
  test('renderiza o perfil com deep-link de contato', async ({ page }) => {
    await page.goto('/buscar')
    const firstCard = page.locator('article').first()
    const professionalName = await firstCard.getByRole('heading', { level: 3 }).textContent()
    await firstCard.locator('a').last().click()

    await expect(page).toHaveURL(/\/[0-9a-f-]{36}\//)
    const profileHeading = page.getByRole('heading', { level: 1, name: professionalName! })
    await expect(profileHeading).toHaveCount(1)
    await expect(profileHeading).toBeVisible()
    await expect(page.locator('a[href*="wa.me"], a[href*="t.me"]').first()).toBeVisible()
  })

  test('mostra o estado de não encontrado para um id inexistente', async ({ page }) => {
    await page.goto('/does-not-exist/x')

    await expect(page.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeVisible()
  })

  test('redireciona para o slug correto quando a URL tem o slug errado', async ({ page }) => {
    await page.goto('/buscar')
    const firstCard = page.locator('article').first()
    const professionalName = await firstCard.getByRole('heading', { level: 3 }).textContent()
    const profileHref = await firstCard.locator('a').last().getAttribute('href')
    const id = profileHref!.split('/')[1]

    await page.goto(`/${id}/slug-qualquer-errado`)

    await expect(page).toHaveURL(new RegExp(`${profileHref}$`))
    const profileHeading = page.getByRole('heading', { level: 1, name: professionalName! })
    await expect(profileHeading).toHaveCount(1)
    await expect(profileHeading).toBeVisible()
  })
})
