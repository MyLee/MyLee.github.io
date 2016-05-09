console.log('Nu starta vi!');
var testSetTimeOut = function() {
    console.log('Jag är "\setTimeout". Jag väntar a specifik antal ms (här är 1000ms) innan jag kör och jag kör bara en gång.');
}

var testSetInterval = function() {
    console.log('Jag är "\setInterval"!. Jag väntar a specifik antal ms (här är 1000ms) innan jag kör. Jag väntar och kör igen');
}

setTimeout(testSetTimeOut,1000);

setInterval(testSetInterval, 1000);