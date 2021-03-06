var quitarEvento = false
var contadorClicks = 0
var hay_juego = false;
var arrayTablero = tableroArray;
var turno = 1
// var cellIdOfSelectedPiece = '';
var fichasRojas = document.getElementsByClassName('damasRojas');
var obtenerRoja = document.querySelectorAll('.damasRojas');
var obtenerVerde = document.querySelectorAll('damasVerdes');
var fichasVerdes = document.getElementsByClassName('damasVerdes');
var jugador1 = document.getElementById('nombreJugador1');
var jugador2 = document.getElementById('nombreJugador2');
var turnoText = document.querySelector(".nombreTurno");
var fichas;


var fichaSeleccionada = {
  idFila: null,
  idColumna: null,
  esRey: false,
  movIzq: false,
  movDer: false,
  movComerIzq: false,
  movComerDer: false,
  movPintarIzq: null,
  movPintarDer: null,
  movComerDerPintado: null,
  movComerIzqPintado: null,
  movFilaPintar: null,
  movFilaComerPintado: null,
}

// TABLERO

var tableroArray = [
  [null, 1, null, 1, null, 1, null, 1],
  [1, null, 1, null, 1, null, 1, null],
  [null, 1, null, 1, null, 1, null, 1],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [2, null, 2, null, 2, null, 2, null],
  [null, 2, null, 2, null, 2, null, 2],
  [2, null, 2, null, 2, null, 2, null],
]


function crearTablero() {
  var tablero = document.getElementById('tablero')

  var contador = 0

  for (let i = 0; i < tableroArray.length; i++) {
    var newDivFila = document.createElement('div')
    newDivFila.className = 'fila fila-' + i
    tablero.appendChild(newDivFila)

    contador = i % 2

    for (let j = 0; j < tableroArray[i].length; j++) {
      var newDivCell = document.createElement('div')

      if (contador === 0) {
        newDivCell.className = 'casillasBlancas'
        contador++
      } else {
        newDivCell.className = 'casillasNegras'
        contador--
      }

      newDivCell.id = 'fila-' + i + '-col-' + j
      newDivFila.appendChild(newDivCell)
    }
  }
}
crearTablero()

function crearDamas() {
  for (let i = 0; i < tableroArray.length; i++) {
    for (let k = 0; k < tableroArray[i].length; k++) {
      var DivCelda = document.getElementById('fila-' + i + '-col-' + k)

      if (tableroArray[i][k] === 1) {
        var NewDama = document.createElement('div')
        NewDama.className = 'damasRojas'
        DivCelda.appendChild(NewDama)
      } else {
        if (tableroArray[i][k] === 2) {
          var NewDama = document.createElement('div')
          NewDama.className = 'damasVerdes'
          DivCelda.appendChild(NewDama)
        }
      }
    }
  }
}
crearDamas()

function agregarEvento() {
  if (turno === 1) {
    for (var i = 0; i < fichasRojas.length; i++) {
      fichasRojas[i].addEventListener('click', obtenerFichaSeleccionada)
    }
  } else {
    for (var i = 0; i < fichasVerdes.length; i++) {
      fichasVerdes[i].addEventListener('click', obtenerFichaSeleccionada)
    }
  }
}

function obtenerFichaSeleccionada(ev) {
  fichaSeleccionada.idFila = parseInt(ev.path[1].id.substring(5, 6))
  fichaSeleccionada.idColumna =  parseInt(ev.path[1].id.substring(11, 12))

  // if (ev.path[1].className.contain('esRey')) {
  //   fichaSeleccionada.esRey = true;
  // }
  // esRey()
  buscarEspaciosDisponibles(
    fichaSeleccionada.idFila,
    fichaSeleccionada.idColumna,
  )
}

// function esRey() {
//   if (fichaSeleccionada.esRey === false) {
//     buscarEspaciosDisponibles(
//       fichaSeleccionada.idFila,
//       fichaSeleccionada.idColumna,
//     )


