let timer = null;
let segundos = 0;
let intentos = 0;

const intentosHTML = document.getElementById("intentos");
const tiempoHTML = document.getElementById("tiempo");

function iniciarJuego() {
    clearInterval(timer);
    segundos = 0;
    actualizarTiempo();

    timer = setInterval(() => {
        segundos++;
        actualizarTiempo();
    }, 1000);

    intentos = 0;
    intentosHTML.textContent = intentos;

    mensajeHTML.textContent = "";

}