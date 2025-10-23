/**
 * Portal de Accesibilidad Web - JavaScript Base
 * ==============================================
 * Autor: Marlon Cardenas
 * Fecha: Octubre 2025
 * Este archivo contiene funciones JavaScript base para los ejercicios.
 * NOTA: El código contiene errores intencionados de accesibilidad que los
 * estudiantes deben identificar y corregir.
 */

// Configuración global
const PortalAria = {
    // URLs de la API
    API: {
        VALIDAR_FORMULARIO: '/api/validar_formulario',
        ACTUALIZAR_CARRITO: '/api/actualizar_carrito'
    },
    
    // Configuraciones de accesibilidad
    ARIA: {
        LIVE_REGIONS: {
            POLITE: 'polite',
            ASSERTIVE: 'assertive',
            OFF: 'off'
        },
        ROLES: {
            ALERT: 'alert',
            DIALOG: 'dialog',
            BUTTON: 'button',
            TAB: 'tab',
            TABPANEL: 'tabpanel'
        }
    },
    
    // Estado global de la aplicación
    estado: {
        formularioEnviando: false,
        carritoProductos: 0,
        pasoActualPago: 1
    }
};

/**
 * Funciones de utilidad para accesibilidad
 */
const AccesibilidadUtils = {
    
    /**
     * Anuncia un mensaje a los lectores de pantalla
     * PROBLEMA INTENCIONADO: Falta implementación de aria-live
     */
    anunciar: function(mensaje, prioridad = 'polite') {
        // TODO: Los estudiantes deben implementar esto correctamente
        console.log('Anunciando:', mensaje);
        // FALTA: Crear región live y añadir el mensaje
    },
    
    /**
     * Gestiona el foco en un elemento
     * PROBLEMA INTENCIONADO: No maneja casos edge
     */
    enfocar: function(elemento) {
        if (elemento && elemento.focus) {
            elemento.focus();
            // FALTA: Verificar si el elemento es realmente enfocable
            // FALTA: Manejar elementos con tabindex=-1
        }
    },
    
    /**
     * Bloquea/desbloquea la página para diálogos modales
     * PROBLEMA INTENCIONADO: Implementación incompleta
     */
    bloquearPagina: function(bloquear) {
        const main = document.querySelector('main');
        if (main) {
            // FALTA: Implementar aria-hidden correctamente
            main.style.display = bloquear ? 'none' : 'block';
        }
    },
    
    /**
     * Valida si un elemento es visible para lectores de pantalla
     */
    esVisible: function(elemento) {
        return elemento && 
               elemento.offsetWidth > 0 && 
               elemento.offsetHeight > 0 &&
               getComputedStyle(elemento).visibility !== 'hidden';
    }
};

/**
 * Gestión de formularios accesibles
 * PROBLEMAS INTENCIONADOS: Múltiples errores de accesibilidad
 */
