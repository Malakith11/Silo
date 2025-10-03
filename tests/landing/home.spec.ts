import { test, expect } from '@playwright/test';

test('landing homepage renders hero content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/silo/i);
  await expect(page.getByRole('button', { name: /join the waitlist/i })).toBeVisible();
});
