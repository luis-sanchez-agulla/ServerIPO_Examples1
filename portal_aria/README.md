# Portal de Prácticas de Accesibilidad Web con ARIA

## 📚 Descripción

Este es un **proyecto educativo completo** desarrollado en **Python Flask** que sirve como entorno de prácticas para estudiantes que aprenden técnicas avanzadas de **accesibilidad web con HTML5 y ARIA**.

El portal contiene **5 ejercicios prácticos** con código intencionadamente problemático que los estudiantes deben analizar, identificar errores y corregir aplicando buenas prácticas de accesibilidad web.

## 🎯 Objetivos Educativos

- Identificar problemas comunes de accesibilidad web
- Aplicar roles, atributos y relaciones ARIA avanzadas
- Mejorar la navegación con teclado
- Implementar contenido dinámico accesible
- Crear formularios y procesos complejos accesibles
- Usar herramientas de validación de accesibilidad

## 🏗️ Estructura del Proyecto

```
portal_aria/
│
├── app.py                          # Servidor Flask principal
├── templates/                      # Plantillas HTML
│   ├── index.html                 # Página principal del portal
│   ├── ejercicio1_home.html       # Ejercicio 1: Home general
│   ├── ejercicio2_login.html      # Ejercicio 2: Login con Bootstrap
│   ├── ejercicio3_alta_usuario.html  # Ejercicio 3: Alta de usuario
│   ├── ejercicio4_carrito.html    # Ejercicio 4: Carrito de compra
│   ├── ejercicio5_pago.html       # Ejercicio 5: Pasarela de pago
│   └── error.html                 # Página de error
├── static/                        # Archivos estáticos
│   ├── css/
│   │   └── styles.css            # Estilos base (con problemas intencionados)
│   ├── js/
│   │   └── portal.js             # JavaScript base (con problemas intencionados)
│   └── img/                      # Imágenes (vacío, usa SVG inline)
└── README.md                     # Este archivo
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Python 3.7+** instalado en tu sistema
- **Flask** (se instala automáticamente)

### Pasos para ejecutar

1. **Navegar al directorio del proyecto:**
   ```bash
   cd portal_aria
   ```

2. **Instalar Flask (si no lo tienes):**
   ```bash
   pip install flask
   ```

3. **Ejecutar el servidor:**
   ```bash
   python app.py
   ```

4. **Abrir en el navegador:**
   ```
   http://127.0.0.1:5000
   ```

5. **¡Listo!** Ya puedes comenzar con los ejercicios.

## 📋 Ejercicios Incluidos

### Ejercicio 1: Home del Portal
- **Dificultad:** Básica
- **Conceptos:** Landmarks, Headings, Alt text, Roles semánticos
- **Problemas principales:**
  - Estructura de encabezados incorrecta
  - Falta de landmarks semánticos
  - Imágenes sin texto alternativo
  - Navegación sin accesibilidad

### Ejercicio 2: Formulario de Login
- **Dificultad:** Intermedia  
- **Conceptos:** Form labels, Error messages, aria-invalid, aria-live
- **Problemas principales:**
  - Labels no asociados con campos
  - Mensajes de error no accesibles
  - Estados de carga sin feedback
  - CAPTCHA sin alternativa accesible

### Ejercicio 3: Alta de Usuario Completa
- **Dificultad:** Avanzada
- **Conceptos:** Fieldsets, aria-describedby, aria-required, Complex forms
- **Problemas principales:**
  - Formulario extenso sin agrupación
  - Campos sin descripciones apropiadas
  - Validación no accesible
  - 15+ tipos diferentes de campos problemáticos

### Ejercicio 4: Carrito de Compras
- **Dificultad:** Avanzada
- **Conceptos:** aria-live, Dynamic content, aria-expanded, Screen reader feedback
- **Problemas principales:**
  - Contenido dinámico no anunciado
  - Carrito lateral sin accesibilidad
  - Estados de productos no comunicados
  - Interacciones solo visuales

### Ejercicio 5: Pasarela de Pago
- **Dificultad:** Experta
- **Conceptos:** role="dialog", aria-current, Focus management, Multi-step process
- **Problemas principales:**
  - Proceso multi-paso sin navegación accesible
  - Overlays modales sin manejo de foco
  - Estados de progreso no comunicados
  - Formularios complejos sin estructura

## 🔍 Cómo Usar Este Portal

### Para Estudiantes

1. **Selecciona un ejercicio** desde la página principal
2. **Analiza el código HTML** usando herramientas de desarrollo
3. **Usa herramientas de validación** como WAVE, AXE o Accessibility Insights
4. **Identifica los problemas** de accesibilidad presentes
5. **Corrige el código** aplicando técnicas ARIA apropiadas
6. **Valida tus cambios** con las herramientas mencionadas
7. **Prueba con lectores de pantalla** (NVDA, JAWS, VoiceOver)

### Para Instructores

- Cada ejercicio está **completamente documentado** con comentarios
- Los problemas están **intencionadamente diseñados** para enseñar conceptos específicos
- El **código fuente** es fácilmente editable para personalizar ejercicios
- Se puede usar como **base** para crear nuevos ejercicios

## 🛠️ Herramientas Recomendadas

### Validadores de Accesibilidad
- [**WAVE Web Accessibility Evaluator**](https://wave.webaim.org/) - Análisis visual de problemas
- [**AXE DevTools**](https://www.deque.com/axe/) - Extensión de navegador potente
- [**Accessibility Insights**](https://accessibilityinsights.io/) - Herramienta de Microsoft
- [**Lighthouse**](https://developers.google.com/web/tools/lighthouse) - Auditorías integradas en Chrome

### Lectores de Pantalla (para pruebas)
- [**NVDA**](https://www.nvaccess.org/) - Gratuito, muy popular
- [**Screen Reader para Chrome**](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn) - Para pruebas rápidas
- **VoiceOver** (macOS) - Incluido en Mac
- **Narrator** (Windows) - Incluido en Windows

### Validadores Adicionales
- [**W3C Markup Validator**](https://validator.w3.org/) - Validación HTML
- [**Color Contrast Analyzer**](https://www.colour-contrast.com/) - Verificar contraste
- **Keyboard Navigation** - Pruebas manuales con Tab, Enter, Escape

## ⚠️ Problemas Intencionados Incluidos

Este proyecto incluye **más de 200 problemas específicos** de accesibilidad distribuidos en los 5 ejercicios:

### Problemas Estructurales
- Jerarquía de encabezados incorrecta
- Falta de landmarks semánticos (`main`, `nav`, `aside`, `header`, `footer`)
- Elementos sin roles apropiados
- Skip links ausentes

### Problemas de Formularios
- Labels no asociados correctamente
- Campos requeridos sin `aria-required`
- Mensajes de error no asociados con `aria-describedby`
- Estados de validación sin `aria-invalid`
- Grupos de campos sin `fieldset`/`legend`

### Problemas de Contenido Dinámico
- Cambios no anunciados (falta `aria-live`)
- Estados de carga no accesibles
- Actualizaciones sin feedback para lectores de pantalla
- Contenido que aparece/desaparece sin avisos

### Problemas de Navegación
- Elementos no enfocables con teclado
- Trap de foco ausente en modales
- Orden de tabulación lógico incorrecto
- Manejo inadecuado de teclas (Escape, Enter, flechas)

### Problemas Visuales
- Contraste de colores insuficiente
- Elementos que dependen solo del color
- Texto muy pequeño
- Indicadores de foco invisibles

## 📖 Recursos de Referencia

### Documentación Oficial
- [**WAI-ARIA Authoring Practices Guide**](https://www.w3.org/WAI/ARIA/apg/)
- [**WAI-ARIA 1.1 Specification**](https://www.w3.org/TR/wai-aria-1.1/)
- [**WCAG 2.1 Quick Reference**](https://www.w3.org/WAI/WCAG21/quickref/)
- [**MDN ARIA Documentation**](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

### Técnicas y Patrones
- [**ARIA Design Patterns**](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [**WebAIM Articles**](https://webaim.org/articles/)
- [**The A11Y Project**](https://www.a11yproject.com/)
- [**Inclusive Components**](https://inclusive-components.design/)

## 🎓 Conceptos ARIA Cubiertos

### Roles Semánticos
- `role="main"`, `role="navigation"`, `role="banner"`
- `role="dialog"`, `role="alert"`, `role="status"`
- `role="button"`, `role="tab"`, `role="tabpanel"`
- `role="progressbar"`, `role="application"`

### Propiedades y Estados
- `aria-label`, `aria-labelledby`, `aria-describedby`
- `aria-required`, `aria-invalid`, `aria-expanded`
- `aria-current`, `aria-busy`, `aria-hidden`
- `aria-live`, `aria-atomic`, `aria-relevant`

### Relaciones
- `aria-controls`, `aria-owns`, `aria-activedescendant`
- `aria-flowto`, `aria-posinset`, `aria-setsize`

### Técnicas Avanzadas
- Regiones live para contenido dinámico
- Manejo de foco programático
- Navegación con teclado personalizada
- Comunicación de cambios de estado
- Procesos multi-paso accesibles

## 🔧 Personalización

### Añadir Nuevos Ejercicios

1. **Crear nueva plantilla HTML** en `templates/`
2. **Añadir ruta** en `app.py`:
   ```python
   EJERCICIOS['ejercicio6_nuevo'] = {
       'titulo': 'Nuevo Ejercicio',
       'descripcion': 'Descripción del ejercicio',
       'dificultad': 'Intermedia',
       'conceptos': ['Concepto1', 'Concepto2']
   }
   ```
3. **Crear problemas intencionados** siguiendo el patrón de otros ejercicios
4. **Documentar** los problemas en comentarios HTML

### Modificar Ejercicios Existentes

- **Los archivos HTML** están completamente comentados
- **Cada problema** tiene una descripción clara
- **El CSS y JavaScript** también contienen errores documentados
- **Fácil** añadir o quitar problemas específicos

## 📞 Soporte y Contacto

Para preguntas sobre el uso educativo de este portal:

- **Email de contacto:** accesibilidad@ejemplo.com
- **Documentación adicional:** Consulta los comentarios en el código fuente
- **Issues:** Reporta problemas técnicos en el repositorio

## 📝 Licencia

Este proyecto ha sido creado con **fines educativos**. Libre uso para enseñanza y aprendizaje de accesibilidad web.

---

## 🚀 ¡Comienza Ahora!

1. Ejecuta el servidor: `python app.py`
2. Abre http://127.0.0.1:5000
3. Selecciona el **Ejercicio 1** para comenzar
4. ¡Mejora la accesibilidad web paso a paso!

---

**Creado para la asignatura de IPO, comprometidos con la accesibilidad web** 🌐♿

*Recuerda: La accesibilidad no es una característica opcional, es un derecho fundamental.*