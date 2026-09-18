const NUMERO_WHATSAPP = "5493815551234";

const formulario = document.getElementById("formContacto");
const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoTelefono = document.getElementById("telefono");
const campoMotivo = document.getElementById("motivo");
const campoMensaje = document.getElementById("mensaje");


/*  Marcar y limpiar errores */

const todosLosCampos = [
  campoNombre,
  campoEmail,
  campoTelefono,
  campoMotivo,
  campoMensaje,
];

function marcarError(campo, mensaje) {
  campo.classList.add("is-invalid");

  const aviso = campo.parentElement.querySelector(".invalid-feedback");

  if (aviso) {
    aviso.textContent = mensaje;
  }
}

function limpiarErrores() {
  todosLosCampos.forEach(function (campo) {
    campo.classList.remove("is-invalid");
  });
}



function contarNumeros(texto) {
  let cantidad = 0;

  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];

    if (caracter >= "0" && caracter <= "9") {
      cantidad = cantidad + 1;
    }
  }

  return cantidad;
}


/*  Validaciones */

function validarFormulario() {
  limpiarErrores();

  const errores = [];

  // Nombre: obligatoriominimo 3 caracteres 
  const nombre = campoNombre.value.trim();

  if (nombre.length < 3) {
    marcarError(campoNombre, "Escribi tu nombre y apellido (minimo 3 letras).");
    errores.push(campoNombre);
  }

  // --- Email: obligatorio,tiene que tener @ y punto ---
  const email = campoEmail.value.trim();

  if (email === "") {
    marcarError(campoEmail, "Necesitamos tu email para poder responderte.");
    errores.push(campoEmail);
  } else if (!email.includes("@") || !email.includes(".")) {
    marcarError(campoEmail, "Ese email no parece valido. Ejemplo: nombre@mail.com");
    errores.push(campoEmail);
  }

  // --- Telefono: es opcional, pero si lo cargan tiene que servir ---
  const telefono = campoTelefono.value.trim();

  if (telefono !== "" && contarNumeros(telefono) < 8) {
    marcarError(campoTelefono, "El telefono tiene que tener al menos 8 numeros.");
    errores.push(campoTelefono);
  }

  // --- Motivo: hay que elegir una opcion del select ---
  if (campoMotivo.value === "") {
    marcarError(campoMotivo, "Elegi el motivo de tu consulta.");
    errores.push(campoMotivo);
  }

  // --- Mensaje: obligatorio, minimo 10 caracteres ---
  const mensaje = campoMensaje.value.trim();

  if (mensaje.length < 10) {
    marcarError(campoMensaje, "Contanos un poco mas (minimo 10 caracteres).");
    errores.push(campoMensaje);
  }

  return errores;
}




function armarMensaje() {
  const lineas = [];

  lineas.push("Hola! Soy " + campoNombre.value.trim() + ".");
  lineas.push("Motivo: " + campoMotivo.value);
  lineas.push("Email: " + campoEmail.value.trim());

  const telefono = campoTelefono.value.trim();

  if (telefono !== "") {
    lineas.push("Telefono: " + telefono);
  }

  // Una linea vacia para separar el mensaje de los datos.
  lineas.push("");
  lineas.push(campoMensaje.value.trim());

  // join une todas las lineas con un salto de linea entre cada una.
  return lineas.join("\n");
}



formulario.addEventListener("submit", function (evento) {
  // Frenamos el envio normal del formulario: no hay servidor
  // al que mandarlo, y sin esto la pagina se recargaria.
  evento.preventDefault();

  const errores = validarFormulario();

  if (errores.length > 0) {
    // Llevamos el cursor al primer campo con problema.
    errores[0].focus();
    return;
  }

  // encodeURIComponent convierte los espacios, los saltos de
  // linea y las tildes a un formato que se puede meter adentro
  // de una direccion web. Sin esto el mensaje llega cortado.
  const texto = encodeURIComponent(armarMensaje());

  window.open("https://wa.me/" + NUMERO_WHATSAPP + "?text=" + texto, "_blank");
});
