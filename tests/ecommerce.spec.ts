import { test, expect, type Page } from '@playwright/test';

// Función reutilizable para iniciar sesión con un usuario válido
async function iniciarSesion(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
}
// Función reutilizable para agregar la mochila al carrito
async function agregarMochilaAlCarrito(page: Page) {

  const mochila = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

  await mochila.getByRole('button', { name: 'Add to cart' }).click();

}

test('TC-001 | Login exitoso con credenciales válidas', async ({ page }) => {
  
  //Abrir la página de SauceDemo
  await page.goto('https://www.saucedemo.com/');

  //Ingresar credenciales válidas
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  //Enviar el formulario de inicio de sesión
  await page.getByRole('button', { name: 'Login' }).click();

  //Verificar que el usuario accedió al catálogo de productos
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
 

});
  
test('TC-002 | Login sin usuario', async ({ page }) => {

  // Abrir SauceDemo e intentar iniciar sesión sin ingresar un usuario
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verificar que aparezca el mensaje de error correspondiente
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Username is required');
 
  // Guardar una captura de pantalla como evidencia
  await page.screenshot({
    path: 'screenshots/TC-002-login-sin-usuario.png',
    fullPage: true
});
});
test('TC-003 | Login sin contraseña', async ({ page }) => {

  // Abrir SauceDemo e intentar iniciar sesión sin contraseña
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verificar que aparezca el mensaje de contraseña obligatoria
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Password is required');
  
  // Guardar una captura de pantalla como evidencia
  await page.screenshot({
    path: 'screenshots/TC-003-login-sin-password.png',
    fullPage: true
});
});
test('TC-004 | Login sin usuario y contraseña', async ({ page }) => {

  // Abrir SauceDemo e intentar iniciar sesión con ambos campos vacíos
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verificar que el sistema solicite primero el nombre de usuario
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Username is required');
 
 // Guardar una captura de pantalla como evidencia
  await page.screenshot({
    path: 'screenshots/TC-004-login-sin-usuario-y-password.png',
    fullPage: true
});
});
test('TC-005 | Login con usuario incorrecto', async ({ page }) => {

  // Intentar iniciar sesión con un nombre de usuario inexistente
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('usuario_inventado');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

   // Verificar que el sistema rechace las credenciales incorrectas
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
);
  
// Guardar una captura de pantalla como evidencia del error
  await page.screenshot({
    path: 'screenshots/TC-005-login-con-usuario-incorrecto.png',
    fullPage: true
});
});
test('TC-006 | Login con contraseña incorrecta', async ({ page }) => {

  // Intentar iniciar sesión con una contraseña incorrecta
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('contraseña_inventada');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verificar que el sistema muestre el mensaje de credenciales inválidas
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
);
  
// Guardar una captura de pantalla como evidencia del error
  await page.screenshot({
    path: 'screenshots/TC-006-login-con-password-incorrecto.png',
    fullPage: true
});
});
test('TC-007 | Login con usuario bloqueado', async ({ page }) => {

  // Intentar iniciar sesión con un usuario bloqueado
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verificar que el sistema informe que la cuenta está bloqueada
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
);
  
  // Guardar una captura de pantalla como evidencia del bloqueo
  await page.screenshot({
    path: 'screenshots/TC-007-login-con-usuario-bloqueado.png',
    fullPage: true
});
});
test('TC-008 | Validar visualización del catálogo de productos', async ({ page }) => {
 
// Iniciar sesión con credenciales válidas 
await iniciarSesion(page);

// Verificar que se muestre el título del catálogo
await expect(page.getByText('Products', { exact: true })).toBeVisible();

// Validar que los elementos principales de navegación sean visibles
await expect(page.locator('.app_logo')).toBeVisible();
await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

 // Verificar que el catálogo contenga al menos un producto visible
// first() selecciona el primer elemento encontrado
await expect(page.locator('.inventory_item_name').first()).toBeVisible();
});

