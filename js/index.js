
const buscador = document.getElementById("buscadorProductos");
const selectorOrden = document.getElementById("ordenProductos");
const grilla = document.getElementById("grillaDestacados");



const productos = Array.from(grilla.querySelectorAll(".producto"));


const ordenOriginal = Array.from(productos);

const mensajeSinResultados = document.createElement("p");
mensajeSinResultados.id = "sinResultados";
mensajeSinResultados.className = "text-center text-secondary py-4 mb-0 d-none";
mensajeSinResultados.innerHTML =
  '<i class="bi bi-search me-2"></i>No encontramos productos con ese nombre.';

grilla.insertAdjacentElement("afterend", mensajeSinResultados);


/* ------------------------------------------------------------
 Funciones
------------------------------------------------------------ */


function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/*
 * Muestra u oculta cada tarjeta segun lo que se escribio
 * en el buscador. Devuelve cuantas quedaron visibles.
 */
function filtrarProductos() {
  const busqueda = normalizar(buscador.value.trim());
  let visibles = 0;

  productos.forEach(function (producto) {
    const nombre = normalizar(producto.dataset.nombre);
    const coincide = nombre.includes(busqueda);

  
    producto.classList.toggle("d-none", !coincide);

    if (coincide) {
      visibles = visibles + 1;
    }
  });

  return visibles;
}


function ordenarProductos() {
  const criterio = selectorOrden.value;
  let ordenados;

  if (criterio === "menor") {
    ordenados = Array.from(productos).sort(function (a, b) {
      return Number(a.dataset.precio) - Number(b.dataset.precio);
    });
  } else if (criterio === "mayor") {
    ordenados = Array.from(productos).sort(function (a, b) {
      return Number(b.dataset.precio) - Number(a.dataset.precio);
    });
  } else {
    ordenados = ordenOriginal;
  }

  ordenados.forEach(function (producto) {
    grilla.appendChild(producto);
  });
}

/*
 * Filtra, ordena y decide si hay que mostrar el mensaje
 * de "sin resultados".
 */
function actualizarVista() {
  const visibles = filtrarProductos();

  ordenarProductos();

  mensajeSinResultados.classList.toggle("d-none", visibles > 0);
}



buscador.addEventListener("input", actualizarVista);


selectorOrden.addEventListener("change", actualizarVista);



actualizarVista();
