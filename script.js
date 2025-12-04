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

    const nivel = document.querySelector("input[name='dif']:checked");
    let lucesEncendidas;

    if (nivel) {
        switch (nivel.value) {
            case "facil":
                filas = 5;
                columnas = 6;
                lucesEncendidas = 10;
                break;
            case "medio":
                filas = 6;
                columnas = 6;
                lucesEncendidas = 6;
                break;
            case "dificil":
                filas = 10;
                columnas = 10;
                lucesEncendidas = 20;
                break;
            case "personal":
                filas = parseInt(document.getElementById("fil").value);
                columnas = parseInt(document.getElementById("col").value);
                lucesEncendidas = parseInt(document.getElementById("on").value);
                break;
        }
    }
}