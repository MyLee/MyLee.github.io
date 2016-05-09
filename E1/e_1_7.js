var fs = require("fs");
  
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      var fileContent =  data.toString();
   
        var http = require('http');

        http.createServer(function (req, res) {
        var html = buildHtml(req);

        res.end(html);
        }).listen(8080);

        function buildHtml(req) {
        var header = '';
        var body = '<h1>Text file</h1>';
        body +=  '<p>'+ fileContent +'<p>';
        return '<!DOCTYPE html>'
            + '<html><header>' + header + '</header><body>' + body + '</body></html>';
        };
});