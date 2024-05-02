
PlayersCount()
function PlayersCount(){
    if (window.sessionStorage.length != 2) lock();
    else unlock()
    if (window.sessionStorage.length == 1) {
        let player1= JSON.parse(sessionStorage.getItem("player1"));
        document.getElementById("navbar_player1").innerHTML='<a id="navbar_player1" style="margin-left: 1cap;"><br><i role="button" class="fas" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#CerrarSecion"><img style="height:2ch;width:2ch;border-radius:100%;" src="'+player1.img+'">'+player1.nombre+'</i><br></a>'
        ""+player1.nombre
    }
    if (window.sessionStorage.length == 2) {
        let player1= JSON.parse(sessionStorage.getItem("player1"));
        let player2= JSON.parse(sessionStorage.getItem("player2"));
        document.getElementById("navbar_player1").innerHTML='<a id="navbar_player1" style="margin-left: 1cap;"><br><i role="button" class="fas" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#CerrarSecion"><img style="height:2ch;width:2ch;border-radius:100%;" src="'+player1.img+'">'+player1.nombre+'</i><br></a>'
        document.getElementById("navbar_player2").innerHTML='<a id="navbar_player2" style="margin-left: 1cap;"><br><i role="button" class="fas" style="font-size:36px; color: #FFF4CD; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#CerrarSecion"><img style="height:2ch;width:2ch;border-radius:100%;" src="'+player2.img+'">'+player2.nombre+'</i><br></a>'
    }
}

function FindPlayer(){
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/api/users?correo="+correo+"&pass="+password
    xhr.open("GET",url);
    xhr.send();
    xhr.onload = function (){
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else{
            response = JSON.parse(xhr.responseText)
            console.log("Leido: ", response[0]);
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

