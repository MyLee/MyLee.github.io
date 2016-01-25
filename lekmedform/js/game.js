//create the canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height= 800;
canvas.id='maingame';
document.body.appendChild(canvas);

var points, direction;
var zombie = {
    speed: 100   
}

var winNotice = function(){
    ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("You made it!", 40,40);
}

//pentagon
var pentagon = function(){
    ctx.beginPath();
    polygon(ctx,170,550,45,5,-Math.PI/2);
    ctx.fillStyle="rgba(0,128,0,0.75)";
    ctx.fill();
    // ctx.stroke();
}

//diamond
var diamond = function(){
    ctx.beginPath();
    polygon(ctx,170,270,45,6,-Math.PI/2);
    ctx.fillStyle="rgba(236,27,30,0.75)";
    ctx.fill();
    // ctx.stroke();
} 

//square
var square = function(){
    ctx.beginPath();
    polygon(ctx,310,270,50,4,-Math.PI/4);
    ctx.fillStyle='lime';
    ctx.fill();
}


//rectangle
drawRectangle(600,235,30,80, 'deepskyblue');

//triangle
var triangel = function(){
    ctx.beginPath();
    polygon(ctx,750,550,40,3,-Math.PI/2);
    ctx.fillStyle="rgba(56,67,193,1)";
    ctx.fill();
}


//circle
drawCircle(700,70,40,'blueviolet')

//star
var star = function(){
    ctx.beginPath();
    drawStar(ctx,310,650,35,5,-Math.PI/2);
    ctx.fillStyle='hotpink';
    ctx.fill();
}


//octagon
var octagon = function(){
    ctx.beginPath();
    polygon(ctx,730,730,25,8,0,false);
    polygon(ctx, 730,730,45,8,0,true);
    ctx.fillStyle="rgba(227,11,93,0.75)";
    ctx.shadowColor = 'rgba(0,0,0,0.75)';
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
    ctx.shadowBlur = 10;
    ctx.fill();
}

var drawObstacle = function(t, color){  
    var wallPositions = [
        [0,0,t,800],
        [0,0,800,t],
        [0,800-t,800,t],
        [800-t,0,t,800],              
        [200,0,5,100],       
        [600,0,t,100],
        [400,100,t,100],
        [100,200,t,150],
        [100,200,550,t],
        [250,200,t,150],
        [650,200,t,150],
        [250,350,200,t],
        [550,350,100+t,t],
        [450,350,t,250],
        [100,450,t,150],
        [250,450,t,250],
        [700,500,t,100],
        [600,600,t,100],
        [700,500,t,100],
        [400,700,t,100],
        [250,450,100,t],
        [100,600,150+t,t],
        [250,700,150,t],
        [700,500,100,t],
        [600,600,100+t,t],
        [500,700,100+t,t],
        [100,700,t,100]        
    ];
    for(var i = 0; i<wallPositions.length; i++){
        var currentPos = wallPositions[i];
        ctx.beginPath();
        ctx.rect(currentPos[0], currentPos[1], currentPos[2], currentPos[3]);
        ctx.fillStyle = color;
        ctx.fill();
    }        
}

var reset = function(){
    zombie.x=370;
    zombie.y=730;    
    zombie.left = true    
    points= 0;
}

var render = function(){
    ctx.clearRect(0,0,800,800);
    drawObstacle(5,'green'); 
    
    octagon();
    drawZombie(zombie.x,zombie.y, zombie.left);
    pentagon();
    diamond();
    square();
    drawRectangle(600,235,30,80, 'deepskyblue');
    drawCircle(700,70,40,'blueviolet');
    star();
    triangel();                  
}

// setInterval(main, 1);

//Handle keyboard controls
var keysDown = {};

addEventListener('keydown', function(e){
    keysDown[e.keyCode]= true;
}, false);

addEventListener('keyup', function(e){
    delete keysDown[e.keyCode];
})
var keyboardControl = function(modifier) {    
    if(38 in keysDown){// up
        zombie.y -= zombie.speed*modifier;
    }
    if(40 in keysDown){// down
        zombie.y += zombie.speed * modifier;
    }
    if(37 in keysDown){// left
        zombie.x -= zombie.speed * modifier;
        zombie.left=true;
    }
    if(39 in keysDown){//right
        zombie.x += zombie.speed * modifier;
        zombie.left = false;
    }

}

var pointCounter = function(){
    
    if(points == 800){
        winNotice();
        reset();
    }    
}

var main = function(modifier){
    var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

setInterval(main, 1);

//Update game object
var update = function(modifier){    
    keyboardControl(modifier);
    pointCounter();
}



// Cross-browser support for requestAnimationFrame
// var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();



function drawStar(ctx, x, y, r, p, m)
{
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.fill();
    ctx.restore();
}

//function to draw forms
function polygon(ctx, x, y, radius, sides, startAngle, anticlockwise) {  
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  a = anticlockwise?-a:a;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.restore();  
}

function drawCircle(x,y,radius,color){
    ctx.beginPath();
    ctx.arc(x, y, radius,0 * Math.PI, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    //ctx.stroke();
}

function drawRectangle(x,y,length,height, color ){
    ctx.beginPath();
    ctx.rect(x, y, length, height);
    ctx.fillStyle = color;
    // if(shadow== true){
    //     ctx.shadowColor = 'rgba(0,0,0,0.75)';
    //     ctx.shadowOffsetX = 8;
    //     ctx.shadowOffsetY = 8;
    //     ctx.shadowBlur = 10;
    // }   
    ctx.fill();
}

function drawZombie(x,y, left){
    drawRectangle(x+3, y+30, 11,22, 'lightgreen'); 
    drawRectangle(x+3,y+5 , 11,37, 'gray');
    drawCircle(x+8,y-1,12,'lightgreen');
    if(left==true){
        drawCircle(x,y,2,'red');    
        drawRectangle(x-18,y+10,8,8,'lightgreen');
        drawRectangle(x-10,y+10,13,8,'gray');  
    }else{
        drawCircle(x+16,y,2,'red');    
        drawRectangle(x+26,y+10,8,8,'lightgreen');
        drawRectangle(x+14,y+10,13,8,'gray'); 
    }    
}

