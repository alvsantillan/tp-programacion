// clientes.js
// Funcionalidades del listado de clientes:
// 1) Busqueda en vivo por nombre, email o telefono.
// 2) Ordenar la tabla por nombre (A-Z) o por fecha de alta (mas reciente / mas antiguo).

document.addEventListener('DOMContentLoaded', function () {

  const inputBuscar = document.getElementById('buscar');
  const selectOrden = document.getElementById('orden');
  const formFiltros = document.getElementById('formFiltrosClientes');
  const tabla = document.getElementById('tablaClientes');
  const cuerpoTabla = tabla.querySelector('tbody');
  const contadorClientes = document.getElementById('contadorClientes');

  // Convierte una fecha en formato dd/mm/aaaa (texto) a un objeto Date, para poder compararla
  function convertirTextoAFecha(textoFecha) {
    const partesFecha = textoFecha.split('/');
    const dia = partesFecha[0];
    const mes = partesFecha[1] - 1; // en JS los meses arrancan en 0
    const anio = partesFecha[2];
    return new Date(anio, mes, dia);
  }

  // 1) Filtra las filas segun el texto buscado
  function filtrarClientes() {
    const textoBuscado = inputBuscar.value.trim().toLowerCase();
    const filas = cuerpoTabla.querySelectorAll('tr');
    let clientesVisibles = 0;

    filas.forEach(function (fila) {
      const nombre = fila.children[1].textContent.toLowerCase();
      const email = fila.children[2].textContent.toLowerCase();
      const telefono = fila.children[3].textContent.toLowerCase();

      const coincide = nombre.includes(textoBuscado)
        || email.includes(textoBuscado)
        || telefono.includes(textoBuscado);

      if (coincide) {
        fila.classList.remove('d-none');
        clientesVisibles++;
      } else {
        fila.classList.add('d-none');
      }
    });

    contadorClientes.textContent = 'Mostrando ' + clientesVisibles + ' de ' + filas.length + ' clientes';
  }

  // 2) Ordena las filas de la tabla segun la opcion elegida en el select
  function ordenarClientes() {
    const filas = Array.from(cuerpoTabla.querySelectorAll('tr'));
    const criterioElegido = selectOrden.value;

    filas.sort(function (filaA, filaB) {
      if (criterioElegido === 'nombre') {
        const nombreA = filaA.children[1].textContent.trim();
        const nombreB = filaB.children[1].textContent.trim();
        return nombreA.localeCompare(nombreB);
      }

      const fechaA = convertirTextoAFecha(filaA.children[5].textContent.trim());
      const fechaB = convertirTextoAFecha(filaB.children[5].textContent.trim());

      if (criterioElegido === 'antiguo') {
        return fechaA - fechaB;
      }

      // Por defecto ("reciente"): de mas nuevo a mas viejo
      return fechaB - fechaA;
    });

    // Reinsertamos las filas ya ordenadas; appendChild mueve el nodo si ya existe en el DOM
    filas.forEach(function (fila) {
      cuerpoTabla.appendChild(fila);
    });
  }

  formFiltros.addEventListener('submit', function (evento) {
    evento.preventDefault();
    filtrarClientes();
  });

  inputBuscar.addEventListener('input', filtrarClientes);
  selectOrden.addEventListener('change', ordenarClientes);

});
