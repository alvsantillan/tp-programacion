// login.js
// Funcionalidades de la pantalla de login:
// 1) Mostrar u ocultar la contrasena al hacer click en el icono del ojo.
// 2) Validar que los campos no esten vacios antes de enviar el formulario.

document.addEventListener('DOMContentLoaded', function () {

  const formLogin = document.querySelector('form');
  const inputUsuario = document.getElementById('usuario');
  const inputClave = document.getElementById('clave');
  const botonMostrarClave = document.getElementById('mostrarClave');

  // 1) Mostrar / ocultar contrasena
  botonMostrarClave.addEventListener('click', function () {
    const seEstaMostrando = inputClave.getAttribute('type') === 'text';

    if (seEstaMostrando) {
      inputClave.setAttribute('type', 'password');
      botonMostrarClave.innerHTML = '<i class="bi bi-eye"></i>';
    } else {
      inputClave.setAttribute('type', 'text');
      botonMostrarClave.innerHTML = '<i class="bi bi-eye-slash"></i>';
    }
  });

  // 2) Validacion basica antes de enviar el formulario
  formLogin.addEventListener('submit', function (evento) {
    let formularioValido = true;

    if (inputUsuario.value.trim() === '') {
      inputUsuario.classList.add('is-invalid');
      formularioValido = false;
    } else {
      inputUsuario.classList.remove('is-invalid');
    }

    if (inputClave.value.trim() === '') {
      inputClave.classList.add('is-invalid');
      formularioValido = false;
    } else {
      inputClave.classList.remove('is-invalid');
    }

    // Si algun campo esta vacio, no dejamos enviar el formulario
    if (!formularioValido) {
      evento.preventDefault();
    }
  });

});
