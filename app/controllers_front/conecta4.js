
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
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
    ]

function addToken(columna,player){
    let continuar =true;
    if (columna<=tablero[0].length-1&&columna>=0){
        let row=0;
    for (let i=0;i<5;i++){
        if (tablero[i+1][columna]==0)
            row=i+1
    }
    tablero[row][columna]=player
    refreshtab()
    //console.log("V:"+ifWin(player,row,columna,0,1,0));
    console.log("V:"+(ifWin(player,row,columna,0,1,0)>=4));
    if (ifWin(player,row,columna,0,1,0)>=4){ continuar=false;}
    //console.log("R:"+ifWin(player,row,columna,0,0,1));
//console.log("L:"+ifWin(player,row,columna,0,0,-1));
//console.log("H:"+((ifWin(player,row,columna,0,0,-1))+ifWin(player,row,columna,0,0,1)-1));
console.log("H:"+(((ifWin(player,row,columna,0,0,-1))+ifWin(player,row,columna,0,0,1))-1>=4));
if (ifWin(player,row,columna,0,0,-1)+ifWin(player,row,columna,0,0,1)-1>=4){ continuar=false;}
//console.log("/:"+((ifWin(player,row,columna,0,-1,1))+ifWin(player,row,columna,0,1,-1)-1));
console.log("/:"+(((ifWin(player,row,columna,0,-1,1))+ifWin(player,row,columna,0,1,-1))-1>=4));
if (((ifWin(player,row,columna,0,-1,1))+ifWin(player,row,columna,0,1,-1))-1>=4) { continuar=false;}
//console.log("\\:"+((ifWin(player,row,columna,0,1,1))+ifWin(player,row,columna,0,-1,-1)-1));
console.log("\\:"+(((ifWin(player,row,columna,0,1,1))+ifWin(player,row,columna,0,-1,-1))-1>=4));
if ((ifWin(player,row,columna,0,1,1))+ifWin(player,row,columna,0,-1,-1)-1>=4){ continuar=false;}

console.log("continuar: "+(continuar));
let sobran=0;
for(let i=0; i<tablero[0].length; i++) {
        console.log("continuar: "+(continuar));
        if (tablero[0][i]==0) sobran+=1;
    }
    console.log(sobran>0)
    if (!sobran>0) {
        alert("Game Over!")
        tablero = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
        ]
        refreshtab()
}
    if (!continuar) {
        alert("Ganador: "+player);
        tablero = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
        ]
        refreshtab()
}
    }
    addEvents()
}

function ifWin(player,row, columna, n, dirRow, dirColum) {
    if (columna>tablero[0].length&&columna<=0)return n;
    if (row>tablero.length-1||row<0)return n;
    if (n==-1) return 0;
    if (tablero[row][columna]!=player) return n;
    return ifWin(player,row+dirRow, columna+dirColum, n+1, dirRow, dirColum)
}

refreshtab()
function refreshtab(){
    let htmlString=""
    for (let i = 0; i < tablero.length; i++) {
        //table.insertAdjacentHTML("beforeend", '<tr>')
        htmlString+='<tr>'
        for (let j = 0; j < tablero[i].length; j++) {
                    htmlString+='<td class="cell" id="'+i+'x'+j+'" value="'+tablero[i][j]+'"></td>'
            //table.insertAdjacentHTML("beforeend", '<td>'+i+'</td>')
        }
        htmlString+='</tr>'
    }   
    document.getElementById('table').innerHTML=htmlString
    
}
var player="P2"
addEvents()

function addEvents(){
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
        document.getElementById(i+'x'+j).addEventListener('click', function(e) {
            seleccion(j,player)
            })
        }
    }
    if (player=="P1"){
        player="P2"
        document.getElementById("Turno").innerText="Turno de: Player2"
    }else{
        player="P1" 
        document.getElementById("Turno").innerText="Turno de: Player1"
}
}
function seleccion(col,player) {
    addToken(col,player)
}