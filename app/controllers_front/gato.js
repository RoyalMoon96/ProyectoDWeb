PlayersCount()
function PlayersCount(){
    if (window.sessionStorage.length != 2) window.location.href=("http://localhost:3000/home");
    if (window.sessionStorage.length == 1) {
        let player1= JSON.parse(sessionStorage.getItem("player1"));
        if (player1==null) {
                player1= JSON.parse(sessionStorage.getItem("player2"));
                sessionStorage.setItem("player1", JSON.stringify(player1));
                sessionStorage.removeItem("player2");
                document.getElementById("navbar_player2").innerHTML='<a href="#" id="navbar_player2" style="margin-left: 1cap;"><br><i class="fas fa-user-circle" role="button" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#loginModal">Player2</i><br></a>'
            }
        document.getElementById("navbar_player1").innerHTML='<a id="navbar_player1" style="margin-left: 1cap;"><br><i role="button" onclick=changeModal("player1") class="fas" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#CerrarSesion" ><img style="height:2ch;width:2ch;border-radius:100%;" src="'+player1.img+'">'+player1.nombre+'</i><br></a>'
        document.getElementById("navbar_player2").innerHTML='<a href="#" id="navbar_player2" style="margin-left: 1cap;"><br><i class="fas fa-user-circle" role="button" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#loginModal">Player2</i><br></a>'

    }else if (window.sessionStorage.length == 0){
        document.getElementById("navbar_player1").innerHTML='<a href="#" id="navbar_player1" style="margin-left: 1cap;"><br><i class="fas fa-user-circle" role="button" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#loginModal">Player1</i><br></a>'
        document.getElementById("navbar_player2").innerHTML='<a href="#" id="navbar_player2" style="margin-left: 1cap;"><br><i class="fas fa-user-circle" role="button" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#loginModal">Player2</i><br></a>'
    }
    if (window.sessionStorage.length == 2) {
        let player1= JSON.parse(sessionStorage.getItem("player1"));
        let player2= JSON.parse(sessionStorage.getItem("player2"));
        document.getElementById("navbar_player1").innerHTML='<a id="navbar_player1" style="margin-left: 1cap;"><br><i role="button" onclick=changeModal("player1") class="fas" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#CerrarSesion"><img style="height:2ch;width:2ch;border-radius:100%;" src="'+player1.img+'">'+player1.nombre+'</i><br></a>'
        document.getElementById("navbar_player2").innerHTML='<a id="navbar_player2" style="margin-left: 1cap;"><br><i role="button" onclick=changeModal("player2") class="fas" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#CerrarSesion"><img style="height:2ch;width:2ch;border-radius:100%;" src="'+player2.img+'">'+player2.nombre+'</i><br></a>'
    }
}
function changeModal(player){
    document.getElementById("modal_CerrarSesion_userImage").src= JSON.parse(sessionStorage.getItem(player)).img
    document.getElementById("modal_CerrarSesion_userName").value= JSON.parse(sessionStorage.getItem(player)).nombre
    document.getElementById("modal_CerrarSesion_btn_Cerrar_Sesion").onclick= function (){
            sessionStorage.removeItem(player);
            PlayersCount()
        }
}

let tablero = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let jugadorActual = "P1";
let turno = 1;

function marcarCasilla(row, col) {
    if (tablero[row][col] === 0) {
        tablero[row][col] = jugadorActual;
        refreshtab();
        if (checkWin(jugadorActual)) {
            alert("Ganador: " + jugadorActual);
            resetJuego();
        } else if (turno === 9) {
            alert("Empate");
            resetJuego();
        } else {
            cambiarJugador();
        }
    } else {
        alert("Esa casilla ya está ocupada");
    }
}

function checkWin(jugador) {
    //Filas
    for (let i = 0; i < 3; i++) {
        if (tablero[i][0] === jugador && tablero[i][1] === jugador && tablero[i][2] === jugador) {
            return true;
        }
    }
    //Columnas
    for (let i = 0; i < 3; i++) {
        if (tablero[0][i] === jugador && tablero[1][i] === jugador && tablero[2][i] === jugador) {
            return true;
        }
    }
    //Diagonales
    if (tablero[0][0] === jugador && tablero[1][1] === jugador && tablero[2][2] === jugador) {
        return true;
    }
    if (tablero[0][2] === jugador && tablero[1][1] === jugador && tablero[2][0] === jugador) {
        return true;
    }
    return false;
}

function cambiarJugador() {
    if (jugadorActual === "P1") {
        jugadorActual = "P2";
        document.getElementById("Turno").innerText = "Turno de: Player2";
    } else {
        jugadorActual = "P1";
        document.getElementById("Turno").innerText = "Turno de: Player1";
    }
    turno++;
}

function resetJuego() {
    tablero = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    jugadorActual = "P1";
    turno = 1;
    document.getElementById("Turno").innerText = "Turno de: Player1";
    refreshtab();
}

function refreshtab() {
    let htmlString = "";
    for (let i = 0; i < tablero.length; i++) {
        htmlString += '<tr>';
        for (let j = 0; j < tablero[i].length; j++) {
            htmlString += '<td class="cell" id="' + i + 'x' + j + '" value="' + tablero[i][j] + '" onclick="marcarCasilla(' + i + ',' + j + ')"></td>';
        }
        htmlString += '</tr>';
    }
    document.getElementById('table').innerHTML = htmlString;
}

refreshtab();
addEvents();

function addEvents() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            document.getElementById(i + 'x' + j).addEventListener('click', function (e) {
                marcarCasilla(i, j);
            });
        }
    }
}