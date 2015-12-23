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
    //button delete
    var delBtn = document.createElement('i');
    
    //modifies each element
    doneBtn.type="checkbox";
    doneBtn.className="col s1 small material-icons doneBtn";
    doneBtn.innerText='done';
    
    taskDescrible.innerHTML= taskStr;
    taskDescrible.className='editable';
    
    delBtn.className="col s1 small material-icons delBtn";
    delBtn.title="Delete";
    delBtn.innerText="delete";
    
    //append to list    
    listItem.appendChild(doneBtn); 
    listItem.appendChild(taskDescrible);  
    listItem.appendChild(delBtn);
    
    //add eventListener to buttons
    taskDescrible.addEventListener('click', editTask)
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
    // $('.editable').editable(function(value, settings){               
    //     storestate();
    //     console.log(settings);
    //     return(value);},
    //     {
    //         cssclass: 'editTask' 
    //     }
    //    );   
    $('.editable').editable({
    success: function(response, newValue) {
        if(response.status == 'error') return response.msg; //msg will be shown in editable form
        storestate();
    }
});
                                  
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


//fetch data
var getlist = function(){
      var tasklist = new Array;
      var taskstr=localStorage.getItem('todo');
      if(taskstr !=null){
            tasklist = JSON.parse(taskstr);
      }
      return tasklist;
}

var addEvents = function(listItem){
    var editBtn=listItem.querySelector('.editBtn');
    var delBtn=listItem.querySelector('.delBtn');
    var doneBtn=listItem.querySelector('.doneBtn');  
    var inputTask=listItem.getElementsByTagName('span')[0];
    //add EventListener to buttons      
    editBtn.addEventListener('click', editTask);
    inputTask.addEventListener('click', editTask)
    delBtn.addEventListener('click', deleteTask);        
    doneBtn.addEventListener('click', toggleDone); 
}

//local save
 document.addEventListener( 'DOMContentLoaded', retrievestate, false );
  
  function storestate() {
    localStorage.tasklist = todo.innerHTML;
  };

  function retrievestate() {
    if ( localStorage.tasklist ) {
        todo.innerHTML = localStorage.tasklist;
        var listArray = todo.children;
        var listLength=listArray.length;
        for(var i=0; i <listLength; i++){
            var listItem= listArray[i];
            addEvents(listItem);
        }
       };
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
   
