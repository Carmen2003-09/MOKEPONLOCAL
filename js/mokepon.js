let ataqueJugador; 
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

// Contadores de victorias, derrotas y empates
let victoriasJugador = 0;
let derrotasJugador = 0;
let empatesJugador = 0;

let victoriasEnemigo = 0;
let derrotasEnemigo = 0;
let empatesEnemigo = 0;

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';
    
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;

    // Añadir eventos a los botones de ataque
    document.getElementById("boton-fuego").addEventListener('click', () => atacar("FUEGO"));
    document.getElementById("boton-agua").addEventListener('click', () => atacar("AGUA"));
    document.getElementById("boton-tierra").addEventListener('click', () => atacar("TIERRA"));
    
    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('Hipodoge');
    let inputCapipepo = document.getElementById('Capipepo');
    let inputRatigueya = document.getElementById('Ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona a una mascota');
        return; 
    }

    // Ocultar la sección de selección de mascota
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = 'none';

    // Mostrar la sección de ataque
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = 'block';

    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    
    if (ataqueAleatorio === 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge';
    } else if (ataqueAleatorio === 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function atacar(ataque) {
    ataqueJugador = ataque;
    ataqueAleatorioenemigo(); 
}

function ataqueAleatorioenemigo() {
    let ataqueAleatorio = aleatorio(1, 3);
    
    if (ataqueAleatorio === 1) {
        ataqueEnemigo = 'FUEGO';
    } else if (ataqueAleatorio === 2) {
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }

    combate(); 
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    // COMBATE
    if (ataqueEnemigo === ataqueJugador) {
        empatesJugador++;
        empatesEnemigo++;
        crearmensaje("EMPATE");
    } else if ((ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA') ||
               (ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO') ||
               (ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA')) {
        victoriasJugador++;
        derrotasEnemigo++;
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        crearmensaje("GANASTE");
    } else {
        derrotasJugador++;
        victoriasEnemigo++;
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        crearmensaje("PERDISTE");
    }

    // Verifica si hay un ganador
    if (vidasJugador === 0 || vidasEnemigo === 0) {
        crearmensajefinal(vidasJugador === 0 ? "¡Perdiste el juego!" : "¡Ganaste el juego!");
    }
}

function crearmensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes');

    // Primero, muestra los resúmenes de victorias, derrotas y empates
    let resumenJugador = `Jugador: Ganaste: ${victoriasJugador} | Perdiste: ${derrotasJugador} | Empataste: ${empatesJugador}`;
    let resumenEnemigo = `Enemigo: Ganaste: ${victoriasEnemigo} | Perdiste: ${derrotasEnemigo} | Empataste: ${empatesEnemigo}`;

    // Primero, elimina los párrafos de resumen existentes si los hay
    let resumenJugadorElemento = document.getElementById("resumen-jugador");
    let resumenEnemigoElemento = document.getElementById("resumen-enemigo");

    if (resumenJugadorElemento) {
        resumenJugadorElemento.innerHTML = resumenJugador; // Actualiza el texto del jugador
    } else {
        // Si no existe, crea uno nuevo
        let resumenJugadorParrafo = document.createElement('p');
        resumenJugadorParrafo.id = "resumen-jugador"; // ID para identificarlo y actualizarlo luego
        resumenJugadorParrafo.innerHTML = resumenJugador;
        sectionMensajes.appendChild(resumenJugadorParrafo);
    }

    if (resumenEnemigoElemento) {
        resumenEnemigoElemento.innerHTML = resumenEnemigo; // Actualiza el texto del enemigo
    } else {
        // Si no existe, crea uno nuevo
        let resumenEnemigoParrafo = document.createElement('p');
        resumenEnemigoParrafo.id = "resumen-enemigo"; // ID para identificarlo y actualizarlo luego
        resumenEnemigoParrafo.innerHTML = resumenEnemigo;
        sectionMensajes.appendChild(resumenEnemigoParrafo);
    }

    // Luego, muestra el mensaje del combate
    let parrafo = document.createElement('p');
    parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo} - ${resultado}`;
    sectionMensajes.appendChild(parrafo);
}

function crearmensajefinal(resultadofinal) {
    let sectionMensajes = document.getElementById('mensajes');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadofinal;
    sectionMensajes.appendChild(parrafo);
    
    // Deshabilitar botones
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.disabled = true;

    // Mostrar sección de reiniciar
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    // Resetea todas las variables
    vidasJugador = 3;
    vidasEnemigo = 3;
    victoriasJugador = 0;
    derrotasJugador = 0;
    empatesJugador = 0;
    victoriasEnemigo = 0;
    derrotasEnemigo = 0;
    empatesEnemigo = 0;

    // Actualiza las vidas y los resúmenes
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');
    spanVidasJugador.innerHTML = vidasJugador;
    spanVidasEnemigo.innerHTML = vidasEnemigo;

    // Limpiar los mensajes anteriores
    let sectionMensajes = document.getElementById('mensajes');
    sectionMensajes.innerHTML = '';

    // Limpiar la selección de la mascota
    let inputsMascotas = document.getElementsByName("mascota");
    inputsMascotas.forEach(input => input.checked = false);  // Desmarca todas las mascotas

    // Mostrar nuevamente la sección de selección de mascota
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = 'block';

    // Ocultar sección de ataque y reinicio
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);