function buscarEspaciosDisponibles(fila, columna) {

  if (contadorClicks > 0) {
    EliminarEspaciosPosibles()
  }
  contadorClicks++

  fichaSeleccionada.movPintarIzq = columna - 1
  fichaSeleccionada.movPintarDer = columna + 1

  if (turno === 1) {
    fichaSeleccionada.movFilaPintar = fila + 1
  } else {
    fichaSeleccionada.movFilaPintar = fila - 1
  }

  // validar filas 
  if (fichaSeleccionada.idColumna >= 0 && fichaSeleccionada.idColumna <= 7 && fichaSeleccionada.idFila >= 0 && fichaSeleccionada.idFila <= 7) {
    
    if (tableroArray[fichaSeleccionada.movFilaPintar][fichaSeleccionada.movPintarDer] === null) {
      fichaSeleccionada.movDer = true
  
      var divPintar = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' +fichaSeleccionada.movPintarDer)
      divPintar.style.backgroundColor = 'red'
    }
   
    if (tableroArray[fichaSeleccionada.movFilaPintar][fichaSeleccionada.movPintarIzq] === null) {
      fichaSeleccionada.movIzq = true
      
      var divPintar = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' +fichaSeleccionada.movPintarIzq)
      divPintar.style.backgroundColor = 'red'
  
    }
  }

  comprobarComer()
}

function comprobarComer() {
  fichaSeleccionada.movComerDerPintado = fichaSeleccionada.movPintarDer + 1
  fichaSeleccionada.movComerIzqPintado = fichaSeleccionada.movPintarIzq - 1

  if (turno === 1) {
    if (fichaSeleccionada.idColumna >= 0 && fichaSeleccionada.idColumna <= 7 && fichaSeleccionada.idFila >= 0 && fichaSeleccionada.idFila <= 7) { 
      fichaSeleccionada.movFilaComerPintado = fichaSeleccionada.movFilaPintar + 1
      if (tableroArray[fichaSeleccionada.movFilaPintar][fichaSeleccionada.movPintarDer] === 2 && tableroArray[fichaSeleccionada.movFilaComerPintado][fichaSeleccionada.movComerDerPintado] === null) {

        fichaSeleccionada.movComerDer = true
        
        var divPintar = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' +fichaSeleccionada.movComerDerPintado)
        divPintar.style.backgroundColor = 'red'
      }
      if (tableroArray[fichaSeleccionada.movFilaPintar][fichaSeleccionada.movPintarIzq] === 2 && tableroArray[fichaSeleccionada.movFilaComerPintado][fichaSeleccionada.movComerIzqPintado] === null) {

        fichaSeleccionada.movComerIzq = true
        
        var divPintar = document.getElementById('fila-' +  fichaSeleccionada.movFilaComerPintado +'-col-' +fichaSeleccionada.movComerIzqPintado)
        divPintar.style.backgroundColor = 'red'
      }
    }  
    
  } else {
    if (fichaSeleccionada.idColumna >= 0 && fichaSeleccionada.idColumna <= 7 && fichaSeleccionada.idFila >= 0 && fichaSeleccionada.idFila <= 7)  {
      fichaSeleccionada.movFilaComerPintado = fichaSeleccionada.movFilaPintar - 1

      if (tableroArray[fichaSeleccionada.movFilaPintar][fichaSeleccionada.movPintarDer] === 1 && tableroArray[fichaSeleccionada.movFilaComerPintado][fichaSeleccionada.movComerDerPintado] === null) {

        fichaSeleccionada.movComerDer = true
        
        var divPintar = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' +fichaSeleccionada.movComerDerPintado)
        divPintar.style.backgroundColor = 'red'
      }
      if (tableroArray[fichaSeleccionada.movFilaPintar][fichaSeleccionada.movPintarIzq] === 1 && tableroArray[fichaSeleccionada.movFilaComerPintado][fichaSeleccionada.movComerIzqPintado] === null) {

        fichaSeleccionada.movComerIzq = true
        
        var divPintar = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' + fichaSeleccionada.movComerIzqPintado)
        divPintar.style.backgroundColor = 'red'
      }
    } 
  }
  agregarClickPosiblesMov()
}


  function agregarClickPosiblesMov() {
    
    if (fichaSeleccionada.movIzq) {
      var divMover = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' + fichaSeleccionada.movPintarIzq)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.movFilaPintar, fichaSeleccionada.movPintarIzq, "")')
    }
    if (fichaSeleccionada.movDer) {
      var divMover = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' + fichaSeleccionada.movPintarDer)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.movFilaPintar, fichaSeleccionada.movPintarDer, "")')
    }
    if (fichaSeleccionada.movComerDer) {
      var divMover = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' + fichaSeleccionada.movComerDerPintado)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.movFilaComerPintado, fichaSeleccionada.movComerDerPintado, "derecha")')
    }
    if (fichaSeleccionada.movComerIzq) {
      var divMover = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' + fichaSeleccionada.movComerIzqPintado)
      divMover.setAttribute('onClick', 'moverFicha(fichaSeleccionada.movFilaComerPintado, fichaSeleccionada.movComerIzqPintado, "izquierda")')
    }
  } 
  
