 console.log(process.argv);
 
 var nrOfFaces = process.argv;
 var inputLength = nrOfFaces.length;
 for (var i = 2; i<inputLength; i++){
     var nrOfFace = nrOfFaces[i];
     
     if(!nrOfFace.match(/^\d+/)){
        console.log("Digital number only!")
        }
        else{
            var dice = parseInt(nrOfFace);
            var slum = Math.floor((Math.random() * dice) + 1); 
            console.log('Dices sides:' + nrOfFaces[i]);
    console.log('  dice: ' + slum);
        }
}
