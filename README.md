# Playwright TypeScript Automation

Proyecto de automatización de pruebas E2E desarrollado con **Playwright + TypeScript** sobre el sitio de práctica SauceDemo.

El objetivo del proyecto es aplicar automatización sobre escenarios funcionales reales, comenzando por el flujo de autenticación y ampliando progresivamente la cobertura sobre el e-commerce.

## 🛠️ Tecnologías

- Playwright
- TypeScript
- Node.js
- npm
- Git / GitHub

## 🧪 Login Test Suite

Actualmente la suite contiene 7 escenarios automatizados:

- TC-001 | Login exitoso con credenciales válidas
- TC-002 | Login sin usuario
- TC-003 | Login sin contraseña
- TC-004 | Login sin usuario y contraseña
- TC-005 | Login con usuario incorrecto
- TC-006 | Login con contraseña incorrecta
- TC-007 | Login con usuario bloqueado
## ✅ Validaciones implementadas

La suite verifica tanto escenarios positivos como negativos del flujo de autenticación:

- Acceso exitoso y visualización de la página de productos.
- Validación de campos obligatorios.
- Validación de mensajes de error.
- Rechazo de credenciales inexistentes.
- Rechazo de contraseña incorrecta.
- Restricción de acceso para usuarios bloqueados.
- Captura de evidencia visual en los escenarios negativos.

Las validaciones se realizan mediante assertions de Playwright, evitando esperas fijas y utilizando las esperas automáticas del framework.
## 📸 Evidencias

Los escenarios negativos generan capturas de pantalla después de validar el mensaje de error correspondiente.

Las evidencias se almacenan en:

`screenshots/`
## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>