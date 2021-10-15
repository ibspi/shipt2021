var game = require("./playstate");
var statechange = require("./statechange");
var states = require("./gamestates").getStates();
var udev = require ("udev");
var monitor = udev.monitor("usb");
var hwint = require("./hwinterface");

hwint.addButtonListener(function(){
	
	let ret = game.addGoalP1();
	console.log("goal for p1 %s ?",ret);
});

game.addStateChangeListener(statechange.changed);
game.init(5);

monitor.on('add', function (device) {
	let p1success = false;
	let p2success = false;
	if(device.ID_SERIAL != null){
        	p1success = game.addPlayer1(device.ID_SERIAL);
		console.log(device.ID_SERIAL);
		if(p1success != true) p2success = game.addPlayer2(device.ID_SERIAL);
		console.log("p1 - %s ; p2 -%s",p1success,p2success);
	}
	//else{ console.log("serial not given");}
	//console.log('3 ' + game.getWholeState().currentState);
});
console.log('1 ' + game.getWholeState().currentState);


/*
game.init(5);
game.addStateChangeListener(statechange.changed);
game.addPlayer1("dummy");

game.init(5);
var ret =game.addPlayer2("dummy");
console.log(ret);
*/
