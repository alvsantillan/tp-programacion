// productos.js
// Funcionalidades del listado de productos:
// 1) Busqueda en vivo por nombre mientras el usuario escribe.
// 2) Filtro combinado por categoria y por estado.
// 3) Pausar o activar un producto directamente desde la tabla, sin recargar la pagina.
// 4) Actualizar el texto "Mostrando X productos" segun lo que quede visible.

document.addEventListener('DOMContentLoaded', function () {

  const inputBuscar = document.getElementById('buscar');
  const selectCategoria = document.getElementById('categoria');
  const selectEstado = document.getElementById('estado');
  const formFiltros = document.getElementById('formFiltrosProductos');
  const tabla = document.getElementById('tablaProductos');
  const contadorProductos = document.getElementById('contadorProductos');

  // Las filas se leen recien aca porque son las que ya vienen renderizadas en el HTML
  const filasProductos = tabla.querySelectorAll('tbody tr');

  // 1) y 2) Filtra las filas segun el texto buscado, la categoria y el estado elegidos
  function filtrarProductos() {
    const textoBuscado = inputBuscar.value.trim().toLowerCase();
    const categoriaElegida = selectCategoria.value.toLowerCase();
    const estadoElegido = selectEstado.value.toLowerCase();
    let productosVisibles = 0;

    filasProductos.forEach(function (fila) {
      const nombreProducto = fila.children[1].textContent.trim().toLowerCase();
      const categoriaProducto = fila.children[2].textContent.trim().toLowerCase();
      const estadoProducto = fila.children[5].textContent.trim().toLowerCase();

      const coincideNombre = nombreProducto.includes(textoBuscado);
      const coincideCategoria = categoriaElegida === '' || categoriaProducto === categoriaElegida;
      const coincideEstado = estadoElegido === '' || estadoProducto === estadoElegido;

      if (coincideNombre && coincideCategoria && coincideEstado) {
        fila.classList.remove('d-none');
        productosVisibles++;
      } else {
        fila.classList.add('d-none');
      }
    });

    actualizarContador(productosVisibles);
  }

  // 4) Actualiza el texto de "Mostrando X productos"
  function actualizarContador(cantidadVisible) {
    contadorProductos.textContent = 'Mostrando ' + cantidadVisible + ' de ' + filasProductos.length + ' productos';
  }

  // El formulario ya no necesita recargar la pagina, filtramos en el momento
  formFiltros.addEventListener('submit', function (evento) {
    evento.preventDefault();
    filtrarProductos();
  });

  inputBuscar.addEventListener('input', filtrarProductos);
  selectCategoria.addEventListener('change', filtrarProductos);
  selectEstado.addEventListener('change', filtrarProductos);

  // 3) Pausar o activar un producto usando delegacion de eventos en el tbody
  tabla.querySelector('tbody').addEventListener('click', function (evento) {
    const boton = evento.target.closest('.btn-outline-danger, .btn-outline-success');

    // Si el click no fue sobre el boton de pausar/activar, no hacemos nada
    if (!boton) return;

    evento.preventDefault();

    const fila = boton.closest('tr');
    const badgeEstado = fila.querySelector('.badge');
    const productoEstaActivo = badgeEstado.textContent.trim() === 'Activo';

    if (productoEstaActivo) {
      // Pasa de Activo a Pausado
      badgeEstado.textContent = 'Pausado';
      badgeEstado.className = 'badge rounded-pill bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle';
      boton.className = 'btn btn-sm btn-outline-success';
      boton.innerHTML = '<i class="bi bi-play"></i><span class="d-none d-xl-inline ms-1">Activar</span>';
    } else {
      // Pasa de Pausado a Activo
      badgeEstado.textContent = 'Activo';
      badgeEstado.className = 'badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle';
      boton.className = 'btn btn-sm btn-outline-danger';
      boton.innerHTML = '<i class="bi bi-pause"></i><span class="d-none d-xl-inline ms-1">Pausar</span>';
    }

    // Si en ese momento hay un filtro de estado aplicado, volvemos a filtrar
    filtrarProductos();
  });

});
