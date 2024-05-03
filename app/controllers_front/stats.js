PlayersCount()
function PlayersCount(){
    if (window.sessionStorage.length > 2) {alert("Se ha producido un error"); window.location.href=("http://localhost:3000/home");}
    if (window.sessionStorage.length < 1) {alert("Inicia al menos una sesión"); window.location.href=("http://localhost:3000/home");}
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
    refreshStats()
}
function changeModal(player){
    document.getElementById("modal_CerrarSesion_userImage").src= JSON.parse(sessionStorage.getItem(player)).img
    document.getElementById("modal_CerrarSesion_userName").value= JSON.parse(sessionStorage.getItem(player)).nombre
    document.getElementById("modal_CerrarSesion_btn_Cerrar_Sesion").onclick= function (){
            sessionStorage.removeItem(player);
            PlayersCount()
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
    PlayersCount()
}

refreshStats()
function refreshStats(){
    let player1= JSON.parse(sessionStorage.getItem("player1"));
        if (player1!=null) {
            document.getElementById("Name_player1").innerText= "Player1: "+ player1.nombre
            document.getElementById("Score_player1").innerText= "Score: "+ player1.Score
            document.getElementById("Wins_player1").innerText= "Wins: "+ player1.Wins
            document.getElementById("Losses_player1").innerText= "Losses: "+ player1.Losses
            document.getElementById("Matches_player1").innerText= "Matches: "+ player1.Matches
            document.getElementById("ScoreTable_player1").innerHTML= CreateScoreTable(player1)
        }else{
            document.getElementById("Name_player1").innerText= "Player1"
            document.getElementById("Score_player1").innerText= "-----"
            document.getElementById("Wins_player1").innerText= "-----"
            document.getElementById("Losses_player1").innerText= "-----"
            document.getElementById("Matches_player1").innerText= "-----"
            document.getElementById("ScoreTable_player1").innerHTML= ""
        }
        let player2= JSON.parse(sessionStorage.getItem("player2"));
        if (player2!=null) {
            document.getElementById("Name_player2").innerText= "Player2: "+ player2.nombre
            document.getElementById("Score_player2").innerText= "Score: "+ player2.Score
            document.getElementById("Wins_player2").innerText= "Wins: "+ player2.Wins
            document.getElementById("Losses_player2").innerText= "Losses: "+ player2.Losses
            document.getElementById("Matches_player2").innerText= "Matches: "+ player2.Matches
            document.getElementById("ScoreTable_player2").innerHTML= CreateScoreTable(player2)
        }else{
            document.getElementById("Name_player2").innerText= "Player2"
            document.getElementById("Score_player2").innerText= "-----"
            document.getElementById("Wins_player2").innerText= "-----"
            document.getElementById("Losses_player2").innerText= "-----"
            document.getElementById("Matches_player2").innerText= "-----"
            document.getElementById("ScoreTable_player2").innerHTML= ""
        }
}


function CreateScoreTable(player){
    let htmlString="<table style='width:90%; margin-left:5%;'>"
    for (let i = 0; i < player.ScoreTable.length; i++) {
        htmlString+='<tr style="border: black 2px solid;">'
        for (let j = 0; j < player.ScoreTable[i].length; j++) {
            htmlString+='<td style="border: gray 1px solid;text-align: center;" >'+player.ScoreTable[i][j]+'</td>'
        }
        htmlString+='</tr>'
    }   
    return htmlString+'</table>'
}