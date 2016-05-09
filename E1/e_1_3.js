var http = require('http');

http.createServer(function (req, res) {
  var html = buildHtml(req);

  res.end(html);
}).listen(8080);

function buildHtml(req) {
  var header = '';
  var body = '<h1> HeLlo from Node.js</h1>';

  return '<!DOCTYPE html>'
       + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};