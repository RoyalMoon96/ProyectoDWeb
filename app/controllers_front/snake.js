
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


let table = document.getElementById("table")
let map=[
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"]
]
var InputP1_x = 0 // 0 static // 1 Up // -1 Down 
var InputP1_y = 0 // 0 static // 1 Right // -1 Left 

var InputP2_x = 0 // 0 static // 1 Up // -1 Down 
var InputP2_y = 0 // 0 static // 1 Right // -1 Left 

function Snake(x, y){
    this.x = x;
    this.y = y;
}
function Player(x,y,id){
    this.snake = [new Snake(x, y)];
    this.action = MoveSnake;
    this.id = id;
}



function snakeToMap(Player){
    let snake = Player.snake
    if (map[snake[0].y][snake[0].x]=="A"){
        Player.action=addAndMove
        let Random_x = Math.floor(Math.random() * map[0].length);
        let Random_y = Math.floor(Math.random() * map.length);
        while (map[Random_y][Random_x]!="_"){
            Random_x = Math.floor(Math.random() * map[0].length);
            Random_y = Math.floor(Math.random() * map.length);
        }
        map[Random_y][Random_x]="A"
    }
    map[snake[0].y][snake[0].x] ="S"+Player.id
    for (let i=1; i<snake.length; i++){
        map[snake[i].y][snake[i].x] ="s"+Player.id
    }
    refreshMap()
}

function addAndMove(x,y,Player){
    if (x==0&&y==0)return
    let snake = Player.snake
    let newX=snake[0].x+x
    let newY=snake[0].y-y
    if (newX<0||newY<0||newX>map[0].length-1||newY>map.length-1){ if(!GameOver)GameOver=true; return Player}
    if (map[newY][newX].toUpperCase()=="S1"||map[newY][newX].toUpperCase()=="S2"){if(!GameOver)GameOver=true; return Player}
    snake.unshift(new Snake(newX,newY))
    Player.action=MoveSnake
    snakeToMap(Player)
    if(!GameOver)GameOver=false;
    return
}

function MoveSnake(x,y,Player) {
    let snake = Player.snake
    if (x==0&&y==0)return
    let newX=snake[0].x+x
    let newY=snake[0].y-y
    if (newX<0||newY<0||newX>map[0].length-1||newY>map.length-1){ if(!GameOver)GameOver=true; return Player}
    if (map[newY][newX].toUpperCase()=="S1"||map[newY][newX].toUpperCase()=="S2"){if(!GameOver)GameOver=true; return Player}
    map[snake[snake.length-1].y][snake[snake.length-1].x]="_"
    snake.unshift(new Snake(newX,newY))
    snake.pop()
    snakeToMap(Player)
    if(!GameOver)GameOver=false; 
    return
}

function refreshMap(){
    let htmlString=""
    for (let i = 0; i < map.length; i++) {
        //table.insertAdjacentHTML("beforeend", '<tr>')
        htmlString+='<tr>'
        for (let j = 0; j < map[i].length; j++) {
                if (map[i][j]=="A")
                    htmlString+='<td class="cell" style="border: 1px solid" style="text-align: center;" value="'+map[i][j]+'"><i class="fa-solid fa-apple-whole"></i></td>'
                else
                    htmlString+='<td class="cell" style="border: 1px solid; border-color:white; " value="'+map[i][j]+'"></td>'
            //table.insertAdjacentHTML("beforeend", '<td>'+i+'</td>')
        }
        htmlString+='</tr>'
    }   
    table.innerHTML=htmlString
}
document.addEventListener('keydown', function(e) {
    //console.log(e.code.toUpperCase())
    switch ((e.code).toUpperCase()){
    //Player1
        case 'KEYW':
            if (InputP1_x==0 && InputP1_y==-1||INPUTP1==true) break;
            InputP1_x=0
            InputP1_y=1
            INPUTP1=true
            break;
        case 'KEYS':
            if (InputP1_x==0 && InputP1_y==1||INPUTP1==true) break;
            InputP1_x=0
            InputP1_y=-1
            INPUTP1=true
            break;
        case 'KEYA':
            if (InputP1_x==1 && InputP1_y==0||INPUTP1==true) break;
            InputP1_x=-1
            InputP1_y=0
            INPUTP1=true
            break;
        case 'KEYD':
            if (InputP1_x==-1 && InputP1_y==0||INPUTP1==true) break;
            InputP1_x=1
            InputP1_y=0
            INPUTP1=true
            break;
    
    //Player2
        case 'ARROWUP':
            if (InputP2_x==0 && InputP2_y==-1||INPUTP2==true) break;
            InputP2_x=0
            InputP2_y=1
            INPUTP2=true
            break;
        case 'ARROWDOWN':
            if (InputP2_x==0 && InputP2_y==1||INPUTP2==true) break;
            InputP2_x=0
            InputP2_y=-1
            INPUTP2=true
            break;
        case 'ARROWLEFT':
            if (InputP2_x==1 && InputP2_y==0||INPUTP2==true) break;
            InputP2_x=-1
            InputP2_y=0
            INPUTP2=true
            break;
        case 'ARROWRIGHT':
            if (InputP2_x==-1 && InputP2_y==0||INPUTP2==true) break;
            InputP2_x=1
            InputP2_y=0
            INPUTP2=true
            break;
    }
});
let P1= new Player(2,2,1);
let P2= new Player(17,2,2);
var GameOver =false;
let loser;
map[(map.length-1)/2][(map.length-1)/2]="A"
snakeToMap(P1)
snakeToMap(P2)

