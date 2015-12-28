var column;
var row;
var mineQty;
var mines;
var mineQty= Math.round(row*column/8+1);

var table = document.createElement("table");
for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    for (var j = 1; j < 9; j++) {
        var td = document.createElement('td');
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.className = "black";
        }
        td.id='r'+ i + 'c' + j; 
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);

var createMine= function(mineQty){
    var cellMine=Math.floor(Math.random()*(mineQty+1));
    var mineId=findMineId(cellMine);
    return mineId;
}

var findMineId= function(cellMine){
    var rowNr = Math.floor(cellMine/row);
    var coloumNr=cellMine-(rowNr*row);
    var cellId= 'r'+rowNr+'c'+coloumNr;
    return cellId;
}

//detect left of right mouse click
function mouseDown(e) {
  e = e || window.event;
  switch (e.which) {
    case 1: alert('left'); break;
    case 2: alert('middle'); break;
    case 3: alert('right'); break; 
  }
}​

