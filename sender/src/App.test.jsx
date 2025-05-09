import { expect, test } from '@playwright/test';

test("Envoi d'un message", async ({ page }) => {
  // Aller à la page d’envoi de message
  await page.goto('http://localhost:5173');

  await expect(page.getByLabel("Nom d'utilisateur")).toBeVisible();
  await expect(page.getByLabel('Message')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envoyer' })).toBeVisible();
});