test('TC-009 | Validar nombre y precio de un producto', async ({ page }) => {

// Iniciar sesión con credenciales válidas
await iniciarSesion(page);

// Localizar específicamente la tarjeta de Sauce Labs Backpack
 // filter() permite seleccionar un elemento que contenga determinado texto
const mochila = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

// Validar el nombre del producto dentro de su tarjeta
await expect(mochila.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

 // Validar que el precio del producto sea el esperado
await expect(mochila.locator('.inventory_item_price')).toHaveText('$29.99');

});

test('TC-010 | Validar ordenamiento alfabético A-Z', async ({ page }) => {

 // Iniciar sesión con credenciales válidas
await iniciarSesion(page);

// Verificar que los productos estén visibles antes de ordenarlos
await expect(page.locator('.inventory_item_name').first()).toBeVisible();

// Localizar el desplegable de ordenamiento
const ordenamiento = page.getByRole('combobox', { name: 'Sort products' });

 // ===== ORDENAMIENTO Z-A =====
 // Seleccionar la opción de ordenamiento descendente
await ordenamiento.selectOption('za');

// Obtener los nombres de todos los productos en el orden mostrado
// allTextContents() devuelve un array con los textos encontrados
const nombresZA = await page.locator('.inventory_item_name').allTextContents();

// Crear una copia del array y ordenarla alfabéticamente de Z a A
  // sort() ordena los textos y reverse() invierte ese orden
const nombresOrdenadosZA = [...nombresZA].sort().reverse();

// Comparar el orden real de la página con el orden esperado
expect(nombresZA).toEqual(nombresOrdenadosZA);

// ===== ORDENAMIENTO A-Z =====
// Seleccionar la opción de ordenamiento ascendente
await ordenamiento.selectOption('az');

// Obtener nuevamente los nombres después de cambiar el orden
const nombres = await page.locator('.inventory_item_name').allTextContents();

// Crear una copia del array ordenada alfabéticamente de A a Z
const nombresOrdenados = [...nombres].sort();

// Comprobar que los productos estén ordenados correctamente
expect(nombres).toEqual(nombresOrdenados);

});

test('TC-011 | Validar ordenamiento de productos por precio', async ({ page }) => {

// Iniciar sesión con credenciales válidas
await iniciarSesion(page);

// Verificar que el catálogo de productos esté visible
await expect(page.locator('.inventory_item_name').first()).toBeVisible();

// Localizar el desplegable que permite ordenar los productos
const ordenamiento = page.getByRole('combobox', { name: 'Sort products' });

// ===== ORDENAMIENTO DE MENOR A MAYOR =====
// Seleccionar la opción de precio ascendente
await ordenamiento.selectOption('lohi');

// Obtener los precios de todos los productos como textos
const precios = await page.locator('.inventory_item_price').allTextContents();

// Convertir los precios a números:
  // map() recorre el array, replace() elimina el símbolo $ y Number() convierte el texto
const preciosNumericos = precios.map(precio =>
   Number(precio.replace('$', ''))
);

// Crear una copia del array y ordenar los precios de menor a mayor
  // (a, b) => a - b indica una comparación numérica ascendente
const preciosOrdenados = [...preciosNumericos].sort((a, b) => a - b);

// Comparar los precios mostrados con el orden esperado
expect(preciosNumericos).toEqual(preciosOrdenados);

// ===== ORDENAMIENTO DE MAYOR A MENOR =====

  // Seleccionar la opción de precio descendente
await ordenamiento.selectOption('hilo');

// Obtener nuevamente los precios después de cambiar el orden
const preciosMayorMenor = await page.locator('.inventory_item_price').allTextContents();

// Convertir los precios obtenidos a valores numéricos
const preciosNumericosMayorMenor = preciosMayorMenor.map(precio =>
  Number(precio.replace('$', ''))
);
// Crear una copia ordenada de mayor a menor
  // (a, b) => b - a indica una comparación numérica descendente
const preciosOrdenadosMayorMenor = [...preciosNumericosMayorMenor].sort((a, b) => b - a);

// Validar que el orden mostrado coincida con el esperado
expect(preciosNumericosMayorMenor).toEqual(preciosOrdenadosMayorMenor);

});

test('TC-012 | Validar el detalle de un producto', async ({ page }) => {

// Iniciar sesión con credenciales válidas
await iniciarSesion(page);

// Verificar que el catálogo se haya cargado correctamente
await expect(page.locator('.inventory_item_name').first()).toBeVisible();

// Seleccionar la mochila para acceder a su página de detalles
await page.getByText('Sauce Labs Backpack', { exact: true }).click();

// Validar el nombre del producto sea correcto
await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');

// Validar que el precio mostrado corresponda al producto
await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');

// Regresar al catálogo de productos
await page.getByRole('button', { name: 'Back to products' }).click();

// Validar que que el usuario haya regresado correctamente al catálogo
await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('TC-013 | Agregar un producto al carrito', async ({ page }) => {

  // Iniciar sesión con credenciales válidas
  await iniciarSesion(page);

  // Verificar que el catálogo esté visible
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

// Agregar la mochila al carrito
await agregarMochilaAlCarrito(page);

// Verificar que el contador del carrito indique un producto
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});

test('TC-014 | Eliminar un producto del carrito', async ({ page }) => {

  // Iniciar sesión con credenciales válidas
  await iniciarSesion(page);

  // Localizar la mochila dentro del catálogo
  const mochila = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

  // Agregar el producto al carrito
  await mochila.getByRole('button', { name: 'Add to cart' }).click();

  // Verificar que el contador indique un producto
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Eliminar el producto del carrito
  await mochila.getByRole('button', { name: 'Remove' }).click();

  // Verificar que el contador desaparezca porque el carrito está vacío
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

});

test('TC-015 | Validar los productos del carrito', async ({ page }) => {

  // Iniciar sesión con credenciales válidas
 await iniciarSesion(page);

  // Agregar la mochila al carrito
await agregarMochilaAlCarrito(page);

  // Acceder al carrito de compras
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verificar que estamos en la página del carrito
  await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();

  // Validar que el producto agregado sea el correcto
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

  // Validar el precio del producto
  await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

  // Verificar que la cantidad sea una unidad
  await expect(page.locator('.cart_quantity')).toHaveText('1');

});

test('TC-016 | Validar checkout con datos válidos', async ({ page }) => {

  // Iniciar sesión con credenciales válidas
await iniciarSesion(page);

 // Agregar la mochila al carrito
await agregarMochilaAlCarrito(page);

// Acceder al carrito de compras
await page.locator('[data-test="shopping-cart-link"]').click();

// Verificar que estamos en la página del carrito
await expect(page).toHaveURL(/cart\.html/);

// Iniciar el proceso de checkout
await page.getByRole('button', { name: 'Checkout' }).click();

  // Verificar que se muestre el formulario de información personal
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();

  // Completar los datos del comprador
  await page.getByPlaceholder('First Name').fill('user');
  await page.getByPlaceholder('Last Name').fill('Test');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');

  // Continuar al resumen de la compra
  await page.getByRole('button', { name: 'Continue' }).click();

  // Verificar que se muestre la pantalla de resumen
  await expect(page.getByText('Checkout: Overview')).toBeVisible();

  // Comprobar que el producto seleccionado aparezca en el resumen
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

  // Comprobar que el precio del producto sea correcto
  await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

});

test('TC-017 | Validar campos obligatorios del checkout', async ({ page }) => {

  // Iniciar sesión con credenciales válidas
  await iniciarSesion(page);

// Agregar la mochila al carrito
await agregarMochilaAlCarrito(page);

  // Acceder al carrito e iniciar el checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Localizar los campos del formulario
  const nombre = page.getByPlaceholder('First Name');
  const apellido = page.getByPlaceholder('Last Name');
  const codigoPostal = page.getByPlaceholder('Zip/Postal Code');
  const continuar = page.getByRole('button', { name: 'Continue' });

  // ===== ESCENARIO 1: NOMBRE VACÍO =====

  await continuar.click();

  // Verificar que el nombre sea obligatorio
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: First Name is required'
  );

  // ===== ESCENARIO 2: APELLIDO VACÍO =====

  await nombre.fill('user');
  await continuar.click();

  // Verificar que el apellido sea obligatorio
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: Last Name is required'
  );

  // ===== ESCENARIO 3: CÓDIGO POSTAL VACÍO =====

  await apellido.fill('Test');
  await continuar.click();

  // Verificar que el código postal sea obligatorio
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: Postal Code is required'
  );

  // Confirmar que seguimos en el formulario de checkout
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();

});

