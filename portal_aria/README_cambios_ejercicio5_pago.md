# Cambios aplicados en `ejercicio5_pago.html`

Este documento resume todos los cambios funcionales aplicados para mejorar la accesibilidad, manteniendo (de nuevo) los comentarios originales de la práctica con los textos de "PROBLEMA:" tal como estaban.

## Estructura y landmarks
- Convertido el título visual en un encabezado real: `<h1 id="page-title">Proceso de Pago Seguro</h1>`.
- El contenedor principal ahora es un landmark principal con referencia al título y foco programático: `role="main" aria-labelledby="page-title" tabindex="-1"`.
- Añadida región en vivo (polite) para anuncios accesibles de cambios dinámicos: `#liveRegion` con `aria-live="polite" aria-atomic="true"`.

## Indicador de pasos
- Corregido el atributo accesible actual del paso activo: `aria-current="step"` (antes había un `aria-concurrent` erróneo).
- Lógica JS ampliada para actualizar `aria-current` en cada cambio de paso y retirarlo de los no activos.

## Paneles de pasos (visibilidad y foco)
- Cada panel de paso ahora es enfocable (`tabindex="-1"`).
- Al mostrar/ocultar pasos, se actualiza `aria-hidden` (`false` para el activo, `true` para los inactivos).
- En cada transición, se mueve el foco al panel activo y se anuncia vía `#liveRegion` (por ejemplo, "Paso 2 de 4").

## Formulario (Paso 1: Información Personal)
- Agrupación semántica con `<fieldset>` y `<legend>` en la sección de Información Personal.
- Etiquetas asociadas correctamente a cada campo con `for`/`id`:
  - `firstName`, `lastName`, `email`, `phone`.
- Marcado de campos `required` donde corresponde.
- Etiquetado del checkbox "Crear una cuenta" con `for`/`id`.
- Contenedores de error con ids estables (`*-error`) para cada campo.

## Validación accesible
- En caso de error:
  - Se añade `aria-invalid="true"` al campo con error.
  - Se enlaza el error visual con `aria-describedby` al `div` de error correspondiente.
- Al limpiar errores, se eliminan `aria-invalid` y `aria-describedby`.

## JavaScript (cambios clave)
- `nextStep()` y `prevStep()`:
  - Ocultan/muestran paneles con `aria-hidden` consistente.
  - Enfocan el panel activo.
  - Anuncian el cambio de paso mediante `announce(...)` y `#liveRegion`.
- `showStep(stepNumber)` / `hideStep(stepNumber)`:
  - Añaden/quitan `.active` y actualizan `aria-hidden`.
- `updateStepIndicator()`:
  - Mantiene `aria-current="step"` en el paso activo; lo elimina en los demás.
- `validateCurrentStep()` / `showFieldError(...)`:
  - Gestionan `aria-invalid` y `aria-describedby` en errores.
- `announce(text)`:
  - Añadida función utilitaria para anunciar cambios en la región en vivo.

## Notas sobre comentarios
- A petición, se restauraron los textos originales de los comentarios con prefijo `PROBLEMA:` en las secciones donde habían cambiado, para mantener la guía del ejercicio visible e intacta.
- Las mejoras funcionales permanecen aplicadas aunque los comentarios adviertan de problemas (para fines didácticos del ejercicio).

## Verificación sugerida
- Ejecutar la página y usar la extensión WAVE o el inspector de accesibilidad para comprobar:
  - Presencia de landmark `main` y jerarquía de encabezados.
  - `aria-current` en el paso activo.
  - `aria-hidden` en paneles ocultos.
  - Enfoque moviéndose al panel activo al cambiar de paso.
  - Anuncios en la región en vivo al cambiar de paso.
  - Asociación `label`/`input` y feedback de validación con `aria-invalid` y `aria-describedby`.

## Próximos pasos recomendados
- Paso 2: añadir `<fieldset>/<legend>` a Dirección de Envío y Opciones de Envío; etiquetar radios y hacerlos navegables con teclado.
- Paso 3: agrupar métodos de pago en `<fieldset>/<legend>`, mejorar accesibilidad de la tarjeta (CVV, previsualización, anuncios).
- Overlays: convertir a `role="dialog"` con `aria-modal`, gestionar foco y escape; barra de progreso con atributos ARIA.
- Sidebar: envolver el resumen en `<aside>` con encabezado y anunciar cambios de totales.
