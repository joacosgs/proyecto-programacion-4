# Sporting

## Integrantes

- Joaquin Bernardo
- Leonel Ferrari
- Santiago Juarez
- Santiago Acosta

## Descripción

Sporting es una página web de venta de ropa, zapatillas y accesorios deportivos.

## Tecnologías utilizadas

- HTML
- CSS
- Bootstrap 5
- JavaScript
- DOM y eventos
- Git y GitHub

## Cómo está hecha la página

- Usamos Bootstrap 5 para organizar la página y hacerla adaptable a distintos tamaños de pantalla.
- La barra de navegación usa las clases de Bootstrap para que el menú se adapte en celulares.
- La sección "Nosotros" está formada por tres tarjetas Bootstrap.
- La sección "Productos" muestra tres tarjetas Bootstrap con imágenes, títulos y descripciones.
- Las tarjetas de productos tienen borde verde, fondo blanco y una sombra para destacarse.
- El formulario de contacto usa filas y columnas de Bootstrap para acomodarse en computadoras, tabletas y celulares.
- Se incorporó validación del formulario con JavaScript: se valida que los campos no estén vacíos y que el email contenga el símbolo `@`.
- Se incorporó una pequeña interacción de productos con botones `+` y `−` para aumentar o disminuir la cantidad y un contador del carrito visible en la barra de navegación.
- Usamos CSS propio para los colores, las fuentes, los fondos y los detalles visuales.
- La imagen `fondotodocompu.png` se usa en computadoras y tabletas, mientras que `fondotodocelu.png` se usa en celulares.
- Usamos las fuentes Roboto para el texto general y Oswald para los títulos.

## Etiquetas SEO utilizadas

En la página usamos las siguientes etiquetas para ayudar a los buscadores y mejorar la vista previa al compartir el sitio en redes:

1. `<title>`: muestra el título de la página en la pestaña del navegador y en los resultados de búsqueda.
2. `description`: explica brevemente de qué trata Sporting.
3. `author`: indica el autor o responsable de la página.
4. `keywords`: incluye palabras relacionadas con productos deportivos.
5. `robots`: indica a los buscadores que pueden registrar la página y seguir sus enlaces.
6. `og:title`: define el título que se muestra al compartir el enlace en redes sociales.
7. `og:description`: define la descripción que acompaña al enlace compartido.
8. `og:type`: indica que el contenido compartido es un sitio web.
9. `og:image`: define la imagen que se muestra al compartir el sitio.
10. `twitter:card`: define el formato de la vista previa al compartir en X/Twitter.

## Flexbox

Usamos Flexbox en el header para acomodar el nombre de la página y el menú. También lo usamos en contacto y en los enlaces del footer.

## Grid

Usamos el sistema de filas y columnas de Bootstrap en la parte de productos para mostrar las tres tarjetas una al lado de la otra en pantallas grandes y una debajo de otra en celulares.

## Variables CSS

Creamos variables para guardar colores, fuentes, espacios y bordes. Por ejemplo:

- `--primary-color`
- `--main-font`
- `--spacing-medium`
- `--border-radius`

## Interacción JavaScript y DOM

La página incorpora una pequeña capa de interactividad con JavaScript usando el DOM y eventos:

1. Validación del formulario de contacto.
2. Mensaje de feedback visual para el usuario.
3. Contador de carrito visible en la barra de navegación.
4. Botones `+` y `−` en cada tarjeta de producto para aumentar o disminuir la cantidad seleccionada.
5. Cálculo automático del total del carrito según los productos seleccionados.
6. Resumen visual del carrito con la cantidad de productos y el precio total.

## Responsive Design

La página se adapta a computadoras, tabletas y celulares. En pantallas chicas, los productos quedan uno debajo del otro, el menú se contrae y se utiliza un fondo vertical para que la imagen se vea mejor.
