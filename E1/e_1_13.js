require('http').createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "image/png"});

	var stream = require('fs').createReadStream("cat.png");
	stream.on('open', function() {
		// This just pipes the read stream to the response object (which goes to the client)
        stream.pipe(res);
	});
	stream.on('error', function(err){
		response.end(err);
	});
}).listen(8080);


// require('http').createServer(function(request, response){
// 	response.writeHead(200, {"Content-Type": "image/png"});
// ​
// 	var stream = require('fs').createReadStream("cat.png");
// 	stream.on('data', function(chunk) {
// 		response.write(chunk);
// 	});
// 	stream.on('end', function(){
// 		response.end();
// 	});
// }).listen(8080);

