# Sporting

Sporting es una landing page de indumentaria, calzado y accesorios deportivos con un ecommerce de estilo comercial, carrito interactivo y flujo de registro de cliente del lado del navegador.

## Integrantes

- Joaquin Bernardo
- Leonel Ferrari
- Santiago Juarez
- Santiago Acosta

## Descripción del proyecto

La página incluye una navegación principal, una sección de bienvenida, catálogo de productos, carrito de compras, formulario de contacto y un sistema de perfil de usuario sin base de datos.

Las funcionalidades actuales suman una experiencia de compra más completa:

- perfil de usuario con registro local en `localStorage`
- formulario de creación de cuenta con validación visual
- selección de provincia desde un menú desplegable
- consulta de sucursales físicas por provincia
- visualización de horarios, direcciones y mapa de cada provincia
- carga de localidad y dirección para envío
- reutilización automática de la dirección en el carrito
- bloqueo de compra si no existe un perfil creado
- edición y cierre de sesión del usuario
- resumen del perfil visible luego de guardar la información

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- DOM
- almacenamiento local con `localStorage`
- Google Fonts
- Git y GitHub

## Características principales

- Navbar con logo de la marca, carrito y botón de perfil.
- Tarjetas de productos con precio y controles de cantidad.
- Carrito con subtotal, envío, total y lista de productos seleccionados.
- Validación del formulario de contacto.
- Registro de cliente con nombre, apellido, teléfono, email, documento, país, provincia, localidad, dirección.
- Menú desplegable de provincias para Argentina.
- Tarjetas de tiendas físicas con horarios y direcciones por provincia.
- Mapa de Google que aparece al seleccionar una provincia y se actualiza al elegir una sucursal.
- Ocultamiento de las ubicaciones y el mapa al volver a seleccionar la provincia activa.
- Guardado persistente del perfil en el navegador.
- Mostrar la dirección del cliente en el carrito y al confirmar compra.
- Confirmación de compra con mensaje personalizado.
- Carrito se limpia luego de finalizar una compra.
- Modal de perfil con estado alternado entre formulario y resumen guardado.
- Botones para editar información y cerrar sesión.
- Resaltado rojo en campos incompletos durante la validación.
- Diseño responsive para mobile y desktop.

## Funcionalidades JavaScript actuales

El archivo `script.js` maneja:

1. creación y lectura del perfil del cliente usando `localStorage`
2. validación de campos obligatorios del registro
3. selección de provincias y renderizado de sucursales
4. actualización del mapa según la provincia o sucursal elegida
5. renderizado del resumen del perfil guardado
6. actualización del carrito al crear o cerrar sesión
7. bloqueo del botón de finalizar compra si no hay perfil
8. confirmación de compra y limpieza del carrito
9. validación del formulario de contacto
10. mensajes visuales de feedback al usuario

## Estructura principal

- `index.html`: estructura completa del sitio y modal de perfil
- `style.css`: estilos, tema verde, responsive y componentes personalizados
- `script.js`: lógica de producto, carrito, validación y perfil de usuario
- `img/`: imágenes, logos y fondos del proyecto

## Estado actual

El proyecto se encuentra en una versión funcional de ecommerce comercial con perfil de usuario, almacenamiento local, validación visual y flujo de compra completo del lado del cliente.

## Cómo ejecutar el proyecto

1. Clonar este repositorio.
2. Abrir la carpeta del proyecto.
3. Ejecutar `index.html` en el navegador, o usar Live Server desde el editor.

## Nota

La aplicación no usa una base de datos real; el registro del usuario y la dirección de envío se guardan localmente en el navegador para simular un flujo de compra real sin backend.
