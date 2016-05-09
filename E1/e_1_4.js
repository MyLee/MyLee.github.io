var fs = require("fs");

fs.writeFile('input.txt', 'Written using Node.js',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("Data written successfully!");
   console.log("Let's read newly written data");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Newly written data: " + data.toString());
   });
});