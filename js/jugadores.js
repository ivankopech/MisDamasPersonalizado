var btnNuevaPartida = document.getElementById('boton-nueva-partida')
var cerrarPopupJugadores = document.getElementById('cerrar-popup-jugadores');
var popupJugadores = document.getElementById('popup-jugadores');
var contNombreJugadores = document.getElementById('cont-nombre-jugadores');

var btnAceptarJugadores = document.getElementById('aceptar');
var inputJugador1 = document.getElementById('jugador-N1');
var inputJugador2 = document.getElementById('jugador-N2');

btnNuevaPartida.addEventListener('click', (e)=>{
    e.preventDefault()
    contNombreJugadores.style.opacity = '1'
    contNombreJugadores.style.visibility = 'visible'
    popupJugadores.classList.toggle('cerrar-popup-jugadores')
})

cerrarPopupJugadores.addEventListener('click', (e)=>{

    popupJugadores.classList.toggle('cerrar-popup-jugadores')
    
    setTimeout(()=>{
        contNombreJugadores.style.opacity = '0'
        contNombreJugadores.style.visibility = 'hidden'
    }, 300)
})

function validarCamposJugadores(){

    if (inputJugador1.value.length >= 3 && inputJugador1.value.length <= 8) {
      nombreJugador1.textContent = inputJugador1.value
    }else{
      alert('los nombres de los jugadores deben de tener entre 3 y 8 caracteres')
      return
    }

    if (inputJugador2.value.length >= 3 && inputJugador2.value.length <= 8) {
      nombreJugador2.textContent = inputJugador2.value
    }else{
      alert('los nombres de los jugadores deben de tener entre 3 y 8 caracteres');
      return;
    }

    tableroArray = [
      [null, 1, null, 1, null, 1, null, 1],
      [1, null, 1, null, 1, null, 1, null],
      [null, 1, null, 1, null, 1, null, 1],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [2, null, 2, null, 2, null, 2, null],
      [null, 2, null, 2, null, 2, null, 2],
      [2, null, 2, null, 2, null, 2, null],
    ]
    resetearTablero();

    popupJugadores.classList.toggle('cerrar-popup-jugadores');
    
    setTimeout(()=>{
        contNombreJugadores.style.opacity = '0';
        contNombreJugadores.style.visibility = 'hidden';
    }, 300)
    
}
btnAceptarJugadores.addEventListener('click',validarCamposJugadores);





