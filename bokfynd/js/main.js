var data, bokUrl, author, title, isbn, type, identifier, url, searchText;

//send request when user click enter
$('#searchInput').keypress(function(ev){  
        if (!ev) ev = window.event;     
        if(ev.which==13){   
            $('#info').addClass('loader-inner pacman');    
            $('#searchResult').empty();
            searchText = $('#searchInput').val();  
            sendRequest(searchText);
            ev.preventDefault();
        }
        
});
//send request when user click search buttton
$('#searchBtn img').click(function() {   
   $('#info').addClass('loader-inner pacman');    
   $('#searchResult').empty();
   searchText = $('#searchInput').val();  
   sendRequest(searchText);  
  //$('#searchInput').val('');
});

var sendRequest = function(searchText){
    if($("#author").prop('checked')){
         url = "http://libris.kb.se/xsearch?query=fört:(" + searchText +")&format=json&ordet=alphabetical";
    }else{
         url = "http://libris.kb.se/xsearch?query=" + searchText +"&format=json&ordet=rank"; 
    }
   
    $.getJSON(url, function(data) {
    $('#info').removeClass('loader-inner pacman');
    showTitleResp(data);
  });
};

var showTitleResp = function(data){
    console.log(data);
    var html='<div class="row">';
    if(data.xsearch.list.length ==0){
        html ='<p>No records.</p>';
    }else{
        $.each(data.xsearch.list, function(i, list){
            identifier=list.identifier
            bokId = identifier.replace( /^\D+/g, '');   
            title = list.title;
            author = list.creator;
            identifier=list.identifier;
            isbn = list.isbn;
            type = list.type;     
            bookUrl= 'http://libris.kb.se/bib/'+ bokId ;      
            html += '<a href="' + identifier + '" target="blank" class="col s4 m3 ">' ;
            html += '<img class="book grayscale hoverable" src="img/bok1.jpg" alt="book" title="' + title +'"/>';        
            html += '<h6 class="center-align">' + title + '</h6>';
            if(author != null){
                html += '<h6 class="center-align">' + author + '</h6>';
            }
            if(isbn != null){
                html += '<h6 class="center-align">ISBN: ' + isbn + '</h6>';
            }                
            html += '<h6 class="center-align">Format: ' + type + '</h6>';
            html += '</a>'; 
        });
    }
    
    html += '</div>';
    $('#searchResult').html(html);  
};

