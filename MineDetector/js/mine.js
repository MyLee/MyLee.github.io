const column=9;
const row=9;
var mineQty;
var minelist = new Array;
var inspectedlist= new Array;
var openedCells= new Array;

var chessBoard = document.querySelector('#chessBoard')
var refreshBtn = document.getElementById('start');
var refreshPage = function(){
    window.location.reload();
}
refreshBtn.addEventListener('click', refreshPage);

//add function to users left or right click
var userClick = function(e){   
    // e = e || window.event;   
    var cellNr= parseInt(e.toElement.id);   
    switch (e.which) {
        //left click
        case 1: openCell(cellNr); break;
        //right click
        case 3:      
           e.preventDefault();   
           setFlag(cellNr); break;                             
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
        // td.title=td.id; //for testing purpose
        td.addEventListener('mouseup', userClick, false);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
chessBoard.appendChild(table);

var explosionSound = new Audio('sound/explosion.mp3');
var triumpSound = new Audio('sound/triump.mp3');

var showMines=function(id){
    var bomb=document.createElement('img');
    bomb.setAttribute('src', 'img/bomb.png');
    bomb.setAttribute('alt', 'bomb');
    bomb.className='bomb';
    document.getElementById(id).appendChild(bomb);
};

var winNotice = function(){    
    triumpSound.play();
    document.getElementById('notice').innerText='You Win!';
    document.getElementsByTagName('table')[1].style.pointerEvents ='none';
}    

// $('#chessBoardd td').addEventlistener
var createMines= function(){
    var cells=row*column;    
    mineQty= Math.round(cells/row+3);
    //if mines in the list is not enough, create more
    while(minelist.length<mineQty){
        //create ramdom mine   
        var mine=Math.floor(Math.random()*(cells)+1);              
        if(minelist.indexOf(mine)==-1){
            minelist.push(mine);
        }
    }       
    minelist.sort(function(a, b){return a-b});  
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

var findMineNeighbor = function(cellnr){
    var myNeighbor= new Array;
    var rownr=Math.floor(cellnr/column);   
    //find cells arround  
    if(cellnr==(rownr*column)+1){ //if cell from first column
        myNeighbor = [cellnr+1, cellnr-column,   cellnr-column+1,  cellnr+column, cellnr+column+1]; 
        }else if(cellnr==rownr*column){//if cell from last column
            myNeighbor = [cellnr-1, cellnr-column,  cellnr-column-1,  cellnr+column, cellnr+column-1]; 
        }else{
            myNeighbor = [cellnr+1, cellnr-1, cellnr-column,  cellnr-column-1,  cellnr-column+1,  cellnr+column, cellnr+column-1, cellnr+column+1];
        } 
    for(var i = 0; i<myNeighbor.length; i++){
        if(myNeighbor[i]<=0 || myNeighbor[i] > row*column ){ //eliminate cells outside the board
        myNeighbor.splice(i, 1);
        }
    }    
    myNeighbor.sort(function(a, b){return a-b}); 
return myNeighbor;    
};


var findmyNeighbor = function(cellnr){
    var myNeighbor= new Array;
    var rownr=Math.floor(cellnr/column);   
    //find cells arround  
    if(cellnr==(rownr*column)+1){ //if cell from first column
        myNeighbor = [cellnr+1, cellnr-column,  cellnr+column]; 
        }else if(cellnr==rownr*column){//if cell from last column
            myNeighbor = [cellnr-1, cellnr-column, cellnr+column]; 
        }else{
            myNeighbor = [cellnr+1, cellnr-1, cellnr-column,  cellnr+column];
        }
    for(var i = 0; i<myNeighbor.length; i++){
        if(myNeighbor[i]<=0 || myNeighbor[i] > row*column ){ //eliminate cells outside the board
        myNeighbor.splice(i, 1);
        }
    }    
    myNeighbor.sort(function(a, b){return a-b}); 
return myNeighbor;    
};

var removeDuplicate = function(duplicateArray, temp){
    var wantedArray = new Array;
    temp.forEach(function(el){ if(el>0 && el <= row*column ){ //eliminate cells outside the board
        //prevent re-inspect
        if(duplicateArray.length>0){
            if(duplicateArray.indexOf(el)==-1){//doesnot push cell which has already inspected
               wantedArray.push(el);
            }
        }else {wantedArray.push(el);}           
    }});  
    return wantedArray;   
};

var countMines = function(cellnr){
    var numberofMine = 0;
    var myNeighbor=findMineNeighbor(cellnr);
    myNeighbor.forEach(function(cell){
        if(minelist.indexOf(cell)!=-1){
        numberofMine++;
        }});    
    return numberofMine;
};

var markCellasOpened = function(cellId){
    $('#'+cellId).addClass('opened');
    if(openedCells.indexOf(cellId)==-1){
        openedCells.push(cellId);
    } 
    document.getElementById(cellId).style.pointerEvents ='none';
};

var neighborHasMine = function(id, neigborlist){
    neigborlist.forEach((function(cellnr){
        var nrOfBomb=countMines(cellnr);
        if(nrOfBomb!=0){
            return true;
        }

    }));
};

var openCell = function(cellnr){   
    // console.log('left mouse on cell nummer ' + cellnr);
    var cellId = cellnr.toString();
    if(openedCells.length==(column*row)-mineQty){
                winNotice();
            }     
    if(hasMine(cellId)){ //animation explorate, reveal all mines and end the game
        $('#'+cellId).addClass('red');
        explosionSound.play();
        minelist.forEach((function(cellnr){
        var id= cellnr.toString();
        document.getElementById('start').setAttribute('src', 'img/sad.png');
        document.getElementById('notice').innerText='You Lost!';
        showMines(id);
        })); 
        //disable click
        document.getElementsByTagName('table')[1].style.pointerEvents ='none';
        // console.log('Boooom!');       
    }
    else{
        //the cell is empty, opend empty cell
        var inspectlist= findmyNeighbor(cellnr);
        var mines= countMines(cellnr);
        if(countMines(cellnr)>0){
            $('#'+cellId).text(mines);
        }
            markCellasOpened(cellId);            
       //show the mines number               
       while(inspectlist.length!=0){                   
            var inspectingCell= inspectlist[0];               
            var nrOfmine=countMines(inspectingCell);
            var id=inspectingCell.toString();
            //add cellnr to inspected list
            if(inspectedlist.indexOf(inspectingCell)==-1){//prevent duplication
                inspectedlist.push(inspectingCell);
                inspectedlist.sort(function(a, b){return a-b});  
            }                    
            //remove from inspectlist
            inspectlist.splice(0, 1);
            if(hasMine(inspectingCell)==false){                                                
                if(nrOfmine==0){                                                                 
                    var newInspectList= new Array;
                    var temp=findmyNeighbor(inspectingCell); 
                    newInspectList = removeDuplicate(inspectedlist, temp);                                                
                    for(var j=0; j<newInspectList.length; j++){
                        var newitem=newInspectList[j];
                        if(inspectlist.indexOf(newitem)==-1){
                            inspectlist.push(newitem);
                        }
                    }
                    markCellasOpened(id);                     
                }else{
                    $('#'+id).text(nrOfmine);
                    markCellasOpened(id);  
                }
            }
            if(openedCells.length==(column*row)-mineQty){
                winNotice();
            }                    
       }//end of while loop
    }//end of else the cell is empty       
};

var setFlag = function(cellnr){
    // console.log('right mouse on cell nummer ' + cellnr);
//add a flag to the cell and do nothing  
    var cellId = cellnr.toString();
    $('#'+cellId).toggleClass('flag');  
};

//disable default right click's menu in chessBoard
$(chessBoard).bind('contextmenu', function(e){
    e.preventDefault();
}, false);
console.log(minelist);



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
