## Tienda de Ropa Claudia — Guía de trabajo

Presentacion del proyecto y organizacion del mismo:
Tienda de ropa Claudia - Claudette es una tienda de ropa y accesorios para mujer. Su unico canal de venta online es por Ig, el objetivo del proyecto es brindar una herramienta mas para posicionarse en el mercado y que sus clientas tengan otra forma de ver o acceder a sus productos.

El sitio es una carta de presentacion en la cual podes ver todos los productos, pedir informacion y en una segunda etapa comprar u reservar directamente a traves del mismo.

### Zona pública

| Archivo | Contenido |
|---|---|
| `index.html` | Home: hero, destacados, novedades |
| `catalogo.html` | Grilla de productos + filtros |
| `producto.html` | Detalle: fotos, descripción, talles, precio |
| `nosotros.html` | Historia de la marca |
| `contacto.html` | Formulario + WhatsApp + Instagram |

### Zona de administración

| Archivo | Contenido |
|---|---|
| `admin/login.html` | Ingreso de Claudia |
| `admin/productos.html` | Listado de productos con stock |
| `admin/producto-form.html` | Alta y edición de producto |
| `admin/clientes.html` | Listado de clientes |

---

## 4. Estructura de carpetas

```
tienda-claudia/
├── index.html
├── catalogo.html
├── producto.html
├── nosotros.html
├── contacto.html (VER)
├── admin/ -----> Pato(VER)
│   ├── login.html
│   ├── productos.html
│   ├── producto-form.html
│   └── clientes.html
├── css/
│   └── estyle.css
├── js/
│   └── main.js
├── img/
│   ├── productos/
│   └── ui/
└── README.md
```
## SEO (posicionamiento en buscadores)

Le agregamos a las páginas unas etiquetas especiales dentro del `<head>` que no se ven en pantalla, pero ayudan a que la página aparezca mejor en Google y se vea bien cuando alguien comparte el link.

- Descripción (`description`): es el texto corto que aparece debajo del título cuando alguien busca algo en Google. Le pusimos un resumen del producto para que la gente sepa de qué se trata antes de entrar.
- Palabras clave (`keywords`): son las palabras que más se relacionan con la página (por ejemplo: ropa, vestidos, Claudette), para ayudar a que el sitio se encuentre más fácil.
- Open Graph (`og:title`, `og:description`): sirve para que, cuando alguien comparte el link por WhatsApp o Instagram, se vea una vista previa prolija con el título y una descripción, en vez de mostrar solo el link pelado.

En resumen: son detalles chicos que no cambian cómo se ve la página para el usuario, pero ayudan a que el sitio se vea mejor cuando lo buscan o lo comparten.