function EliminarEspaciosPosibles() {
  if (fichaSeleccionada.movDer) {
    var divPintar = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' +fichaSeleccionada.movPintarDer)
    divPintar.style.backgroundColor = 'black'
  }
   
  if (fichaSeleccionada.movIzq) {
    divPintar = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' +fichaSeleccionada.movPintarIzq)
    divPintar.style.backgroundColor = 'black' 
  }
  
  if (turno === 1) {
      fichaSeleccionada.movFilaComerPintado = fichaSeleccionada.movFilaPintar + 1

    if (fichaSeleccionada.movComerDer) {
      divPintar = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' +fichaSeleccionada.movComerDerPintado)
      divPintar.style.backgroundColor = 'black'
    }
    if (fichaSeleccionada.movComerIzq) {
          divPintar = document.getElementById('fila-' +  fichaSeleccionada.movFilaComerPintado +'-col-' +fichaSeleccionada.movComerIzqPintado)
          divPintar.style.backgroundColor = 'black'
    }

  } else {
      fichaSeleccionada.movFilaComerPintado = fichaSeleccionada.movFilaPintar - 1
    if (fichaSeleccionada.movComerDer) {
      divPintar = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' +fichaSeleccionada.movComerDerPintado)
      divPintar.style.backgroundColor = 'black'
    }
    if (fichaSeleccionada.movComerIzq) {
      divPintar = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado +'-col-' + fichaSeleccionada.movComerIzqPintado)
      divPintar.style.backgroundColor = 'black'
    }
    
}
  quitarEvento = true
  quitarEventosClickPosibles()
  resetearObjeto()
}


function moverFicha(filaMover, columnaMover, tipoComer) {

  //FICHA NUEVA
  var divPadre = document.getElementById('fila-' + filaMover +'-col-' + columnaMover)

  var newDama = document.createElement('div')

  if (turno === 1) {
    newDama.className = 'damasRojas'
    tableroArray[filaMover][columnaMover] = 1;
  } else {
    newDama.className = 'damasVerdes'
    tableroArray[filaMover][columnaMover] = 2;
  }
  //FICHA REY
  divPadre.appendChild(newDama)
 
  //ELIMINACION DE LA FICHA ANTIGUA
  var divViejo = document.getElementById('fila-' + fichaSeleccionada.idFila +'-col-' +  fichaSeleccionada.idColumna)
  divViejo.innerHTML = ''
  tableroArray[fichaSeleccionada.idFila][fichaSeleccionada.idColumna] = null;

  //ELIMINACION DE LA FICHA DEL USUARIO CONTRARIO SI LO COME
  if (tipoComer == 'izquierda') {
    if (turno === 1) {
      var divEnemigoElimanado = document.getElementById('fila-' + (fichaSeleccionada.idFila + 1)  +'-col-' +  (fichaSeleccionada.idColumna -1))
      divEnemigoElimanado.innerHTML = ''
      tableroArray[fichaSeleccionada.idFila + 1][fichaSeleccionada.idColumna - 1] = null
    }else{
      var divEnemigoElimanado = document.getElementById('fila-' + (fichaSeleccionada.idFila - 1)  +'-col-' +  (fichaSeleccionada.idColumna -1))
      divEnemigoElimanado.innerHTML = ''
      tableroArray[fichaSeleccionada.idFila - 1][fichaSeleccionada.idColumna - 1] = null
    }
  }
  if (tipoComer == 'derecha') {
    if (turno === 1) {
      var divEnemigoElimanado = document.getElementById('fila-' + (fichaSeleccionada.idFila + 1)  +'-col-' +  (fichaSeleccionada.idColumna +1))
      divEnemigoElimanado.innerHTML = ''
      tableroArray[fichaSeleccionada.idFila + 1][fichaSeleccionada.idColumna + 1] = null
    }else{
      var divEnemigoElimanado = document.getElementById('fila-' + (fichaSeleccionada.idFila - 1)  +'-col-' +  (fichaSeleccionada.idColumna +1))
      divEnemigoElimanado.innerHTML = ''
      tableroArray[fichaSeleccionada.idFila - 1][fichaSeleccionada.idColumna + 1] = null
    }
  }

  //VUELTA A SU COLOR ORIGINAL DE LAS CASILLAS
  var filaTurno = 0
  if (turno == 1) {
    filaTurno = 1
  } else{
    filaTurno = -1
  }

  if (fichaSeleccionada.movIzq) {
    var divPintar = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' +fichaSeleccionada.movPintarIzq)
    divPintar.style.backgroundColor = 'black'
  }
  if (fichaSeleccionada.movDer) {
    var divPintar = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' +fichaSeleccionada.movPintarDer)
    divPintar.style.backgroundColor = 'black'
  }
  if (fichaSeleccionada.movComerDer) {
    var divPintar = document.getElementById('fila-' + (fichaSeleccionada.movFilaPintar + filaTurno ) + '-col-' +fichaSeleccionada.movComerDerPintado)
    divPintar.style.backgroundColor = 'black'
  }
  if (fichaSeleccionada.movComerIzq) {
    var divPintar = document.getElementById('fila-' + (fichaSeleccionada.movFilaPintar + filaTurno) + '-col-' +fichaSeleccionada.movComerIzqPintado)
    divPintar.style.backgroundColor = 'black'
  }

  quitarEventosClickPosibles()

  var data = {
    type: 'piece-movement',
    payload: {
      jugador: turnoText.innerHTML,
      posicion: divViejo.id,
    },
  };
  

}


