//declare variants
var todo=  document.querySelector('#todolist');
var form = document.querySelector('form');
var input = document.querySelector('#add');
var field=document.querySelector('#newitem');
      
//option buttons
var createNewItem = function(taskStr){
    //create listItem
    var listItem= document.createElement('li');  
    //task describe
    var taskDescrible= document.createElement('span'); 
    //mark as doneButton (checkbox)
    var doneBtn= document.createElement('i');
    //input (txt)
    // var editInput=document.createElement('span');
    //button edit
    var editBtn = document.createElement('i')
    //button delete
    var delBtn = document.createElement('i');
    
    //modifies each element
    doneBtn.type="checkbox";
    doneBtn.className="col s1 small material-icons doneBtn";
    doneBtn.innerText='done';
    
    taskDescrible.innerHTML= taskStr;
    taskDescrible.className='editable';
    // editInput.type='text';
    // editInput.className="col s9 editInput";
        
    editBtn.className="col s1 small material-icons editBtn";
    editBtn.title="Edit";
    editBtn.innerText="mode_edit";
    
    delBtn.className="col s1 small material-icons delBtn";
    delBtn.title="Delete";
    delBtn.innerText="delete";
    
    //append to list    
    listItem.appendChild(doneBtn); 
    // listItem.appendChild(input); 
    listItem.appendChild(taskDescrible);  
    listItem.appendChild(editBtn);
    listItem.appendChild(delBtn);
       
    return listItem;  
}

//fetch data
var getlist = function(){
      var tasklist = new Array;
      var taskstr=localStorage.getItem('todo');
      if(taskstr !=null){
            tasklist = JSON.parse(taskstr);
      }
      return tasklist;
}

// create item       
form.addEventListener('submit', function(ev){
      var taskStr=field.value;
      if(taskStr != null){
        var listItem=createNewItem(taskStr);
        //add the new task to list
        todo.appendChild(listItem);
        var editBtn=listItem.querySelector('.editBtn');
        var delBtn=listItem.querySelector('.delBtn');
        var doneBtn=listItem.querySelector('.doneBtn');  
        var inputTask=listItem.getElementsByTagName('span')[0];
        //add EventListener to buttons      
        editBtn.addEventListener('click', editTask);
        inputTask.addEventListener('click', editTask)
        delBtn.addEventListener('click', deleteTask);        
        doneBtn.addEventListener('click', toggleDone);
        //empty and refocus to input text
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
     $('.editable').editable(storestate());
    // var listItem = this.parentNode;
    // var editTaskInput=listItem.getElementsByTagName('span')[1];
    // var existingTask= listItem.getElementsByTagName('span')[0];
    // editTaskInput.innerHTML = existingTask.innerHTML;
    // existingTask.style.visibility = 'hidden';
    // listItem.blur(function(){
    //     if(editTaskInput.innerHTML!=null){
    //         existingTask.innerHTML= editTaskInput.innerHTML;
    //         storestate();
    //     }else{
    //         existingTask.style.visibility = 'visible';
    //     }
    //});
    // var listItem = this.parentNode;    
    // console.log("edit task...");        
    // var containsEditClass= listItem.classList.contains('editMode');
    // var editInput= listItem.querySelector('.editInput');
    // var taskStr=listItem.innerHTML;    
    //if the class of the listItem is .editMode
    // if(containsEditClass){
        //Switch from .editMode, task become input's value 
        // taskStr= editInput.value;                      
    // }else{
        //Switch to .editMode, input value becomes task's text        
    //     editInput.value=taskStr; 
    // }    
    //Toggle .editMode on the listItem
    // listItem.classList.toggle('editMode');
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
    this.classList.toggle('done');
    storestate();
};         

//local save
 document.addEventListener( 'DOMContentLoaded', retrievestate, false );
  
  function storestate() {
    localStorage.tasklist = todo.innerHTML;
  };

  function retrievestate() {
    if ( localStorage.tasklist ) {
        
      todo.innerHTML = localStorage.tasklist;
    }
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
   
