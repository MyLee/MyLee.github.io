const column=9;
const row=9;
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
    for(var i=0; i<row+1; i++){
        var postition=i*row;
        if(cellnr==postition+1){ //if cell from first column
           temp = [cellnr+1, cellnr-column,   cellnr-column+1,  cellnr+column, cellnr+column+1]; 
        }else if(cellnr==postition){//if cell from last column
            temp = [cellnr-1, cellnr-column,  cellnr-column-1,  cellnr+column, cellnr+column-1];
        }else{
            temp = [cellnr+1, cellnr-1, cellnr-column,  cellnr-column-1,  cellnr-column+1,  cellnr+column, cellnr+column-1, cellnr+column+1];
            }            
        } 
    temp.forEach(function(el){ if(el>0 && el <= row*column ){
            myNeighbor.push(el);
        }})      
    return myNeighbor;    
};

var countMines = function(cellnr){
    var numberofMine = 0;
    var myNeighbor=findmyNeighbor(cellnr);
    for(var i = 0; i<myNeighbor.lenght; i++){
        if(minelist.indexOf(i)!=-1){
            numberofMine++;
        }
    }
    return numberofMine;
}

var minetest=function(){
    
}
var markCellasOpened = function(cellId){
    $('#'+cellId).addClass('opened');
    document.getElementById(cellId).style.pointerEvents ='none';
}

var openCell = function(cellnr){   
    console.log('left mouse on cell nummer ' + cellnr);
    var cellId = cellnr.toString();
    if(hasMine(cellId)){ //animation explorate, reveal all mines and end the game
    console.log('Boooom!');       
    }
    //the cell is empty
    else{
        //opend empty cell
         markCellasOpened(cellId);
       //show the mines number  
       var inspectlist= findmyNeighbor(cellnr);      
    //    while(inspectlist.length!=0){         
           for(var i=0; i<=inspectlist.length; i++){
               var value= inspectlist[i];               
               var nrOfmine=countMines(value);
               var id=value.toString();
               var index=inspectlist.indexOf(value);
               if(nrOfmine==0){                                 
                    markCellasOpened(id);
                    var newInspectList= new Array;
                    newInspectList=findmyNeighbor(value);
                    // inspectlist.splice(index, 1);                  
                    for(var j=0; j<newInspectList.length; j++){
                        var newitem=newInspectList[j];
                        if(inspectlist.indexOf(newitem)==-1 && newitem!=value){
                            inspectlist.push(newitem);
                        }
                    }                     
               }else{
                    $('#'+id).innerText=nrOfmine;
                    // inspectlist.splice(index, 1);
               }
           }//end of FOR loop                     
    //    }//end of while loop
    }//end of else the cell is empty       
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