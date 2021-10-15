var states = require("./gamestates").getStates();

var currentState = null;

function changed(state){
    currentState = state;
    console.log(state.currentState);
}

function getLastMessage(){
    return currentState;
}

module.exports = {
    changed,
    getLastMessage
}
