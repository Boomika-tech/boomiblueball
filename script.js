const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let canvasW = canvas.width
let canvasH = canvas.height
let pfW = canvas.width
let pfH = 10

let leftPressed=(rightPressed=false);

function holeX(){
    return Math.floor(Math.random()*canvasW)
}

let platforms =[
     {x:0,y:canvasW - 50, holeX:holeX()},
     {x:0,y:canvasH - 10, holeX:holeX()},
    ];

    let ball = {x:10 ,y:20 ,r:8 ,dy:4 }

let dy = 1

let movespeed = 5

drawPlatforms();
drawBall();
movePlatforms();
navigateBall();


function drawBall(){

    if(rightPressed){
        ball.x += movespeed
    }
    if(leftPressed){
        ball.x -= movespeed
    }
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI);
    ctx.fillStyle = "#00008B"
    ctx.fill();
    ctx.closePath();
}

function movePlatforms(){

        ctx.clearRect(0, 0, canvasW, canvasH);
        platforms.forEach((pf) => {
            pf.y -= 1;
        });
        addNewPlatforms();
        drawPlatforms();
        dropAndHoldBall();

        drawBall();

        requestAnimationFrame(movePlatforms);
    };




addNewPlatforms();

function dropAndHoldBall(){
    if (ball.y > platforms[0].y - ball.r){
       ball.y = platforms[0].y - ball.r;
    }
    else {
    ball.y += ball.dy;}
}

function addNewPlatforms(){
    const lastPf = platforms[platforms.length-1]
    const height = Math.floor(Math.random()*(80-50)+50);
    console.log(height)
        platforms.push({x:0,y:lastPf.y+height, holeX:holeX()});

}

function drawPlatforms()
{
    platforms.forEach((pf) => {
    ctx.beginPath();
    ctx.rect(pf.x, pf.y, pfW, pfH);
    ctx.fillStyle = "#808080"
    ctx.fill();
    ctx.closePath();



    ctx.beginPath();
    ctx.rect(pf.holeX, pf.y, 50, pfH);
    ctx.fillStyle = "#FFFFFF"
    ctx.fill();
    ctx.closePath();

    });

}

function navigateBall(){
    document.addEventListener("keydown",(e)=>

    {
        if(e.key === "ArrowRight"){
           // ball.x += 5
            rightPressed = true;
       }
       if(e.key === "ArrowLeft"){
        //ball.x -= 5

        leftPressed = true;
       }
    });

    document.addEventListener("keyup",(e)=>

    {
        if(e.key === "ArrowRight"){
            ball.x += 5
            //rightPressed = false;
       }
       if(e.key === "ArrowLeft"){
        ball.x -= 5
        //leftPressed = false;
       }
    });
} 