//const bcrypt = require('bcrypt');

PlayersCount()
function PlayersCount(){
    if (window.sessionStorage.length != 2) lock();
    else unlock()
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


document.getElementById("btn_login_img").hidden=true;
document.getElementById("btn_login").hidden=false;
function FindPlayer(){
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    document.getElementById("btn_login_img").hidden=false;
    document.getElementById("btn_login").hidden=true;
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/api/users?correo="+correo+"&pass="+password
    xhr.open("GET",url);
    xhr.send();
    xhr.onload = function (){
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else{
            if (xhr.responseText=="Not Found") {alert("Usuario no encontrado"); return false};
            response = JSON.parse(xhr.responseText)
            if (response.length==0) {alert("Usuario no encontrado"); return false};
            console.log("Encontramos: ", response[0].nombre);
            if (response.length!=0){
                if (window.sessionStorage.length == 1) 
                    sessionStorage.setItem("player2", JSON.stringify(response[0]));
                if (window.sessionStorage.length == 0) 
                    sessionStorage.setItem("player1", JSON.stringify(response[0]));
                PlayersCount();
                
                document.getElementById("login_close_btn").click();
            }
        }
    }
    xhr.onloadend = function() {
        document.getElementById("btn_login_img").hidden=true;
        document.getElementById("btn_login").hidden=false;
    }
    PlayersCount()
}

function lock(){
    let Note = document.getElementById("Note")
    Note.hidden = false;

    let Game_Gato = document.getElementById("Game_Gato")
    Game_Gato.hidden = true;
    Game_Gato.parentNode.style="background-image: url('https://cdn-icons-png.flaticon.com/512/890/890132.png');background-repeat: no-repeat;background-size: cover; background-position: center; height: 17cap; width: 17cap;"
    
    let Game_Snake = document.getElementById("Game_Snake")
    Game_Snake.hidden = true;
    Game_Snake.parentNode.style="background-image: url('https://cdn-icons-png.flaticon.com/512/890/890132.png');background-repeat: no-repeat;background-size: cover; background-position: center; height: 17cap; width: 17cap;"
    
    let Game_Conecta4 = document.getElementById("Game_Conecta4")
    Game_Conecta4.hidden = true;
    Game_Conecta4.parentNode.style="background-image: url('https://cdn-icons-png.flaticon.com/512/890/890132.png');background-repeat: no-repeat;background-size: cover; background-position: center; height: 17cap; width: 17cap;"
}

function unlock(){
    let Note = document.getElementById("Note")
    Note.hidden = true;

    let Game_Gato = document.getElementById("Game_Gato")
    Game_Gato.hidden = false;
    Game_Gato.parentNode.style=""
    
    let Game_Snake = document.getElementById("Game_Snake")
    Game_Snake.hidden = false;
    Game_Snake.parentNode.style=""
    
    let Game_Conecta4 = document.getElementById("Game_Conecta4")
    Game_Conecta4.hidden = false;
    Game_Conecta4.parentNode.style=""
}

document.getElementById("btn_registro_img").hidden=true;
document.getElementById("registro_btn_Registrarse").hidden=false;
function Registrarse(){
    let name= document.getElementById("registro_Username").value;
    let email= document.getElementById("registro_email").value;
    let pass= document.getElementById("registro_password").value;
    let pass2= document.getElementById("registro_password_2").value;
    let imageURL= document.getElementById("registro_img").value;
    if (name==""){alert("Ingresa el usuario");return false;}
    if (imageURL==""){alert("Ingresa un url de una imagen");return false;}
    if (email==""){alert("Ingresa el correo");return false;}
    if (!(email.includes("@")&&email.includes("."))){alert("correo no valido");return false;}
    if (pass==""){alert("Ingresa el password");return false;}
    if (pass!=pass2){alert("el password debe ser el mismo ");return false;}
    document.getElementById("btn_registro_img").hidden=false;
    document.getElementById("registro_btn_Registrarse").hidden=true;
    let xhr = new XMLHttpRequest();
    let flag=true;
    let url = "http://localhost:3000/api/users?correo="+email
    xhr.open("GET",url);
    xhr.send();
    xhr.onload = function (){
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else{
            response = xhr.responseText
            if (response=="Not Found" && flag){
                flag = false
                let newUser = {
                    nombre: name,
                    correo: email,
                    pass: pass2,
                    img: imageURL,
                    Wins: 0,
                    Losses:0,
                    Matches: 0,
                    Score: 0,
                    ScoreTable: [["Ronda", "Winer", "Looser"]]
                };
                //guardarUsuario(newUser,'POST')
                let newxhr = new XMLHttpRequest();
                newxhr.open('POST',"http://localhost:3000/admin/api/users");
                newxhr.setRequestHeader("Content-Type", "application/json");
                newxhr.setRequestHeader("x-auth", "admin");
                newxhr.send(JSON.stringify(newUser));
                newxhr.onloadend = function (){
                    document.getElementById("btn_registro_img").hidden=true;
                    document.getElementById("registro_btn_Registrarse").hidden=false;
                    if (newxhr.status != 200) {
                        alert(newxhr.status + ": " + newxhr.statusText);
                    } else{
                        
                        document.getElementById("email").value= newUser.correo;
                        document.getElementById("password").value = newUser.pass;
                        FindPlayer();
                        PlayersCount();
                    }
                }
                document.getElementById('registro_btn_Close').click()
                document.getElementById("registro_Username").value="";
                document.getElementById("registro_email").value="";
                document.getElementById("registro_password").value="";
                document.getElementById("registro_password_2").value="";
                document.getElementById("registro_img").value="";
                

                return true;
            }else if(flag){alert("el usuario ya existe"+response)
            document.getElementById("btn_registro_img").hidden=true;
            document.getElementById("registro_btn_Registrarse").hidden=false;
        }
        }
    } 
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