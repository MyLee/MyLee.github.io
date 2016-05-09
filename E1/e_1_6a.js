var fs = require('fs');
var fileReadStream = fs.createReadStream('lorem.txt');
var data = "";
var chunk = require('chunk');
fileReadStream.on('data', (chunk) => {
data += chunk;
});
fileReadStream.on('end', () => {
var chunkeddata = chunk(data, 1);
console.log(data);
console.log(chunkeddata)
console.log(chunkeddata.length);
});