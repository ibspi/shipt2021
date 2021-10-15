const states = require("./gamestates").getStates();

// GAME PROPERTIES
var state = states.WAITFORPLAYER1
var player1 = null;
var player2 = null;
var goals1 = 0;
var goals2 = 0;
var maxGoals = 5;

// LISTENERS

var stateChangeListener = null;

function  addStateChangeListener(listener){
    stateChangeListener = listener;
}

function stateChanged(){
    if(stateChangeListener != null){
        stateChangeListener({
            currentState: state,
            firstPlayer: player1,
            secondPlayer: player2,
            goals : [ goals1,goals2]
        });
    }
}
function getWholeState(){
    return {
        currentState: state,
        firstPlayer: player1,
        secondPlayer: player2,
        goals : [ goals1,goals2]
    }
}

function notity(){
    stateChanged();
}
// TRANSITIONS

function init(maxgoals){
    console.log("init called");
    state = states.WAITFORPLAYER1,
    player1 = null;
    player2 = null;
    goals1 = 0;
    goals2 = 0;
    maxGoals = maxgoals;
    notity();
}

function addPlayer1(player){
    if(state == states.WAITFORPLAYER1 ){
        player1 = player;
        state = states.WAITFORPLAYER2;

        notity();
        return true;
    }
    return false;
}

function addPlayer2(player){
    if(state == states.WAITFORPLAYER2  && player1 != player){ // same player as player1 is prohibited
        player2 = player;
        state = states.READY;
        notity();
        return true;
    }
    return false;
}

function addGoalP1(){

    if(state == states.READY){
    goals1++;
    testForTransition();
    return true;
    }
    return false;
}
function addGoalP2(){
    if(state == states.READY){
        goals2++;
        testForTransition();
        return true;
        }
        return false;
}

function testForTransition(){
    if(goals1 == maxGoals || goals2 == maxGoals){
        state = states.WAITFORPLAYER1;
        notity();
    }
}

module.exports ={
    states,
    getWholeState,
    init,
    addPlayer1,
    addPlayer2,
    addGoalP1,
    addGoalP2,
    addStateChangeListener
}