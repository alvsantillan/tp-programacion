## Tienda de Ropa Claudia — Guía de trabajo

Documento de organización para el grupo. Léanlo entero antes de escribir una línea de código.

---

## 1. De qué se trata

Sitio web para **Claudette**, tienda de ropa y accesorios de mujer. Hoy vende por Instagram; el objetivo es darle una presencia propia, más profesional, y herramientas para gestionar su negocio sin depender de nadie.

El sitio tiene **dos caras**:

- **Pública** — lo que ve una clienta que entra a mirar ropa.
- **Administración** — lo que usa Claudia para cargar productos, actualizar stock y ver quién le compró.

---

## 2. Alcance de esta etapa

### Qué SÍ hacemos ahora

- Catálogo navegable con filtros por categoría y talle
- Ficha de detalle de cada producto
- Panel de administración: alta, edición y baja de productos
- Registro de clientes
- Contacto y derivación a WhatsApp / Instagram

### Qué NO hacemos ahora

- Carrito de compras
- Pasarela de pagos (Mercado Pago)
- Cálculo de envíos
- Cuentas de usuario para las clientas

> Esto queda planteado como **etapa 2**. No lo desarrollamos, pero dejamos el HTML preparado para que después entre sin rehacer todo (ver sección 6).

---

## 3. Páginas del sitio

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
├── contacto.html
├── admin/
│   ├── login.html
│   ├── productos.html
│   ├── producto-form.html
│   └── clientes.html
├── css/
│   └── estilos.css
├── js/
│   └── main.js
├── img/
│   ├── productos/
│   └── ui/
└── README.md
```

**Regla:** nadie crea carpetas nuevas sin avisar al grupo.

---

## 5. Convenciones de código

Esto es lo que evita que el proyecto parezca hecho por cinco personas distintas.

### Nombres de archivos y clases

- Todo en **minúscula**, sin acentos, sin espacios, sin ñ
- Palabras separadas con guión medio: `producto-form.html`, `card-producto`
- Nombres de clases **en español**, descriptivos: `.card-producto`, `.filtro-talle`, `.boton-primario`

### HTML

- Indentación de **2 espacios** (configúrenlo en VS Code)
- Etiquetas semánticas siempre que se pueda: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Nada de `<div>` para todo.
- Todas las imágenes con `alt` descriptivo
- Un solo `<h1>` por página

### Estructura común

El `<header>` y el `<footer>` son **idénticos en todas las páginas**. Se copian y pegan tal cual desde `index.html`. Si alguien necesita cambiarlos, lo avisa al grupo y se cambia en todas.

---

## 6. Preparado para la etapa 2

Tres cosas que hay que respetar desde ahora aunque no se usen todavía:

1. **Cada producto lleva un ID único** en su contenedor:
   ```html
   <article class="card-producto" data-id="1">
   ```

2. **Precio, talle y stock van en elementos separados**, nunca todo junto en un párrafo:
   ```html
   <p class="precio">$25.000</p>
   <ul class="talles">
     <li>S</li><li>M</li><li>L</li>
   </ul>
   ```

3. **Botón de consulta** en cada producto, que después se convierte en "Agregar al carrito":
   ```html
   <a class="boton-consultar" href="https://wa.me/549...">Consultar</a>
   ```

---

## 7. Reparto de tareas

Propuesta para arrancar. Ajústenla entre ustedes según cómo se sientan más cómodos.

| Integrante | Tarea | Rama |
|---|---|---|
| 1 | Estructura base + header + footer | `feature/estructura-base` |
| 2 | Home (hero, destacados) | `feature/home` |
| 3 | Catálogo + filtros | `feature/catalogo` |
| 4 | Detalle de producto + nosotros | `feature/producto` |
| 5 | Contacto + panel de admin | `feature/admin` |

**Importante:** la tarea 1 va primero y sola. Hasta que la estructura base no esté en `dev`, los demás no arrancan — si no, todos escriben el mismo header cinco veces y al fusionar es un conflicto en cada línea.

---

## 8. Flujo de trabajo con Git

### Antes de empezar a trabajar, siempre

```bash
git checkout dev
git pull
git checkout -b feature/mi-tarea
```

### Mientras trabajás

```bash
git add .
git commit -m "Agrego grilla de productos al catálogo"
```

Commits **chicos y frecuentes**. Uno por cada cosa que terminás, no uno gigante al final del día.

### Cuando terminás

```bash
git push -u origin feature/mi-tarea
```

Después, en GitHub: **Pull Request** de tu rama hacia `dev`. Otro del grupo lo revisa y lo aprueba.

### Reglas

- **Nadie pushea directo a `dev`.** Todo entra por Pull Request.
- **Nadie toca `main`.** Se fusiona `dev` → `main` solo al entregar.
- Si tu rama quedó vieja porque otros fusionaron cosas, actualizala:
  ```bash
  git checkout dev
  git pull
  git checkout feature/mi-tarea
  git merge dev
  ```

### Mensajes de commit

- En español, en presente, describiendo qué hace el cambio
- ✅ `Agrego formulario de contacto`
- ✅ `Corrijo alineación del footer`
- ❌ `cambios`
- ❌ `asdasd`
- ❌ `arreglos varios`

---

## 9. Checklist antes de entregar

- [ ] Repositorio con `main` y `dev`, `dev` como rama por defecto
- [ ] Los 5 integrantes agregados como colaboradores
- [ ] Todos hicieron al menos un commit con su usuario
- [ ] Ramas `feature/` creadas y fusionadas por Pull Request
- [ ] README con nombre del proyecto, integrantes y descripción
- [ ] Todas las páginas HTML creadas y enlazadas entre sí
- [ ] Ninguna página tiene enlaces rotos
- [ ] HTML validado (validator.w3.org)
