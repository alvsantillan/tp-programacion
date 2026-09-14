// producto-form.js
// Funcionalidades del formulario de producto:
// 1) Vista previa de la imagen elegida, antes de guardar.
// 2) Contador de caracteres de la descripcion.
// 3) Validacion basica de nombre y precio antes de enviar el formulario.

document.addEventListener('DOMContentLoaded', function () {

  const LIMITE_CARACTERES_DESCRIPCION = 300;

  const formProducto = document.getElementById('formProducto');
  const inputNombre = document.getElementById('nombre');
  const inputPrecio = document.getElementById('precio');
  const inputImagen = document.getElementById('imagen');
  const vistaPreviaImagen = document.getElementById('vistaPreviaImagen');
  const textareaDescripcion = document.getElementById('descripcion');
  const contadorCaracteres = document.getElementById('contadorCaracteres');

  // 1) Vista previa de la imagen elegida, usando FileReader
  inputImagen.addEventListener('change', function () {
    const archivoElegido = inputImagen.files[0];

    // Si el usuario cancelo la seleccion, no cambiamos la imagen
    if (!archivoElegido) return;

    const lectorDeArchivo = new FileReader();

    lectorDeArchivo.onload = function (evento) {
      vistaPreviaImagen.src = evento.target.result;
    };

    lectorDeArchivo.readAsDataURL(archivoElegido);
  });

  // 2) Contador de caracteres de la descripcion
  function actualizarContadorDescripcion() {
    const caracteresEscritos = textareaDescripcion.value.length;
    contadorCaracteres.textContent = caracteresEscritos + ' / ' + LIMITE_CARACTERES_DESCRIPCION + ' caracteres';

    if (caracteresEscritos >= LIMITE_CARACTERES_DESCRIPCION) {
      contadorCaracteres.classList.add('text-danger');
    } else {
      contadorCaracteres.classList.remove('text-danger');
    }
  }

  // Mostramos el conteo inicial (por si el textarea ya viene con texto cargado)
  actualizarContadorDescripcion();
  textareaDescripcion.addEventListener('input', actualizarContadorDescripcion);

  // 3) Validacion basica antes de guardar el producto
  formProducto.addEventListener('submit', function (evento) {
    let formularioValido = true;

    if (inputNombre.value.trim() === '') {
      inputNombre.classList.add('is-invalid');
      formularioValido = false;
    } else {
      inputNombre.classList.remove('is-invalid');
    }

    const precioIngresado = Number(inputPrecio.value);
    if (inputPrecio.value.trim() === '' || precioIngresado <= 0) {
      inputPrecio.classList.add('is-invalid');
      formularioValido = false;
    } else {
      inputPrecio.classList.remove('is-invalid');
    }

    if (!formularioValido) {
      evento.preventDefault();
    }
  });

});
