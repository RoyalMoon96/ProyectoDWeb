
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
        tablero = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
        ]
        let player1= JSON.parse(sessionStorage.getItem("player1"));
        let player2= JSON.parse(sessionStorage.getItem("player2"));
        if (player=="P1"){
            alert("Ganador: "+player1.nombre);
            EndOfGame(JSON.parse(sessionStorage.getItem("player1")),"player1",JSON.parse(sessionStorage.getItem("player2")),"player2")
        }
        else{
            alert("Ganador: "+player2.nombre);
            EndOfGame(JSON.parse(sessionStorage.getItem("player2")),"player2",JSON.parse(sessionStorage.getItem("player1")),"player1")
        }
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
    let player1= JSON.parse(sessionStorage.getItem("player1"));
    let player2= JSON.parse(sessionStorage.getItem("player2"));
    if (player=="P1"){
        player="P2"
        document.getElementById("Turno").innerText = "Turno de: "+player2.nombre;
    }else{
        player="P1" 
        document.getElementById("Turno").innerText = "Turno de: "+player1.nombre;
}
}
function seleccion(col,player) {
    addToken(col,player)
}

let ScoreTable = [["Ronda","Winer","Looser"]]
function EndOfGame(winer,Winer_player,looser,Looser_player){
    let winer_p = 1
    let looser_p = 0
    ScoreTable.push([ScoreTable.length,winer.nombre+"("+winer_p+")",looser.nombre+"("+looser_p+")"])
    winer.ScoreTable.push(["Conecta4_"+(ScoreTable.length-1),winer.nombre+"("+winer_p+")",looser.nombre+"("+looser_p+")"])
    looser.ScoreTable.push(["Conecta4_"+(ScoreTable.length-1),winer.nombre+"("+winer_p+")",looser.nombre+"("+looser_p+")"])
    winer.Wins+=1
    looser.Losses+=1
    winer.Matches+=1
    looser.Matches+=1
    winer.Score+= winer_p
    sessionStorage.setItem(Winer_player,JSON.stringify(winer))
    sessionStorage.setItem(Looser_player,JSON.stringify(looser))
    guardarScore(winer,"PUT")
    guardarScore(looser,"PUT")
    refreshScoreTable()
}

