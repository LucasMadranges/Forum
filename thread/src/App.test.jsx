import { expect, test } from '@playwright/test';

test('Lecture de la liste des messages', async ({ page }) => {
  // Aller à la page de la liste des messages
  await page.goto('http://localhost:5173');

  // Vérifier la présence du titre ou d’un exemple de message affiché
  await expect(page.getByRole('heading', { name: 'Liste des messages' })).toBeVisible();
});
