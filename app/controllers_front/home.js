
PlayersCount()
function PlayersCount(){
    if (window.sessionStorage.length != 2) lock();
    else unlock()
}
function FindPlayer(){
    let player={
    }
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/api/users"
    xhr.open("GET",url);
    xhr.send();
    xhr.onload = function (){
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else{
            response = JSON.parse(xhr.responseText)
            console.log("Leido: ", response);
            return response
        }
    } 
    PlayersCount()
}

function lock(){
    let Note = document.getElementById("Note")
    Note.hidden = false;

    let Game_Gato = document.getElementById("Game_Gato")
    Game_Gato.hidden = true;
    Game_Gato.parentNode.style="background-image: url('https://cdn-icons-png.flaticon.com/512/890/890132.png'); background-size: cover; background-position: center; height: 17cap"
    
    let Game_Snake = document.getElementById("Game_Snake")
    Game_Snake.hidden = true;
    Game_Snake.parentNode.style="background-image: url('https://cdn-icons-png.flaticon.com/512/890/890132.png'); background-size: cover; background-position: center; height: 17cap"
    
    let Game_Conecta4 = document.getElementById("Game_Conecta4")
    Game_Conecta4.hidden = true;
    Game_Conecta4.parentNode.style="background-image: url('https://cdn-icons-png.flaticon.com/512/890/890132.png'); background-size: cover; background-position: center; height: 17cap"
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

