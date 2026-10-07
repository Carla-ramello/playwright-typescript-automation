import { test, expect } from '@playwright/test';

test('TC-001 | Login exitoso con credenciales válidas', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
 

});
  
test('TC-002 | Login sin usuario', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Username is required');
  await page.screenshot({
    path: 'screenshots/TC-002-login-sin-usuario.png',
    fullPage: true
});
});
test('TC-003 | Login sin contraseña', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Password is required');
  await page.screenshot({
    path: 'screenshots/TC-003-login-sin-password.png',
    fullPage: true
});
});
test('TC-004 | Login sin usuario y contraseña', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Username is required');
  await page.screenshot({
    path: 'screenshots/TC-004-login-sin-usuario-y-password.png',
    fullPage: true
});
});
test('TC-005 | Login con usuario incorrecto', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('usuario_inventado');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
);
  await page.screenshot({
    path: 'screenshots/TC-005-login-con-usuario-incorrecto.png',
    fullPage: true
});
});
test('TC-006 | Login con contraseña incorrecta', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('contraseña_inventada');
  await page.getByRole('button', { name: 'Login' }).click();
  
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
);
  await page.screenshot({
    path: 'screenshots/TC-006-login-con-password-incorrecto.png',
    fullPage: true
});
});
test('TC-007 | Login con usuario bloqueado', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
);
  
  await page.screenshot({
    path: 'screenshots/TC-007-login-con-usuario-bloqueado.png',
    fullPage: true
});
});