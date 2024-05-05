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
    document.getElementById("modificarUser_modificarUserUnlock").onclick=function(){modificarUserUnlock(player)}
    document.getElementById("modal_CerrarSesion_btn_Cerrar_Sesion").onclick= function (){
            sessionStorage.removeItem(player);
            PlayersCount()
        }
    let p= JSON.parse(sessionStorage.getItem(player));
    document.getElementById("modificarUser_Username").value=p.nombre;
    document.getElementById("modificarUser_img").value=p.img;
    document.getElementById("modificarUser_email").value=p.correo;
    document.getElementById("modificarUser_password_Key").value=""
    modificarUserUnlock(player)

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

function guardarUsuario(player,method){
    let xhr = new XMLHttpRequest();
    xhr.open(method,"http://localhost:3000/admin/api/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "admin");
    xhr.send(JSON.stringify(player));
}

function modificarUserUnlock(p){
    let player= JSON.parse(sessionStorage.getItem(p));
    if (document.getElementById("modificarUser_password_Key").value==player.pass){
        document.getElementById("modificarUser_Username").disabled=false;
        document.getElementById("modificarUser_img").disabled=false;
        document.getElementById("modificarUser_password").disabled=false;
        document.getElementById("modificarUser_password_2").disabled=false;
        document.getElementById("modificarUser_btn_modificarUser").disabled=false;
        document.getElementById("modificarUser_btn_delete").disabled=false;
        document.getElementById("modificarUser_password").value=player.pass;
        document.getElementById("modificarUser_password_2").value=player.pass;
        document.getElementById("modificarUser_btn_modificarUser").onclick=function(){modificarUser(p)};
        document.getElementById("modificarUser_btn_delete").onclick=function(){DeleteUser(p)};

    }else{
        document.getElementById("modificarUser_Username").disabled=true;
        document.getElementById("modificarUser_img").disabled=true;
        document.getElementById("modificarUser_password").disabled=true;
        document.getElementById("modificarUser_password_2").disabled=true;
        document.getElementById("modificarUser_btn_modificarUser").disabled=true;
        document.getElementById("modificarUser_btn_delete").disabled=true;
        document.getElementById("modificarUser_password").value="";
        document.getElementById("modificarUser_password_2").value="";
    }
}

function modificarUser(p){
    let player= JSON.parse(sessionStorage.getItem(p));
    if (document.getElementById("modificarUser_password").value==document.getElementById("modificarUser_password_2").value){
        let name = document.getElementById("modificarUser_Username").value;
        let imageURL=document.getElementById("modificarUser_img").value;
        let password=document.getElementById("modificarUser_password").value;
        player.nombre= name
        player.pass= password
        player.img= imageURL
        guardarUsuario(player,'PUT')
        document.getElementById('modificarUser_btn_Close').click()
        sessionStorage.setItem(p, JSON.stringify(player))
        PlayersCount()
        document.getElementById("modificarUser_password_Key").value=""
        modificarUserUnlock(player)

    }else {alert("el password debe ser el mismo ");return false;}
}

function DeleteUser(p){
    let player= JSON.parse(sessionStorage.getItem(p));
    if (player._id == undefined || player._id == null){return false}
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE',"http://localhost:3000/admin/api/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "admin");
    let Del_user = {
        "id": player._id
    }
    xhr.send(JSON.stringify(Del_user));
    sessionStorage.removeItem(p)
    PlayersCount()
    document.getElementById("modificarUser_btn_Close").click();
}