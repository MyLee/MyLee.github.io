const column=9;
const row=9;
var mineQty;
var minelist = new Array;
var inspectedlist= new Array;

var chessBoard = document.querySelector('#chessBoard')
//add function to users left or right click
var userClick = function(e){  e.preventDefault();  
    e = e || window.event;   
    var cellNr= parseInt(e.toElement.id);   
    switch (e.which) {
        //left click
        case 1: openCell(cellNr); break;
        //right click
        case 3:        
            markCell(cellNr);                        
            break;                             
        }      
};

var table = document.createElement("table");
var cellnr=0;
for (var i = 1; i < row+1 ; i++) {   
    var tr = document.createElement('tr');
    for (var j = 1; j < column+1; j++) {
        var td = document.createElement('td');
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.className = "black";
        }
        td.id= (++cellnr).toString(); //id the same as cell number i chessboard
        td.title=td.id; //for testing purpose
        td.addEventListener('mouseup', userClick, false);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
chessBoard.appendChild(table);


// $('#chessBoardd td').addEventlistener
var createMines= function(){
    var cells=row*column;    
    var mineQty= Math.round(cells/row+1);
    //if mines in the list is not enough, create more
    while(minelist.length<mineQty){
        //create ramdom mine   
        var mine=Math.floor(Math.random()*(cells)+1);              
        if(minelist.indexOf(mine)==-1){
            minelist.push(mine);
        }
    }
    return minelist;
}
createMines();

var hasMine = function(cellId){
    var cellnr=parseInt(cellId);
    if(minelist.indexOf(cellnr)==-1){
        return false;
    }else {
        return true;
    }   
};

var findmyNeighbor = function(cellnr){
    var myNeighbor= new Array;
    var temp;
    var rownr=Math.floor(cellnr/column);   
    //find cells arround  
    if(cellnr==(rownr*column)+1){ //if cell from first column
        temp = [cellnr+1, cellnr-column,   cellnr-column+1,  cellnr+column, cellnr+column+1]; 
        }else if(cellnr==rownr*column){//if cell from last column
            temp = [cellnr-1, cellnr-column,  cellnr-column-1,  cellnr+column, cellnr+column-1]; 
        }else{
            temp = [cellnr+1, cellnr-1, cellnr-column,  cellnr-column-1,  cellnr-column+1,  cellnr+column, cellnr+column-1, cellnr+column+1];
        } 
    //add cell to neighbor list
    temp.forEach(function(el){ if(el>0 && el <= row*column ){ //eliminate cells outside the board
        //prevent re-inspect
        if(inspectedlist.length>0){
            if(inspectedlist.indexOf(el)==-1){//doesnot push cell which has already inspected
               myNeighbor.push(el);
            }
        }else {myNeighbor.push(el);}           
    }});     
    myNeighbor.sort(function(a, b){return a-b}); 
return myNeighbor;    
};

var countMines = function(cellnr){
    var numberofMine = 0;
    var myNeighbor=findmyNeighbor(cellnr);
    myNeighbor.forEach(function(cell){
        if(minelist.indexOf(cell)!=-1){
        numberofMine++;
        }});    
    return numberofMine;
};

var markCellasOpened = function(cellId){
    $('#'+cellId).addClass('opened');
    document.getElementById(cellId).style.pointerEvents ='none';
};

var openCell = function(cellnr){   
    console.log('left mouse on cell nummer ' + cellnr);
    var cellId = cellnr.toString();    
    if(hasMine(cellId)){ //animation explorate, reveal all mines and end the game
    minelist.forEach((function(cellnr){
        var id= cellnr.toString();
        $('#'+id).addClass('bomb');
    }));
    console.log('Boooom!');       
    }
    //the cell is empty
    else{
        //opend empty cell
         markCellasOpened(cellId);      
       //show the mines number  
       var inspectlist= findmyNeighbor(cellnr);      
       while(inspectlist.length!=0){                   
            var inspectingCell= inspectlist[0];               
            var nrOfmine=countMines(inspectingCell);
            var id=inspectingCell.toString();
            //add cellnr to inspected list
            inspectedlist.push(inspectingCell);
            inspectedlist.sort(function(a, b){return a-b});  
            //remove from inspectlist
            inspectlist.splice(0, 1);   
            markCellasOpened(id);       
            if(nrOfmine==0){                                                 
                var newInspectList= new Array;
                newInspectList=findmyNeighbor(inspectingCell);                                                 
                for(var j=0; j<newInspectList.length; j++){
                    var newitem=newInspectList[j];
                    if(inspectlist.indexOf(newitem)==-1 && newitem!=inspectingCell){
                        inspectlist.push(newitem);
                    }
                }                     
            }else{
                $('#'+id).text(nrOfmine);
            }                   
       }//end of while loop
    }//end of else the cell is empty       
};

var markCell = function(cellnr){
    console.log('right mouse on cell nummer ' + cellnr);
//add a flag to the cell and do nothing  
    var cellId = cellnr.toString();
    $('#'+cellId).toggleClass('flag');  
};

//disable default right click's menu in chessBoard
$(chessBoard).bind('contextmenu', function(e){
    e.preventDefault();
}, false);
console.log(minelist);
console.log(table);

// var exBomb= new Image();
// exBomb.src="img/explosion.png";
// 
// function sprite(options){
//     var that = {},
//     frameIndex=0,
//     tickCount=0,
//     ticksPerFrame = 0,
//     numberOfFrames = options.numberOfFrames ||1;
//     
//     that.context= options.context;
//     that.width=options.width;
//     that.height=options.height;
//     that.image=options.image;
//     that.loop = options.loop;
//     
//     that.render=function(){
//         //Draw the animation
//         that.context.drawImage(
//             that.image,
//             frameIndex*that.width/numberOfFrames,        
//             0,
//             0,
//             that.width/numberOfFrames,
//             that.height,
//             0,
//             0,
//             that.width/numberOfFrames,
//             that.height);
//     };
//     
//     that.update=function(){
//         tickCount +=1;
//         //if the current frame index is in range
//         if(tickCount>ticksPerFrame){
//             tickCount=0;
//             //go to next frame
//             frameIndex ++;
//         }else if(that.loop){
//             frameIndex=0;
//         }
//     };
//         
//     return that;
// }
// 
// var canvas=document.getElementById('explostion');
// canvas.width=200;
// canvas.heigh=200;
// 
// var bomb= sprite({
//     context: canvas.getContext("2d"),
//     width:200,
//     heigh:200,
//     image:exBomb
// });
// 
// bomb.render();

