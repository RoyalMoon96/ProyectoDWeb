
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
    console.log(map[newY][newX])
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
    console.log(e.code.toUpperCase())
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
        alert("Gano: Player2")
    }
        if (P2==loser){
            console.log("Pierde: Player2")
            alert("Gano: Player1")
        }
    clearInterval(interval)
    document.getElementById("body").style="background-color: #FFF4CD;Overflow: auto"
    document.getElementById("btn_start").hidden=false;

}
}, speed_v);
}