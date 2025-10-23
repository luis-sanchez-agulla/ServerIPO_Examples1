#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Autor: Marlon Cárdenas
"""
Portal de Prácticas de Accesibilidad Web con ARIA
==================================================

Este servidor Flask sirve un conjunto de ejercicios HTML5 diseñados para
enseñar y practicar técnicas avanzadas de accesibilidad web utilizando
atributos y roles ARIA.

Cada ejercicio contiene errores intencionados de accesibilidad que los
estudiantes deben identificar y corregir.

Autor: Sistema de Enseñanza de Accesibilidad Web
Fecha: Octubre 2025
"""

from flask import Flask, render_template, request, jsonify
import os

# Inicializar la aplicación Flask
app = Flask(__name__)

# Configuración básica
app.config['DEBUG'] = True  # Activar modo debug para desarrollo
app.config['SECRET_KEY'] = 'clave_secreta_para_sesiones'

# Lista de ejercicios disponibles con sus descripciones
_ejercicios = {
    'ejercicio1_home': {
        'titulo': 'Ejercicio 1: Home del Portal',
        'descripcion': 'Corrige la jerarquía de encabezados, landmarks, roles semánticos y texto alternativo de imágenes.',
        'dificultad': 'Básica',
        'conceptos': ['Landmarks', 'Headings', 'Alt text', 'Roles semánticos']
    },
    'ejercicio2_login': {
        'titulo': 'Ejercicio 2: Formulario de Login',
        'descripcion': 'Mejora la accesibilidad del formulario añadiendo etiquetas, mensajes de error y estados de carga.',
        'dificultad': 'Intermedia',
        'conceptos': ['Form labels', 'Error messages', 'aria-invalid', 'aria-live']
    },
    'ejercicio3_alta_usuario': {
        'titulo': 'Ejercicio 3: Alta de Usuario Completa',
        'descripcion': 'Reestructura un formulario extenso con fieldsets, descripciones y validaciones accesibles.',
        'dificultad': 'Avanzada',
        'conceptos': ['Fieldsets', 'aria-describedby', 'aria-required', 'Complex forms']
    },
    'ejercicio4_carrito': {
        'titulo': 'Ejercicio 4: Carrito de Compras',
        'descripcion': 'Implementa actualizaciones dinámicas accesibles y estados de productos en tiempo real.',
        'dificultad': 'Avanzada',
        'conceptos': ['aria-live', 'Dynamic content', 'aria-expanded', 'Screen reader feedback']
    },
    'ejercicio5_pago': {
        'titulo': 'Ejercicio 5: Pasarela de Pago',
        'descripcion': 'Crea un flujo de pago paso a paso con diálogos modales y control de foco accesible.',
        'dificultad': 'Experta',
        'conceptos': ['role="dialog"', 'aria-current', 'Focus management', 'Multi-step process']
    }
}

@app.route('/')
def index():
    """
    Página principal que muestra todos los ejercicios disponibles
    """
    return render_template('index.html', ejercicios=_ejercicios)

@app.route('/ejercicio/<nombre>')
def ejercicio(nombre):
    """
    Ruta dinámica que carga el ejercicio solicitado
    
    Args:
        nombre (str): Nombre del ejercicio (ej: 'ejercicio1_home')
    
    Returns:
        Template HTML del ejercicio o error 404 si no existe
    """
    if nombre in _ejercicios:
        ejercicio_info = _ejercicios[nombre]
        return render_template(f'{nombre}.html', 
                             titulo=ejercicio_info['titulo'],
                             descripcion=ejercicio_info['descripcion'])
    else:
        # Si el ejercicio no existe, mostrar error 404
        return render_template('error.html', 
                             mensaje=f"El ejercicio '{nombre}' no existe"), 404

@app.route('/api/validar_formulario', methods=['POST'])
def validar_formulario():
    """
    API endpoint para validar formularios de manera dinámica
    Utilizado en los ejercicios para demostrar feedback accesible
    """
    datos = request.get_json()
    
    # Simulación de validación
    errores = []
    
    if 'email' in datos:
        email = datos['email']
        if '@' not in email or '.' not in email:
            errores.append({
                'campo': 'email',
                'mensaje': 'El formato del email no es válido'
            })
    
    if 'password' in datos:
        password = datos['password']
        if len(password) < 8:
            errores.append({
                'campo': 'password',
                'mensaje': 'La contraseña debe tener al menos 8 caracteres'
            })
    
    # Simular un pequeño delay para mostrar estados de carga
    import time
    time.sleep(0.5)
    
    return jsonify({
        'valido': len(errores) == 0,
        'errores': errores
    })

@app.route('/api/actualizar_carrito', methods=['POST'])
def actualizar_carrito():
    """
    API endpoint para actualizar el carrito de compras
    Demuestra actualizaciones dinámicas accesibles
    """
    datos = request.get_json()
    
    # Simulación de actualización de carrito
    producto_id = datos.get('producto_id')
    accion = datos.get('accion')  # 'añadir' o 'eliminar'
    cantidad = datos.get('cantidad', 1)
    
    # Simulación de respuesta
    mensaje = f"Producto {producto_id} {'añadido al' if accion == 'añadir' else 'eliminado del'} carrito"
    
    return jsonify({
        'exito': True,
        'mensaje': mensaje,
        'total_productos': 5,  # Simulado
        'total_precio': '€89.99'  # Simulado
    })

@app.errorhandler(404)
def pagina_no_encontrada(error):
    """Manejador de errores 404 personalizado"""
    return render_template('error.html', 
                         mensaje="La página solicitada no existe"), 404

@app.errorhandler(500)
def error_interno(error):
    """Manejador de errores 500 personalizado"""
    return render_template('error.html', 
                         mensaje="Ha ocurrido un error interno del servidor"), 500

if __name__ == '__main__':
    print("=" * 60)
    print("🌐 UFV - PORTAL DE PRÁCTICAS DE ACCESIBILIDAD WEB CON ARIA")
    print("=" * 60)
    print("📚 Ejercicios disponibles:")
    for key, ejercicio in _ejercicios.items():
        print(f"   • {ejercicio['titulo']} ({ejercicio['dificultad']})")
    print()
    print("🚀 Iniciando servidor Flask...")
    print("📍 URL: http://127.0.0.1:5000")
    print("🛑 Para detener el servidor: Ctrl+C")
    print("=" * 60)
    
    # Iniciar el servidor Flask
    app.run(
        host='127.0.0.1',    # Solo accesible localmente
        port=5000,           # Puerto estándar de Flask
        debug=True,          # Modo debug activo
        use_reloader=True    # Recarga automática al cambiar código
    )