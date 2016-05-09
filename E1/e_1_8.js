var fs = require("fs");
var chunk = require('chunk');
var data ="";
var fileReadStream = fs.createReadStream('lorem.txt');

fileReadStream.on('data', (chunk) => {
    data += chunk;
});
fileReadStream.on('end', () => {
var chunkeddata = chunk(data, " ");

var randomNr = Math.floor((Math.random() * chunkeddata.length) );   
var writeToHTML = data[randomNr];
    var http = require('http');

    http.createServer(function (req, res) {
    var html = buildHtml(req);

    res.end(html);
    }).listen(8080);

    function buildHtml(req) {
    var header = '';
    var body = '<h1>Text file</h1>';
    body +=  '<p>'+ writeToHTML +'<p>';
    return '<!DOCTYPE html>'
        + '<html><header>' + header + '</header><body>' + body + '</body></html>';
    };

});



