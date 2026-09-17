const botonesVerMas = document.querySelectorAll(".btn-ver-mas");

botonesVerMas.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const card = boton.closest(".card-valor-interactiva");
    const textoExtra = card.querySelector(".card-text-extra");
    textoExtra.classList.toggle("d-none");
    const icono = boton.querySelector("i");
    icono.classList.toggle("bi-chevron-down");
    icono.classList.toggle("bi-chevron-up");

    if (textoExtra.classList.contains("d-none")) {
      boton.firstChild.textContent = "Ver más ";
    } else {
      boton.firstChild.textContent = "Ver menos ";
    }
  });
});