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
test('TC-008 | Validar visualización del catálogo de productos', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

await expect(page.getByText('Products', { exact: true })).toBeVisible();

await expect(page.locator('.app_logo')).toBeVisible();
await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

await expect(page.locator('.inventory_item_name').first()).toBeVisible();
});

test('TC-009 | Validar nombre y precio de un producto', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

const mochila = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

await expect(mochila.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
await expect(mochila.locator('.inventory_item_price')).toHaveText('$29.99');

});

test('TC-010 | Validar ordenamiento alfabético A-Z', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

await expect(page.locator('.inventory_item_name').first()).toBeVisible();

const ordenamiento = page.getByRole('combobox', { name: 'Sort products' });

await ordenamiento.selectOption('za');

const nombresZA = await page.locator('.inventory_item_name').allTextContents();
const nombresOrdenadosZA = [...nombresZA].sort().reverse();

expect(nombresZA).toEqual(nombresOrdenadosZA);

await ordenamiento.selectOption('az');

const nombres = await page.locator('.inventory_item_name').allTextContents();
const nombresOrdenados = [...nombres].sort();

expect(nombres).toEqual(nombresOrdenados);

});

test('TC-011 | Validar ordenamiento de productos por precio', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

await expect(page.locator('.inventory_item_name').first()).toBeVisible();

const ordenamiento = page.getByRole('combobox', { name: 'Sort products' });

await ordenamiento.selectOption('lohi');

const precios = await page.locator('.inventory_item_price').allTextContents();

const preciosNumericos = precios.map(precio =>
   Number(precio.replace('$', ''))
);

const preciosOrdenados = [...preciosNumericos].sort((a, b) => a - b);

expect(preciosNumericos).toEqual(preciosOrdenados);

await ordenamiento.selectOption('hilo');

const preciosMayorMenor = await page.locator('.inventory_item_price').allTextContents();

const preciosNumericosMayorMenor = preciosMayorMenor.map(precio =>
  Number(precio.replace('$', ''))
);
const preciosOrdenadosMayorMenor = [...preciosNumericosMayorMenor].sort((a, b) => b - a);

expect(preciosNumericosMayorMenor).toEqual(preciosOrdenadosMayorMenor);

});

test('TC-012 | Validar el detalle de un producto', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

await expect(page.locator('.inventory_item_name').first()).toBeVisible();

await page.getByText('Sauce Labs Backpack', { exact: true }).click();

// Validar el nombre del producto
await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');

// Validar el precio del producto
await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');

// Regresar al listado de productos
await page.getByRole('button', { name: 'Back to products' }).click();

// Validar que regresamos correctamente
await expect(page.getByText('Products', { exact: true })).toBeVisible();
});