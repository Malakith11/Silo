import { test, expect } from '@playwright/test';

test('platform marketing page shows navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/silo/i);
  await expect(page.getByRole('link', { name: /compass/i })).toBeVisible();
});