const FormularioManager = {
    
    /**
     * Inicializa la validación de formularios
     */
    init: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.configurarEventos();
        });
    },
    
    /**
     * Configura eventos de formularios
     * PROBLEMA: Falta manejo de teclado
     */
    configurarEventos: function() {
        const formularios = document.querySelectorAll('form');
        
        formularios.forEach(form => {
            form.addEventListener('submit', this.manejarEnvio.bind(this));
            
            // FALTA: Añadir eventos de teclado
            // FALTA: Validación en tiempo real
        });
    },
    
    /**
     * Maneja el envío de formularios
     * PROBLEMAS: Múltiples errores de accesibilidad
     */
    manejarEnvio: function(evento) {
        evento.preventDefault();
        
        const formulario = evento.target;
        const datos = new FormData(formulario);
        
        // PROBLEMA: No indica estado de carga
        PortalAria.estado.formularioEnviando = true;
        
        // Simular llamada a API
        this.validarFormulario(Object.fromEntries(datos))
            .then(resultado => {
                if (resultado.valido) {
                    this.mostrarExito(formulario);
                } else {
                    this.mostrarErrores(formulario, resultado.errores);
                }
            })
            .catch(error => {
                this.mostrarError(formulario, 'Error de conexión');
            })
            .finally(() => {
                PortalAria.estado.formularioEnviando = false;
                // FALTA: Remover indicadores de carga
            });
    },
    
    /**
     * Valida formulario via API
     */
    validarFormulario: async function(datos) {
        const response = await fetch(PortalAria.API.VALIDAR_FORMULARIO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        return await response.json();
    },
    
    /**
     * Muestra errores de validación
     * PROBLEMAS GRAVES: No es accesible
     */
    mostrarErrores: function(formulario, errores) {
        // PROBLEMA: No limpia errores anteriores
        // PROBLEMA: No usa aria-invalid
        // PROBLEMA: No enfoca el primer error
        
        errores.forEach(error => {
            const campo = formulario.querySelector(`[name="${error.campo}"]`);
            if (campo) {
                // PROBLEMA: Solo cambia el estilo visual
                campo.classList.add('error');
                
                // PROBLEMA: No asocia el mensaje con el campo
                const mensaje = document.createElement('div');
                mensaje.textContent = error.mensaje;
                mensaje.className = 'error-message';
                campo.parentNode.appendChild(mensaje);
            }
        });
    },
    
    /**
     * Muestra mensaje de éxito
     * PROBLEMA: No es anunciado a lectores de pantalla
     */
    mostrarExito: function(formulario) {
        const mensaje = document.createElement('div');
        mensaje.textContent = 'Formulario enviado correctamente';
        mensaje.className = 'alert alert-success';
        formulario.parentNode.insertBefore(mensaje, formulario);
        
        // PROBLEMA: No se anuncia a lectores de pantalla
    }
};

/**
 * Gestión del carrito de compras
 * PROBLEMAS: Falta feedback accesible para cambios dinámicos
 */
const CarritoManager = {
    
    productos: [],
    
    init: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.configurarEventos();
            this.actualizarContador();
        });
    },
    
    /**
     * Configura eventos del carrito
     */
    configurarEventos: function() {
        // Botones de añadir producto
        document.addEventListener('click', (evento) => {
            if (evento.target.matches('.btn-anadir-producto')) {
                const productoId = evento.target.dataset.productoId;
                this.anadirProducto(productoId);
            }
            
            if (evento.target.matches('.btn-eliminar-producto')) {
                const productoId = evento.target.dataset.productoId;
                this.eliminarProducto(productoId);
            }
        });
    },
    
    /**
     * Añade un producto al carrito
     * PROBLEMA: No proporciona feedback accesible
     */
    anadirProducto: function(productoId) {
        // PROBLEMA: No indica estado de carga
        // PROBLEMA: No anuncia el cambio a lectores de pantalla
        
        fetch(PortalAria.API.ACTUALIZAR_CARRITO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                producto_id: productoId,
                accion: 'anadir'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                PortalAria.estado.carritoProductos++;
                this.actualizarContador();
                // PROBLEMA: No anuncia el cambio
                console.log(data.mensaje);
            }
        })
        .catch(error => {
            // PROBLEMA: Error no accesible
            console.error('Error:', error);
        });
    },
    
    /**
     * Elimina un producto del carrito
     * PROBLEMA: Mismos problemas que añadir
     */
    eliminarProducto: function(productoId) {
        // Implementación similar con los mismos problemas
        PortalAria.estado.carritoProductos--;
        this.actualizarContador();
    },
    
    /**
     * Actualiza el contador visual
     * PROBLEMA: Solo visual, no accesible
     */
    actualizarContador: function() {
        const contador = document.querySelector('.carrito-contador');
        if (contador) {
            contador.textContent = PortalAria.estado.carritoProductos;
            // PROBLEMA: No actualiza texto alternativo o aria-label
        }
    }
};

/**
 * Gestión del proceso de pago por pasos
 * PROBLEMAS: Control de foco y navegación no accesibles
 */
