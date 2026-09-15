const productos = {
  1: {
    nombre: "Vestido Floral",
    precio: 45900,
    imagen: "img/ui/claudete-vestido.jpg",
    descripcion: "Vestido floral de temporada, ideal para ocasiones especiales.",
  },
  2: {
    nombre: "Blusa Elegance",
    precio: 32500,
    imagen: "img/productos/Remera.jpeg",
    descripcion: "Blusa elegante y comoda para combinar con diferentes prendas.",
  },
  3: {
    nombre: "Jean Classic",
    precio: 52900,
    imagen: "img/productos/Pantalon.jpeg",
    descripcion: "Jean clasico de corte moderno y comodo.",
  },
  4: {
    nombre: "Campera Urbana",
    precio: 78900,
    imagen: "img/ui/campera-jean-claudette.jpg",
    descripcion: "Campera urbana para los dias frios.",
  },
  5: {
    nombre: "Top Basico",
    precio: 19900,
    imagen: "img/productos/images.jpg",
    descripcion: "Top basico y versatil para cualquier ocasion.",
  },
  6: {
    nombre: "Abrigo Soft",
    precio: 89900,
    imagen: "img/productos/abrigo.jpeg",
    descripcion: "Abrigo comodo y moderno para la temporada de invierno.",
  },
};

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");
const producto = productos[idProducto] || productos[1];

document.getElementById("nombreProducto").textContent = producto.nombre;
document.getElementById("breadcrumbProducto").textContent = producto.nombre;
document.getElementById("descripcionProducto").textContent = producto.descripcion;
document.getElementById("imagenProducto").src = producto.imagen;
document.getElementById("imagenProducto").alt = producto.nombre;

const contenedorProducto = document.querySelector("[data-precio-unitario]");
contenedorProducto.dataset.precioUnitario = producto.precio;
document.getElementById("precioProducto").textContent = formatearPrecio(producto.precio);

const inputCantidad = document.getElementById("cantidad");
const btnMenos = document.getElementById("btnMenos");
const btnMas = document.getElementById("btnMas");
const precioTotalEl = document.getElementById("precioTotal");

const grupoTalles = document.getElementById("grupoTalles");
const avisoTalle = document.getElementById("avisoTalle");
const btnConsultar = document.getElementById("btnConsultar");

function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(valor);
}

function obtenerCantidad() {
  const valor = parseInt(inputCantidad.value, 10);
  return Number.isNaN(valor) || valor < 1 ? 1 : valor;
}

function obtenerTalleSeleccionado() {
  const seleccionado = grupoTalles.querySelector("input[name='talle']:checked");
  return seleccionado ? seleccionado.value : null;
}

function actualizarTotal() {
  const total = Number(contenedorProducto.dataset.precioUnitario) * obtenerCantidad();
  precioTotalEl.textContent = formatearPrecio(total);
}

function cambiarCantidad(delta) {
  const nuevaCantidad = obtenerCantidad() + delta;
  inputCantidad.value = nuevaCantidad < 1 ? 1 : nuevaCantidad;
  actualizarTotal();
}

btnMenos.addEventListener("click", () => cambiarCantidad(-1));
btnMas.addEventListener("click", () => cambiarCantidad(1));
inputCantidad.addEventListener("input", actualizarTotal);

grupoTalles.addEventListener("change", () => {
  avisoTalle.classList.add("d-none");
});

btnConsultar.addEventListener("click", (evento) => {
  const talle = obtenerTalleSeleccionado();

  if (!talle) {
    evento.preventDefault();
    avisoTalle.classList.remove("d-none");
    return;
  }

  const cantidad = obtenerCantidad();
  const total = formatearPrecio(Number(contenedorProducto.dataset.precioUnitario) * cantidad);

  const mensaje =
    `Hola! Quiero consultar por: ${producto.nombre}\n` +
    `Talle: ${talle}\n` +
    `Cantidad: ${cantidad}\n` +
    `Total aproximado: ${total}`;

  btnConsultar.href = `https://wa.me/5493815551234?text=${encodeURIComponent(mensaje)}`;
});

actualizarTotal();
