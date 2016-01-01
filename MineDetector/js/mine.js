var column;
var row;
var mineQty;
var minelist = new Array;

var chessBoard = document.querySelector('#chessBoard')
//add function to users left or right click
var userClick = function(e){  e.preventDefault();  
    e = e || window.event;   
    var cellId=e.toElement.id;   
    switch (e.which) {
        //left click
        case 1: openCell(cellId); break;
        //right click
        case 3:        
            markCell(cellId);  
                      
            break;                             
        }      
};

var table = document.createElement("table");
var cellnr=0;
for (var i = 1; i < 9; i++) {   
    var tr = document.createElement('tr');
    for (var j = 1; j < 9; j++) {
        var td = document.createElement('td');
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.className = "black";
        }
        td.id= (++cellnr).toString(); //id the same as cell number i chessboard
        td.title=td.id;
        td.addEventListener('mouseup', userClick, false);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
chessBoard.appendChild(table);


// $('#chessBoardd td').addEventlistener
var createMines= function(row, column){
    // row=8;
    // column=8;
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
createMines(8,8);

var hasMine = function(cellId){
    var cellnr= parseInt(cellId);
    if(minelist.indexOf(cellnr)==-1){
        return false;
    }else {
        return true;
    }   
};

var openCell = function(cellId){   
    console.log('left mouse on cell nummer ' + cellId);
    if(hasMine(cellId)){ //animation explorate, reveal all mines and end the game       
    }else{ //doesnt has mine, open empty cells and show mine number       
        }       
};

var markCell = function(cellId){
    console.log('right mouse on cell nummer ' + cellId);
//add a flag to the cell and do nothing    
}

//disable right click in chessBoard
$(chessBoard).bind('contextmenu', function(e){
    e.preventDefault();
    console.log('right click is not allowed here!');
})
console.log(table);