//To do list
      var todo= document.querySelector('#todo'),
          form = document.querySelector('#form'),
          field=document.querySelector('#newitem'),
          done=document.querySelector('#done'),
          status =document.querySelector('#status'),
          actionform= ' &nbsp &nbsp<i class="small material-icons" id="edit" title="Edit">mode_edit</i>'+ 
                      '&nbsp<i class="small material-icons" id="doneTick" title="Done">done</i>'+           
                      '&nbsp<i class="small material-icons" id="deleteTick" title="Delete">delete</i> ',
          edit= document.querySelector('#edit'),
          tickDone=document.querySelector('#doneTick'), 
          tickDelete = document.querySelector('#deleteTick');
      
      // create item
     form.addEventListener('submit', function(ev){
        todo.innerHTML += '<li>' + field.value  + actionform +'</li>';
        field.value = '';
        field.focus();
        storestate();
        ev.preventDefault();
      }, false);
      
      //Redigera list
      
      
      //delete item
      tickDelete.addEventListener("click"   , function(ev){
        this.element.parentNode.removeChild();
      })
      
      //Mark as done
      $('#user_button').toggle(function () {
          $("#user_button").css({borderBottomLeftRadius: "0px"});
      }, function () {
          $("#user_button").css({borderBottomLeftRadius: "5px"});
      });
      $('#user_button').toggle(function () {
          $("#user_button").addClass("active");
      }, function () {
          $("#user_button").removeClass("active");
      });
      //local save
      document.addEventListener( 'DOMContentLoaded', retrievestate, false );
      
      var storestate =function (){
        localStorage.todolist=todo.innerHTML;
      };
      
      var retrievestate =function(){
        if(localStorage.todolist){
          todo.innerHTML = localStorage.todolist;
        }
      };