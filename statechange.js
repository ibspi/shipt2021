var states = require("./gamestates").getStates();
var hwint = require("./hwinterface");
var currentState = null;
hwint.create();

function changed(state){
    currentState = state;
    console.log("state change notified: " +state.currentState);
    hwint.allOff();
    if(currentState.currentState == states.WAITFORPLAYER1){
	console.log("redOn");
hwint.redOn();
	}
    if(currentState.currentState == states.WAITFORPLAYER2){
	console.log("yellowOn");	
hwint.yellowOn();
}
     if(currentState.currentState == states.READY){
     console.log("greenOn");
	hwint.greenOn();
}	

}

function getLastMessage(){
    return currentState;
}

module.exports = {
    changed,
    getLastMessage
}
