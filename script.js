// Cargar datos del Local Storage al iniciar
let diasRestantes = localStorage.getItem('diasRestantes') ? parseInt(localStorage.getItem('diasRestantes')) : 365;
let totalAhorrado = localStorage.getItem('totalAhorrado') ? parseFloat(localStorage.getItem('totalAhorrado')) : 0;

// Array con los números del 1 al 365
const numerosRestantes = [...Array(365).keys()].map(x => x + 1);

// Función para reproducir el sonido de ganar
function reproducirSonidoGanar() {
    const ganarSonido = document.getElementById('ganarSonido');
    ganarSonido.currentTime = 0; // Reinicia el sonido si se está reproduciendo
    ganarSonido.play(); // Reproduce el sonido
}

// Función para reproducir el sonido de fin
function reproducirSonidoFin() {
    const finSonido = document.getElementById('finSonido');
    finSonido.currentTime = 0; // Reinicia el sonido si se está reproduciendo
    finSonido.play(); // Reproduce el sonido
}

// Función para actualizar el contador de días
function actualizarContador() {
    document.getElementById('contador').textContent = `Días restantes: ${diasRestantes}`;
}

// Función para actualizar el contador de ahorro total
function actualizarTotalAhorrado() {
    document.getElementById('totalAhorrado').textContent = `Total ahorrado: ${totalAhorrado.toFixed(2)} MXN`;
    localStorage.setItem('totalAhorrado', totalAhorrado); // Guardar en Local Storage
}

// Función para girar la ruleta
function girarRuleta() {
    if (diasRestantes > 0) {
        // Elegir un número al azar
        const index = Math.floor(Math.random() * numerosRestantes.length);
        const cantidad = numerosRestantes.splice(index, 1)[0]; // Selecciona y elimina el número

        // Actualizar el total ahorrado
        totalAhorrado += cantidad;
        actualizarTotalAhorrado();

                // Reproducir el sonido de ganar
        reproducirSonidoGanar();

        // Mostrar el resultado con animación de opacidad
        const resultado = document.getElementById('resultado');
        resultado.style.opacity = 0;
        setTimeout(() => {
            resultado.textContent = `Ahorra: ${cantidad} MXN`;
            resultado.style.opacity = 1;
        }, 500); // Retraso para animación

        // Actualizar el contador de días restantes
        diasRestantes--;
        actualizarContador();
        localStorage.setItem('diasRestantes', diasRestantes); // Guardar en Local Storage

    } else {
        // Mostrar el total ahorrado al finalizar los 365 días
        document.getElementById('resultado').textContent = `¡Has completado los 365 días de ahorro! Total ahorrado: ${totalAhorrado.toFixed(2)} MXN`;
        document.getElementById('contador').textContent = ''; // Limpiar el contador de días restantes
        document.getElementById('contador').style.display = 'none'; // Ocultar el contador de días restantes
        document.getElementById('totalAhorrado').style.display = 'none'; // Ocultar el contador de total ahorrado

                // Reproducir el sonido de fin
        reproducirSonidoFin();

        // Ocultar el botón de girar y mostrar el botón de reiniciar
        document.getElementById('botonGirar').style.display = 'none'; // Ocultar el botón de girar
        document.getElementById('botonReiniciar').style.display = 'block'; // Mostrar el botón de reiniciar
    }
}

// Función para reiniciar el ahorro
function reiniciarAhorro() {
    // Eliminar datos de Local Storage
    localStorage.removeItem('diasRestantes');
    localStorage.removeItem('totalAhorrado');

    // Reiniciar variables
    diasRestantes = 365;
    totalAhorrado = 0;

    // Actualizar la interfaz
    actualizarContador();
    actualizarTotalAhorrado();
    document.getElementById('resultado').textContent = ''; // Limpiar el resultado
    document.getElementById('contador').style.display = 'block'; // Mostrar el contador de días restantes
    document.getElementById('totalAhorrado').style.display = 'block'; // Mostrar el contador de total ahorrado

    // Ocultar el botón de reiniciar y mostrar el botón de girar
    document.getElementById('botonGirar').style.display = 'block'; // Mostrar el botón de girar
    document.getElementById('botonReiniciar').style.display = 'none'; // Ocultar el botón de reiniciar
}

// Inicializar el contador al cargar la página
window.onload = function() {
    actualizarContador();
    actualizarTotalAhorrado();  // Inicializamos el contador de ahorro total en 0

    // Controlar la visibilidad de los botones
    document.getElementById('botonReiniciar').style.display = 'none'; // Ocultar el botón de reiniciar al cargar
};
