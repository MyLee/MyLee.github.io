//declare variants
var todo=  document.querySelector('#todolist');
var completed = document.querySelector('#completedlist');
var form = document.querySelector('form');
var input = document.querySelector('#add');
var field=document.querySelector('#newitem');

//fetch data
var tasklist = function(){
      var tasklist = new Array;
      var taskstr=localStorage.getItem('todo');
      if(taskstr !=null){
            tasklist = JSON.parse(taskstr);
      }
      return tasklist;
}

var donelist = function(){
      var donelist = new Array;
      var donestr=localStorage.getItem('donelist');
      if(donestr !=null){
            donelist = JSON.parse(donestr);
      }
      return donelist;
}


var addEvents = function(listItem){
    var delBtn=listItem.querySelector('.delBtn');
    var doneBtn=listItem.querySelector('.doneBtn');  
    var inputTask=listItem.getElementsByTagName('span')[0];
    inputTask.addEventListener('click', editTask)
    delBtn.addEventListener('click', deleteTask);        
    doneBtn.addEventListener('click', toggleDone); 
}

//local save
document.addEventListener( 'DOMContentLoaded', retrievestate, false );

function storestate() {
localStorage.tasklist = todo.innerHTML;
localStorage.donelist= completed.innerHTML;
};

//restrieve todo list in localStorage and add function to buttons
// var retrievestate= function(){
//     if(localStorage.tasklist){
//         todo.innerHTML = localStorage.tasklist;
//         var listArray = todo.children;
//     var listLength=listArray.length;
//     for(var i=0; i <listLength; i++){
//         var listItem= listArray[i];
//         addEvents(listItem);
//         }
//     }   
//     if(localStorage.dones){
//         completed.innerHTML = localStorage.dones;
//         var donesArray = completed.children;
//     var donesLength=listArray.length;
//     for(var i=0; i <donesLength; i++){
//         var doneItem= donesArray[i];
//         addEvents(doneItem);
//         }
//     }     
// };
//retrieve todolist and completed list
// function restoreStages(){
//     retrievestate(tasklist, todo);
//     retrievestate(donelist, completed);
// }

function retrievestate() {
if ( localStorage.tasklist ) {
    //show list form memory
    todo.innerHTML = localStorage.tasklist;
    //add events to buttons
    var listArray = todo.children;
    var listLength=listArray.length;
    for(var i=0; i <listLength; i++){
        var listItem= listArray[i];
        addEvents(listItem);
    }
    };
    if(localStorage.donelist){
        completed.innerHTML = localStorage.donelist;
        var donesArray = completed.children;
        var donesLength=donesArray.length;
        for(var i=0; i <donesLength; i++){
            var doneItem= donesArray[i];
            addEvents(doneItem);
            }
    }     
};
     
//option buttons
var createNewItem = function(taskStr){
    //create listItem
    var listItem= document.createElement('li');  
    //task describe
    var taskDescrible= document.createElement('span'); 
    //edit task input(text)
    var editInput = document.createElement('input');
    //mark as doneButton (checkbox)
    var doneBtn= document.createElement('i');
    //button delete
    var delBtn = document.createElement('i');
    
    //modifies each element
    doneBtn.type="checkbox";
    doneBtn.className="col s1 small material-icons left doneBtn";
    doneBtn.innerText='done';
    
    editInput.type='text';
    editInput.className='hide editInput';
    
    taskDescrible.innerHTML= taskStr;
    taskDescrible.className='flow-text';
    
    delBtn.className="col s1 small material-icons right delBtn";
    delBtn.title="Delete";
    delBtn.innerText="delete";
    
    listItem.appendChild(doneBtn); 
    listItem.appendChild(taskDescrible);
    listItem.appendChild(editInput);
    listItem.appendChild(delBtn);
    
    //bind actions to buttons
    taskDescrible.addEventListener('click', editTask);
    delBtn.addEventListener('click', deleteTask);        
    doneBtn.addEventListener('click', toggleDone);
           
    return listItem;  
}

// create item       
form.addEventListener('submit', function(ev){
      var taskStr=field.value;
      if(taskStr != null){
        var listItem=createNewItem(taskStr);
        //add the new task to list
        todo.appendChild(listItem);    
        field.value = '';
        field.focus();
        //save the new task to local storage
        storestate();
      };     
      ev.preventDefault();
}, false);

//Edit existing task
var editTask = function(ev){
    console.log("edit task...");
    var listItem = this.parentNode;
    var editInput= listItem.querySelector('input');
    var taskDescribe = listItem.querySelector('span');
    //hide the task describe
    editInput.value= taskDescribe.innerText;     
    taskDescribe.classList.toggle('hide');
    editInput.classList.toggle('hide');
    editInput.focus();   
    //update task    
    editInput.onkeypress= function(ev){  
        if (!ev) ev = window.event;     
        if(ev.which==13){    
            editInput.focus();  
            taskDescribe.innerText= editInput.value;
            taskDescribe.classList.toggle('hide');
            editInput.classList.toggle('hide');            
            storestate();        
        }
        
    };
    //if user click outside edit box, restore task
    // editInput.addEventListener("focusout", function(){
    //     console.log('user lose its focus to edit input');
    //     if (!ev) ev = window.event;
    //     taskDescribe.classList.toggle('hide');
    //     editInput.classList.toggle('hide');
    // })
};

//delete item
var deleteTask = function(ev){ 
    var listItem = this.parentNode;
    console.log("delete task...");
    var ul = listItem.parentNode;    
    //Remove the parent list from the ul
    ul.removeChild(listItem);
    storestate();
    ev.preventDefault();
};
      
//Mark as done  
var toggleDone= function(ev){
    console.log("mark as done task...");
    var listItem = this.parentNode;
    var listId= $(listItem).parent().attr('id');
    this.classList.toggle('done');
    //move completed task to completedlist and reverse
    if(listId=='todolist'){
       todo.removeChild(listItem);
       completed.appendChild(listItem); 
    }else{
       completed.removeChild(listItem);
       todo.appendChild(listItem); 
    }
    storestate();
};         

var deleteAllTasks = function(){ 
    var tasklist=document.getElementById('todolist');
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }     
    storestate();
};

var clearAllBtn = document.querySelector("#clearAll");
clearAllBtn.addEventListener('click', deleteAllTasks);
   