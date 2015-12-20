//declare variants
var todo=  document.querySelector('#todolist');
var form = document.querySelector('form');
var input = document.querySelector('#add');
var field=document.querySelector('#newitem');
      
//option buttons
var createNewItem = function(taskStr){
    //create listItem
    var listItem= document.createElement('li');   
    //mark as doneButton (checkbox)
    var doneBtn= document.createElement('i');
    //task describe
    var span=document.createElement('span');
    //input (txt)
    var editInput=document.createElement('input');
    //button edit
    var editBtn = document.createElement('i')
    //button delete
    var delBtn = document.createElement('i');
    
    //modifies each element
    doneBtn.type="checkbox";
    doneBtn.className="small material-icons doneBtn";
    doneBtn.title="Done";
    doneBtn.innerText="done";
    
    editInput.type='text';
    editInput.className="editInput";
    
    span.type='text';
    span.innerText= taskStr;
    
    editBtn.className="small material-icons editBtn";
    editBtn.title="Edit";
    editBtn.innerText="mode_edit";
    
    delBtn.className="small material-icons delBtn";
    delBtn.title="Delete";
    delBtn.innerText="delete";
    
    //append to list
    listItem.appendChild(doneBtn);    
    listItem.appendChild(span);
    listItem.appendChild(editBtn);
    listItem.appendChild(delBtn);
    listItem.appendChild(editInput);
    
    return listItem;  
}

//fetch data
var getlist = function(){
      var todolist = new Array;
      var todostr=localStorage.getItem('todo');
      if(todostr !=null){
            todolist = JSON.parse(todostr);
      }
      return todolist;
}

// create item       
form.addEventListener('submit', function(ev){
      var taskStr=field.value;
      if(taskStr != null){
        // var taskStr=field.value;
        var listItem=createNewItem(taskStr);
        todo.appendChild(listItem);
        var editBtn=listItem.querySelector('.editBtn');
        var delBtn=listItem.querySelector('.editBtn');
        var doneBtn=listItem.querySelector('.doneBtn');        
        editBtn.addEventListener('click', function(ev){
            var listItem = this.parentNode;
            editTask(listItem);
        }); 
        delBtn.addEventListener('click', function(ev){
            var listItem = this.parentNode;
            deleteTask(listItem);
        })        
        doneBtn.addEventListener('toggle', function(ev){
            var listItem = this.parentNode;
            toggleDone(listItem);
        })
        field.value = '';
        field.focus();
        storestate();           
        ev.preventDefault(); }           
}, false);

//Edit existing task
var editTask = function(listItem){            
    var containsEditClass= listItem.classList.contains('editMode');
    var editInput= listItem.querySelector('.editInput');
    var taskStr=listItem.querySelector('span');
    
    //if the class of the listItem is .editMode
    if(containsEditClass){
        //Switch from .editMode, task become input's value        
        editInput.value=taskStr.innerHTML;        
    }else{
        //Switch to .editMode, input value becomes task's text        
        taskStr.innerHTML= editInput.value;
    }
    
    //Toggle .editMode on the listItem
    listItem.classList.toggle('editMode');
    // storestate();
};


//delete item
var deleteTask = function(listItem){
    var ul = listItem.parentNode;    
    //Remove the parent list from the ul
    ul.removeChild(listItem);
    storestate();
};
      
//Mark as done  
var toggleDone= function(listItem){
    var containsClassDone = listItem.classList.contains('done');
    
    //if the class of the listItem is .done
    if(containsClassDone){
        listItem.removeClass('done');
    }else{
        listItem.addClass('done');
    }   
};         
// $('li .doneBtn').toggle(function () {
//       $(".doneBtn").parent().addClass("finish");
// }, function () {
//       $(".doneBtn").parent().removeClass("finish");
// });
//local save
 document.addEventListener( 'DOMContentLoaded', retrievestate, false );
  
  function storestate() {
    localStorage.todolist = todo.innerHTML;
  };

  function retrievestate() {
    if ( localStorage.todolist ) {
      todo.innerHTML = localStorage.todolist;
    }
  };