const PagoManager = {
    
    pasoActual: 1,
    totalPasos: 4,
    
    init: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.configurarEventos();
            this.actualizarPaso();
        });
    },
    
    /**
     * Configura eventos del proceso de pago
     */
    configurarEventos: function() {
        document.addEventListener('click', (evento) => {
            if (evento.target.matches('.btn-siguiente-paso')) {
                this.siguientePaso();
            }
            
            if (evento.target.matches('.btn-paso-anterior')) {
                this.pasoAnterior();
            }
        });
        
        // FALTA: Navegación con teclado
        // FALTA: Escape para cancelar
    },
    
    /**
     * Avanza al siguiente paso
     * PROBLEMAS: No maneja foco ni anuncia cambios
     */
    siguientePaso: function() {
        if (this.pasoActual < this.totalPasos) {
            this.pasoActual++;
            this.actualizarPaso();
            // PROBLEMA: No enfoca el nuevo paso
            // PROBLEMA: No anuncia el cambio
        }
    },
    
    /**
     * Retrocede al paso anterior
     */
    pasoAnterior: function() {
        if (this.pasoActual > 1) {
            this.pasoActual--;
            this.actualizarPaso();
        }
    },
    
    /**
     * Actualiza la visualización del paso actual
     * PROBLEMA: Solo actualización visual
     */
    actualizarPaso: function() {
        const pasos = document.querySelectorAll('.paso');
        const paneles = document.querySelectorAll('.paso-panel');
        
        pasos.forEach((paso, index) => {
            const numeroPaso = index + 1;
            
            // PROBLEMA: No actualiza aria-current
            if (numeroPaso === this.pasoActual) {
                paso.classList.add('activo');
            } else if (numeroPaso < this.pasoActual) {
                paso.classList.add('completado');
                paso.classList.remove('activo');
            } else {
                paso.classList.remove('activo', 'completado');
            }
        });
        
        // Mostrar/ocultar paneles
        paneles.forEach((panel, index) => {
            // PROBLEMA: No usa aria-hidden
            panel.style.display = (index + 1 === this.pasoActual) ? 'block' : 'none';
        });
        
        PortalAria.estado.pasoActualPago = this.pasoActual;
    }
};

/**
 * Gestión de diálogos modales
 * PROBLEMAS CRÍTICOS: No maneja foco ni teclas correctamente
 */
const DialogoManager = {
    
    dialogoActual: null,
    elementoAnterior: null,
    
    /**
     * Abre un diálogo modal
     * PROBLEMAS: Gestión de foco incorrecta
     */
    abrir: function(dialogoId) {
        const dialogo = document.getElementById(dialogoId);
        if (!dialogo) return;
        
        // PROBLEMA: No guarda el elemento que tenía foco
        this.elementoAnterior = document.activeElement;
        
        this.dialogoActual = dialogo;
        
        // PROBLEMA: No bloquea la página de fondo
        dialogo.style.display = 'block';
        
        // PROBLEMA: No enfoca correctamente
        const primerEnfocable = dialogo.querySelector('button, input, select, textarea');
        if (primerEnfocable) {
            primerEnfocable.focus();
        }
        
        // FALTA: Trap de foco
        // FALTA: Manejo de tecla Escape
    },
    
    /**
     * Cierra el diálogo actual
     * PROBLEMA: No restaura el foco
     */
    cerrar: function() {
        if (this.dialogoActual) {
            this.dialogoActual.style.display = 'none';
            
            // PROBLEMA: No restaura el foco anterior
            if (this.elementoAnterior) {
                // this.elementoAnterior.focus(); // ¡Comentado a propósito!
            }
            
            this.dialogoActual = null;
            this.elementoAnterior = null;
        }
    }
};

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Portal ARIA - JavaScript cargado');
    console.log('⚠️  NOTA: Este código contiene errores intencionados de accesibilidad');
    console.log('📚 Los estudiantes deben identificar y corregir los problemas');
    
    // Inicializar managers
    FormularioManager.init();
    CarritoManager.init();
    PagoManager.init();
});

// LISTA DE PROBLEMAS PARA QUE LOS ESTUDIANTES IDENTIFIQUEN:
// 1. Falta implementación de aria-live regions
// 2. No se anuncia contenido dinámico a lectores de pantalla  
// 3. Gestión de foco incorrecta en diálogos
// 4. Falta trap de foco en modales
// 5. No se usa aria-invalid para errores de formulario
// 6. Falta aria-describedby para asociar mensajes con campos
// 7. No se maneja la tecla Escape en diálogos
// 8. Falta aria-current para indicar paso actual
// 9. No se bloquea correctamente el contenido de fondo en modales
// 10. Falta feedback accesible para acciones de carrito
// 11. No hay navegación con teclado en procesos de pasos
// 12. Estados de carga no son accesibles