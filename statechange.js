var states = require("./gamestates").getStates();

var currentState = null;

function changed(state){
    currentState = state;
}

function getLastMessage(){
    return currentState;
}

module.exports = {
    changed,
    getLastMessage
}