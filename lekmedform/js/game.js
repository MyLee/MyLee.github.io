//create the canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width=1100;
canvas.height= 800;
canvas.id='maingame';
document.body.appendChild(canvas);
var radius = 40;

var forms =  [
    ['pentagon'],
    ['heptagon'],
    ['square'],
    ['triangle'],  
    ['octagon'],
    ['rectangle'],
    ['star'],
    ['circle']
]

var formCoordinates = [
    [160,550],
    [170,270],
    [310,270],
    [600,270],
    [750,550],
    [700,70],
    [310,650],
    [730,730]
];

var shuffle= function(array){
    var currentIndex = array.length;
    var tempValue, randomIndex;
    // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

shuffle(forms);

var drawForms = function(){
    for (var i = 0; i<forms.length; i++){
        var form = forms[i][0];     
        var x = formCoordinates[i][0];
        var y = formCoordinates[i][1];
        switch (form){
            case 'star': 
                star(x,y,radius-10);
            break;
            case 'rectangle':
                drawRectangle(x-10,y-35,40,80, 'deepskyblue');
                break;
            case 'circle':
                drawCircle(x,y,radius-3,'blueviolet');
                break;
            case 'octagon':
                octagon(x,y,radius);
                break;
            case 'pentagon':
                pentagon(x,y,radius);
                break;
            case 'heptagon':
                heptagon(x,y,radius);
                break;
            case 'square':
                square(x,y,radius);
                break;
            case 'triangle':
                triangel(x,y,radius);
                break;
        }
    }    
}

var points, direction;
var walls=[];
var isMoving = true;
var zombie = {
    speed: 100   
}
var restartBtn=  document.querySelector('#restart');
var congrats=  document.querySelector('#congrats');
var collisionSound = new Audio('sound/metal.mp3');
var triumpSound = new Audio('sound/triump.mp3');
var beepSound = new Audio('sound/beep.mp3');

congrats.style.display = 'none';

var notice = function(note){
    ctx.font = "24px Helvetica";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
    if(note == 'win'){
       ctx.fillText("You made it!", 1000,40);
    }else if(note == 'lost'){
       ctx.fillText("Don't touch the wall!", 1020,10);
    }else {
        ctx.fillText("Find a/an " + note, 1010,40);
    }
    ctx.fillText('Points = ' + points, 1000, 80 )
	
}

//pentagon
var pentagon = function(x,y,radius){
    ctx.beginPath();
    polygon(ctx,x,y,radius,5,-Math.PI/2);
    ctx.fillStyle="rgba(0,128,0,0.75)";
    ctx.fill();
    // ctx.stroke();
}

//heptagon
var heptagon = function(x, y, radius){
    ctx.beginPath();
    polygon(ctx,x,y,radius,6,-Math.PI/3 );
    ctx.fillStyle="rgba(236,27,30,0.75)";
    ctx.fill();
    // ctx.stroke();
} 

//square
var square = function(x,y,radius){
    ctx.beginPath();
    polygon(ctx,x,y,radius,4,-Math.PI/4);
    ctx.fillStyle='lime';
    ctx.fill();
}


//rectangle
//drawRectangle(600,235,30,80, 'deepskyblue');

//triangle
var triangel = function(x,y,radius){
    ctx.beginPath();
    polygon(ctx,x,y,radius,3,-Math.PI/2);
    ctx.fillStyle="rgba(56,67,193,1)";
    ctx.fill();
}


//circle
//drawCircle(700,70,40,'blueviolet');

//star
var star = function(x, y, radius){
    ctx.beginPath();
    drawStar(ctx,x,y,radius,5,-Math.PI/2);
    ctx.fillStyle='hotpink';
    ctx.fill();
}


//octagon
var octagon = function(x,y,radius){
    ctx.beginPath();
    polygon(ctx,x,y,radius-16,8,0,false);
    polygon(ctx, x,y,radius,8,0,true);
    ctx.fillStyle="rgba(227,11,93,0.75)";
    // ctx.shadowColor = 'rgba(0,0,0,0.75)';
    // ctx.shadowOffsetX = 4;
    // ctx.shadowOffsetY = 4;
    // ctx.shadowBlur = 10;
    ctx.fill();
}

var drawObstacle = function(t, color){  
    var wallPositions = [
        [0,0,t,800],
        [0,0,800,t],
        [0,800-t,800,t],
        [800-t,0,t,800],              
        [200,0,t,100],       
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
        [520,700,80+t,t],
        [100,700,t,100]        
    ];
    for(var i = 0; i<wallPositions.length; i++){
        var currentPos = wallPositions[i];
        ctx.beginPath();
        ctx.rect(currentPos[0], currentPos[1], currentPos[2], currentPos[3]);
        ctx.fillStyle = color;
        ctx.fill();
        walls.push(currentPos);
    }        
}

var resetZombiePos=function(){
    zombie.x=360;
    zombie.y=730;    
    zombie.left = true;
    zombie.isMoving = true;    
   
}

var reset = function(){
    //clear ladybrint
    ctx.clearRect(0,0,800,800);
    resetZombiePos();      
    points= 0;
    findForm = randomForm();
    congrats.style.display = 'none';
    //clear notice board
    ctx.clearRect(800,0,400,400);
    //  formCoordinates = [
    //     ['pentagon', 150,550,45],
    //     ['heptagon', 170,270,45],
    //     ['square',310,270,50],
    //     ['rectangle',600,235,30,80],
    //     ['triangle',750,550,40],
    //     ['circle',700,70,40],
    //     ['star',310,650,35],
    //     ['octagon',730,730,45]
    // ];
}

var render = function(){
    //ctx.clearRect(zombie.x-19,zombie.y-20,42,80);
    ctx.clearRect(0,0,800,800);
    drawZombie(zombie.x,zombie.y, zombie.left);                      
    drawObstacle(8,'green');    
    drawForms();
} 
var randomForm = function(){
    return Math.floor(Math.random()*(formCoordinates.length));
}
var formIndex = randomForm();
//Handle keyboard controls
var keysDown = {};

addEventListener('keydown', function(e){
    keysDown[e.keyCode]= true;
}, false);

addEventListener('keyup', function(e){
    delete keysDown[e.keyCode];
})
var keyboardControl = function(modifier, speed) {        
    var futureX = this.zombie.x;
    var futureY = this.zombie.y;
    
    var futureTopY = futureY-9;
    var futureBottomY = futureY+50;
    var futureLeftX = futureX-10;
    var futureRightX = futureX+35;
    
    //check if future position hits an obstable
    //stop themovement and retuern false if so
    for(var i in this.walls){
        var wall = this.walls[i];
        var wallTopY = wall[1]+4;
        var wallBottomY= wallTopY + wall[3]+4;
        var wallLeftX = wall[0]-2;
        var wallRightX = wallLeftX + wall[2]-2;
        if (futureRightX > wallLeftX && futureLeftX < wallRightX && futureBottomY > wallTopY && futureTopY < wallBottomY) {
         notice('lost');
         collisionSound.play();
         resetZombiePos();
      }
    }
    if(this.zombie.isMoving){          
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
    //check if zombie hit the right form
    var formX =  formCoordinates[formIndex][0];
    var formY =  formCoordinates[formIndex][1];   
    var formTopY = formY - radius;
    var formBottomY = formY + radius;
    var formLeftX = formX - radius;
    var formRightX = formX+ radius;
    var formName = forms[formIndex][0];
    notice(formName);

    if (futureRightX > formLeftX && futureLeftX < formRightX && futureBottomY >formTopY && futureTopY < formBottomY) {
        ctx.clearRect(800,0,400,400);
        points +=10;
        beepSound.play();
        formCoordinates.splice(formIndex,1);
        forms.splice(formIndex, 1);
        formIndex = randomForm();
    }
    
    if(points==80){
        triumpSound.play();
        notice('win');
        congrats.style.display='block';
    }
}

var pointCounter = function(){
    
    if(points == 800){
        notice('win');
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

//setInterval(main, 1);

//Update game object
var update = function(modifier){    
    keyboardControl(modifier, 100);
    pointCounter();
}



// Cross-browser support for requestAnimationFrame
// var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

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

// createjs.Ticker.on("tick", handleTick);
//    function handleTick(event) {
//        stage.update(event);
//    }


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

var bgMusic = new Audio('sound/bg.mp3');
bgMusic.addEventListener('ended', function(){
    this.currentTime = 0;
    this.play();
}, false);
bgMusic.play();

addEventListener('click', function(){window.location.reload();}, false);
// Let's play this game!
var then = Date.now();
reset();
main();


