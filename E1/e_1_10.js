var http = require('http');

function getNames(callback) {

    return http.get({
        host: 'mardby.se',
        path: '/AJK15G/employees_json.php'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            var parsed = JSON.parse(body);       
            var names = parsed.employees;
            var nrOfEmployees = names.length;
           for(var i = 0; i<nrOfEmployees; i++){
               console.log(i+1 +": "+names[i].name);
           }
        })                    
    });
};

getNames();


