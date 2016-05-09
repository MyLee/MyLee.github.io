//http://mardby.se/AJK15G/lorem_text.php

var http = require('http');

function getLorem(callback) {

    return http.get({
        host: 'mardby.se',
        path: '/AJK15G/lorem_text.php'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            console.log(body);
            });
        });
};
 
getLorem(); 
   

