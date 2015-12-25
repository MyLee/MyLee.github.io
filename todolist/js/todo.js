//declare variants
var todo=  document.querySelector('#todolist');
var dones = document.querySelector('#completed');
var form = document.querySelector('form');
var input = document.querySelector('#add');
var field=document.querySelector('#newitem');

//fetch data
var getlist = function(savelist){
      var tasklist = new Array;
      var item = savelist.tostring();
      var taskstr=localStorage.getItem(item);
      if(taskstr !=null){
            tasklist = JSON.parse(taskstr);
      }
      return tasklist;
}

var tasklist = getlist(todo);
var donelist= getlist(dones);

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
localStorage.donelist= dones.innerHTML;
};

var retrievestate= function(localSavedList, target){
    if(localStorage.localSavedList){
        target.innerHTML = localStorage.localSavedList;
        var listArray = todo.children;
    var listLength=listArray.length;
    for(var i=0; i <listLength; i++){
        var listItem= listArray[i];
        addEvents(listItem);
        }
    }
};

var restoreStage = function(){
    retrievestate(tasklist, todo);
    retrievestate(donelist, dones);
}

// function retrievestate() {
// if ( localStorage.tasklist ) {
//     todo.innerHTML = localStorage.tasklist;
//     var listArray = todo.children;
//     var listLength=listArray.length;
//     for(var i=0; i <listLength; i++){
//         var listItem= listArray[i];
//         addEvents(listItem);
//     }
//     };
// };
     
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
    doneBtn.className="col s1 small material-icons doneBtn";
    doneBtn.innerText='done';
    
    editInput.type='text';
    editInput.className='hide editInput';
    
    taskDescrible.innerHTML= taskStr;
    
    delBtn.className="col s1 small material-icons delBtn";
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

// var switchback= function(editInput, taskDescribe, ev){
//     $(editInput).blur(function(ev){  
//         if (!ev) ev = window.event;      
//         console.log('user lose its focus to edit input');
//         taskDescribe.classList.toggle('hide');
//         editInput.classList.toggle('hide');
//     });
// }
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
    this.classList.toggle('done');
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
   