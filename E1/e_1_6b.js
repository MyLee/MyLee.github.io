// http://mardby.se/AJK15G/lorem_text_long.php

var http = require('http');
var chunk = require('chunk');
//The url we want is: mardby.se/AJK15G/lorem_text_long.php'
var options = {
  host: 'mardby.se',
  path: '//AJK15G/lorem_text_long.php'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (d) {
    str += d;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var result = chunk(str, 1);
    console.log(str);
    console.log(result)
    console.log(result.length);
  });
}

http.request(options, callback).end();