

document.addEventListener('DOMContentLoaded', function () {

  const inputBuscar = document.getElementById('buscar');
  const selectCategoria = document.getElementById('categoria');
  const selectEstado = document.getElementById('estado');
  const formFiltros = document.getElementById('formFiltrosProductos');
  const tabla = document.getElementById('tablaProductos');
  const contadorProductos = document.getElementById('contadorProductos');

  const filasProductos = tabla.querySelectorAll('tbody tr');

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

  function actualizarContador(cantidadVisible) {
    contadorProductos.textContent = 'Mostrando ' + cantidadVisible + ' de ' + filasProductos.length + ' productos';
  }

  formFiltros.addEventListener('submit', function (evento) {
    evento.preventDefault();
    filtrarProductos();
  });

  inputBuscar.addEventListener('input', filtrarProductos);
  selectCategoria.addEventListener('change', filtrarProductos);
  selectEstado.addEventListener('change', filtrarProductos);

  tabla.querySelector('tbody').addEventListener('click', function (evento) {
    const boton = evento.target.closest('.btn-outline-danger, .btn-outline-success');

    if (!boton) return;

    evento.preventDefault();

    const fila = boton.closest('tr');
    const badgeEstado = fila.querySelector('.badge');
    const productoEstaActivo = badgeEstado.textContent.trim() === 'Activo';

    if (productoEstaActivo) {
   
      badgeEstado.textContent = 'Pausado';
      badgeEstado.className = 'badge rounded-pill bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle';
      boton.className = 'btn btn-sm btn-outline-success';
      boton.innerHTML = '<i class="bi bi-play"></i><span class="d-none d-xl-inline ms-1">Activar</span>';
    } else {
    
      badgeEstado.textContent = 'Activo';
      badgeEstado.className = 'badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle';
      boton.className = 'btn btn-sm btn-outline-danger';
      boton.innerHTML = '<i class="bi bi-pause"></i><span class="d-none d-xl-inline ms-1">Pausar</span>';
    }

    filtrarProductos();
  });

});
