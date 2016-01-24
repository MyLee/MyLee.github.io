//create the canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height= 800;
canvas.id='maingame';
document.body.appendChild(canvas);

drawZombie(370,730, true);

function drawObstacle(){
    //runt omkring
    drawRectangle(0,0,5,800,'green'); //vertical
    drawRectangle(0,0,800,5,'green'); //horisontal
    drawRectangle(0,795,800,5,'green');
    drawRectangle(795,0,5,800,'green');
    
    //innuti
    drawRectangle(200,0,5,100,'green');
    drawRectangle(600,0,5,100,'green');
    drawRectangle(400,100,5,100,'green');
    drawRectangle(100,200,550,5,'green');
    drawRectangle(100,200,5,150,'green');
    drawRectangle(250,200,5,150,'green');
    drawRectangle(650,200,5,150,'green');
    drawRectangle(250,350,200,5,'green');
    drawRectangle(550,350,105,5,'green');
    drawRectangle(450,350,5,250,'green');
    drawRectangle(100,450,5,150,'green');
    drawRectangle(250,450,5,250,'green');
    drawRectangle(700,500,5,100,'green');
    drawRectangle(600,600,5,100,'green');
    drawRectangle(700,500,5,100,'green');
    drawRectangle(400,700,5,100,'green');
    drawRectangle(250,450,100,5,'green');
    drawRectangle(100,600,155,5,'green');
    drawRectangle(250,700,150,5,'green');
    drawRectangle(400,700,5,100,'green');
    drawRectangle(700,500,100,5,'green');
    drawRectangle(600,600,105,5,'green');
    drawRectangle(500,700,105,5,'green');
    drawRectangle(100,700,5,100,'green');
}
drawObstacle();

//pentagon
ctx.beginPath();
// polygon(ctx,170,550,45,5,-Math.PI/2);
polygon(ctx,170,550,45,5,-Math.PI/2);
ctx.fillStyle="rgba(0,128,0,0.75)";
ctx.fill();
// ctx.stroke();

//diamond
ctx.beginPath();
polygon(ctx,170,270,45,6,-Math.PI/2);
ctx.fillStyle="rgba(236,27,30,0.75)";
ctx.fill();
// ctx.stroke();

//square
ctx.beginPath();
polygon(ctx,310,270,50,4,-Math.PI/4);
ctx.fillStyle='lime';
ctx.fill();

//rectangle
drawRectangle(600,235,30,80, 'deepskyblue', false);

//triangle
ctx.beginPath();
polygon(ctx,750,550,40,3,-Math.PI/2);
ctx.fillStyle="rgba(56,67,193,1)";
ctx.fill();

//circle
drawCircle(700,70,40,'blueviolet')

//star
ctx.beginPath();
drawStar(ctx,310,650,35,5,-Math.PI/2);
ctx.fillStyle='hotpink';
ctx.fill();

//octagon
ctx.beginPath();
polygon(ctx,730,730,25,8,0,false);
polygon(ctx, 730,730,45,8,0,true);
ctx.fillStyle="rgba(227,11,93,0.75)";
ctx.shadowColor = 'rgba(0,0,0,0.75)';
ctx.shadowOffsetX = 8;
ctx.shadowOffsetY = 8;
ctx.shadowBlur = 10;
ctx.fill();

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

function drawRectangle(x,y,length,height, color, shadow ){
    ctx.beginPath();
    ctx.rect(x, y, length, height);
    ctx.fillStyle = color;
    if(shadow== true){
        ctx.shadowColor = 'rgba(0,0,0,0.75)';
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;
        ctx.shadowBlur = 10;
    }   
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