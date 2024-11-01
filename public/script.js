
//game settings
var framerate = 10

//board size 
var width = 700
var height = 500
var ctx
var c


var p1_x = 20
var p1_y = height/2

var p2_x = width-30
var p2_y = height/2

var ball_x = width/2
var ball_y = height/2

var ball_dx = 2
var ball_dy = 2

window.onload = function func(){
    setInterval(gameloop, framerate)
    
    c = document.getElementById("mCanvas");
    c.width = width
    c.height = height
    ctx = c.getContext("2d");

    document.addEventListener("keydown", move);
}

function gameloop(){  
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "white";
    ctx.fillRect(p1_x, p1_y, 10, 50);

    ctx.fillStyle = "white";
    ctx.fillRect(p2_x, p2_y, 10, 50);

    ctx.fillStyle = "white";
    ctx.fillRect(ball_x, ball_y, 10, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 5, c.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(width-5, 0, 5, c.height);

    ball_x += ball_dx
    ball_y += ball_dy

    collision()
}

function move(){
    key = event.key
    console.log(key + " key is pressed")

    if (key == "w"){
        p1_y -= 10
    }
    if (key == "s"){
        p1_y += 10
    }

    if (key == "ArrowUp"){
        p2_y -= 10
    }
    if (key == "ArrowDown"){
        p2_y += 10
    }      
}

function collision() {

    if (ball_x <= 0 || ball_x >= width-15){
        ball_dx *= -1 
    }

    // if (ball_x <= p1_x+5 && p1_y<= ball_y){
    //     ball_dx *= -1 
    // }

    if (ball_x <= p1_x+5 && p1_y+50 >= ball_y){
        ball_dx *= -1 
    }

    if (ball_x >= p2_x){
        ball_dx *= -1 
    }

    if (ball_y <= 0 || ball_y >= height){
        ball_dy *= -1 
    }
   
}