test('TC-018 | Completar una compra exitosamente', async ({ page }) => {

  // Acceder a SauceDemo e iniciar sesión
  await iniciarSesion(page);

  // Verificar que el catálogo esté visible
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  // ===== SELECCIÓN DEL PRODUCTO =====

 // Agregar la mochila al carrito
await agregarMochilaAlCarrito(page);

  // Verificar que se agregó un producto
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // ===== CARRITO DE COMPRAS =====

  // Acceder al carrito
await page.locator('[data-test="shopping-cart-link"]').click();

// Verificar que estamos en la página del carrito
await expect(page).toHaveURL(/cart\.html/);

// Verificar que el producto correcto esté en el carrito
await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');

  // ===== CHECKOUT =====

  // Iniciar el proceso de compra
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Completar el formulario con datos ficticios
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');

  // Continuar al resumen de compra
  await page.getByRole('button', { name: 'Continue' }).click();

  // ===== RESUMEN DEL PEDIDO =====

  // Verificar que se muestre el resumen
  await expect(page.getByText('Checkout: Overview')).toBeVisible();

  // Validar el producto y su precio
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

  // ===== FINALIZACIÓN DE LA COMPRA =====

  // Confirmar la compra
  await page.getByRole('button', { name: 'Finish' }).click();

  // Verificar que se muestre el mensaje de compra exitosa
  await expect(page.getByText('Thank you for your order!')).toBeVisible();

  // Verificar que el proceso haya finalizado correctamente
  await expect(page.getByText('Checkout: Complete!')).toBeVisible();

});
