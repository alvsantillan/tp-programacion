const productosPorCategoria = {
  remeras: {
    nombre: "Remera basica",
    precio: 18500,
    imagen: "img/productos/Remera.jpeg",
    descripcion: "Remera de algodon suave, corte clasico. Combina con todo y es ideal para el uso diario.",
  },
  vestidos: {
    nombre: "Vestido floreado",
    precio: 45000,
    imagen: "img/ui/claudete-vestido.jpg",
    descripcion: "Vestido floreado de tela liviana, corte suelto y mangas cortas. Ideal para primavera y verano.",
  },
  pantalones: {
    nombre: "Pantalon de lino",
    precio: 38000,
    imagen: "img/productos/Pantalon.jpeg",
    descripcion: "Pantalon de lino fresco, corte recto y comodo. Perfecto para los dias de calor.",
  },
  abrigos: {
    nombre: "Abrigo soft",
    precio: 89900,
    imagen: "img/productos/abrigo.jpeg",
    descripcion: "Abrigo comodo y moderno para la temporada de invierno.",
  },
  calzado: {
    nombre: "Sandalias de verano",
    precio: 29000,
    imagen: "img/productos/calzado.jpg",
    descripcion: "Sandalias comodas y livianas, pensadas para el dia a dia en la temporada calida.",
  },
};

const contenedorProducto = document.querySelector("[data-categoria]");
const categoria = contenedorProducto.dataset.categoria;
const producto = productosPorCategoria[categoria];

document.getElementById("nombreProducto").textContent = producto.nombre;
document.getElementById("breadcrumbProducto").textContent = producto.nombre;
document.getElementById("descripcionProducto").textContent = producto.descripcion;
document.getElementById("imagenProducto").src = producto.imagen;
document.getElementById("imagenProducto").alt = producto.nombre;

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