let Input_Speed=document.getElementById("input_speed")
let Label_Speed=document.getElementById("speed")
Label_Speed.innerText=Input_Speed.value

Input_Speed.addEventListener("change",function(e) {
    Label_Speed.innerText=Input_Speed.value
});

function Start(){
    document.getElementById("btn_start").hidden=true;
    map=[
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
        ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"]
    ]
    P1= new Player(2,2,1);
    P2= new Player(17,2,2);
    map[(map.length-1)/2][(map.length-1)/2]="A"
    snakeToMap(P1)
    snakeToMap(P2)
    GameOver =false;
    try{
        clearInterval(interval)
    }catch{}
    let speed_v= Input_Speed.value
    document.getElementById("body").style="background-color: #FFF4CD;Overflow: hidden"
    InputP1_x=0
    InputP1_y=-1
    InputP2_x=0
    InputP2_y=-1

    let interval =setInterval(function (){
        INPUTP1=false
        INPUTP2=false
        if (!GameOver){
            console.log()
            loser=P1.action(InputP1_x,InputP1_y,P1)
            if (loser==undefined||loser==null)
            loser=P2.action(InputP2_x,InputP2_y,P2)
    }else{
        if (P1==loser){
        console.log("Pierde: Player1")
        EndOfGame(JSON.parse(sessionStorage.getItem("player2")),P2,JSON.parse(sessionStorage.getItem("player1")),P1)
        clearInterval(interval)
    }
        if (P2==loser){
            console.log("Pierde: Player2")
            EndOfGame(JSON.parse(sessionStorage.getItem("player1")),P1,JSON.parse(sessionStorage.getItem("player2")),P2)
            clearInterval(interval)
        }
    
    document.getElementById("body").style="background-color: #FFF4CD;Overflow: auto"
    document.getElementById("btn_start").hidden=false;

}
}, speed_v);
}
let ScoreTable = [["Ronda","Winer","Looser"]]
function EndOfGame(winer,Winer_player,looser,Looser_player){
    let winer_size = Winer_player.snake.length
    let looser_size = Looser_player.snake.length
    ScoreTable.push([ScoreTable.length,winer.nombre+"("+winer_size+")",looser.nombre+"("+looser_size+")"])
    alert("Gano: "+winer.nombre+ " con "+winer_size);
    winer.ScoreTable.push(["Snake_"+(ScoreTable.length-1),winer.nombre+"("+winer_size+")",looser.nombre+"("+looser_size+")"])
    looser.ScoreTable.push(["Snake_"+(ScoreTable.length-1),winer.nombre+"("+winer_size+")",looser.nombre+"("+looser_size+")"])
    winer.Wins+=1
    looser.Losses+=1
    winer.Matches+=1
    looser.Matches+=1
    winer.Score+= winer_size
    sessionStorage.setItem("player"+Winer_player.id,JSON.stringify(winer))
    sessionStorage.setItem("player"+Looser_player.id,JSON.stringify(looser))
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
    /* xhr.onload = function (){
        console.log( xhr.responseText);
    } */
}
refreshScoreTable()
function refreshScoreTable(){
    let Socore=document.getElementById("SocreTable")
    let htmlString=""
    for (let i = 0; i < ScoreTable.length; i++) {
        //table.insertAdjacentHTML("beforeend", '<tr>')
        htmlString+='<tr style="border: black 2px solid;">'
        for (let j = 0; j < ScoreTable[i].length; j++) {
            htmlString+='<td style="border: gray 1px solid;text-align: center;" >'+ScoreTable[i][j]+'</td>'
        }
        htmlString+='</tr>'
    }   
    Socore.innerHTML=htmlString
}