
const CLAVE_CARRITO = "claudette_carrito";
const NUMERO_WHATSAPP = "5493815551234";

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

const contadorCarrito = document.getElementById("contadorCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const resumenCarrito = document.getElementById("resumenCarrito");
const totalCarritoEl = document.getElementById("totalCarrito");
const btnFinalizarCarrito = document.getElementById("btnFinalizarCarrito");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

function obtenerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function parsearPrecio(texto) {
 
  return Number(texto.replace(/[^\d]/g, "")) || 0;
}

function agregarAlCarrito({ nombre, precio, imagen }) {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.nombre === nombre);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function cambiarCantidad(nombre, delta) {
  const carrito = obtenerCarrito();
  const item = carrito.find((p) => p.nombre === nombre);
  if (!item) return;

  item.cantidad += delta;

  const carritoActualizado =
    item.cantidad < 1 ? carrito.filter((p) => p.nombre !== nombre) : carrito;

  guardarCarrito(carritoActualizado);
  renderizarCarrito();
}

function quitarDelCarrito(nombre) {
  const carrito = obtenerCarrito().filter((p) => p.nombre !== nombre);
  guardarCarrito(carrito);
  renderizarCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  renderizarCarrito();
}

function calcularCantidadTotal(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

function calcularPrecioTotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function actualizarContador() {
  const cantidadTotal = calcularCantidadTotal(obtenerCarrito());
  contadorCarrito.textContent = cantidadTotal;
  contadorCarrito.classList.toggle("d-none", cantidadTotal === 0);
}

function crearItemHTML(item) {
  const li = document.createElement("li");
  li.className = "d-flex gap-3 align-items-center py-3 border-bottom";

  li.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}" class="rounded-3 object-fit-cover flex-shrink-0" width="64" height="64">
    <div class="flex-grow-1">
      <p class="mb-1 fw-semibold small">${item.nombre}</p>
      <p class="mb-2 text-secondary small">${formatoPrecio.format(item.precio)} c/u</p>
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-sm btn-outline-primary btn-restar" aria-label="Restar unidad">-</button>
        <span class="fw-semibold">${item.cantidad}</span>
        <button type="button" class="btn btn-sm btn-outline-primary btn-sumar" aria-label="Sumar unidad">+</button>
        <button type="button" class="btn btn-sm btn-link text-secondary ms-auto btn-quitar" aria-label="Quitar producto">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `;

  li.querySelector(".btn-sumar").addEventListener("click", () => cambiarCantidad(item.nombre, 1));
  li.querySelector(".btn-restar").addEventListener("click", () => cambiarCantidad(item.nombre, -1));
  li.querySelector(".btn-quitar").addEventListener("click", () => quitarDelCarrito(item.nombre));

  return li;
}

function armarMensajeWhatsapp(carrito, total) {
  const detalle = carrito
    .map((item) => `- ${item.nombre} x${item.cantidad} (${formatoPrecio.format(item.precio * item.cantidad)})`)
    .join("\n");

  const mensaje =
    `Hola! Quiero hacer este pedido:\n${detalle}\n\nTotal: ${formatoPrecio.format(total)}`;

  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

function renderizarCarrito() {
  const carrito = obtenerCarrito();

  actualizarContador();

  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    carritoVacio.classList.remove("d-none");
    resumenCarrito.classList.add("d-none");
    return;
  }

  carritoVacio.classList.add("d-none");
  resumenCarrito.classList.remove("d-none");

  carrito.forEach((item) => listaCarrito.appendChild(crearItemHTML(item)));

  const total = calcularPrecioTotal(carrito);
  totalCarritoEl.textContent = formatoPrecio.format(total);
  btnFinalizarCarrito.href = armarMensajeWhatsapp(carrito, total);
}

function mostrarFeedbackAgregado(boton) {
  const textoOriginal = boton.innerHTML;
  boton.disabled = true;
  boton.innerHTML = '<i class="bi bi-check2 me-1"></i>Agregado';

  setTimeout(() => {
    boton.innerHTML = textoOriginal;
    boton.disabled = false;
  }, 900);
}

document.querySelectorAll(".btn-agregar-carrito").forEach((boton) => {
  boton.addEventListener("click", () => {
    const tarjeta = boton.closest(".card-producto");
    const nombre = boton.dataset.nombre;
    const imagen = boton.dataset.imagen;
    const precioTexto = tarjeta.querySelector(".fs-5.fw-bold").textContent;
    const precio = parsearPrecio(precioTexto);

    agregarAlCarrito({ nombre, precio, imagen });
    mostrarFeedbackAgregado(boton);
  });
});

btnVaciarCarrito.addEventListener("click", vaciarCarrito);

renderizarCarrito();