function guardarScore(player,method){
    let xhr = new XMLHttpRequest();
    xhr.open(method,"http://localhost:3000/admin/api/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "admin");
    xhr.send(JSON.stringify(player));
}

refreshScoreTable()
function refreshScoreTable(){
    let Score=document.getElementById("ScoreTable")
    let htmlString=""
    for (let i = 0; i < ScoreTable.length; i++) {
        //table.insertAdjacentHTML("beforeend", '<tr>')
        htmlString+='<tr style="border: black 2px solid;">'
        for (let j = 0; j < ScoreTable[i].length; j++) {
            htmlString+='<td style="border: gray 1px solid;text-align: center;" >'+ScoreTable[i][j]+'</td>'
        }
        htmlString+='</tr>'
    }   
    Score.innerHTML=htmlString
}

document.getElementById("btn_modificarUser_img").hidden=true;
document.getElementById("modificarUser_btn_modificarUser").hidden=false;
document.getElementById("modificarUser_btn_delete").hidden=false;
function guardarUsuario(player,method){
    document.getElementById("btn_modificarUser_img").hidden=false;
    document.getElementById("modificarUser_btn_modificarUser").hidden=true;
    document.getElementById("modificarUser_btn_delete").hidden=true;
    let xhr = new XMLHttpRequest();
    xhr.open(method,"http://localhost:3000/admin/api/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "admin");
    xhr.send(JSON.stringify(player));
    xhr.onloadend = function(){
        document.getElementById("btn_modificarUser_img").hidden=true;
        document.getElementById("modificarUser_btn_modificarUser").hidden=false;
        document.getElementById("modificarUser_btn_delete").hidden=false;
    }
}

function modificarUserUnlock(p){
    let player= JSON.parse(sessionStorage.getItem(p));
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/api/users?correo="+player.correo+"&pass="+document.getElementById("modificarUser_password_Key").value
    xhr.open("GET",url);
    xhr.send();
    xhr.onloadend = function (){
    if (xhr.responseText=="Not Found"){
        if (document.getElementById("modificarUser_password_Key").value!="") alert("Error : Wrong password");
        document.getElementById("modificarUser_Username").disabled=true;
        document.getElementById("modificarUser_img").disabled=true;
        document.getElementById("modificarUser_password").disabled=true;
        document.getElementById("modificarUser_password_2").disabled=true;
        document.getElementById("modificarUser_btn_modificarUser").disabled=true;
        document.getElementById("modificarUser_btn_delete").disabled=true;
        document.getElementById("modificarUser_password").value="";
        document.getElementById("modificarUser_password_2").value="";
    
    }else if (xhr.responseText!="Not Found" && JSON.parse(xhr.responseText)[0].pass==player.pass){
        document.getElementById("modificarUser_Username").disabled=false;
        document.getElementById("modificarUser_img").disabled=false;
        document.getElementById("modificarUser_password").disabled=false;
        document.getElementById("modificarUser_password_2").disabled=false;
        document.getElementById("modificarUser_btn_modificarUser").disabled=false;
        document.getElementById("modificarUser_btn_delete").disabled=false;
        document.getElementById("modificarUser_password").value=document.getElementById("modificarUser_password_Key").value;
        document.getElementById("modificarUser_password_2").value=document.getElementById("modificarUser_password_Key").value;
        document.getElementById("modificarUser_btn_modificarUser").onclick=function(){modificarUser(p)};
        document.getElementById("modificarUser_btn_delete").onclick=function(){DeleteUser(p)};
    }
    }
}

function modificarUser(p){
    let player= JSON.parse(sessionStorage.getItem(p));
    if (document.getElementById("modificarUser_password").value==document.getElementById("modificarUser_password_2").value){
        let name = document.getElementById("modificarUser_Username").value;
        let imageURL=document.getElementById("modificarUser_img").value;
        let password=document.getElementById("modificarUser_password").value;
        if (name==""){alert("Ingresa el usuario");return false;}
        if (imageURL==""){alert("Ingresa un url de una imagen");return false;}
        if (password==""){alert("Ingresa el password");return false;}
        player.nombre= name
        player.pass= password
        player.img= imageURL
        let xhr = new XMLHttpRequest();
        xhr.open('PUT',"http://localhost:3000/admin/api/users");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-auth", "admin");
        xhr.send(JSON.stringify(player));
        xhr.onloadend = function(){
        document.getElementById("btn_modificarUser_img").hidden=true;
        document.getElementById("modificarUser_btn_modificarUser").hidden=false;
        document.getElementById("modificarUser_btn_delete").hidden=false;
                sessionStorage.removeItem(p)
                document.getElementById("email").value= player.correo;
                document.getElementById("password").value = player.pass;
                FindPlayer();
                PlayersCount();
    }
        document.getElementById('modificarUser_btn_Close').click()
        document.getElementById("modificarUser_password_Key").value=""
        modificarUserUnlock(p)

    }else {alert("el password debe ser el mismo ");return false;}
}


function DeleteUser(p){
    document.getElementById("btn_modificarUser_img").hidden=false;
    document.getElementById("modificarUser_btn_modificarUser").hidden=true;
    document.getElementById("modificarUser_btn_delete").hidden=true;
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
    xhr.onloadend=function(){
        document.getElementById("btn_modificarUser_img").hidden=true;
        document.getElementById("modificarUser_btn_modificarUser").hidden=false;
        document.getElementById("modificarUser_btn_delete").hidden=false;
    }
    sessionStorage.removeItem(p)
    PlayersCount()
    document.getElementById("modificarUser_btn_Close").click();
}