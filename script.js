let timer = null;
let segundos = 0;
let intentos = 0;
let filas = 5;
let columnas = 6;
let tablero = [];

const tableroHTML = document.getElementById("tablero");
const intentosHTML = document.getElementById("intentos");
const tiempoHTML = document.getElementById("tiempo");
const mensajeHTML = document.getElementById("mensaje");

document.getElementById("btn").addEventListener("click", iniciarJuego);

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

    tableroHTML.style.gridTemplateColumns = `repeat(${columnas}, 60px)`;

    tablero = Array.from({ length: filas }, () =>
        Array(columnas).fill(false)
    );

    for (let i = 0; i < lucesEncendidas; i++) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        tablero[f][c] = true;
    }

    renderTablero();
}

function renderTablero() {
    tableroHTML.innerHTML = "";

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let div = document.createElement("div");
            div.classList.add("celda");

            if (tablero[f][c]) div.classList.add("encendida");

            div.onclick = () => {
                cambiar(f, c);
                renderTablero();
                intentosHTML.textContent = ++intentos;
                verificarVictoria();
            };

            tableroHTML.appendChild(div);
        }
    }
}

function cambiar(f, c) {

    const dirs = [
        [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    for (let [df, dc] of dirs) {
        let nf = f + df, nc = c + dc;
        if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas) {
            tablero[nf][nc] = !tablero[nf][nc];
        }
    }
}


function verificarVictoria() {
    const todasEncendidas = tablero.every(fila =>
        fila.every(celda => celda === true)
    );

    if (todasEncendidas) {
        clearInterval(timer);

        mensajeHTML.textContent = "🎉 ¡ENHORABUENA! Todas las luces están encendidas 🎉";
        mensajeHTML.style.color = "yellow";
    }
}

function actualizarTiempo() {
    let min = String(Math.floor(segundos / 60)).padStart(2, "0");
    let sec = String(segundos % 60).padStart(2, "0");
    tiempoHTML.textContent = `${min}:${sec}`;
}