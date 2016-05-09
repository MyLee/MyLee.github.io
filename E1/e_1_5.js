var events = require('events');
var eventEmitter = new events.EventEmitter();
var shootGun = function(){
console.log("bang bang!");
}
var dyingWish = function (){
    console.log("I'm hit!");
}
eventEmitter.on('pullTrigger', shootGun);
eventEmitter.on('pullTrigger', dyingWish);
eventEmitter.emit('pullTrigger');