function quitarEventosClickPosibles(){
  if (fichaSeleccionada.movIzq) {
     var divMover = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' + fichaSeleccionada.movPintarIzq)
     divMover.removeAttribute('onclick')
  }
  if (fichaSeleccionada.movDer) {
    var divMover = document.getElementById('fila-' +fichaSeleccionada.movFilaPintar +'-col-' + fichaSeleccionada.movPintarDer)
    divMover.removeAttribute('onclick')
  }
  if (fichaSeleccionada.movComerDer) {
     var divMover = document.getElementById('fila-' + fichaSeleccionada.movFilaComerPintado  +'-col-' + fichaSeleccionada.movComerDerPintado)
     divMover.removeAttribute('onclick')
  }
  if (fichaSeleccionada.movComerIzq) {
    var divMover = document.getElementById('fila-' +fichaSeleccionada.movFilaComerPintado +'-col-' + fichaSeleccionada.movComerIzqPintado)
    divMover.removeAttribute('onclick')
  }

  if (quitarEvento == false) {
  quitarEventosClicks()
  }
}

function quitarEventosClicks() {
 if (turno === 1) {
    for (var i = 0; i < fichasRojas.length; i++) {
      fichasRojas[i].removeEventListener('click', obtenerFichaSeleccionada)
    }
  } else {
    for (var i = 0; i < fichasVerdes.length; i++) {
      fichasVerdes[i].removeEventListener('click', obtenerFichaSeleccionada)
    }
  }
  actualizarPuntos()
}

function actualizarPuntos() {
  var parrafoPuntosJugador = null

  if (turno === 1) {
    parrafoPuntosJugador = document.getElementById('puntos-jugador1')
    parrafoPuntosJugador.innerHTML = 13 - fichasVerdes.length
  } else{
    parrafoPuntosJugador = document.getElementById('puntos-jugador2')
    parrafoPuntosJugador.innerHTML = 13 - fichasRojas.length
  }
  
  if (fichasRojas.length == 1) {
    alert('Jugador 2 gan?? la partida');
  }
 if (fichasVerdes.length == 1) {
    alert('Jugador 1 gan?? la partida');
  }

	cambiarTurno()
}

function cambiarTurno(){
  if (turno === 1) {
    turno++
    turnoText.innerHTML = 'Turno: '+ inputJugador2.value;
    resetearObjeto()
  } else{
    turno--
    turnoText.innerHTML = 'Turno: '+ inputJugador1.value;
    resetearObjeto()
  }

}

function resetearObjeto() {
    fichaSeleccionada.id = null,
    fichaSeleccionada.esRey = false,
    fichaSeleccionada.movIzq = false,
    fichaSeleccionada.movDer = false,
    fichaSeleccionada.movComerIzq = false,
    fichaSeleccionada.movComerDer = false,
    fichaSeleccionada.movPintarIzq = null,
    fichaSeleccionada.movPintarDer = null,
    fichaSeleccionada.movComerDerPintado = null,
    fichaSeleccionada.movComerIzqPintado = null,
    agregarEvento()
    quitarEvento = false
    contadorClicks = 0
}

agregarEvento(); 


