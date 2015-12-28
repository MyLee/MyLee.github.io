//declare variants
var todo=  document.querySelector('#todolist');
var clearAllBtn = document.querySelector("#clearAll");
var completed = document.querySelector('#completedlist');
var form = document.querySelector('form');
var input = document.querySelector('#add');
var field=document.querySelector('#newitem');
var $toastContent = $('<span>Input can not be empty</span>');
var Materialize;
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
    var editBtn= listItem.querySelector('.editBtn');
    var inputTask=listItem.getElementsByTagName('span')[0];
    inputTask.addEventListener('click', editTask)
    delBtn.addEventListener('click', deleteTask);        
    doneBtn.addEventListener('click', toggleDone); 
    editBtn.addEventListener('click', editTask);   
}

var createEditBtn = function(){
    var editBtn= document.createElement('i');
    editBtn.type='checkbox';
    editBtn.className='col s1 small material-icons right editBtn';
    editBtn.innerText='edit';
    editBtn.title='Edit';
    editBtn.addEventListener('click', editTask);    
    return editBtn;
}
var createEditInput = function(){
    var editInput = document.createElement('input');              
    editInput.type='text';
    editInput.className='hideme editInput';
    // $(editInput).prop('required',true);         
    return editInput;  
}   

var createDoneBtn = function(){
    //mark as doneButton (checkbox)
    var doneBtn= document.createElement('i');
    //modifies each element
    doneBtn.type="checkbox";
    doneBtn.className="col s1 small material-icons left doneBtn";
    doneBtn.innerText='done';
    doneBtn.title='Completed'    
    doneBtn.addEventListener('click', toggleDone);    
    return doneBtn;
}
  
var createDeleteBtn = function(){
    var delBtn = document.createElement('i');
    delBtn.className="col s1 small material-icons right delBtn";
    delBtn.title="Delete";
    delBtn.innerText="delete";    
    delBtn.addEventListener('click', deleteTask);    
    return delBtn;
}  
var createTaskDecribe = function(taskStr){    
    var taskDescrible= document.createElement('span');
    taskDescrible.className='flow-text';
    taskDescrible.innerHTML= taskStr;    
    taskDescrible.addEventListener('click', editTask);    
    return taskDescrible;
}

//option buttons
var createNewItem = function(taskStr){
    //create listItem
    var listItem= document.createElement('li');  
    var editInput = createEditInput();
    var doneBtn = createDoneBtn();
    var delBtn = createDeleteBtn();
    var taskDescrible= createTaskDecribe(taskStr);
    var editBtn = createEditBtn();
 
    listItem.appendChild(doneBtn); 
    listItem.appendChild(taskDescrible);
    listItem.appendChild(editInput);    
    listItem.appendChild(delBtn);
    listItem.appendChild(editBtn);             
    return listItem;  
}

var saveItem= function(ev){
    var taskStr=field.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      if(taskStr != null){
        var listItem=createNewItem(taskStr);
        todo.appendChild(listItem);    
        field.value = '';
        field.focus();
        //save the new task to local storage
        storestate();
      };     
      ev.preventDefault();
};
 
var toggleClass = function(list1, list2, classname){
    list1.classList.toggle(classname);
    list2.classList.toggle(classname);
}   
//Edit existing task
var editTask = function(ev){
    var listItem = this.parentNode;
    var editInput= listItem.querySelector('input');
    var taskDescribe = listItem.querySelector('span');
    var editBtn= listItem.querySelector('.editBtn');
    editInput.value= taskDescribe.innerText;     
    toggleClass(editInput, taskDescribe, 'hideme');
    if(editBtn.innerText != 'settings_backup_restore'){
        editBtn.innerText= 'settings_backup_restore';
        editBtn.title="Undo changes";
    }else{
        editBtn.innerText= 'edit';
        editBtn.title="Edit";
    }

    editInput.focus();   
    //update if user click enter
    editInput.onkeypress= function(ev){  
        if (!ev) ev = window.event;     
        if(ev.which==13){    
            if(editInput.value==null || editInput.value==""){
               Materialize.toast($toastContent, 3000, 'center');
               ev.preventDefault();
            }else{
                editInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
                taskDescribe.innerText= editInput.value;
                toggleClass(editInput, taskDescribe, 'hideme');  
                editBtn.innerText= 'edit'; 
                editBtn.title='Edit';         
                storestate();  
            }      
        }
        // else{
        //     $(listItem).blur(function(){
        //     if(ev.which != 13){
        //     console.log('user lose its focus to edit input');
        //     toggleClass(editInput, taskDescribe, 'hide');
        //     }
    // });          
    // }; 
}};

//delete item
var deleteTask = function(ev){ 
    var child = this.parentNode;
    console.log("delete task...");
    var parent = child.parentNode;    
    //Remove the parent list from the ul
    parent.removeChild(child);
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

var removeAllChild = function(list){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
};

var deleteAllTasks = function(){ 
    var tasklist=document.getElementById('todolist');    
    var donelist=document.getElementById('completedlist') ;
    removeAllChild(tasklist);
    removeAllChild(donelist);
    storestate();
};

clearAllBtn.addEventListener('click', deleteAllTasks);
form.addEventListener('submit', saveItem);  
document.addEventListener( 'DOMContentLoaded', retrievestate, false );

//save och load local
function storestate() {
localStorage.tasklist = todo.innerHTML;
localStorage.donelist= completed.innerHTML;
};

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