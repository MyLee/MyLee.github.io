const column=8;
const row=8;
var mineQty;
var minelist = new Array;

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
    var mineQty= Math.round(cells/8+1);
    //if mines in the list is not enough, create more
    while(minelist.length<mineQty){
        //create ramdom mine   
        var mine=Math.floor(Math.random()*(cells+1));              
        if(minelist.indexOf(mine)==-1){
            minelist.push(mine);
        }
    }
    return minelist;
}
createMines();

var hasMine = function(cellNr){
    if(minelist.indexOf(cellnr)==-1){
        return false;
    }else {
        return true;
    }   
};

var findmyNeighbor = function(cellnr){
    var myNeighbor= new Array;
    var temp = [cellnr+1, cellnr-1, cellnr-column,  cellnr-column-1,  cellnr-column+1,  cellnr+column, cellnr+column-1, cellnr+column+1];
    for(var el in temp){
        if(el>0 && el <= row*column ){
            myNeighbor.push(el);
        }
    }
    return myNeighbor;    
};

var countMines = function(cellnr, myNeighbor){
    var numberofMine = 0;
    for(var i = 0; i<myNeighbor.lenght; i++){
        if(minelist.indexOf(i)!=-1){
            numberofMine++;
        }
    }
    return numberofMine;
}

var openCell = function(cellnr){   
    console.log('left mouse on cell nummer ' + cellnr);
    var cellId = cellnr.toString();
    if(hasMine(cellId)){ //animation explorate, reveal all mines and end the game       
    }else{ //doesnt has mine, open empty cells and show mine number 
          f
        }       
};

var markCell = function(cellnr){
    console.log('right mouse on cell nummer ' + cellnr);
//add a flag to the cell and do nothing  
    var cellId = cellnr.toString();
    $('#'+cellId).toggleClass('flag');  
}

//disable default right click's menu in chessBoard
$(chessBoard).bind('contextmenu', function(e){
    e.preventDefault();
    console.log('right click is not allowed here!');
}, false);
console.log(minelist);
console.log(table);