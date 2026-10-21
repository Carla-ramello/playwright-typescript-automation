# Playwright TypeScript Automation

Proyecto de automatización de pruebas funcionales y End-to-End (E2E) desarrollado con **Playwright y TypeScript** sobre [SauceDemo](https://www.saucedemo.com/), una aplicación de e-commerce utilizada para practicar testing.

El objetivo es aplicar buenas prácticas de QA Automation mediante el diseño, ejecución y mantenimiento de casos de prueba automatizados que validan funcionalidades críticas de una tienda online.

## 🛠️ Tecnologías utilizadas

* **Playwright:** automatización de pruebas web.
* **TypeScript:** desarrollo de scripts de testing.
* **Node.js y npm:** entorno de ejecución y gestión de dependencias.
* **Git y GitHub:** control de versiones.
* **GitHub Actions:** integración continua (CI).

## 🧪 Cobertura de pruebas

La suite contiene **18 casos de prueba automatizados**, organizados por funcionalidad.

### 🔐 Autenticación

| ID     | Caso de prueba                         |
| ------ | -------------------------------------- |
| TC-001 | Login exitoso con credenciales válidas |
| TC-002 | Login sin usuario                      |
| TC-003 | Login sin contraseña                   |
| TC-004 | Login sin usuario y contraseña         |
| TC-005 | Login con usuario incorrecto           |
| TC-006 | Login con contraseña incorrecta        |
| TC-007 | Login con usuario bloqueado            |

### 🛍️ Catálogo de productos

| ID     | Caso de prueba                                  |
| ------ | ----------------------------------------------- |
| TC-008 | Validar visualización del catálogo de productos |
| TC-009 | Validar nombre y precio de un producto          |
| TC-010 | Validar ordenamiento alfabético A-Z y Z-A       |
| TC-011 | Validar ordenamiento de productos por precio    |
| TC-012 | Validar el detalle de un producto               |

### 🛒 Carrito de compras

| ID     | Caso de prueba                    |
| ------ | --------------------------------- |
| TC-013 | Agregar un producto al carrito    |
| TC-014 | Eliminar un producto del carrito  |
| TC-015 | Validar los productos del carrito |

### 💳 Checkout

| ID     | Caso de prueba                           |
| ------ | ---------------------------------------- |
| TC-016 | Validar checkout con datos válidos       |
| TC-017 | Validar campos obligatorios del checkout |
| TC-018 | Completar una compra exitosamente        |

## ✅ Validaciones implementadas

El proyecto incluye pruebas positivas, negativas y End-to-End.

Se verifican:

* Autenticación con credenciales válidas e inválidas.
* Validación de campos obligatorios y mensajes de error.
* Restricción de acceso para usuarios bloqueados.
* Visualización del catálogo de productos.
* Validación de nombres y precios.
* Ordenamiento alfabético y por precio.
* Navegación hacia el detalle de productos.
* Incorporación y eliminación de productos del carrito.
* Validación de productos, cantidades y precios en el carrito.
* Validación de formularios de checkout.
* Confirmación de una compra completa.

Las pruebas utilizan **assertions de Playwright**, localizadores y mecanismos de espera automática, evitando esperas fijas.

## 🧩 Organización y reutilización de código

Para mejorar la legibilidad y facilitar el mantenimiento, se implementaron funciones reutilizables:

* `iniciarSesion()`: realiza el inicio de sesión con credenciales de prueba válidas.
* `agregarMochilaAlCarrito()`: localiza y agrega un producto específico al carrito.

Estas funciones reducen la duplicación de código y permiten mantener los casos de prueba enfocados en sus objetivos.

## 📸 Evidencias y reportes

Los escenarios negativos de autenticación generan capturas de pantalla después de validar los mensajes de error.

Las evidencias se almacenan en:

`screenshots/`

Playwright también permite generar reportes HTML para consultar los resultados de las ejecuciones.

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Carla-ramello/playwright-typescript-automation.git
cd playwright-typescript-automation
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar los navegadores de Playwright

```bash
npx playwright install
```

### 4. Ejecutar todos los tests en Chromium

```bash
npx playwright test tests/ecommerce.spec.ts --project=chromium
```

### 5. Ejecutar los tests mostrando el navegador

```bash
npx playwright test tests/ecommerce.spec.ts --project=chromium --headed
```

### 6. Ejecutar un caso de prueba específico

Por ejemplo, TC-018:

```bash
npx playwright test tests/ecommerce.spec.ts --project=chromium --grep "TC-018"
```

### 7. Visualizar el reporte HTML

```bash
npx playwright show-report
```

**Nota para Windows PowerShell:** si la ejecución de `npx` está restringida, se puede utilizar `npx.cmd` en su lugar.

## 🔄 Integración continua

El repositorio incluye un workflow de **GitHub Actions** para ejecutar las pruebas automatizadas mediante integración continua.

El archivo de configuración se encuentra en:

`.github/workflows/playwright.yml`

## 📈 Mejoras futuras

Como parte de la evolución del proyecto, se contempla:

* Implementar el patrón Page Object Model (POM).
* Separar los datos de prueba de los scripts.
* Incorporar pruebas parametrizadas.
* Ampliar la cobertura de escenarios negativos.
* Ejecutar pruebas en diferentes navegadores.
* Mejorar la generación y gestión de reportes.

## 🎯 Objetivo del proyecto

Este proyecto forma parte de un portfolio práctico de **QA Automation**, orientado a demostrar conocimientos en automatización de pruebas funcionales, diseño de escenarios, validaciones, TypeScript, Playwright y control de versiones.
