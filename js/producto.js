const contenedorProducto = document.querySelector("[data-precio-unitario]");
const precioUnitario = Number(contenedorProducto.dataset.precioUnitario);
const nombreProducto = document.querySelector("h1").textContent.trim();

const inputCantidad = document.getElementById("cantidad");
const btnMenos = document.getElementById("btnMenos");
const btnMas = document.getElementById("btnMas");
const precioTotalEl = document.getElementById("precioTotal");

const grupoTalles = document.getElementById("grupoTalles");
const avisoTalle = document.getElementById("avisoTalle");
const btnConsultar = document.getElementById("btnConsultar");

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

function obtenerCantidad() {
  const valor = parseInt(inputCantidad.value, 10);
  return Number.isNaN(valor) || valor < 1 ? 1 : valor;
}

function obtenerTalleSeleccionado() {
  const seleccionado = grupoTalles.querySelector("input[name='talle']:checked");
  return seleccionado ? seleccionado.value : null;
}

function actualizarTotal() {
  const total = precioUnitario * obtenerCantidad();
  precioTotalEl.textContent = formatoPrecio.format(total);
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
  const total = formatoPrecio.format(precioUnitario * cantidad);

  const mensaje =
    `Hola! Quiero consultar por: ${nombreProducto}\n` +
    `Talle: ${talle}\n` +
    `Cantidad: ${cantidad}\n` +
    `Total aproximado: ${total}`;

  btnConsultar.href = `https://wa.me/5493815551234?text=${encodeURIComponent(mensaje)}`;
});

actualizarTotal();
