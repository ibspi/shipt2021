const Gpio = require("onoff").Gpio;

var ledRed = null;
var ledGreen = null;
var ledYello = null;

function create(){

 ledRed = new Gpio(4,"out");
 ledGreen = new Gpio(6,"out");
 ledYellow = new Gpio(26,"out");

 button = new Gpio("5","in","both");

button.watch((err,value) => {
	if(buttonlistener != null && value == 1){
 		buttonlistener(value);
		console.log(value);
		}
	});
};

var buttonlistener = null;
function addButtonListener(l){
	buttonlistener = l;
}


function allOff(){
	ledRed.writeSync(0);
	ledGreen.writeSync(0);
	ledYellow.writeSync(0);
}

function redOn(){

 ledRed.writeSync(1);
}

function yellowOn(){
	
  ledYellow.writeSync(1);
}
function greenOn(){
 ledGreen.writeSync(1);	
}


module.exports = {
	allOff,
	redOn,
	yellowOn,
	greenOn,
	addButtonListener,
	create
}
